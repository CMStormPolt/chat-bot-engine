let BlueBird  = require("bluebird");
let request = require('request');
let co = BlueBird.coroutine
let numeral = require('numeral');

let { insurancePremiumChecker } = require('./parsers')
const localDB = require('./localDB')
const { getNestedCore } = require('./ObjectHelper')
var setNested = require('set-value');

let languages = {
    'en_US': require('./english'),
    'fr_FR': require('./french')
}



function getInfo(context){
    let infos = [];
    for(let prop in context.state){
        if(context.state[prop].custom.forInfo){
            let item = context.state[prop]
            let text = `${item.custom.prettyName}: ${item.value}`;
            infos.push(text)
        }
    }
    if(infos.length){
        infos = infos.join(' ');
        return infos
    } else {
        return 'No info for you yet'
    }
    
}

function getRandomText(array){
    let len = array.length;
    let randomNumber = Math.floor(Math.random() * len);
    return array[randomNumber]
}

function getBankButtons(context){
    let text = context.state['loanBank'].value.toLowerCase();
    let banks = localDB.banks;
    let buttons = [];
    banks.forEach((bank)=>{
        let bankPushed = 0;
        bank.synonims.forEach((synonim)=>{
            let button =  {
                    type: 'text',
                    title: bank.name,
                    payload: bank.id
                }
            if(synonim.indexOf(text.toLowerCase()) > -1 && bankPushed === 0){buttons.push(button), bankPushed += 1}
        })
    })
        return buttons.slice(0, 5)
}

function askIfYearsOrMonths(context, params, text, extraInfo){
    if(extraInfo['valueType']){
        let language = context.language
        let value = extraInfo['valueType']
        let translations = languages[context.language]['revertValues']
        if(value === 'probably-years') { text = text.replace('$years/months$', translations['years']) }
        else { text = text.replace('$years/months$', translations['months']) }
    }
    return text
}

function getaskIfYearsOrMonthsButtons(context, extraInfo, buttons = []){
    if(extraInfo['valueParser']){
        let duration = context.state['loanDuration'].value
        let type = extraInfo['valueParser']
        let values = languages[context.language]['revertValues']
        let yesButton = {
            type: 'text',
            title: values['yes'],
            payload: type === 'probably-years' ? duration : + duration / 12
        }
        let noButton = {
            type: 'text',
            title: values['no'],
            payload: type === 'probably-years' ? duration / 12: duration  
        }
       buttons.push(yesButton, noButton)
    }
    return buttons;
}

function getAmmountButtons(context){
    let ammount = context.state.ammountBorrowed.value
    let ValueButton = {
        type: 'text',
        title: ammount,
        payload: ammount
    }
    let declineButton = {
        type: 'text',
        title: 'No',
        payload: 'no'
    }
    return [ValueButton, declineButton]
}

function updateCurrentLoan(context, state, params){
    if(context.state.currentLoan && context.state.currentLoan.value){
        let value = +context.state.currentLoan.value + 1
        if( +context.state.loansNumber.value <= +context.state.currentLoan.value){
            value = 1 
            state['lastUpdatedLoanNumber'] = {
                value: context.state.currentLoan.value,
                type: 'number',
                custom: {}
            }
        }
        state['currentLoan'] = {
            value: value.toString(),
            type: 'number',
            custom: {}
        }
        if(params.restart){
            state['currentLoan'] = null
        }
    } else {
        state['currentLoan'] = {
            value: '1',
            type: 'number',
            custom: {}
        }
        state['lastUpdatedLoanNumber'] = {
            value: 1,
            type: 'number',
            custom: {}
        }
    }
    return state
}

// "loans.{currentLoan}.data.{type}.value" => ["currentLoan", "type"]
function extractPathVarNames(strPath){
    const paramExtractRegec = /{{([^}]+)}}/g; // {myVar}
    let match = paramExtractRegec.exec(strPath);
    const varNames = [];
    while (match != null) {
        varNames.push(match[1]);
        match = paramExtractRegec.exec(strPath);
    }
    return varNames;
}

// "loans.{currentLoan}.data.{type}.value" => {currentLoan: 14, type: "standart"}
function extractVarsFromContext(strPath, context){
    const varNames = extractPathVarNames(strPath);
    const contextVars = {};
    varNames.forEach((el) => {
        contextVars[el] = getNestedCore(context.state, el)
    })
    return contextVars;
}

