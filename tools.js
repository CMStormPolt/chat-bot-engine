function parseScript(script){
    let steps = script.steps
    let finalResult = []
    for(let key in steps){
        let result
        let currentStep = steps[key]
        console.log('=========================================')
        console.log(currentStep)
        if(currentStep.nextStep){
            // console.log('nextStep')
            result = `\"${key}\" -> \"${currentStep.nextStep}\"; \n`
            finalResult.push(result)
        }
        else if(currentStep.handleAnswer.switch){
            // console.log('switch')
            result = []
            let switcher = 0
            while(currentStep.handleAnswer.switch[switcher]){
                result.push(`\"${key}\" -> \"${currentStep.handleAnswer.switch[switcher].nextStep}\"; \n`)
                switcher += 1
            }
            result = result.join(' ')
            finalResult.push(result)
        }
    }
    finalResult = finalResult.join(' ')
    return finalResult
}

module.exports = {
    parseScript
}