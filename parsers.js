const moment = require('moment')
const BlueBird  = require("bluebird");
const co = BlueBird.coroutine
const localDB = require('./localDB')
const { getBanksAndInsurersFromPospection } = require('./helpers')

let languages = {
    'en_US': require('./english'),
    'fr_FR': require('./french')
}

let parsers = { 

nameParser,
emailParser,
valueParser,
dateParser,
bankParser,
defaultParser,
insurancePremiumChecker,
insurerParser
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

/**
 * Remove unwanted digits and spaces
 * Split the name in 3 (first/mid/last)
 * @param {*} text 
 */

function defaultParser(message, settings, context, extraInfo){
    return new Promise((resolve,reject)=>{
        resolve(message)
    })
}

function parseNames(text){
    //let alphabeticRegexString = '[^\[\^$.|?*<>0-9!@#$%^&*()_+\]\\\';\/.,\|<>?|":{}=~\s]';
    //let namesRegexString = `(((${alphabeticRegexString}{2,})([ -]+)){1,4}(${alphabeticRegexString}{2,}))([ -]*)`;
    //let namesRegex = new RegExp(namesRegexString, 'g');
    let namesRegex = /((([^\[\^$.|?*<>0-9!@#$%^&*()_+\]\\\';\/.,\|<>?|":{}=~\s]{2,})([ -]+)){1,4}([^\[\^$.|?*<>0-9!@#$%^&*()_+\]\\\';\/.,\|<>?|":{}=~\s]{2,}))([ -]*)/g;

   let names = [];

   let match, fullName, tNames, firstName, midName, lastName;
    while ((match = namesRegex.exec(text)) !== null) {
        fullName = match[0]
            .replace('[ ]+', ' ')
            .replace(' -', '-')
            .replace('- ', '-');
        
       tNames = fullName.split(' ');
        
       firstName = tNames[0];    
        midName = tNames[1];
        lastName = tNames[2];  
        if (tNames.length == 4) {
            lastName += ' ' + tNames[3];
        }
        names.push({
            first: firstName,
            middle: midName,
            last: lastName
        });
    }
    resolve(names);
}

function nameParser(text){
    return new Promise((resolve,reject)=>{
        let specialCharasters = ['^','<','>','/','\\','@','[',']','!','#','$','%','&','*','(',')','?','{','}','_','=','+', '1', '2', '3' ,'4', '5', '6', '7', '8', '9', '0']
        text = text.data
        text = text.trim();
        text = text.split(' ');
        text = text.filter((el)=>{
            if(el.indexOf(' ') > -1){
                return false
            }
            if( !isNaN(+el)){
                return false
            }
            let notValid = specialCharasters.filter((char)=>{
    
                if(el.indexOf(char)>-1){
                    return true
                }
            })
            if(notValid.length){return false}
            return true
        })
        for(let i = 0; i < text.length; i += 1){
            if(text[i][0] === '-' && i >0){
                text[i-1] = text[i - 1] + text[i]
                text.splice(i, 1)
            } 
            if(text.length === i){break};
            if(text[i][text[i].length-1] === '-' && i < text.length - 1){
                text[i+1] = text[i] + text[i+1]; 
                text.splice(i,1)
            }
        }
        text = text.length?  text : ''
        if(text){resolve(parserSuccess(text.join(' '))) ;}
        else { resolve(parserFail(text)) }
    })
    
}

function emailParser(text){
    return new Promise((resolve,reject)=>{
        let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let valid = regEx.exec(text.data);
        if(valid) resolve(parserSuccess(text.data)) 
        else resolve(parserFail(text.data)) 
    })
}

emailParser({data: 'j.guennoc@gmail.com'}).then(console.log)

function checkForMatches(settings, text){
    if(settings.matches){
        settings.matches.forEach((match)=>{
            text = text.replaceAll(match, '')
          })
    }
      return text
}

function parserSuccess(data, parserInfo = {}){
    return { data, errors: false, parserInfo }
}

function parserFail(data, parserInfo = {}){
    return { data, errors: true, parserInfo }
}

function valueParser(message,settings, context, extraInfo){
    return new Promise((resolve,reject)=>{
        let text = message.data
        function checkForLimit(text){
            if(settings.limit){
                if (+text > settings.limit.max || +text < settings.limit.min){ return '' }
            }
            return text
        }
    
        text = text.trim();
        if(settings.allowed){ 
            let allowedToContinue = false; 
            settings.allowed.forEach((allowed)=>{ if(text.toLowerCase() === allowed){ allowedToContinue = true }})
            if(allowedToContinue) {resolve(parserSuccess(text)) };
        }
    
        if(settings.type === 'percent'){
            text = text.replaceAll('%','');
            text = text.replaceAll(',', '.');
            text = text.replaceAll(/ /, '');
            text = text.replaceAll(/[^.,\d]+/,'');
            text = checkForMatches(settings,text)
            if(text === '' || isNaN(+text)){
                resolve(parserFail(''));
            };
             resolve(parserSuccess(text))
        }
        if(settings.type === 'value'){
            text = text.replaceAll(',','.')
            text = text.replaceAll(/ /,'')
            let checkedValue = checkForValueShortcut(text)
            if(checkedValue){ text = checkedValue }
            else { text = text.replaceAll(/[^.,\d]+/,'') }
    
            text = checkForMatches(settings,text)
            if(isNaN(+text) || text === ''){
                resolve(parserFail(''));
            }
            resolve(parserSuccess(text))
        }
        if(settings.type === 'years'){
            text = text.replaceAll('%','');
            text = text.replaceAll(',', '.');
            text = text.replaceAll(/ /, '');
            text = text.replaceAll(/[^.,\d]+/,'');
            text = checkForMatches(settings,text)
            text = checkForLimit(text)
            if(isNaN(+text) || text === ''){
                resolve(parserFail(''));
            };
            if(extraInfo['valueParser']) {
                let value = extraInfo['valueParser']
                value = languages[context.language]['values'][value]
                if(value === 'months'){text = +text / 12}
                else {} 
            }
            resolve(parserSuccess(text))
        }
  
    })
}

function checkForValueShortcut(value){
    let valid = value.search(/\d+\s*[k|K]/) > -1 ? true : false
    value = value.replaceAll(/\D/,'') 
    if (valid){ return value = value + '000' }
        return false
}


function dateParser(parserData, settings, context){
    return new Promise((resolve,reject)=>{
        let text = parserData.data
        
           function cleanDateInput(text){
               text = text.trim();
               text = text.replaceAll(',','.');
               text = text.replaceAll('/', '.');
               text = text.replaceAll('-','.');
               return text
           }
           if(settings.returnOriginal){
               settings.returnOriginal = cleanDateInput(text);
           }
           text = cleanDateInput(text)
           text = moment(text,settings.format, true)
           if(settings.after){
               let after = new Date(context.state[settings.after].value)
               text = text.isAfter(after) ? text : moment.invalid();
           }
           // if(settings.minYears){
           //    let valid = Math.abs(text.diff(moment(), 'years')) >= settings.minYears
           //    console.log(valid)
           //    text = valid ? text : moment.invalid();
           // }
           text = text.isValid() ? text.toString() : ''
           if(text && settings.returnOriginal) { resolve(settings.returnOriginal) }
       
           resolve({
              data: text,
              parserInfo: {},
              errors: !text
           })
    })
}


function bankParser(message, settings, context){
    return new Promise((resolve,reject)=>{
        co(function*(){
            if(!localDB.banks.length){
                yield getBanksAndInsurersFromPospection()
            }
            let banks = localDB.banks;
           
            let text = message.data.toLowerCase();
            if(settings.type === 'getStep'){
                let found = [];
                let exactMatch = [];
                banks.forEach((bank)=>{
                    let bankFoundExact = false;
                    let bankFoundSynonim = false
                    bank.synonims.forEach((synonim)=>{
                        if(synonim.toLowerCase() === text && !bankFoundExact){bankFoundExact = true; exactMatch.push(bank)}
                        if(synonim.toLowerCase().indexOf(text) > -1 && !bankFoundSynonim){bankFoundSynonim = true; found.push(bank)}
                    })
                })
                let result = {data: '', errors: false, parserInfo: ''}
                if (exactMatch.length === 1){ result.data = exactMatch[0].id; resolve(result); }
                else if (found.length){ result.data = found; resolve(result) }
                else {
                    result.errors = true; resolve(result)
                }
                return
            }
            if(settings.type === 'getBank'){
                let match = '';
                banks.forEach((bank)=>{
                    bank.synonims.forEach((synonim)=>{
                        if(synonim === text){match = bank.id}
                        if(bank.id.toLowerCase() === text){match = bank.id}
                    })
                })
                resolve(match)
                return
            }
        })()
        
    })
}

function insurerParser(message, settings, context){
    return new Promise((resolve,reject)=>{
        let insurers = localDB.insurers;
        let text = message.data.toLowerCase();
        if(settings.type === 'getStep'){
            let found = [];
            let exactMatch = [];
            insurers.forEach((insurer)=>{
                let insurerFoundExact = false;
                let insurerFoundSynonim = false
                insurer.synonims.forEach((synonim)=>{
                    if(synonim.toLowerCase() === text && !insurerFoundExact){insurerFoundExact = true; exactMatch.push(insurer)}
                    if(synonim.toLowerCase().indexOf(text) > -1 && !insurerFoundSynonim){insurerFoundSynonim = true; found.push(insurer)}
                })
            })
            let result = {data: '', errors: false, parserInfo: ''}
            if (exactMatch.length === 1){ result.data = exactMatch[0].id; resolve(result); }
            else if (found.length){ result.data = found; resolve(result) }
            else {
                result.errors = true; resolve(result)
            }
            return
        }
        if(settings.type === 'getInsurer'){
            let match = '';
            insurers.forEach((insurer)=>{
                insurers.synonims.forEach((synonim)=>{
                    if(synonim === text){match = insurer.id}
                    if(insurer.id.toLowerCase() === text){match = insurer.id}
                })
            })
            resolve(match)
            return
        }
    })
}

// function loanTypeChecker(text, settings, context){
//     if(settings.beforeParser){
//         let beforeParserResponse = parsers[settings.beforeParser](text, { afterParser : true })
//         if (beforeParserResponse) { return text }
//     }
//     if(context.state['loanType'].value === '0% interest rate loan'){return 'skip'}
//     return 'full'
// }

// function loanDiff(text, settings, context){
//     text = text.toLowerCase();
//     if(text === 'yes'){return 'full'}
//     if(text === 'no'){return 'skip'}
//     return ''
// }

// function realValueAnswer(text, settings, context){
//     if (text === 'no'){ 
//         let loansNumber = context.state['loansNumber'].value
//         return loansNumber != 1 ? 'multy' : 'single'
//     }
//     if( text !== ''){ return 'go' }
//     else { return '' }
// }

// function updateFailReason(text, settings, context){
//     switch(settings.step){
//         case '2':
//         text = 'borrowerTooYoung'
//         break;
//         case '5':
//         text = 'Co-borrowerTooYoung'
//     }
//     return text
// }

// function loanNumberChecker(text, settings, context){
//     let loansNumber = context.state['loansNumber'].value
//     let currentLoan = context.state['currentLoan'].value
//     return loansNumber === currentLoan ? 'pass' : 'restart'
// }

// function loanNumberCheckerAmmount(text, settings, context){
//     if(settings.afterParser){
//         settings.afterParser.forEach((value)=>{ if(value === text) { return text } })
//     }
//     let loansNumber = context.state['loansNumber'].value
//     return loansNumber != 1 ? 'multy' : 'single'
// }

// function coborrowerChecker(text, settings, context){
//     let coborrower = context.state['morgageCoBorrower'].value;
//     return coborrower === 'with a co-borrower' ? 'full' : 'skip'
// }

function insurancePremiumChecker(text, settings, context){
    let insurancePremiumAnswer
    if(settings.type === 'text'){
        insurancePremiumAnswer = text.toLowerCase()
        return insurancePremiumAnswer === 'no' ? 'noInfo' : 'info'
    }
    if(settings.type === 'context'){
        context.state.monthlyInsurancePremiumFixed = context.state.monthlyInsurancePremiumFixed ? context.state.monthlyInsurancePremiumFixed : {value: 'no', custom: {}, type: 'boolean'}
        let known = context.state.monthlyInsurancePremiumFixed.value
        return known === 'no' ? 'noInfo' : 'info'
    } 
    return '';
}

// function userKnowsAboutInsurance(text, settings, context){
//     text = text.toLowerCase(); 
//     if(settings.type === 'text'){
//         if(text === 'the amount you pay every month'){return 'amount'}
//         if(text === 'the insurance rate'){return 'insuranceRate'}
//     }
//     if(settings.type === 'context'){
//         context.state.whatUserKnowsAboutInsurance = context.state.whatUserKnowsAboutInsurance ? context.state.whatUserKnowsAboutInsurance : {}
//         let known = context.state.whatUserKnowsAboutInsurance.value
//         if(known === 'the amount you pay every month'){return 'amount'}
//         if(known === 'the insurance rate'){return 'insuranceRate'}
//     }
//     return ''
// }

// function signatureDateChecker(text, settings, context){
//     let signatureDate = context.state['loanContractDate'].value
//         signatureDate = moment(signatureDate);
//         return signatureDate.isBefore(moment('01.01.2015', 'DD.MM.YYYY')) ? 'before' : 'after'
// }



module.exports = parsers