// "loans.{currentLoan}.data.{type}.value" => "loans.14.data.standart.value"
function updatePathFromContext(strPath, context, state){
    const contextVars = extractVarsFromContext(strPath, context);
    for(let key in contextVars){
        strPath = strPath.replace(`{{${key}}}`, contextVars[key]);
    }
    return strPath;
}

// const merge = require('deepmerge')
// let { variantOne } = require('./defaultStates')
// let statepsevdo = {}
// let b = setNested(statepsevdo, updatePathFromContext('loans.{{currentLoan.value}}.loanType', variantOne), 'mytype')
//     console.log(statepsevdo)
//     console.log(b)
//     console.log(merge(statepsevdo,variantOne.state))

function updateLoan(context, state, params){
  let current;
  if(state.currentLoan){current = state.currentLoan.value}
  if(context.state.currentLoan){current = context.state.currentLoan.value}
  if(params.updatePrev){ current = context.state['lastUpdatedLoanNumber'] && context.state['lastUpdatedLoanNumber'].value}
  state.loans = context.state.loans || {custom: {}}
  if(params.changers){
    params.changers.forEach((param)=>{
        state.loans[current] = state.loans[current] || {};
        state.loans[current][param] = state[param].value || context.state[param].value
      })
  }
  return state
}



function translate(step, message, context, extraInfo) {
    
    let language = context.language;
    if (message.text) {
        message.text = languages[language][step].response[message.text]
    }
    if (message.buttons) {
        if(typeof message.buttons === 'string' && !message.notFromTranslateButtonHelpers){
            message.buttons = helpers[message.buttons](context, extraInfo)
        } else if(message.buttonsReady || message.notFromTranslateButtonHelpers){
            // do nothing
        }
        else {  
            message.buttons.forEach((button) => {
                button.title = languages[language][step].buttons[button.payload] || button.title
            })
        }
    }

    return message
}

function getOneOf(context, step) { 
    let tree = context.contextTree.current
    let language = context.language;
    let oneOfs = languages[language][step].oneOf
  return oneOfs
}

function getSwitchers(message, context, step){
    return new Promise((resolve, reject) => {
        let tree = context.contextTree.current
        let language = context.language;
        let switchers = languages[language][step].switch
        let switcher;
        let values = [];
        for (let key in switchers) {
                values.push(switchers[key]);
        }
        values.filter((swtchr, index) => {
            if (swtchr.toLowerCase() == message.toLowerCase()) {
                switcher = index.toString()
            }
        })
        resolve(switcher ? switcher : '')
    })
}

function getCurrentLoan(context, params, text){
    params.changers.forEach((param)=>{
        let contextParam = context.state[param.contextName].value;
        let language = languages[context.language].helpers
        switch (contextParam){
            case '1': 
            text = text.replace(`$${param.paramName}$`, language['first'] )
            break;
            case '2':
            text = text.replace(`$${param.paramName}$`, language['second'] )
            break;
            case '3':
            text = text.replace(`$${param.paramName}$`, language['third'] )
            break;
                default : 
                text = language['default']
        }
    })
    return text
}

function isEmpty(obj){
    return Object.keys(obj).length === 0
}

function updateFailReason(context, state, params, extraInfo){
    let reason
    if(params.fromExtraInfo && extraInfo[params.fromExtraInfo]){
        reason = extraInfo[params.fromExtraInfo] 
        state['updateFailReason'] = { value: reason, type: 'exception', custom: {}}
    }
    return state
}


// yeah thats the actual name...
function removeThumbsUp(context,params,text){
    let contextParam = context.state[params.contextName] && context.state[params.contextName].value;
    let language = languages[context.language].helpers
    if(contextParam != '1'){text = ''};
    return text
}

function removeForNextLoans(context,params,text){
    let contextParam = context.state[params.contextName] && context.state[params.contextName].value;
    let language = languages[context.language].helpers
    if(contextParam != '1'){text = ''};
    return text
}

function getPath(context, params, text){
    let path = context.userPath.join('')
    return path
}

