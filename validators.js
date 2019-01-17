const moment = require('moment')
let languages = {
    'en_US': require('./english'),
    'fr_FR': require('./french')
}
const { getHashLink } = require('./helpers')

function validateYears(date,minYears){
        let birthday = moment(date,'DD.MM.YYYY')  // birthday is a date
        let ageDifMs = Date.now() - birthday.valueOf();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        let years =  Math.abs(ageDate.getUTCFullYear() - 1970);
        let valid = years >= minYears
        return valid
}

function validateDateRange(message, settings = {}, context, extraInfo, parsedMessage){
        let date = moment(new Date(parsedMessage))
        let minDate = settings.minDate ? moment(settings.minDate.date, settings.minDate.format) : moment('01.01.1900', 'DD.MM.YYYY', true);
        let maxDate = settings.maxDate ? moment(settings.maxDate.date, settings.minDate.format) : moment();
        let valid = date.isBetween(minDate, maxDate, null, []);
        return valid ? true : false;
}

function validateBankExactMatch(message, settings = {}, context, extraInfo, parsedMessage){
    if(Array.isArray(parsedMessage)){
        extraInfo.buttons = []
        parsedMessage.forEach((bank)=>{
                let button =  {
                        type: 'text',
                        title: bank.name,
                        payload: bank.id
                    }
              extraInfo.buttons.push(button)
        })
        extraInfo.validationFallback = true
        extraInfo.buttons = extraInfo.buttons.slice(0, 5)
        return false
    }
    return parsedMessage
}

function validateInsurerExactMatch(message, settings = {}, context, extraInfo, parsedMessage){
    if(Array.isArray(parsedMessage)){
        extraInfo.buttons = []
        parsedMessage.forEach((insurer)=>{
                let button =  {
                        type: 'text',
                        title: insurer.name,
                        payload: insurer.id
                    }
              extraInfo.buttons.push(button)
        })
        extraInfo.validationFallback = true
        extraInfo.buttons = extraInfo.buttons.slice(0, 5)
        return false
    }
    return parsedMessage
}

function validateValueRange(message, settings = {}, context, extraInfo, parsedMessage){
    let validated = true;
    if(settings.min || settings.min === 0){ validated = +parsedMessage >= settings.min }
    if(settings.max && validated){ validated = +parsedMessage <= settings.max}
    return validated
}

function validateValueRangeYearsOrMonths(message, settings = {}, context, extraInfo, parsedMessage){
    let validated = true;
    let type = extraInfo.valueType
    if(type === 'months'){
        if(settings[type].min || settings[type].min === 0){ validated = +parsedMessage >= settings[type].min }
        if(settings[type].max){ validated = +parsedMessage <= settings[type].max}
        extraInfo['minValue'] = settings[type].min.toString()
        extraInfo['maxValue'] = settings[type].max.toString()
        extraInfo['durationType'] = languages[context.language]['revertValues'][type]
    } else if( type === 'years'){
        if(settings[type].min || settings[type].min === 0){ validated = +parsedMessage >= settings[type].min }
        if(settings[type].max){ validated = +parsedMessage <= settings[type].max}
        extraInfo['minValue'] = settings[type].min.toString()
        extraInfo['maxValue'] = settings[type].max.toString(),
        extraInfo['durationType'] = languages[context.language]['revertValues'][type]
    }
    return validated ? extraInfo.loanDuration : false
}


function validateIfYearsOrMonths(message, settings = {}, context, extraInfo, parsedMessage){
    let { values } = languages[context.language]['dateValues']
    let validated = false;
    let type;
    values.forEach((value)=>{
        if(message.toLowerCase().indexOf(value) > -1) { type = value; validated = true }
    })
    values = languages[context.language]['values']
    if(validated) {
        extraInfo.valueType = values[type]
        if(values[type] === 'months'){
            extraInfo.loanDuration = `${parsedMessage}months`
            return `${parsedMessage}months` 
        } 
        extraInfo.loanDuration = parsedMessage
        return parsedMessage  
    }
    values = languages[context.language]['revertValues']
    type = + parsedMessage <= 30 ? 'probably-years' : 'probably-months'
    
    let yesButton = {
        type: 'text',
        title: values['yes'],
        payload: type === 'probably-years' ? `${parsedMessage} ${values['years']}` :  `${parsedMessage} ${values['months']}`
    }
    let noButton = {
        type: 'text',
        title: values['no'],
        payload: type === 'probably-years' ?  `${parsedMessage} ${values['months']}` : `${parsedMessage} ${values['years']}` 
    }
    extraInfo.buttons = [ yesButton, noButton ]
    extraInfo.loanDuration = parsedMessage
    extraInfo.valueType = type
    return false
}

function validateDateIsAfterLoanContract(message, settings = {}, context, extraInfo, parsedMessage){
    let signatureDate = moment(context.state['loanContractDate'].value)
    let firstInstallment = moment(new Date(parsedMessage))
    return signatureDate.isBefore(firstInstallment)
}

function validateEmailNotRegistered(message, settings = {}, context, extraInfo, parsedMessage){
    return getHashLink(message, context, extraInfo)
}

module.exports = {
    validateYears,
    validateDateRange,
    validateBankExactMatch,
    validateValueRange,
    validateIfYearsOrMonths,
    validateDateIsAfterLoanContract,
    validateValueRangeYearsOrMonths,
    validateEmailNotRegistered,
    validateInsurerExactMatch
}
