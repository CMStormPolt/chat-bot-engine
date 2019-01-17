let BlueBird  = require("bluebird");
let co = BlueBird.coroutine

const defaultPreHookResult = {
    continueWithProccess: true,
    preHookContextUpdate: {}
}

function checkForSupport(context, preHookResult = defaultPreHookResult){
    return co(function*(){
        if(context.state.realPersonDemand) {
            if(context.state.messagesAfterRealPersonDemandCounter && context.state.messagesAfterRealPersonDemandCounter['value']){
                preHookResult.preHookContextUpdate['messagesAfterRealPersonDemandCounter'] = {
                    value: 0,
                    type: 'condition',
                    custom: {}
                }
                preHookResult.continueWithProccess = false
                return preHookResult
            }
            else if(context.state.messagesAfterRealPersonDemandCounter && !context.state.messagesAfterRealPersonDemandCounter['value']){
                preHookResult.preHookContextUpdate['messagesAfterRealPersonDemandCounter'] = {
                    value: 1,
                    type: 'condition',
                    custom: {}
                }
                preHookResult.continueWithProccess = true
                return preHookResult
            } 
        }
        return preHookResult
    })()
}

module.exports = {
    checkForSupport
}