function updateSupportNeeded(context, state, params, extraInfo){
    let value 
    if(params.fromExtraInfo && extraInfo[params.fromExtraInfo]){
        if(context.state['messagesAfterRealPersonDemandCounter']){
            value = context.state['messagesAfterRealPersonDemandCounter'].value
        }   
        value = value === 1 ? 0 : 1
        state['messagesAfterRealPersonDemandCounter'] = {
                value, type: 'counter', custom: {}
        }
    }
    return state
}

function mapLoans(context){

    function mapLoanType(type){
        switch(type){
            case 'classic loan':
            type = 'classic'
            break;
            case '0% interest rate loan':
            type = 'ptz'
            break;
            case 'loan based on real-estate savings':
            type = 'pel'
        }
        return type
    }

    let state = context.state;
    let loans = []
    if(state.loansNumber.value === '1'){
        loans[0] = {
            type : mapLoanType(state.loanType.value),
            initialAmount: state.ammountBorrowed.value,
            // repaymentDeferred: state.loanDiffered === 'yes' ? true : false
            repaymentDeferred: false
        }
        if(state.loanDuration.value.indexOf('months') > -1){ loans[0].durationMonths = state.loanDuration.value.replace('months', '') }
        else { loans[0].durationYears =  state.loanDuration.value }
        if(state.insuranceTAEA){ loans[0]['taeaBorrower'] = state.insuranceTAEA.value }
        if(state.coBorrowerInsuranceTAEA){ loans[0]['taeaCoBorrower'] = state.coBorrowerInsuranceTAEA.value}
        if(loans[0].type !== 'ptz'){
            loans[0].interestRate = state.loanInterestRate ? state.loanInterestRate.value.replace('%','') : '0';
            // loans[0].interestRateFixed = state.fixedRate ? (state.fixedRate.value === 'yes' ? true : false) : true;
            loans[0].interestRateFixed = true;
        } else {
            loans[0].interestRate = '0'
            loans[0].interestRateFixed = true
        }
        if(loans[0].repaymentDeferred){loans[0].firstInstallmentDate = state.loanFirstInstallment.value}
    } else {
        for(let i = 0; i < state.loansNumber.value; i += 1){
            let current = state.loans[i + 1]
            loans[i] = {
                type : mapLoanType(current.loanType),
                initialAmount: current.ammountBorrowed,
                repaymentDeferred: current.loanDiffered === 'yes' ? true : false
            }
                loans[i].interestRate = current.loanInterestRate ? current.loanInterestRate.replace('%','') : '0';
                loans[i].interestRateFixed = current.fixedRate ? (current.fixedRate === 'yes' ? true : false) : true;
            if(loans[i].repaymentDeferred){ loans[i].firstInstallmentDate = current.loanFirstInstallment }
            if(current.insuranceTAEA){ loans[i].taeaBorrower = current.insuranceTAEA }
            if(current.coBorrowerInsuranceTAEA){ loans[i].taeaCoBorrower = current.coBorrowerInsuranceTAEA }
            if(current.loanDuration.indexOf('months') > -1){ loans[i].durationMonths = current.loanDuration.replace('months', '') }
            else { loans[i].durationYears =  current.loanDuration }
        }
    }
    return loans
}

function getFinalAnswer(context,params,text){
    return new Promise((resolve,reject)=>{
        // let montlyPremimumFixed = (insurancePremiumChecker(text,{type: 'context'}, context) !== 'noInfo');
        // if(montlyPremimumFixed){
                                                                           
            let mappedData = mapData(context);
            console.log(mappedData)
            let messageData = {
                id: 1,
                jsonrpc: '2.0',
                method: 'prospection.teaser.calculate',
                params: mappedData
            }
            request({
                uri: process.env.CALCULATION_API_ADDRESS,
                qs: {},
                method: 'POST',
                json: messageData
              }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(handleMainAppResponse(body, context, params))
                } else {
                    resolve('Sorry, there seems to be a problem with the server, please try again later :)')
                }
           }); 
        // } 
        // else {
        //      resolve('Sorry, we are unfortunately not able to cover variable insurance premiums for the moment.')
        // }
    })
}

function getFailReasonText(reason, context){
    let language = context.language;
    let text = languages[language]['failReasons'][reason]
    return text
}


