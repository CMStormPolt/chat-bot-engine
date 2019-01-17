const moment = require('moment')


function checkUserYears(message, settings, context, extraInfo, parsedMessage){
    if( settings.from === 'text'){
        let birthday = moment(new Date(parsedMessage))
        let valid = Math.abs(birthday.diff(moment(), 'years')) >= settings.minYears
        message = valid ? 'go' : 'finish';
        if(!valid && settings.failReason){ 
            extraInfo['failReason'] = settings.failReason
        }
    }
    if( settings.from === 'context'){
        let birthday = moment(new Date(context.state[settings.contextName].value))
        let valid = Math.abs(birthday.diff(moment(), 'years')) >= settings.minYears
        message = valid ? 'go' : 'finish';
        if(!valid && settings.failReason){ 
            extraInfo['failReason'] = settings.failReason
        }
    }
    return message
}

function loanTypeChecker(message, settings, context, extraInfo, parsedMessage){
    if(context.state['loanType'].value === '0% interest rate loan'){return 'skip'}
    return 'full'
}

function loanDifferedAndLoanNumberChecker(message, settings, context, extraInfo, parsedMessage){
    if(message === 'yes'){return 'yes'}
    else { 
        let loansNumber = context.state['loansNumber'].value
        let currentLoan = context.state['currentLoan'].value
        if(settings.takePrevCurrent){ currentLoan = context.state['lastUpdatedLoanNumber'].value }
        if(loansNumber === currentLoan){
            let signatureDate = context.state['loanContractDate'].value
            signatureDate = moment(signatureDate);
            let before = signatureDate.isBefore(moment('01.01.2015', 'DD.MM.YYYY')) 
            if(before){ return 'pass' } 
            else {  
                let loansNumber = context.state['loansNumber'].value
                return loansNumber != 1 ? 'multy' : 'single'
            }
        } else {
            return 'restart'
        }
    }
}

function insurancePremiumChecker(message, settings, context, extraInfo, parsedMessage){
    return message.toLowerCase() === 'no' ? 'noInfo' : 'info'
}

function coborrowerAndUserKnowsChecker(message, settings, context, extraInfo, parsedMessage){
    let coborrower = context.state['morgageCoBorrower'] && context.state['morgageCoBorrower'].value;
    if(coborrower === 'with a co-borrower'){
        let known = context.state.whatUserKnowsAboutInsurance.value
        if(known === 'the amount you pay every month'){return 'amount'}
        if(known === 'the insurance rate'){return 'insuranceRate'}
    }else {
        return 'skip'
    } 
}

function coborrowerChecker(message, settings, context, extraInfo, parsedMessage){
    let coborrower = context.state['morgageCoBorrower'] && context.state['morgageCoBorrower'].value;
    return coborrower === 'with a co-borrower' ? 'full' : 'skip'
}

function loanNumberChecker(message, settings, context, extraInfo, parsedMessage){
    let loansNumber = context.state['loansNumber'].value
    let currentLoan = context.state['currentLoan'].value
    return loansNumber === currentLoan ? 'pass' : 'restart'
}

function loanNumberAndCoborrowerChecker(message, settings, context, extraInfo, parsedMessage){
    let loansNumber = context.state['loansNumber'].value
    let currentLoan = context.state['currentLoan'].value
    if(loansNumber === currentLoan){
        let coborrower = context.state['morgageCoBorrower'] && context.state['morgageCoBorrower'].value;
        return coborrower === 'with a co-borrower' ? 'full' : 'skip'
    }
    else { return 'restart' }
}

function checkIfSupportNeeded(message, settings, context, extraInfo, parsedMessage){
        if(message === 'get a quote'){ return message }
        else if(message === 'call for support'){ extraInfo.calledForSupport = true; return message }
}

function helperSwitcher(message, settings, context, extraInfo, parsedMessage){
    if(message === 'yes' && context.contextTree['main'].currentStep === 'initial'){ return 'get a quote' }
        
    return message

}

function checkIfGoAndContinue(message, settings, context, extraInfo, parsedMessage){
    if(message === 'yes' && context.state['calculationResult'] && context.state['calculationResult'].value === 'go'){
        return 'go'
    } else { return 'get a quote' }
}

function whenIsLoanTaken(message, settings, context, extraInfo, parsedMessage){
    let signatureDate = context.state['loanContractDate'].value
        signatureDate = moment(signatureDate);
        let before = signatureDate.isBefore(moment('01.01.2015', 'DD.MM.YYYY')) 
        if(before){ return 'before' }
        else { return 'after'} 
}

function initialHelpSwitcher(message, settings, context, extraInfo, parsedMessage){
    if(message === 'speak with agent'){
        extraInfo.calledForSupport = true 
        return message
    }
    return message
}

module.exports = {
    checkUserYears,
    loanTypeChecker,
    loanDifferedAndLoanNumberChecker,
    insurancePremiumChecker,
    coborrowerAndUserKnowsChecker,
    coborrowerChecker,
    loanNumberChecker,
    loanNumberAndCoborrowerChecker,
    checkIfSupportNeeded,
    helperSwitcher,
    checkIfGoAndContinue,
    initialHelpSwitcher,
    whenIsLoanTaken
}