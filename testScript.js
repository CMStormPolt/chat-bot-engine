let script = {
    hooks: {
        help: {
            step: 'help-1'
        },
        restart: {
            step: '1'
        }
    },
    steps: {
        'help-1': {
            response: [{
                text: [`How can I help you?`,'What do you need help with?', 'Lets see what we can do for you', 'These are the things I can help you with'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Info',
                        payload: 'info'
                    },
                    {
                        type: 'text',
                        title: 'Back to Questions',
                        payload: 'back to questions'
                    }
                ]
            }],
            contextTree: 'help',
            currentStep: 'help-1',
            nextStep: 'help-switch'
        },
        'help-switch': {
            starters: ['info', 'back to questions'],
            switch: {
                'info': {
                    nextStep: 'help-2'
                },
                'back to questions': {
                    contextTree: 'main',
                    freePass: true
                }
            },
            fallBackResponse: [{
                text: ['Sorry I didn\'t get that. Would you like to start over?'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Yes',
                        payload: 'restart'
                    },
                    {
                        type: 'text',
                        title: 'No',
                        payload: 'no'
                    }
                ],
            }]
        },
        'help-2': {
            response: [{
                text: [`Glad to be of Help`],
                type: 'freeText',
                customizeble: true,
                helpers: ['getInfo']
            },
            {
                text: [`Would you like to go back to the questionere?`],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Yes',
                        payload: 'yes'
                    },
                    {
                        type: 'text',
                        title: 'No',
                        payload: 'no'
                    }
                ]
            }
        ],
            nextStep: 'help-2-switch'
            // contextTree: 'main',
            // freePass: true
        },
        'help-2-switch': {
            starters: ['yes', 'no'],
            switch: {
                'yes': {
                    contextTree: 'main',
                    freePass: true
                },
                'no': {
                    nextStep: 'no-recovory'
                }
            },
            fallBackResponse: [{
                text: ['Sorry I didn\'t get that. Would you like to start over?'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Yes',
                        payload: 'restart'
                    },
                    {
                        type: 'text',
                        title: 'No',
                        payload: 'no'
                    }
                ],
            }]
        },
        'fail-switch': {
            starters: ['restart', 'no'],
            switch: {
                'restart': {
                    nextStep: '1'
                },
                'no': {
                    nextStep: 'no-recovory'
                }
            },
            fallBackResponse: [{
                text: ['Sorry I didn\'t get that. Would you like to start over?'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Yes',
                        payload: 'restart'
                    },
                    {
                        type: 'text',
                        title: 'No',
                        payload: 'no'
                    }
                ],
            }]
        },
        'no-recovory': {
            starters: ['no-recovory', 'no'],
            response: [{
                text: ['res-1'],
                type: 'freeText'
            }],
            fallBackResponse: [{
                text: 'Sorry I didn\'t get that. Would you like to start over?',
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Yes',
                        payload: 'restart'
                    },
                    {
                        type: 'text',
                        title: 'No',
                        payload: 'no'
                    }
                ],
            }],
            nextStep: 'no-recovory'
        },
        '0': {
            response: [{
                text: [`Great! Let\'s get started. We need to ask you a few questions to give you an accurate quote. If at any time you need to talk to a customer service representative, please type \"help\". What is your birthday, Radoy?`],
                type: 'attachment',
                attachment_type: 'image',
                attachment_url: 'http://www.followingthenerd.com/site/wp-content/uploads/deadpool-2-boyfriend-pic1.jpg'
            }],
            nextStep: '1'
        },
        '1': {
            starters: ['hello', 'hi', 'ohaio', 'konichua', 'hiii', 'hey', 'здрасти', 'здравей', 'ко стаа', 'ko staa', 'restart'],
            response: [{
                text: ['Hi, $firstName $lastName, this is the Mi/2 bot. We can help you get a quote in a few easy steps or chat to customer service.'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Get a quote',
                        payload: 'get a quote'
                    },
                    {
                        type: 'text',
                        title: 'Customer service',
                        payload: 'customer service'
                    }
                ],
                customizeble: true,
                fromBot: {
                    mappers: ['firstName', 'lastName'],
                    botMethod: 'getUserInfo',
                    botName: 'facebook'
                }
            }],
            currentStep: '1',
            nextStep: '1.5'
        },
        '1.5': {
            starters: ['get a quote', 'customer service'],
            switch: {
                'get a quote': {
                    nextStep: '2'
                },
                'customer service': {
                    nextStep: '2.5'
                }
            },
            fallBackResponse: [{
                text: ['Sorry I didn\'t get that. Would you like to get a quote or chat to customer service.'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Get a quote',
                        payload: 'get a quote'
                    },
                    {
                        type: 'text',
                        title: 'Customer service',
                        payload: 'customer service'
                    }
                ],
            }]
        },
        '2':{
            starters: ['get a quote'],
            response: [{
                text: [`Great! Let\'s get started. We need to ask you a few questions to give you an accurate quote. If at any time you need to talk to a customer service representative, please type \"help\".`],
                type: 'freeText'
            },
            {
                text: [`What is your birthday, $firstName? Please use the following format: DD.MM.YYYY`],
                type: 'freeText',
                customizeble: true,
                fromContext: ['firstName']
            }
        ],
        fallBackResponse: [{
                text: ['Sorry, I didn\' get that. Would you like to get a quote or contact customer service.'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Get a quote',
                        payload: 'get a quote'
                    },
                    {
                        type: 'text',
                        title: 'Customer service',
                        payload: 'customer service'
                    }
                ]
            }],
            currentStep: '2',
            nextStep: '3'
        },
        '2.5':{
            starters: ['customer service'],
            response: [{
                text: [`Okey, one of our agents will contact you`],
                type: 'freeText'
            },
            {
                text: [`Please provide us with a date you will be avaible in the format: DD.MM.YYYY`],
                type: 'freeText'
            }
        ],
        fallBackResponse: [{
                text: ['Sorry, I didn\' get that. Would you like to get a quote or contact customer service.'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Get a quote',
                        payload: 'get a quote'
                    },
                    {
                        type: 'text',
                        title: 'Customer service',
                        payload: 'customer service'
                    }
                ]
            }],
            currentStep: '2.5',
            nextStep: '3'
        },
        '3':{
            response: [
                {
                    text: [`Nice! :)`],
                    type: 'freeText'
                },
                {
                text: ['Did you take your mortgage loan alone or with a co-borrower?'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Alone',
                        payload: 'alone'
                    },
                    {
                        type: 'text',
                        title: 'With a co-borrower',
                        payload: 'with a co-borrower'
                    }
                ],
            }],
            parser: {
                name: 'dateParser',
                settings: {
                    format: 'DD.MM.YYYY'
                }
            },
            param:{
                name: 'birthDate',
                type: 'date',
                custom: {
                    prettyName: 'Birth Date',
                    forInfo: true
                }
            },
            fallBackResponse: [{
                text: ['That is wrong format, please try again'],
                type: 'freeText'
            }],
            currentStep: '3',
            nextStep: '4'
        },
        '4':{
            response: [{
                text: ['OK, thank you. Which bank do you have your mortgage loan with?'],
                type: 'freeText'
            }],
            param:{
                name: 'morgageTake',
                type: 'freeText',
                custom: {
                    prettyName: 'Mortgage Bank',
                    forInfo: true
                }
            },
            currentStep: '4',
            nextStep: '6'
        },
        '6':{
            response: [{
                text: ['Which bank do you mean?'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Societe Generale',
                        payload: 'societe generale'
                    },
                    {
                        type: 'text',
                        title: 'Credit de Nord',
                        payload: 'credit de nord'
                    },
                    {
                        type: 'text',
                        title: 'Boursorama Banque',
                        payload: 'boursorama banque'
                    }
                ],
            }],
            currentStep: '6',
            nextStep: '7'
        },
        '7':{
            response: [{
                text: ['Cool, they provide a very convenient branch network. What was your project about?'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Principal residence',
                        payload: 'principal residence'
                    },
                    {
                        type: 'text',
                        title: 'Secondary residence',
                        payload: 'secondary residence'
                    },
                    {
                        type: 'text',
                        title: 'Investment',
                        payload: 'investment'
                    },
                ]
            }],
            param:{
                name: 'loanBank',
                type: 'freeText',
                custom: {
                    prettyName: 'Loan Bank',
                    forInfo: true
                }
            },
            currentStep: '7',
            nextStep: '8'
        },
        '8':{
            response: [{
                text: ['I\'m very glad you have your own home, $firstName. I will be very happy to help you save some money for it. What was the date your loan contract was signed? Please use the following format: DD.MM.YYYY'],
                type: 'freeText',
                customizeble: true,
                fromContext: ['firstName']
            }],
            param:{
                name: 'project',
                type: 'freeText'
            },
            currentStep: '8',
            nextStep: '9'
        },
        '9':{
            response: [{
                text: ['Good. Do you have multiple credit lines part of your loan contract?'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'No, just one simple loan',
                        payload: 1
                    },
                    {
                        type: 'text',
                        title: 'Yes, two credit lines',
                        payload: 2
                    },
                    {
                        type: 'text',
                        title: 'Yes, three credit lines',
                        payload: 3
                    }
                ]
            }],
            fallBackResponse: [{
                text: ['That is wrong format, please try again'],
                type: 'freeText'
                }],
            param: {
                name: 'loanContractDate',
                type: 'date',
                custom: {
                    prettyName: 'Date of loan contract',
                    forInfo: true
                }
            },
            parser: {
               name: 'dateParser',
               settings: {
                   format: 'DD.MM.YYYY'
               },
            },
            currentStep: '9',
            nextStep: '10'
        },
        '10':{
            response: [{
                text: ['Great, I\'ll be very quick then! What is the amount in EUR you have borrowed?'],
                type: 'freeText'
            }],
            param:{
                name: 'numberOfCards',
                type: 'number',
                custom: {
                    prettyName: 'number of cards',
                    forInfo: true
                }
            },
            currentStep: '10',
            nextStep: '11'
        },
        '11':{
            response: [{
                text: ['Cool, and what is the total duration of your loan in years?'],
                type: 'freeText'
            }],
            param:{
                name: 'borrowedAmmount',
                type: 'number',
                custom: {
                    prettyName: 'Borrowed Ammount',
                    forInfo: true
                }
            },
            parser: {
                name: 'valueParser',
                settings: {
                    type: 'value'
                },
            },
            fallBackResponse: [{
                text: ['The value is wrong or unreal, please try again'],
                type: 'freeText'
            }],
            currentStep: '11',
            nextStep: '12'
        },
        '12':{
            response: [{
                text: ['Super, what is your loan interest rate excluding insurance?'],
                type: 'freeText'
            }],
            param:{
                name: 'loanDuration',
                type: 'number',
                custom: {
                    prettyName: 'Loan Duration',
                    forInfo: true
                }
            },
            parser: {
                name: 'valueParser',
                settings: {
                    type: 'value'
                }
            },
            fallBackResponse: [{
                text: ['The value is wrong or unreal, please try again', 'I will need that in percent :)'],
                type: 'freeText'
            }],
            currentStep: '12',
            nextStep: '13'
        },
        '13':{
            response: [{
                text: ['Wow, I wish I had you rate! But I\'m just a bot so I can\'t have a real home anyway… Back to work, we\'re almost done -- is your insurance premium fixed for the whole duration of the loan?'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Yes',
                        payload: true
                    },
                    {
                        type: 'text',
                        title: 'No',
                        payload: false
                    },
                    {
                        type: 'text',
                        title: 'I don\'t know',
                        payload: 'no info'
                    }
                ]
            }],
            fallBackResponse: [{
                text: ['I need that in percent, please try again'],
                type: 'freeText'
            }],
            param:{
                name: 'loanInterestRate',
                type: 'percent',
                custom: {
                    prettyName: 'Loan Rate',
                    forInfo: true
                }
            },
            parser: {
                name: 'valueParser',
                settings: {
                    type: 'percent'
                }
            },
            currentStep: '13',
            nextStep: '14'
        },
        '14':{
            response: [{
                text: ['Great, what number do you know, your monthly premium or your insurance rate?'],
                type: 'freeText'
            }],
            param:{
                name: 'premiumFixed',
                type: 'boolean',
                custom: {
                    prettyName: 'Fixed Premium',
                    forInfo: true
                }
            },
            params: 'premiumFixed',
            currentStep: '14',
            nextStep: '15'
        },
        '15':{
            response: [{
                text: ['That\'s OK, could you please share your insurance rate in percent?'],
                type: 'freeText'
            }],
            currentStep: '15',
            nextStep: '16'
        },
        '16':{
            response: [{
                text: ['Nice! What about your coverage, please specify it as a number between 20% and 100%.'],
                type: 'freeText'
            }],
            param:{
                name: 'insuranceRate',
                type: 'percent',
                custom: {
                    prettyName: 'Insurance Rate',
                    forInfo: true
                }
            },
            fallBackResponse: [{
                text: ['I need that in percent, please try again'],
                type: 'freeText'
            }],
            parser: {
                name: 'valueParser',
                settings: {
                    type: 'percent'
                }
            },
            currentStep: '16',
            nextStep: '17'
        },
        '17':{
            response: [{
                text: [
                    {
                     value: `Super cool, I\'m ready now! Your savings for the whole duration of your loan can be 20000 EUR, with the same coverage and the same protection! It\'s a great deal -- you can get this huge savings by just answering a few more questions to get your final quote. And then, mi/2 will take care of everything!`,
                     id : '17.1',
                     translations: {
                        EN : `Super cool, I\'m ready now! Your savings for the whole duration of your loan can be 20000 EUR, with the same coverage and the same protection! It\'s a great deal -- you can get this huge savings by just answering a few more questions to get your final quote. And then, mi/2 will take care of everything!`,
                        FR: ``,
                        SASHO: 'BUGABUGA'
                     }
                   }
                ],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'I\'d like to benefit',
                        payload: 'i\'d like to benefit'
                    }
                ],
            }],
            param:{
                name: 'coverage',
                type: 'percent',
                custom: {
                    prettyName: 'Coverage',
                    forInfo: true
                }
            },
            parser: {
                name: 'valueParser',
                settings: {
                    type: 'percent'
                }
            },
            fallBackResponse: [{
                text: ['I need that in percent, please try again'],
                type: 'freeText'
            }],
            currentStep: '17',
            nextStep: '19'
        },
        '19':{
            response: [{
                text: ['Thank you very much, we will now begin the second phase :)'],
                type: 'freeText'
            }],
            currentStep: '19',
            nextStep: '1'
        }
    }
};