function handleMainAppResponse(res, context, params = {}){
      console.log(res)
      let response
      let language = context.language;
   if(res.result){
        if(res.result.result === 'go'){
              let result = res.result
              let { coSavings } = result
              response = coSavings ? languages[language]['go']['with-coborrower'] : languages[language]['go']['alone']
              languages[language]['go']['changers'].forEach((changer)=>{
                  if(result[changer]) {
                      console.log(Math.floor(result[changer]))
                      result[changer] = numeral(Math.floor(result[changer])).format('0,0').replace(',', ' ')
                  }
                    response = response.replace(`$${changer}$`, result[changer])
                })
                context.state['calculationResult'] = { value: 'go', type: 'result', custom: {} }
        }
        if(res.result.result === 'bravo'){
              let reason = res.result.reasonKey
              response = (languages[language]['bravos'][reason])
              context.state['calculationResult'] = { value: 'bravo', type: 'result', custom: {} }
            }
        params.fromContext.forEach((param)=>{
            if(context.state[param]) { response = response.replace(`$${param}$`, context.state[param].value) }
            else { response = response.replace(`$${param}$`, '') }
        })
            return response
      }
    else if(res.error){
      if(res.error.message === 'currentlyBenefitFromGuaranteesAndTariff'){return 'You currently benefit from your tariff and we cannot optimize it, hope to see you soon :)'}
      else if(res.error.message === 'loanAmountTooHigh'){return 'The ammount you have borrowed exceeds our limit :)'}
      else if(res.error.message === 'ageTooHigh'){return 'You benefit from guaranties and a tariff adapted to your situation. We recommend you keep your current insurance'} 
   }
   else { return 'thanks for the info' }
}



function addExtarnal(mappedData, email){
        let selfAddData = {
            email: email || mappedData['email'], // || `random${Math.random()}@mail.bg`,
            firstName: mappedData['firstName'],
            lastName: mappedData['lastName'],
            birthDate: mappedData['birthDate'],
            insuranceRate: mappedData['insuranceRate'], 
            insuranceCoverage: mappedData['insuranceCoverage'],
            projectType: mappedData['projectTypeId'],
            bankId: mappedData['bankId'],
            loanContractDate: mappedData['loanContractDate'],
            // insuranceProvidedByBank: mappedData['insuranceProvidedByBank'],
            insurancePremiumFixed: mappedData['insurancePremiumFixed'],
            loans: mappedData['loans'],
            firstNameCoBorrower: mappedData['firstNameCoBorrower'] || '',
            birthDateCoBorrower: mappedData['birthDateCoBorrower'],
            hasCoBorrower: mappedData['hasCoBorrower'],
            insurancePremiumCoBorrower: mappedData['insurancePremiumCoBorrower'] || null,
            insuranceRateCoBorrower:mappedData['insuranceRateCoBorrower'] || '',
            insuranceCoverageCoBorrower: mappedData['insuranceCoverageCoBorrower'] || 100,
            step: 'step14',
            getCalculations: false,
            isExternal: 1,
            eachCoBorrowerHasOwnInsurance: 1,
            chosenPath:2
        }
        
        return selfAddData
}
    




function mapData(context) {
    let data = {};
    let state = context.state
    // let loanInsuranceSameBank = state['loanInsuranceSameBank'].value === 'yes' ? true : false
    let hasCoBorrower = state['morgageCoBorrower'].value === 'alone' ? false : true


    data.email = state.email ? state.email.value : '';
    data.firstName = state['firstName'].value;
    data.lastName = state['lastName'].value
    data.birthDate = state['birthDate'].value;
    data.projectTypeId = state['loanFinansedWith'].value;
    data.bankId = state['loanBank'].value;
    data.loans = mapLoans(context); 
    data.loanContractDate = state['loanContractDate'].value;
    // data.insurancePremiumFixed = state['monthlyInsurancePremiumFixed'].value === 'yes' ? true : false
    data.insurancePremiumFixed = true 
    // data.insuranceProvidedByBank = loanInsuranceSameBank
    data.insuranceCoverage = +state.insuranceCoverage.value > 100 ? 100 : state.insuranceCoverage.value
    if (hasCoBorrower) {
    // let eachCoBorrowerHasOwnInsurance = state['coBorrowerCommonPremium'].value === 'yes' ? false : true
        data.hasCoBorrower = hasCoBorrower;
        data.firstNameCoBorrower = state['coBorrowerName'].value;
        // data.eachCoBorrowerHasOwnInsurance = eachCoBorrowerHasOwnInsurance;
        data.insuranceCoverageCoBorrower = state['coBorrowerInsuranceCoverage'] ?  + state['coBorrowerInsuranceCoverage'].value : 100;
        data.birthDateCoBorrower = state['coBorrowerBirthDate'].value;
        if(state['coBorrowerPremiumAmmount']){data.insurancePremiumCoBorrower = state['coBorrowerPremiumAmmount'].value};
        if(state['coBorrowerInsuranceRate']){data.insuranceRateCoBorrower = state['coBorrowerInsuranceRate'].value};
    }
    if(state['userPremiumAmmount']){ data.insurancePremium = state['userPremiumAmmount'].value; }
    if(state['insuranceRate']){ data.insuranceRate = state['insuranceRate'].value }
    data.isExternal = 1;
    // data.path = 1
    return data;
}

