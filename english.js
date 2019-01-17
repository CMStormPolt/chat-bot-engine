module.exports = {
    'initial': {
        response: {
            'fb-res-1': `Sorry I don't understand. Would you like to get a quote?`
        },
    },
    'Get a Quote Initiation': {
        response: {
            'res-1' :'Hi! I’m Sofia from Wedou! How can I help you?',
            'fb-res-1': `Sorry I don't understand. Would you like to get a quote?`,
            'oneOfFallback': 'Sorry, your answer should be one of the following'
        },
        buttons: {
            'get a quote': 'Calculate my savings',
            'call for support': 'Speak with an agent'
        },
        oneOf: ['get a quote', 'call for support'],
        switch: {
            '0': 'get a quote',
            '1': 'call for support'
        },
    },
    'User Birthday': {
        response : {
            'res-1' : 'Great! Let’s get started :) If at any point you would like to start over, please type \"restart\". I need to ask you few questions to give you an accurate quote. My first question: could you tell me your birthdate (dd.mm.yyyy)?',
            'fb-res-1': 'Sorry, I didn\'t get that. Could you type me your day, month and year of birth?',
            'defaultDateParserFallback': 'The allowed format is dd.mm.yyyy :)',
            'multypleParsed': 'Did you mean? You can also type something else :)',
            'dateParserFallback': 'Sorry, the date you have typed is in wrong format. Could you type your day, month and year of birth?',
            'dateValidaterFallback': 'Sorry but the date you entered seems unreal, please type it again :)'
        },
        switch: {
            '0': 'go',
            '1': 'finish'
        },
    },
    'With Borrower or alone': {
        response: {
            'res-1': 'Thanks $firstName$! :) Tell me, did you borrow alone or with a co-borrower?',
            'fb-res-1': 'That is wrong format, please try again',
            'oneOfFallback': 'Sorry, you have to select one of the following'
        },
        buttons: {
            'alone': 'Alone',
            'with a co-borrower': 'With a co-borrower',
        },
        oneOf: ['alone', 'with a co-borrower'],
        switch: {
            '0': 'alone',
            '1': 'with a co-borrower'
        }
    },
    'What is Loan for': {
        response: {
            'res-1': 'Great :) I now have few questions about your loan. Could you please tell me what was the project you financed with it?',
            'fb-res-1': 'That is wrong input, please try again,',
            'oneOfFallback': 'Sorry, you must select one of the following'
        },
        buttons: {
            'main residence' : 'Main residence',
            'secondary residence': 'Secondary residence',
            'repair work': 'Repair work',
            'investment for rent': 'Investment for rent'
        },
        oneOf:  ['main residence', 'secondary residence', 'repair work', 'investment for rent']
    },
    'With Borrower, Borrower name': {
        response: {
            'res-1': 'Thanks for this info, your co-borrower may also benefit from this offer :) Can I ask your co-borrower’s first name to distinguish the proposals?',
            'nameParserFallback': 'Sorry, that is not a valid name, try without any symbol or number'
        }
    },
    'Borrower Birthday': {
        response: {
            'res-1': 'Thank you. Could you tell me what is the birthdate of $coBorrowerName$ (dd.mm.yyyy)?',
            'dateParserFallback': 'This is not in the correct format, please type it as dd.mm.yyyy',
            'dateValidaterFallback': 'The date you have typed is not in the allowed range, please type a real date',
        },
        switch: {
            '0': 'go',
            '1': 'finish'
        }
    },
    'loanContractDate': {
        response: {
            'res-1': 'Cool, nice project :) And can you tell me when did you sign your loan contract (dd.mm.yyyy)?',
            'dateParserFallback': 'This is not in the correct format, please type it as dd.mm.yyyy',
            'dateValidaterFallback': 'The date you have typed is not in the allowed range, please type a real date'
        }
    },
    'Loan Bank': {
        response: {
            'res-1': 'Thank you. Which bank did you take your loan with?',
            'bankParserFallback': 'We don\'t know this bank, please try again with another name :)',
            'dateValidaterFallback': 'Which bank do you mean? You can also type something else :)'
        },
    },
    'insuranceCompany': {
        response: {
            'res-1': 'Thank you. Which insurance company did you take your loan with?',
            'insurerParserFallback': 'We don\'t know this insurance company, please try again with another name :)',
            'validateInsurerExactMatchFallback': 'Which company do you mean? You can also type something else :)'
        },
        switch: {
            '0': 'before',
            '1': 'after'
        }
    },
    'Loan insurance same bank': {
        response: {
            'res-1': 'Cool, they provide a convenient branch network :) And did you subscribe your loan borrower insurance with this bank as well?',
            'oneOfFallback': 'Sorry, you need to select one of the following'
        },
        buttons: {
            'yes': 'Yes',
            'no': 'No'
        },
        oneOf: ['yes', 'no']
    },
    'How Many Loans': {
        response: {
            'res-1': 'Alright, let’s continue :) Did you finance your project with several loans?',
            'oneOfFallback': 'Sorry, these are the allowed options. Please select one of them :)',
            'fb-res-1': 'Please answer with "Yes" or "No".'
        },
        buttons: {
            '1': 'Only one',
            '2': 'Two',
            '3': 'Three'
        },
        oneOf: ['1', '2', '3' ],
        switch: {
            '0': '1',
            '1': '2',
            '2': '3'
        }
    },

    'One Loan, Loan type': {
        response: {
            'res-1': '(y)',
            'res-2': 'I’ll be very quick then :)',
            'res-3': 'Which type of loan was it?',
            'oneOfFallback': 'Sorry, these are the allowed options. Please select one of them :)',
        },
        buttons: {
            'classic loan': 'Classic loan',
            '0% interest rate loan': 'Loan with 0% interest rate',
            'loan based on real-estate savings': 'Loan based on real-estate savings'
        },
        oneOf: ['classic loan', '0% interest rate loan', 'loan based on real-estate savings' ],
    },
    'Many Loans, Loan type': {
        response: {
            'res-1': '(y)',
            'res-3': 'Which type is your $first$ loan?',
            'fb-res-1': 'Your input is wrong, please try again :)',
            'oneOfFallback': 'Sorry, these are the allowed options. Please select one of them :)',
        },
        buttons: {
            'classic loan': 'Classic loan',
            '0% interest rate loan': 'Loan with 0% interest rate',
            'loan based on real-estate savings': 'Loan based on real-estate savings'
        },
        oneOf: ['classic loan', '0% interest rate loan', 'loan based on real-estate savings' ],
    },
    'One Loan Ammount Borrowed': {
        response: {
            'res-1': 'What was the amount (in EUR) you borrowed for your loan?',
            'valueParserFallback': 'This is not a correct value, please try again',
            'validateValueRangeFallback': 'The amount must be between 10 000 EUR and 3 000 000 EUR :)'
        },
        switch: {
            '0': 'skip',
            '1': 'full'
        }
    },
    'Many Loans Amount Borrowed': {
        response: {
            'res-1': 'What was the amount (in EUR) you borrowed for your $first$ loan?',
            'valueParserFallback': 'This is not a valid value, please try again',
            'validateValueRangeFallback': 'The amount must be between 10 000 EUR and 3 000 000 EUR :)'
        },
        buttons: {
            'classic loan': 'Classic loan',
            '0% interest rate loan': 'Loan with 0% interest rate',
            'loan based on real-estate savings': 'Loan based on real-estate savings'
        },
        switch: {
            '0': 'skip',
            '1': 'full'
        }
    },
    'Loan Interest Rate': {
        response: {
            'res-1': 'Noted! And could you tell me what was the loan interest rate (in %)?',
            'fb-res-1': 'The value is wrong or unreal, please try again',
            'valueParserFallback': 'This is not a valid value, please try again',
            'validateValueRangeFallback': 'The value should be between 0 and 100 :)'
        },
        switch: {
            '0': 'before',
            '1': 'after'
        }
    },
    'Loan Rate Fixed': {
        response: {
            'res-1': 'The rate was fixed?',
            'fb-res-1': 'The value is wrong or unreal, please try again',
            'oneOfFallback': 'You must select one of the following:'
        },
        buttons: {
            'yes': 'Yes',
            'no': 'No'
        },
        oneOf: ['yes', 'no']

    },
    'Loan Duration': {
        response: {
            'res-1': 'Thanks! Could you tell me the duration of the loan?',
            'valueParserFallback': 'It doesn\'t look like a correct duration; please tell me the duration in years or in months :)',
            'validateYearsOrMonthsFallback': '$loanDuration$ $years/months$ right?',
            'validateValueRangeYearsOrMonths': 'The allowed range for $durationType$ is between $minValue$ and $maxValue$'
        },
        buttons: {
            'yes': 'Yes',
            'no': 'No'
        }
    },
    'Loan Differed': {
        response: {
            'res-1': 'Alright, and was the repayment of the loan deferred?',
            'oneOfFallback': 'You must select one of the following:'
        },
        buttons: {
            'yes': 'Yes',
            'no': 'No'
        },
        oneOf: ['yes', 'no'],
        switch: {
            '0': 'pass',
            '1': 'yes',
            '2': 'restart',
            '3': 'single',
            '4': 'multy'
        }
    },
    // '12.5': {
    //     starters: ['yes', 'no'],
    //     response: {
    //         'fb-res-1': 'Sorry I didn\'t get that, was the repayment of the loan deferred?'
    //     },
    //     buttons: {
    //         'yes': 'Yes',
    //         'no': 'No'
    //     },
    //     switch: {
    //         '0': 'skip',
    //         '1': 'full'
    //     }
    // },
    'Loan Differed Initial Date': {
        response: {
            'res-1': 'Could you then tell me what was the date of the first installment (dd.mm.yyyy)?',
            'dateParserFallback': 'This is not a valid date',
            'validateDateIsAfterLoanContractFallback': 'The date must be after the signature date'
        },
        switch: {
            '0': 'pass',
            '1': 'restart',
            '2': 'single',
            '3': 'multy'
        }
    },
    // '14': {
    //     response: {
    //         'res-1': 'That\'s OK, could you please share your insurance rate in percent?'
    //     },
    //     switch: {
    //         '0': 'pass',
    //         '1': 'restart'
    //     }
    // },
    // '14.5': {
    //     response: {
    //         'bf-res-1': 'Sorry I did\' get that'
    //     },
    //     switch: {
    //         '0': 'before',
    //         '1': 'after'
    //     }
    // },
    'Loan Contract Before 1.1.2015': {
        response: {
            'res-1': 'Thank you! We are almost done :) few questions left, about your loan insurance. Is your monthly insurance premium fixed?',
            'fb-res-1': 'This is not a valid response, please try again.',
            'oneOfFallback': 'Please choose one of the following :)'
        },
        buttons: {
            'yes': 'Yes',
            'no': 'No',
            'i don\'t know': 'I don\'t know'
        },
        oneOf: ['yes', 'no', 'i don\'t know'],
        switch: {
            '0': 'info',
            '1': 'noInfo'
        },
    },
    'What User Knows for Insurance': {
        response: {
            'res-1': `OK. Which information do you know about your insurance?`,
            'oneOfFallback': 'Please choose one of the following :)'
        },
        buttons: {
            'the insurance rate': 'The insurance rate',
            'the amount you pay every month': 'The amount you pay every month'
        },
        oneOf: ['the insurance rate', 'the amount you pay every month'],
        switch: {
            '0': 'the insurance rate',
            '1': 'the amount you pay every month'
        },
    },
    'What User Knows for Insurance After 1.1.2015': {
        response: {
            'res-1': `OK. Which information do you know about your insurance?`,
            'oneOfFallback': 'Please choose one of the following :)'
        },
        buttons: {
            'the taea': 'TAEA',
            'the amount you pay every month': 'The amount you pay every month'
        },
        oneOf: ['the taea', 'the amount you pay every month'],
        switch: {
            '0': 'the taea',
            '1': 'the amount you pay every month'
        },
    },
    'User Knows Ammount': {
        response: {
            'res-1': `Can you please provide me with your premium amount (in EUR)?`,
            'valueParserFallback': 'This is not a valid amount, please try again',
            'validateValueRangeFallback': 'The maximun allowed amount of the premium is 800 EUR :)'
        },
        switch: {
            '0': 'skip',
            '1': 'rate',
            '2': 'amount'
        },
    },
    'User Knows Rate': {
        response: {
            'res-1': `Can you please tell me which is your insurance rate (in %)?`,
            'valueParserFallback': 'This is not a valid rate, please try again :)',
            'validateValueRangeFallback': 'The allowed range is from 0% to 10%'
        },
        switch: {
            '0': 'skip',
            '1': 'insuranceRate',
            '2': 'amount'
        },
    },
    'With Cobower and knows Amount': {
        response: {
            'res-1': `And the premium amount of $coBorrowerName$?`,
            'valueParserFallback': 'This is not a valid figure, please try again',
            'validateValueRangeFallback': 'The maximum allowed amount of the premium is 800 EUR :)'
        },
    },
    'With Cobower and knows Rate': {
        response: {
            'res-1': `And the insurance rate of $coBorrowerName$?`,
            'valueParserFallback': 'This is not a valid rate, please try again :)',
            'validateValueRangeFallback': 'The allowed range is from 0% to 10%'
        },
    },
    'After 1.1.2015 Single Loan': {
        response: {
            'res-1': `Thank you! We are almost done :) few questions left, about your loan insurance. Could you provide me with your Effective Annual Insurance Rate (TAEA) for your loan`,
            'valueParserFallback': 'This is not a valid rate, please try again :)',
            'validateValueRangeFallback': 'The allowed range is from 0% to 10%',
           
        },
        switch: {
            '0': 'full',
            '1': 'skip',
        }
    },
    'After 1.1.2015 Many Loans': {
        response: {
            'res-1': `Thank you! :) few questions left, about your loan insurance.`,
            'res-2': `Could you provide me with your Effective Annual Insurance Rate (TAEA) for your loan $currentLoan$?`,
            'valueParserFallback': 'This is not a valid rate, please try again :)',
            'validateValueRangeFallback': 'The allowed range is from 0% to 10%'
        },
        switch: {
            '0': 'restart',
            '1': 'full',
            '2': 'skip'
        }
    },

    'After 1.1.2015 Single Loan With Coborrower': {
        response: {
            'res-1': `Could you provide me with the Effective Annual Insurance Rate (TAEA) of $coBorrowerName$ for the loan`,
            'valueParserFallback': 'This is not a valid rate, please try again :)',
            'validateValueRangeFallback': 'The allowed range is from 0% to 10%'
        },
    },
    'After 1.1.2015 Many Loans With Coborrower': {
        response: {
            'res-1': `Could you provide me the your Effective Annual Insurance Rate (TAEA) of $coBorrowerName$ for the loan $currentLoan$?`,
            'valueParserFallback': 'This is not a valid rate, please try again :)',
            'validateValueRangeFallback': 'The allowed range is from 0% to 10%'
        },
        switch: {
            '0': 'restart',
            '1': 'pass'
        }
    },
    'User Insurance Coverage': {
        response: {
            'res-1': 'And last questions! Then it’s my turn to work :) Which is your insurance coverage, between 20 and 100% (in %)? If you don’t know, you can type \"100\".',
            'valueParserFallback': 'This is not a valid value, please try again :)',
            'validateValueRangeFallback': 'The allowed range is between 20 and 100 :)'
        }
    },
    'Coborrower Insurance Coverage': {
        response: {
            'res-1': 'Last and least information I need to make a quote: Which is the insurance coverage of $coBorrowerName$ ? You can also type \"100\" here if you don’t know.',
            'valueParserFallback': 'This is not a valid value, please try again :)',
            'validateValueRangeFallback': 'The allowed range is between 20 and 100 :)'
        }
    },
    'final': {
        response: {
            'res-1': 'Thank you for the info :)',
            'res-2': 'Would you like to continue?',
            'res-3': 'You can get the full simulation here http://develop.wedou.fr'
        },
        buttons: {
            'yes': 'Yes',
            'no': 'No',
        },
        switch: {
            '0': 'go',
            '1': 'get a quote'
        }
    },
    'go - get email': {
        response: {
            'res-1': 'In order to continue and to exchange securely, I will need your email. It will enable me to register and redirect you to our secure platfrom on which I will ask you for further inform in order to confirm this offer. Your email address: .... :)',
            'emailValidaterFallback': 'Sorry, this email is already registered, please try another one :)',
            'emailParserFallback': 'This is not a valid email, please try again :)'
        }
    },
    'go - continue with registration': {
        response: {
            'res-1': 'Great, you can continue by clicking on the link :)'
        }
    },  
    'final-with-error': {
        response: {
            'res-1': 'Thank you for the info :)',
        }
    },
    'support-needed': {
        response: {
            'res-1': 'Okey, you will be contacted by one of our agents shortly',
        },
        buttons: {
            'leave an email': 'Leave an email',
            'leave a number': 'Leave a number',
        },
    },
    'support-needed-end': {
        response: {
            'res-1': 'Our advisor will contact you as soon as possible :)',
        }
    },
    'user-help-1': {
        response: {
            'res-1': `How can I help you?`,
            'res-2': 'Lets see what we can do for you',
            'res-3':  'These are the things I can help you with',
            'res-4': 'What do you need help with?',
            'oneOfFallback': 'Sorry, you must pick one of the following:'
        },
        buttons: {
            'restart': 'Restart',
            'speak with agent': 'Speak with agent',
            'go back': 'Go back'
        },
        oneOf: ['restart', 'go back', 'speak with agent'],
        switch: {
            '0': 'restart',
            '1': 'go back',
            '2': 'speak with agent'
        }
    },
    'general-fallBack': {
        response: {
            'res-1': `Would you like to restart the process or get in touch with one of our agent?`,
            'oneOfFallback': 'Sorry, you must pick one of the following:'
        },
        buttons: {
            'restart': 'Restart',
            'speak with agent': 'Speak with an agent',
            'go back': 'No, I’d like to continue'
        },
        oneOf: ['restart', 'go back', 'speak with agent'],
        switch: {
            '0': 'restart',
            '1': 'go back',
            '2': 'speak with agent'
        }
    },
    'help-1': {
        response: {
            'res-1': `How can I help you?`,
            'res-2': 'Lets see what we can do for you',
            'res-3':  'These are the things I can help you with',
            'res-4': 'What do you need help with?',
            'oneOfFallback': 'Sorry, you must pick one of the following:'
        },
        buttons: {
            'info': 'Info',
            'back to questions': 'Back to questions',
            'get path': 'Get path'
        },
        oneOf: ['info', 'back to questions', 'get path'],
        switch: {
            '0': 'info',
            '1': 'back to questions',
            '2': 'get path'
        }
    },
    'help-2': {
        response: {
            'res-1': `Glad to be of help`,
            'res-2': `Would you like to go back to the questionaire?`,
            'oneOfFallback': 'Sorry, you must pick one of the following:'
        },
        buttons: {
            'yes': 'Yes',
            'no': 'No'
        },
        oneOf: ['yes', 'no'],
        switch: {
            '0': 'yes',
            '1': 'no',
            '2': 'get a quote'
        }

    },
    'help-3': {
        response: {
            'res-1': `Glad to be of help`,
            'res-2': `Would you like to go back to the questionaire?`,
            'oneOfFallback': 'Sorry, you must pick one of the following:'
        },
        buttons: {
            'yes': 'Yes',
            'no': 'No'
        },
        oneOf: ['yes', 'no'],
        switch: {
            '0': 'yes',
            '1': 'no',
            '2': 'get a quote'
        }
    },
    'no-recovory': {
        response: {
            'res-1': 'Ok, that will be all then. You can type help for additional info or type restart to start the proccess from the beginning',
        },
    },
    helpers: {
        'first' : 'first',
        'second': 'second',
        'third' : 'third',
        'default': 'Invalid number of loans'
    },
    dateValues: {
       values: [ 'years', 'months' ]
    },
    values: {
        'years': 'years',
        'months': 'months',
        'yes': 'yes',
        'no': 'no'
    },
    revertValues: {
        'yes': 'Yes',
        'no': 'No',
        'months': 'months',
        'years': 'years'
    },
    hashLinks: {
        'success': 'Continue'
    },
    go: {
    'alone': '?? And here we are! Congratulations, with Wedou you could potentially save $savings$ EUR (based on estimated remaining cost of insurance of $insurance$ EUR) ??',
    'with-coborrower': '?? And here we are! Congratulations, with Wedou you could potentially save $savings$ EUR (based on estimated remaining cost of insurance of $insurance$ EUR) and $coBorrowerName$ could save $coSavings$ EUR (based on estimated remaining cost of insurance of $coInsurance$ EUR) :) ??',
    'changers': ['savings', 'monthly', 'yearly', 'insurance', 'coSavings', 'coMonthly', 'coYearly', 'coInsurance']
    },
    bravos: {
       0: '$firstName$, unfortunately I can not currently offer you a rate adapted to your situation',
       1: '$firstName$, you had well negotiated your rate! I advise you not to change your insurance.',
       2: '$firstName$, we operate on community principles and we are unfortunately not yet able to cover the amount of your credit.',
       3: '$firstName$, You have almost repaid your loan; a change of insurance at this stage would not be interesting for you. I advise you to keep your current insurance.'
    },
    failReasons: {
        'borrowerTooYoung': 'You don\'t meet the age requirment, sorry :(',
        'Co-borrowerTooYoung': 'Sorry, your co-borrower is too young :('
    }
}