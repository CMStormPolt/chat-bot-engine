let { parseScript } = require('./tools')

let script = {
    settings: {
        fallBackFailedTimesLimit : 1,
        fallBackStep: 'general-fallBack'
    },
    preHooks: [
        {
            name: 'checkForSupport'
        }
    ],
    hooks: [{
            step: 'help-initial',
            contextTree: 'help',
            message: 'debug',
            synonims: ['debug']
        },
        {
            step: 'initial',
            message: 'restart',
            synonims: ['restart', 'recomencer', 'recommencer']
        },
        {
            step: 'user-help-initial',
            contextTree: 'user-help',
            message: 'help',
            synonims: ['help', 'menu']
        },
    ],
    steps: {
        'user-help-initial': {
            handleAnswer: {},
            nextStep: 'user-help-1'
        },
        'general-fallBack': {
            response: [{
                text: [`res-1`],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'restart'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'speak with agent'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'go back'
                    },
                ]
            }],
            handleAnswer: {
                oneOf: {
                    fallBackResponse: [{
                        text: ['oneOfFallback'],
                        type: 'predefinedOptions',
                        buttons: [
                            {
                                type: 'text',
                                title: '',
                                payload: 'restart'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'speak with agent'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'go back'
                            }
                        ]
                    }]
                },
                updateContext: [
                    {
                        helperName: 'updateForSupport',
                        params: {
                            fromExtraInfo: 'calledForSupport'
                        }
                    },
                    {
                        helperName: 'updateSupportNeeded',
                        params: {
                            fromExtraInfo: 'calledForSupport'
                        }
                    }
                ],
                switch: {
                    name: 'initialHelpSwitcher',
                    '0': {
                        nextStep: 'Get a Quote Initiation'
                    },
                    '1': {
                        contextTree: 'main'
                    },
                    '2': {
                        nextStep: 'support-needed'
                    },
                    handler: 'initialHelpSwitcher',
                    settings: {}
                },
            },
            contextTree: 'user-help',
        },
        'user-help-1': {
            response: [{
                text: [`res-1`,'res-2', 'res-3', 'res-4'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'restart'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'speak with agent'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'go back'
                    },
                ]
            }],
            handleAnswer: {
                oneOf: {
                    fallBackResponse: [{
                        text: ['oneOfFallback'],
                        type: 'predefinedOptions',
                        buttons: [
                            {
                                type: 'text',
                                title: '',
                                payload: 'restart'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'speak with agent'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'go back'
                            }
                        ]
                    }]
                },
                updateContext: [
                    {
                        helperName: 'updateForSupport',
                        params: {
                            fromExtraInfo: 'calledForSupport'
                        }
                    },
                    {
                        helperName: 'updateSupportNeeded',
                        params: {
                            fromExtraInfo: 'calledForSupport'
                        }
                    }
                ],
                switch: {
                    name: 'initialHelpSwitcher',
                    '0': {
                        nextStep: 'Get a Quote Initiation'
                    },
                    '1': {
                        contextTree: 'main'
                    },
                    '2': {
                        nextStep: 'support-needed'
                    },
                    settings: {}
                },
            },
            contextTree: 'user-help',
        },
        'help-initial': {
            handleAnswer: {},
            nextStep: 'help-1'
        },
        'help-1': {
            response: [{
                text: [`res-1`,'res-2', 'res-3', 'res-4'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: 'Info',
                        payload: 'info'
                    },
                    {
                        type: 'text',
                        title: 'Get path',
                        payload: 'get path'
                    },
                    {
                        type: 'text',
                        title: 'Back to Questions',
                        payload: 'back to questions'
                    },
                ]
            }],
            handleAnswer: {
                oneOf: {
                    fallBackResponse: [{
                        text: ['oneOfFallback'],
                        type: 'predefinedOptions',
                        buttons: [
                            {
                                type: 'text',
                                title: '',
                                payload: 'info'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'back to questions'
                            }
                        ]
                    }]
                },
                switch: {
                    name: 'CheckForSupportNeeded',
                    '0': {
                        nextStep: 'help-2'
                    },
                    '1': {

                        contextTree: 'main'
                    },
                    '2': {
                        nextStep: 'help-3'
                    },
                    settings: {}
                },
            },
            contextTree: 'help',
        },
        'help-2': {
            response: [{
                text: [`res-1`],
                type: 'freeText',
                helpers: [{
                    helperName: 'getInfo',
                    params: {}
                  }
                ]
            },
            {
                text: [`res-2`],
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
        handleAnswer: {
            oneOf: {
                fallBackResponse: [{
                    text: ['oneOfFallback'],
                    type: 'predefinedOptions',
                    buttons: [
                        {
                            type: 'text',
                            title: '',
                            payload: 'yes'
                        },
                        {
                            type: 'text',
                            title: '',
                            payload: 'no'
                        }
                    ]
                }]
            },
            switch: {
                name: 'Check To go back to questions',
                '0': {
                    contextTree: 'main'
                },
                '1': {
                    nextStep: 'no-recovory'
                },
                '2': {
                    nextStep: 'Get a Quote Initiation'
                },
                handler: 'helperSwitcher',
                settings: {}
            },
          },
        },
        'help-3': {
            response: [{
                text: [`res-1`],
                type: 'freeText',
                helpers: [{
                    helperName: 'getPath',
                    params: {}
                  }
                ]
            },
            {
                text: [`res-2`],
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
        handleAnswer: {
            oneOf: {
                fallBackResponse: [{
                    text: ['oneOfFallback'],
                    type: 'predefinedOptions',
                    buttons: [
                        {
                            type: 'text',
                            title: '',
                            payload: 'yes'
                        },
                        {
                            type: 'text',
                            title: '',
                            payload: 'no'
                        }
                    ]
                }]
            },
            switch: {
                name: 'Check To go back to questions',
                '0': {
                    contextTree: 'main'
                },
                '1': {
                    // nextStep: 'support-needed',
                    nextStep: 'no-recovory'
                },
                '2': {
                    nextStep: 'Get a Quote Initiation'
                },
                handler: 'helperSwitcher',
                settings: {}
            },
        },
        
            nextStep: 'help-2-switch'
            // contextTree: 'main',
            // freePass: true
        },
        'no-recovory': {
            response: [{
                text: ['res-1'],
                type: 'freeText'
            }],
            handleAnswer: {},
            nextStep: 'no-recovory'
        },
        'initial': {
            response: [{
                text: ['res-1'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'get a quote'
                    }
                ],
                
            }],
            handleAnswer: {},
            nextStep: 'Get a Quote Initiation'
        },
        'Get a Quote Initiation': {
            response: [{
                text: ['res-1'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'get a quote'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'call for support'
                    }
                ],
                
            }],
            handleAnswer: {
                oneOf: {
                    fallBackResponse: [{
                        text: ['oneOfFallback'],
                        type: 'predefinedOptions',
                        buttons: [
                            {
                                type: 'text',
                                title: '',
                                payload: 'get a quote'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'call for support'
                            }
                        ]
                    }]
                },
                switch: {
                    name: 'CheckForSupportNeeded',
                    '0': {
                        nextStep: 'User Birthday'
                    },
                    '1': {
                        nextStep: 'support-needed',
                    },
                    handler: 'checkIfSupportNeeded',
                    settings: {}
                },
                updateContext: [
                    {
                        helperName: 'updateForSupport',
                        params: {
                            fromExtraInfo: 'calledForSupport'
                        }
                    },
                    {
                        helperName: 'updateSupportNeeded',
                        params: {
                            fromExtraInfo: 'calledForSupport'
                        }
                    }
                ],

            }
        },
        'User Birthday':{
            response: [{
                text: ['res-1'],
                type: 'freeText'
                }
            ],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'OurDateParser',
                        internalParsers: [
                            {
                                name: "dateParser",
                                settings: {
                                    format: 'DD.MM.YYYY',
                                },
                                extraFallback: {
                                    text: ['defaultDateParserFallback'],
                                    type: 'freeText'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['dateParserFallback'],
                        type: 'freeText'
                    }],
                    handleMultypleFallBack: [{
                        text: ['multypleParsed'],
                        type: 'predefinedOptions',
                        buttonsReady: true
                    }]
                },
                validators: [{ 
                    name: "validateDateRange",
                    settings: {},
                    fallBackResponse: [{
                        text: ['dateValidaterFallback'],
                        type: 'freeText'
                    }]
                }],
                params: [ 
                    {
                        destPath: "birthDate",
                        type: 'date',
                        fromParser: {}
                    }
                ],
                updateContext: [
                    {
                        helperName: 'updateFailReason',
                        params: {
                            fromExtraInfo: 'failReason'
                        }
                    }
                ],
                switch: {
                    name: 'CheckBorrowerYears',
                    '0': {
                        nextStep: 'With Borrower or alone'
                    },
                    '1': {
                        nextStep: 'final-with-error',
                    },
                    handler: 'checkUserYears',
                    settings: {
                        format: 'DD.MM.YYYY',
                        minYears: 18,
                        from: 'text',
                        failReason: 'borrowerTooYoung'
                    }
                }
            },
            fallBackResponse: [{
                text: ['fb-res-1'],
                type: 'freeText',
            }]
        },
        'With Borrower or alone':{
            response: [
                {
                text: ['res-1'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'alone'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'with a co-borrower'
                    }
                ],
                
                fromContext: ['firstName']
            }],
            handleAnswer: {
                oneOf: {
                    fallBackResponse: [{
                        text: ['oneOfFallback'],
                        type: 'predefinedOptions',
                        buttons: [
                            {
                                type: 'text',
                                title: '',
                                payload: 'alone'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'with a co-borrower'
                            }
                        ]
                    }]
                },
                params: [ 
                    {
                        destPath: "morgageCoBorrower",
                        type: 'freeText',
                    }
                ],
                switch: {
                    description: 'check if there is a coborrower',
                    '0': {
                        nextStep: 'Loan Bank'
                    },
                    '1': {
                        nextStep: 'With Borrower, Borrower name',
                    },
                }
            },
            fallBackResponse: [{
                text: ['fb-res-1'],
                type: 'freeText'
            }],
        },
        // 'What is Loan for':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'predefinedOptions',
        //         buttons: [
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'main residence'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'secondary residence'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'repair work'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'investment for rent'
        //             }
        //         ],
        //     }],
        //     handleAnswer: {
        //         oneOf: {
        //             fallBackResponse: [{
        //                 text: ['oneOfFallback'],
        //                 type: 'predefinedOptions',
        //                 buttons:[
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'main residence'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'secondary residence'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'repair work'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'investment for rent'
        //                     }
        //                 ]
        //             }]
        //         },
        //         params: [ 
        //             {
        //                 destPath: "loanFinansedWith",
        //                 type: 'freeText',
        //             }
        //         ]
        //     },
        //     nextStep: 'loanContractDate'
        // },
        'With Borrower, Borrower name':{
            response: [{
                text: ['res-1'],
                type: 'freeText'
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{ 
                        name: "Our Name Parser",
                        internalParsers: [
                            {
                             name: "nameParser",
                             settings: {}
                            }
                        ],
                        
                    }],
                    fallBackResponse: [{
                        text: ['nameParserFallback'],
                        type: 'freeText'
                    }]
                },
                params: [ 
                    {
                        destPath: "coBorrowerName",
                        type: 'freeText',
                    }
                ]
            },
            nextStep: 'Borrower Birthday'
        },
        'Borrower Birthday':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
                
                fromContext: ['coBorrowerName']
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{ 
                        name: "OurDateParser",
                        internalParsers: [
                            {
                             name: "dateParser",
                             settings: {
                                   format: 'DD.MM.YYYY'
                                }
                            }
                        ],
                        
                    }],
                    fallBackResponse: [{
                        text: ['dateParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{ 
                    name: "validateDateRange",
                    settings: {},
                    fallBackResponse: [{
                        text: ['dateValidaterFallback'],
                        type: 'freeText'
                    }]
                }],
                params: [ 
                    {
                        destPath: "coBorrowerBirthDate",
                        type: 'date',
                        fromParser: {}
                    }
                ],
                updateContext: [
                    {
                        helperName: 'updateFailReason',
                        params: {
                            fromExtraInfo: 'failReason'
                        }
                    }
                ],
                switch: {
                    name: 'Check Borrower Years',
                    '0': {
                        nextStep: 'Loan Bank'
                    },
                    '1': {
                        nextStep: 'final-with-error',
                    },
                    handler: 'checkUserYears',
                    settings: {
                        format: 'DD.MM.YYYY',
                        minYears: 18,
                        from: 'text',
                        failReason: 'Co-borrowerTooYoung'
                    }
                }
            }
        },
        'Loan Bank':{
            response: [{
                text: ['res-1'],
                type: 'freeText'
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'OurBankParser',
                        internalParsers: [
                            {
                                name: 'bankParser',
                                settings: {
                                    type: 'getStep'
                                },
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['bankParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{ 
                    name: "validateBankExactMatch",
                    settings: {},
                    fallBackResponse: [{
                        text: ['dateValidaterFallback'],
                        type: 'predefinedOptions'
                    }]
                }],
                params: [ 
                    {
                        destPath: "loanBank",
                        type: 'date',
                        fromValidation: {}
                    }
                ],
            },
            nextStep: 'loanContractDate'
        },
        'loanContractDate': {
            response: [{
                text: ['res-1'],
                type: 'freeText'
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'OurDateParser',
                        internalParsers: [
                            {
                                name: "dateParser",
                                settings: {
                                    format: 'DD.MM.YYYY',
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['dateParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{ 
                    name: "validateDateRange",
                    settings: {
                        minDate: {
                            date: '01.01.1970',
                            format: 'DD.MM.YYYY'
                        }
                    },
                    fallBackResponse: [{
                        text: ['dateValidaterFallback'],
                        type: 'freeText'
                    }]
                }],
                params: [ 
                    {
                        destPath: "loanContractDate",
                        type: 'date',
                        fromParser: {}
                    }
                ],
            },
            nextStep: 'One Loan Ammount Borrowed'
        },
        // 'Loan insurance same bank':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'predefinedOptions',
        //         buttons: [
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'yes'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'no'
        //             },

        //         ]
        //     }],
        //     handleAnswer: {
        //         oneOf: {
        //             fallBackResponse: [{
        //                 text: ['oneOfFallback'],
        //                 type: 'predefinedOptions',
        //                 buttons: [
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'yes'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'no'
        //                     },

        //                 ]
        //             }]
        //         },
        //         params: [ 
        //             {
        //                 destPath: "loanInsuranceSameBank",
        //                 type: 'boolean'
        //             }
        //         ],
        //     },
        //     nextStep: 'How Many Loans'
        // },
        // 'How Many Loans':{
        //     starters: true,
        //     response: [{
        //         text: ['res-1'],
        //         type: 'predefinedOptions',
        //         buttons: [
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: '1'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: '2'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: '3'
        //             },
        //         ]
        //     }],
        //     handleAnswer: {
        //         oneOf: {
        //             fallBackResponse: [{
        //                 text: ['oneOfFallback'],
        //                 type: 'predefinedOptions',
        //                 buttons: [
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: '1'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: '2'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: '3'
        //                     },
        //                 ]
        //             }]
        //         },
        //         params: [ 
        //             {
        //                 destPath: "loansNumber",
        //                 type: 'freeText',
        //                 custom: {
        //                     prettyName: 'Loans Number',
        //                     forInfo: true
        //                 },
        //             }
        //         ],
        //         updateContext: [
        //             {
        //                 helperName: 'updateCurrentLoan'
        //             }
        //         ],
        //         switch: {
        //             name: 'CheckLoanNumber',
        //             '0': {
        //                 nextStep: 'One Loan, Loan type'
        //             },
        //             '1': {
        //                 nextStep: 'Many Loans, Loan type'
        //             },
        //             '2': {
        //                 nextStep: 'Many Loans, Loan type'
        //             }
        //         }
        //     }
        // },
        // 'One Loan, Loan type':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'freeText',
        //     },{
        //         text: ['res-2'],
        //         type: 'freeText',
        //     },{
        //         text: ['res-3'],
        //         type: 'predefinedOptions',
        //         buttons: [
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'classic loan'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: '0% interest rate loan'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'loan based on real-estate savings'
        //             }
        //         ]
        //     }],
        //     handleAnswer: {
        //         oneOf: {
        //             fallBackResponse: [{
        //                 text: ['oneOfFallback'],
        //                 type: 'predefinedOptions',
        //                 buttons: [
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'classic loan'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: '0% interest rate loan'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'loan based on real-estate savings'
        //                     }
        //                 ]
        //             }]
        //         },
        //         params: [ 
        //             {
        //                 destPath: "loanType",
        //                 type: 'freeText',
        //                 custom: {
        //                     prettyName: 'Type of Loan',
        //                     forInfo: true
        //                 },
        //             }
        //         ],

        //     },
        //     nextStep: 'One Loan Ammount Borrowed'
        // },
        // 'Many Loans, Loan type':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'freeText',
                
        //         helpers: [{
        //             helperName: 'removeThumbsUp',
        //             params: {
        //                 contextName: 'currentLoan'
        //             }
        //           }]
        //     },{
        //         text: ['res-3'],
        //         type: 'predefinedOptions',
        //         buttons: [
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'classic loan'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: '0% interest rate loan'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'loan based on real-estate savings'
        //             }
        //         ],
                
        //         helpers: [{
        //           helperName: 'getCurrentLoan',
        //           params: {
        //               changers: [
        //                 {
        //                     paramName: 'first',
        //                     contextName: 'currentLoan'
        //                 }
        //             ]
        //           }
        //         }]
        //     }],
        //     handleAnswer: {
        //         oneOf: {
        //             fallBackResponse: [{
        //                 text: ['oneOfFallback'],
        //                 type: 'predefinedOptions',
        //                 buttons: [
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'classic loan'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: '0% interest rate loan'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'loan based on real-estate savings'
        //                     }
        //                 ]
        //             }]
        //         },
        //         params: [ 
        //             {
        //                 destPath: "loanType",
        //                 type: 'freeText',
        //                 custom: {
        //                     prettyName: 'Type of Loan',
        //                     forInfo: true
        //                 },
        //             }
        //         ],
        //         updateContext: [
        //             {
        //                 helperName: 'updateLoan',
        //                 params: {
        //                     changers:  ['loanType']
        //                }
        //             }
        //         ],
        //     },
        //     nextStep: 'Many Loans Amount Borrowed'
        // },
        'One Loan Ammount Borrowed':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Ammount Borrowed Parsing',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'value'
                                },
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{ 
                    name: "validateValueRange",
                    settings: {
                        min: 10000,
                        max: 3000000
                    },
                    fallBackResponse: [{
                        text: ['validateValueRangeFallback'],
                        type: 'freeText'
                    }]
                }],
                params: [ 
                    {
                        destPath: "ammountBorrowed",
                        type: 'freeText',
                        custom: {
                            prettyName: 'Ammount Borrowed',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
            //     updateContext: [
            //         {
            //           helperName: 'updateLoan',
            //           params: {
            //               changers:  ['ammountBorrowed']
            //          }
            //       }
            //   ],
            //   switch: {
            //     '0': {
            //         nextStep: 'Loan Duration',
            //     },
            //     '1': {
            //         nextStep: 'Loan Interest Rate'
            //     },
            //     handler: 'loanTypeChecker',
            //     settings: {}
            //   },
            },
            nextStep: 'Loan Duration'
        },
        'Loan Duration':{
            response: [{
                text: ['res-1'],
                type: 'freeText'
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our years value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'years',
                                },
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{ 
                    name: "validateIfYearsOrMonths",
                    settings: {},
                    fallBackResponse: [{
                        text: ['validateYearsOrMonthsFallback'],
                        type: 'predefinedOptions',
                        
                        helpers: [{
                            helperName: 'askIfYearsOrMonths',
                            params: {}
                        }],
                        fromExtraInfo: ['loanDuration']
                    }]
                },
                {
                    name: "validateValueRangeYearsOrMonths",
                    settings: {
                        years: {
                            min: 0,
                            max: 30
                        },
                        months: {
                            min: 31,
                            max: 360
                        }
                    },
                    fallBackResponse: [{
                        text: ['validateValueRangeYearsOrMonths'],
                        type: 'freeText',
                        fromExtraInfo: ['minValue', 'maxValue', 'durationType']
                    }]
                }],
                params: [ 
                    {
                        destPath: "loanDuration",
                        type: 'number',
                        custom: {
                            prettyName: 'Loan Duration',
                            forInfo: true
                        },
                        fromValidation: {
                            settings: {}
                        }
                    }
                ],
                // updateContext: [
                //     {
                //         helperName: 'updateLoan',
                //         params: {
                //             changers:  ['loanDuration'],
                //            }
                //     }
                // ],
            },
            nextStep: 'Loan Interest Rate'
        },
        'Loan Interest Rate':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Ammount Borrowed Parsing',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                },
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{ 
                    name: "validateValueRange",
                    settings: {
                        min: 0,
                        max: 100
                    },
                    fallBackResponse: [{
                        text: ['validateValueRangeFallback'],
                        type: 'freeText'
                    }]
                }],
                params: [ 
                    {
                        destPath: "loanInterestRate",
                        type: 'number',
                        custom: {
                            prettyName: 'Loan Interest Rate',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
                updateContext: [
                    {
                        helperName: 'updateLoan',
                        params: {
                            changers:  ['loanInterestRate']
                           }
                    }
                ],
                switch: {
                    '0': {
                        nextStep: 'What User Knows for Insurance',
                    },
                    '1': {
                        nextStep: 'What User Knows for Insurance After 1.1.2015',
                    },
                    handler: 'whenIsLoanTaken',
                    settings: {}
                }
            },
        },
        // 'insuranceCompany':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'freeText'
        //     }],
        //     handleAnswer: {
        //         parsing: {
        //             parsers: [{
        //                 name: 'OurInsurerParser',
        //                 internalParsers: [
        //                     {
        //                         name: 'insurerParser',
        //                         settings: {
        //                             type: 'getStep'
        //                         },
        //                     }
        //                 ]
        //             }],
        //             fallBackResponse: [{
        //                 text: ['insurerParserFallback'],
        //                 type: 'freeText'
        //             }]
        //         },
        //         validators: [{ 
        //             name: "validateInsurerExactMatch",
        //             settings: {},
        //             fallBackResponse: [{
        //                 text: ['validateInsurerExactMatchFallback'],
        //                 type: 'predefinedOptions'
        //             }]
        //         }],
        //         params: [ 
        //             {
        //                 destPath: "insurer",
        //                 type: 'reference',
        //                 fromValidation: {}
        //             }
        //         ],
        //         switch: {
        //             '0': {
        //                 nextStep: 'What User Knows for Insurance',
        //             },
        //             '1': {
        //                 nextStep: 'After 1.1.2015 Single Loan',
        //             },
        //             handler: 'whenIsLoanTaken',
        //             settings: {}
        //         }
        //     },
           
        // },
        'What User Knows for Insurance':{
            response: [{
                text: ['res-1'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'the insurance rate'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'the amount you pay every month'
                    }
                ]
            }],
            handleAnswer: {
                oneOf: {
                    fallBackResponse: [{
                        text: ['oneOfFallback'],
                        type: 'predefinedOptions',
                        buttons: [
                            {
                                type: 'text',
                                title: '',
                                payload: 'the insurance rate'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'the amount you pay every month'
                            }
                        ]
                    }]
                },
                params: [ 
                    {
                        destPath: "whatUserKnowsAboutInsurance",
                        type: 'freeText',
                        custom: {
                            prettyName: 'What User knows About Insurance',
                            forInfo: true
                        }
                    }
                ],
                switch: {
                    '0': {
                        nextStep: 'User Knows Rate',
                    },
                    '1': {
                        nextStep: 'User Knows Ammount',
                    }
                  },
            }
        },
        'What User Knows for Insurance After 1.1.2015':{
            response: [{
                text: ['res-1'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'the taea'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'the amount you pay every month'
                    }
                ]
            }],
            handleAnswer: {
                oneOf: {
                    fallBackResponse: [{
                        text: ['oneOfFallback'],
                        type: 'predefinedOptions',
                        buttons: [
                            {
                                type: 'text',
                                title: '',
                                payload: 'the taea'
                            },
                            {
                                type: 'text',
                                title: '',
                                payload: 'the amount you pay every month'
                            }
                        ]
                    }]
                },
                params: [ 
                    {
                        destPath: "whatUserKnowsAboutInsurance",
                        type: 'freeText',
                        custom: {
                            prettyName: 'What User knows About Insurance',
                            forInfo: true
                        }
                    }
                ],
                switch: {
                    '0': {
                        nextStep: 'After 1.1.2015 Single Loan',
                    },
                    '1': {
                        nextStep: 'User Knows Ammount',
                    }
                  },
            }
        },
        'After 1.1.2015 Single Loan':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 0,
                            max: 100
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "insuranceTAEA",
                        type: 'value',
                        custom: {
                            prettyName: 'The user insurance rate',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
                switch: {
                    '0': {
                        nextStep: 'After 1.1.2015 Single Loan With Coborrower',
                    },
                    '1': {
                        nextStep: 'final',
                    },
                    handler: 'coborrowerChecker',
                    settings: {}
                },
            }
        },
        // 'Loan Contract Before 1.1.2015':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'predefinedOptions',
        //         buttons: [
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'yes'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'no'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'i don\'t know'
        //             }
        //         ],
        //     }],
        //     handleAnswer: {
        //         oneOf: {
        //             fallBackResponse: [{
        //                 text: ['oneOfFallback'],
        //                 type: 'predefinedOptions',
        //                 buttons: [
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'yes'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'no'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'i don\'t know'
        //                     }
        //                 ]
        //             }]
        //         },
        //         params: [ 
        //             {
        //                 destPath: "monthlyInsurancePremiumFixed",
        //                 type: 'boolean',
        //                 custom: {
        //                     prettyName: 'Monthly Insurance Premium Fixed',
        //                     forInfo: true
        //                 }
        //             }
        //         ],
        //         switch: {
        //             '0': {
        //                 nextStep: 'What User Knows for Insurance',
        //             },
        //             '1': {
        //                 nextStep: 'final',
        //             },
        //             handler: 'insurancePremiumChecker',
        //             settings: {}
        //           },
        //     }
        // },
        // 'Many Loans Amount Borrowed':{
        //     starters: true,
        //     response: [{
        //         text: ['res-1'],
        //         type: 'freeText',   
        //         helpers: [
        //             {
        //                 helperName: 'getCurrentLoan',
        //                 params: {
        //                    changers: [
        //                     {
        //                         paramName: 'first',
        //                         contextName: 'currentLoan'
        //                     }
        //                   ]
        //                 }
        //             }
        //         ]
        //     }],
        //     handleAnswer: {
        //         parsing: {
        //             parsers: [{
        //                 name: 'Ammount Borrowed Parsing',
        //                 internalParsers: [
        //                     {
        //                         name: 'valueParser',
        //                         settings: {
        //                             type: 'value'
        //                         },
        //                     }
        //                 ]
        //             }],
        //             fallBackResponse: [{
        //                 text: ['valueParserFallback'],
        //                 type: 'freeText'
        //             }]
        //         },
        //         validators: [{ 
        //             name: "validateValueRange",
        //             settings: {
        //                 min: 10000,
        //                 max: 3000000
        //             },
        //             fallBackResponse: [{
        //                 text: ['validateValueRangeFallback'],
        //                 type: 'freeText'
        //             }]
        //         }],
        //         params: [ 
        //             {
        //                 destPath: "ammountBorrowed",
        //                 type: 'freeText',
        //                 custom: {
        //                     prettyName: 'Ammount Borrowed',
        //                     forInfo: true
        //                 },
        //                 fromParser: {}
        //             }
        //         ],
        //         updateContext: [
        //             {
        //               helperName: 'updateLoan',
        //               params: {
        //                   changers:  ['ammountBorrowed']
        //              }
        //           }
        //       ],
        //       switch: {
        //         '0': {
        //             nextStep: 'Loan Duration',
        //         },
        //         '1': {
        //             nextStep: 'Loan Interest Rate'
        //         },
        //         handler: 'loanTypeChecker',
        //         settings: {}
        //       },
        //     }
        // },
        
        // 'Loan Rate Fixed':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'predefinedOptions',
        //         buttons: [
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'yes'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'no'
        //             }
        //         ]
        //     }],
        //     handleAnswer: {
        //         oneOf: {
        //             fallBackResponse: [{
        //                 text: ['oneOfFallback'],
        //                 type: 'predefinedOptions',
        //                 buttons: [
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'yes'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'no'
        //                     }
        //                 ]
        //             }]
        //         },
        //         params: [ 
        //             {
        //                 destPath: 'fixedRate',
        //                 type: 'boolean',
        //                 custom: {
        //                     prettyName: 'Fixed Rate',
        //                     forInfo: true
        //                 }
        //             }
        //         ],
        //         updateContext: [
        //             {
        //                 helperName: 'updateLoan',
        //                 params: {
        //                     changers:  ['fixedRate']
        //                    }
        //             }
        //         ],
        //     },
        //     nextStep: 'Loan Duration'
        // },
        
        // 'Loan Differed':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'predefinedOptions',
        //         buttons: [
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'yes'
        //             },
        //             {
        //                 type: 'text',
        //                 title: '',
        //                 payload: 'no'
        //             }
        //         ]
        //     }],
        //     handleAnswer: {
        //         oneOf: {
        //             fallBackResponse: [{
        //                 text: ['oneOfFallback'],
        //                 type: 'predefinedOptions',
        //                 buttons: [
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'yes'
        //                     },
        //                     {
        //                         type: 'text',
        //                         title: '',
        //                         payload: 'no'
        //                     }
        //                 ]
        //             }]
        //         },
        //         params: [ 
        //             {
        //                 destPath: 'loanDiffered',
        //                 type: 'boolean',
        //                 custom: {
        //                     prettyName: 'Loan Differed',
        //                     forInfo: true
        //                 }
        //             }
        //         ],
        //         updateContext: [
        //             {
        //                 helperName: 'updateLoan',
        //                 params: {
        //                     changers:  ['loanDiffered']
        //                    }
        //             },
        //             {
        //                 helperName: 'updateCurrentLoan'
        //             }
        //         ],
        //         switch: {
        //             '0': {
        //                 nextStep: 'Loan Contract Before 1.1.2015',
        //             },
        //             '1': {
        //                 nextStep: 'Loan Differed Initial Date'
        //             },
        //             '2': {
        //                 nextStep: 'Many Loans, Loan type'
        //             },
        //             '3': {
        //                 nextStep: 'After 1.1.2015 Single Loan',
        //             },
        //             '4': {
        //                 nextStep: 'After 1.1.2015 Many Loans',
        //             },
        //             handler: 'loanDifferedAndLoanNumberChecker',
        //             settings: {}
        //           },
        //     }
        // },
        // 'Loan Differed Initial Date':{
        //     response: [{
        //         text: ['res-1'],
        //         type: 'freeText'
        //     }],
        //     handleAnswer: {
        //         parsing: {
        //             parsers: [{
        //                 name: 'Our date parser',
        //                 internalParsers: [
        //                     {
        //                         name: 'dateParser',
        //                         settings: {
        //                             format: 'DD.MM.YYYY',
        //                             limit: {}
        //                         }
        //                     }
        //                 ]
        //             }],
        //             fallBackResponse: [{
        //                 text: ['dateParserFallback'],
        //                 type: 'freeText'
        //             }]
        //         },
        //         validators: [{
        //                 name: "validateDateIsAfterLoanContract",
        //                 settings: {},
        //                 fallBackResponse: [{
        //                     text: ['validateDateIsAfterLoanContractFallback'],
        //                     type: 'freeText'
        //                 }]
        //         }],
        //         params: [ 
        //             {
        //                 destPath: "loanFirstInstallment",
        //                 type: 'date',
        //                 custom: {
        //                     prettyName: 'Loan First Installment',
        //                     forInfo: true
        //                 },
        //                 fromParser: {}
        //             }
        //         ],
        //         updateContext: [
        //             {
        //                 helperName: 'updateLoan',
        //                 params: {
        //                     changers:  ['loanFirstInstallment'],
        //                     updatePrev: true
        //                 }
        //             }
        //         ],
        //         switch: {
        //             '0': {
        //                 nextStep: 'Loan Contract Before 1.1.2015',
        //             },
        //             '1': {
        //                 nextStep: 'Many Loans, Loan type'
        //             },
        //             '2': {
        //                 nextStep: 'After 1.1.2015 Single Loan',
        //             },
        //             '3': {
        //                 nextStep: 'After 1.1.2015 Many Loans',
        //             },
        //             handler: 'loanDifferedAndLoanNumberChecker',
        //             settings: {takePrevCurrent: true}
        //           },
        //     }
        // },  
        
        
        'User Knows Ammount':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'value'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 0,
                            max: 800
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "userPremiumAmmount",
                        type: 'value',
                        custom: {
                            prettyName: 'The user insurance premium',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
                switch: {
                    '0': {
                        nextStep: 'final',
                    },
                    '1': {
                        nextStep: 'With Cobower and knows Rate',
                    },
                    '2': {
                        nextStep: 'With Cobower and knows Amount',
                    },
                    handler: 'coborrowerAndUserKnowsChecker',
                    settings: {}
                  },
            }
        },
        'User Knows Rate':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 0,
                            max: 100
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "insuranceRate",
                        type: 'value',
                        custom: {
                            prettyName: 'The user insurance rate',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
                switch: {
                    '0': {
                        nextStep: 'final',
                    },
                    '1': {
                        nextStep: 'With Cobower and knows Rate',
                    },
                    '2': {
                        nextStep: 'With Cobower and knows Amount',
                    },
                    handler: 'coborrowerAndUserKnowsChecker',
                    settings: {}
                },
            }
        },
        'With Cobower and knows Amount':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
                
                fromContext: ['coBorrowerName']
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'value'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 0,
                            max: 800
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "coBorrowerPremiumAmmount",
                        type: 'value',
                        custom: {
                            prettyName: 'The coborower insurance premium',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
            },
            nextStep: 'final'
        },

        'With Cobower and knows Rate':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
                
                fromContext: ['coBorrowerName']
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 0,
                            max: 100
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "coBorrowerInsuranceRate",
                        type: 'value',
                        custom: {
                            prettyName: 'The coborrower insurance rate',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
            },
            nextStep: 'final'
        },
      
        'After 1.1.2015 Many Loans':{
            
            response: [{
                text: ['res-1'],
                type: 'freeText',
                helpers: [{
                    helperName: 'removeForNextLoans',
                    params: {
                        contextName: 'currentLoan'
                    }
                  }]
            },
            {
                text: ['res-2'],
                type: 'freeText',
                fromContext: ['currentLoan']
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 0,
                            max: 100
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "insuranceTAEA",
                        type: 'value',
                        custom: {
                            prettyName: 'The coborrower insurance rate',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
                updateContext: [
                    {
                        helperName: 'updateCurrentLoan',
                        params: {}
                    },
                    {
                        helperName: 'updateLoan',
                        params: {
                            changers:  ['insuranceTAEA']
                        }
                    }
                ],
                switch: {
                    '0': {
                        nextStep: 'After 1.1.2015 Many Loans',
                    },
                    '1': {
                        nextStep: 'After 1.1.2015 Many Loans With Coborrower',
                    },
                    '2': {
                        nextStep: 'final',
                    },
                    handler: 'loanNumberAndCoborrowerChecker',
                    settings: {}
                },
            }
        },
        'After 1.1.2015 Single Loan With Coborrower':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
                
                fromContext: ['coBorrowerName']
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 0,
                            max: 100
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "coBorrowerInsuranceTAEA",
                        type: 'value',
                        custom: {
                            prettyName: 'The coborrower insurance rate',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
            },
            nextStep: 'User Insurance Coverage'
        },
        'After 1.1.2015 Many Loans With Coborrower':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
                
                fromContext: ['coBorrowerName','currentLoan']
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 0,
                            max: 100
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "coBorrowerInsuranceTAEA",
                        type: 'value',
                        custom: {
                            prettyName: 'The coborrower insurance rate',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ],
                updateContext: [
                    {
                        helperName: 'updateCurrentLoan',
                        params: {}
                    },
                    {
                        helperName: 'updateLoan',
                        params: {
                            changers:  ['coBorrowerInsuranceTAEA']
                        }
                    }
                ],
                switch: {
                    '0': {
                        nextStep: 'After 1.1.2015 Many Loans With Coborrower',
                    },
                    '1': {
                        nextStep: 'User Insurance Coverage',
                    },
                    handler: 'loanNumberChecker',
                    settings: {}
                },
            }
        },
        'User Insurance Coverage':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 20,
                            max: 100
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "userInsuranceCoverage",
                        type: 'value',
                        custom: {
                            prettyName: 'user Insurance Coverage',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ]
            },
            nextStep: 'Coborrower Insurance Coverage'
        },
        'Coborrower Insurance Coverage':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
                fromContext: ['coBorrowerName']
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{ 
                        name: 'Our value parser',
                        internalParsers: [
                            {
                                name: 'valueParser',
                                settings: {
                                    type: 'percent'
                                }
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['valueParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{
                        name: "validateValueRange",
                        settings: {
                            min: 20,
                            max: 100
                        },
                        fallBackResponse: [{
                            text: ['validateValueRangeFallback'],
                            type: 'freeText'
                        }]
                }],
                params: [ 
                    {
                        destPath: "coBorrowerInsuranceCoverage",
                        type: 'number', 
                        custom: {
                            prettyName: 'coborrower Insurance Coverage',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ]
            },
            nextStep: 'final'
        },
        'final':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
                
                helpers: [{
                    helperName: 'getFinalAnswer',
                    params: {
                        fromContext: ['firstName', 'coBorrowerName']
                    }
                  }]
            },
            {
                text: ['res-2'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'yes'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'no'
                    }
                ],
                helpers: [{
                    helperName: 'askForContinue',
                    params: {}
                  }]
            }
            // {
            //     text: ['res-3'],
            //     type: 'freeText',
            // }
            ],
            // handleAnswer: {},
            // nextStep: 'Get a Quote Initiation'
            handleAnswer: {
                // updateContext: [
                // {
                //     helperName: 'updateCurrentLoan',
                //     params: {
                //         restart: true
                //     }
                // }],
                switch: {
                    '0': {
                        nextStep: 'go - get email',
                    },
                    '1': {
                        nextStep: 'Get a Quote Initiation',
                    },
                    handler: 'checkIfGoAndContinue',
                    settings: {}
                },
            }
            
        },
        'go - get email': {
            response: [{
                text: ['res-1'],
                type: 'freeText'
            }],
            handleAnswer: {
                parsing: {
                    parsers: [{ 
                        name: 'Our email parser',
                        internalParsers: [
                            {
                                name: 'emailParser',
                                settings: {}
                            }
                        ]
                    }],
                    fallBackResponse: [{
                        text: ['emailParserFallback'],
                        type: 'freeText'
                    }]
                },
                validators: [{ 
                    name: "validateEmailNotRegistered",
                    settings: {},
                    fallBackResponse: [{
                        text: ['emailValidaterFallback'],
                        type: 'freeText'
                    }]
                }],
                updateContext: [
                    {
                        helperName: 'addHashToContext',
                        params: {}
                    }
                ],
                params: [ 
                    {
                        destPath: "email",
                        type: 'email', 
                        custom: {
                            prettyName: 'Borrower Email',
                            forInfo: true
                        },
                        fromParser: {}
                    }
                ]
            },
            nextStep: 'go - continue with registration'
        },
        'go - continue with registration': {
            response: [{
                text: ['res-1'],
                type: 'buttonTemplate',
                buttons: 'getHashLinkButton',
                notFromTranslateButtonHelpers: true

            }],
            handleAnswer: {},
            nextStep: 'Get a Quote Initiation'
        },
        'final-with-error':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
                
                helpers: [{
                    helperName: 'getFinalFailAnswer',
                    params: {}
                  }]
            }],
            handleAnswer: {
                updateContext: [
                {
                    helperName: 'updateCurrentLoan',
                    params: {
                        restart: true
                    }
                }
            ]},
            nextStep: 'Get a Quote Initiation'
        },
        'support-needed':{
            response: [{
                text: ['res-1'],
                type: 'predefinedOptions',
                buttons: [
                    {
                        type: 'text',
                        title: '',
                        payload: 'leave an email'
                    },
                    {
                        type: 'text',
                        title: '',
                        payload: 'leave a number'
                    }
                ],
            }],
            handleAnswer: {
                updateContext: [
                    
                ]},
            nextStep: 'support-needed-end'
        },
        'support-needed-end':{
            response: [{
                text: ['res-1'],
                type: 'freeText',
            }],
            handleAnswer: {},
            nextStep: 'support-needed-end'
        }
    }
};

console.log(parseScript(script))

module.exports = script