function getFinalFailAnswer(context,params,text){
    if (context.state.updateFailReason){
        let reason = context.state.updateFailReason.value
        return getFailReasonText(reason, context)
    }     
}

function updateForSupport(context, state, params, extraInfo){
let reason
    if(params.fromExtraInfo && extraInfo[params.fromExtraInfo]){
        reason = extraInfo[params.fromExtraInfo] 
        state['realPersonDemand'] = { value: reason, type: 'special case', custom: {}}
    }
    return state
}

function askForContinue(context,params,text){
     if(context.state['calculationResult'] && context.state['calculationResult'].value === 'bravo'){ text = '' }
     return text
}

function addHashToContext(context, state, params, extraInfo){
    if(extraInfo['hashLink']){
        state['hashLink'] = {
            value: extraInfo['hashLink'],
            type: 'link',
            custom: {}
        }
    }
    return state
}

function getHashLinkButton(context, extraInfo){
    let button = []
    if(context.state['hashLink']){
        button.push({ 
            url: context.state['hashLink'].value,
            title: languages[context.language]['hashLinks']['success']
        })
    }
    return button
}

function getHashLink(message, context, extraInfo){
    return new Promise((resolve,reject)=>{
                                                                           
            let mappedData = mapData(context);
                mappedData = addExtarnal(mappedData, message)
            let messageData = {
                id: 1,
                jsonrpc: '2.0',
                method: 'prospection.customer.selfAdd',
                params: mappedData
            }
            request({
                uri: process.env.SELF_REGISTER_API_ADDRESS,
                qs: {},
                method: 'POST',
                json: messageData
              }, function (error, response, body) {
                if (!error && response.statusCode == 200 && !body.error) {
                    let { actorId, success } = body.result
                    if(success){
                        request({
                            uri: process.env.HASHLINK_API_CALL_ADDRESS,
                            qs: {},
                            method: 'POST',
                            json: {
                                id: 1,
                                jsonrpc: '2.0',
                                method: 'prospection.contractHash.fetch.bot',
                                params: {
                                    actorId
                                }
                            }
                          }, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                let buttons = []
                                buttons.push({ 
                                    url: body.result.url,
                                    title: languages[context.language]['hashLinks']['success']
                                })
                                extraInfo['hashLink'] = body.result.url
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                       })
                    }
                } else {
                    resolve(false)
                }
           }); 
    })
}

function getBanksAndInsurersFromPospection(){
    return new Promise((resolve,reject)=>{
        request({
            uri: 'http://localhost:9101/rpc/prospection.itemName.fetch',
            qs: {},
            method: 'POST',
            json: {
                id: 1,
                jsonrpc: '2.0',
                method: 'prospection.itemName.fetch',
                params: {
                    alias: ['bank', 'insurer']
                }
            }
          }, (err, response, body)=>{
              if(body){
                localDB.banks = localDB.mergeBanks(localDB.transformToLocalBanksFormat(body.result && body.result.bank), 'bankSynonims') 
                localDB.insurers = localDB.mergeBanks(localDB.transformToLocalBanksFormat(body.result && body.result.insurer), 'insurersSynonims') 
              } else {
                localDB.banks = []
              }
              resolve(localDB)
        })
    })
    
}




let helpers = {
    getInfo,
    getRandomText,
    getBankButtons,
    getCurrentLoan,
    updateCurrentLoan,
    updateLoan,
    translate,
	getOneOf,
    getSwitchers,
    isEmpty,
    mapData,
    getFinalAnswer,
    removeThumbsUp,
    getAmmountButtons,
    getaskIfYearsOrMonthsButtons,
    askIfYearsOrMonths,
    updatePathFromContext,
    updateFailReason,
    getFinalFailAnswer,
    updateForSupport,
    updateSupportNeeded,
    removeForNextLoans,
    getPath,
    askForContinue,
    getHashLink,
    getBanksAndInsurersFromPospection,
    addHashToContext,
    getHashLinkButton
}

module.exports = helpers















function testQueryCalucate(cont){
              let mappedData = mapData(cont);
              console.log(mappedData)
              let messageData = {
                id: 1,
                jsonrpc: '2.0',
                method: 'prospection.teaser.calculate',
                params: mappedData
            }
        request({
                uri: 'http://localhost:9101/rpc/prospection.teaser.calculate',
                qs: {},
                method: 'POST',
                json: messageData
              }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  var recipientId = body.recipient_id;
                  var messageId = body.message_id;
                  console.log(handleMainAppResponse(body,cont,{
                    fromContext: ['firstName', 'coBorrowerName']
                }))
                    console.log('body isss')
                    console.log(body)
                } else {
                    console.log('in else')
                    console.log(error) 
                    console.log(response)
                    console.log(body)
                }
           }); 
}


// uncomment to be able to test
function testQuerySelfAdd(cont){
    let mappedData = mapData(cont);
    mappedData = addExtarnal(mappedData)
    console.log(mappedData)
    let messageData = {
      id: 1,
      jsonrpc: '2.0',
      method: 'prospection.customer.selfAdd',
      params: mappedData
  }
request({
      uri: 'http://localhost:9101/rpc/prospection.customer.selfAdd',
      qs: {},
      method: 'POST',
      json: messageData
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let { actorId, success } = body.result
            console.log(body, 'selfadd body')
            if(success){
                request({
                    uri: process.env.HASHLINK_API_CALL_ADDRESS,
                    qs: {},
                    method: 'POST',
                    json: {
                        id: 1,
                        jsonrpc: '2.0',
                        method: 'prospection.contractHash.fetch.bot',
                        params: {
                            actorId
                        }
                    }
                  }, function (error, response, body) {
                    console.log(body, 'contract hash body')
                    if (!error && response.statusCode == 200) {
                        return body
                    } else {
                        return 'Sorry, there seems to be a problem with the server, please try again later :)'
                    }
               })
            }
        } else {
            console.log(error, 'the error==============')
            console.log(body, 'the body==========')
            return 'Sorry, there seems to be a problem with the server, please try again later :)'
        }
   }); 
}

// function testReadyData(data){
//     console.log(data)
//     let messageData = {
//       id: 1,
//       jsonrpc: '2.0',
//       method: 'prospection.teaser.calculate',
//       params: data
//   }
// request({
//       uri: 'http://localhost:9101/rpc/prospection.teaser.calculate',
//       qs: {},
//       method: 'POST',
//       json: messageData
//     }, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         var recipientId = body.recipient_id;
//         var messageId = body.message_id;
//         console.log(body)
//     //     console.log(handleMainAppResponse(body,cont,{
//     //       fromContext: ['firstName', 'coBorrowerName']
//     //   }))
//           console.log('body isss')
//           console.log(body)
//       } else {
//           console.log('in else')
//           console.log(error) 
//           console.log(response)
//           console.log(body)
//       }
//  }); 
// }

// // uncomment to test calculation

// const environment = require('dotenv').config()
// let { defaultStateCoBorrower, variantOne, variantTwo, variantThree, readyData1 } = require('./defaultStates')
// testQueryCalucate( defaultStateCoBorrower  );






// uncomment to test selfadd

// const environment = require('dotenv').config()
// let { defaultStateCoBorrower, variantOne } = require('./defaultStates')
// testQuerySelfAdd(variantOne)


// const environment = require('dotenv').config()
// let { defaultStateCoBorrower, variantOne, variantTwo, variantThree, readyData1 } = require('./defaultStates')
// testReadyData(readyData1)
