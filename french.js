module.exports = {
    'initial': {
        response: {
            'fb-res-1': `Sorry I dont understand. Would you like to get a quote?`
        },
    },
    'Get a Quote Initiation': {
        response: {
            'res-1' :'Bonjour ! Je suis eWedou ! Je suis encore en cours d\'apprentissage ;) Comment puis-je vous aider ?',
            'fb-res-1': `Désolé, vous devez choisir entre l'une des réponses ci-dessous`,
            'oneOfFallback': 'Désolé, vous devez choisir entre l\'une des réponses ci-dessous'
        },
        buttons: {
            'get a quote': 'Calculer mon économie',
            'call for support': 'Parler avec un conseiller'
        },
        oneOf: ['get a quote', 'call for support'],
        switch: {
            '0': 'get a quote',
            '1': 'call for support'
        },
    },
    'User Birthday': {
        response : {
            'res-1' : 'Parfait :) Je vais vous poser quelques questions à propos de vous, de votre prêt et de votre assurance actuelle. Première question : quelle est votre date de naissance (jj.mm.aaaa) ?',
            'defaultDateParserFallback': 'Le format autorisé est jj.mm.aaaa :)',
            'multypleParsed': 'Que vouliez-vous dire ? Vous pouvez également taper autre chose :)',
            'dateParserFallback': 'Désolé, la date que vous avez saisie est incorrecte. Pourriez-vous me donner votre date de naissance au format jj.mm.aaaa ?',
            'dateValidaterFallback': 'Désolé, mais la date que vous avez tapée semble irréelle, merci de la saisir à nouveau :)'
        },
        switch: {
            '0': 'go',
            '1': 'finish'
        },
    },
    'With Borrower or alone': {
        response: {
            'res-1': 'Avez-vous un co-emprunteur ?',
            'oneOfFallback': 'Désolé, vous devez sélectionner l\'un des éléments suivants :'
        },
        buttons: {
            'alone': 'Non',
            'with a co-borrower': 'Oui',
        },
        oneOf: ['alone', 'with a co-borrower'],
        switch: {
            '0': 'alone',
            '1': 'with a co-borrower'
        }
    },
    'What is Loan for': {
        response: {
            'res-1': 'Merci :) A propos de votre prêt : Pouvez-vous m’indiquer quel type de projet vous avez financé ?',
            'oneOfFallback': 'Désolé, vous devez sélectionner l\'un des éléments suivants'
        },
        buttons: {
            'main residence' : 'Résidence principale',
            'secondary residence': 'Résidence secondaire',
            'repair work': 'Travaux',
            'investment for rent': 'Investissement locatif'
        },
        oneOf:  ['main residence', 'secondary residence', 'repair work', 'investment for rent']
    },
    'With Borrower, Borrower name': {
        response: {
            'res-1': 'Quel est son prénom ?',
            'nameParserFallback': 'Désolé, ce n\'est pas un nom valide, essayez sans symbole ni chiffre'
        }
    },
    'Borrower Birthday': {
        response: {
            'res-1': 'Et sa date de naissance (jj.mm.aaaa) ? ',
            'dateParserFallback': 'Le format semble incorrect, veuillez le saisir de la façon suivante : jj.mm.aaaa',
            'dateValidaterFallback': 'La date que vous avez tapée n\'est pas autorisée. Merci de renseigner une nouvelle date',
        },
        switch: {
            '0': 'go',
            '1': 'finish'
        }
    },
    'loanContractDate': {
        response: {
            'res-1': 'Merci :) Pouvez-vous me donner la date de signature de votre contrat de prêt (jj.mm.aaaa) ?',
            'dateParserFallback': 'Le format semble incorrect, veuillez le saisir de la façon suivante : jj.mm.aaaa',
            'dateValidaterFallback': 'La date que vous avez tapée n\'est pas dans la fourchette autorisée. Merci de renseigner une nouvelle date.'
        }
    },
    'Loan Bank': {
        response: {
            'res-1': 'Merci ! Auprès de quelle banque avez-vous emprunté ?',
            'bankParserFallback': 'Nous ne connaissons pas cette banque, veuillez réessayer avec un autre nom :)',
            'dateValidaterFallback': 'Pourriez-vous sélectionner la banque exacte ci-dessous ? vous pouvez également taper un autre nom :)'
        },
    },
    'insuranceCompany': {
        response: {
            'res-1': 'Merci ! Auprès de quelle compagnie d\'assurance avez-vous emprunté ?',
            'insurerParserFallback': 'Nous ne connaissons pas cette compagnie d\'assurance, veuillez réessayer avec un autre nom :)',
            'validateInsurerExactMatchFallback': 'pourriez-vous sélectionner la compagnie d\'assurance exacte ci-dessous ? vous pouvez également taper un autre nom :)'
        },
        switch: {
            '0': 'before',
            '1': 'after'
        }
    },
    'Loan insurance same bank': {
        response: {
            'res-1': 'Et avez-vous souscrit votre assurance emprunteur auprès de cette même banque ?',
            'oneOfFallback': 'Désolé, vous devez sélectionner l\'un des éléments suivants'
        },
        buttons: {
            'yes': 'Oui',
            'no': 'Non'
        },
        oneOf: ['yes', 'no']
    },
    'How Many Loans': {
        response: {
            'res-1': 'Continuons :) Votre projet a-t-il été réalisé avec plusieurs prêts ?',
            'oneOfFallback': 'Désolé, ce sont les options autorisées. Veuillez en sélectionner une :)',
        },
        buttons: {
            '1': 'Non, avec un seul',
            '2': 'Oui, avec deux',
            '3': 'Oui, avec trois',
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
            'res-2': 'Je serai rapide alors :)',
            'res-3': 'Quel type de prêt était-ce ?',
            'oneOfFallback': 'Désolé, ce sont les options autorisées. Veuillez en sélectionner une :)',
        },
        buttons: {
            'classic loan': 'Classique, amortissable',
            '0% interest rate loan': 'Prêt à Taux Zéro',
            'loan based on real-estate savings': 'Prêt Epargne Logement'
        },
        oneOf: ['classic loan', '0% interest rate loan', 'loan based on real-estate savings' ],
    },
    'Many Loans, Loan type': {
        response: {
            'res-1': '(y)',
            'res-2': 'Je serai rapide alors :)',
            'res-3': 'Quel type est votre $first$ prêt ?',
            'oneOfFallback': 'Désolé, ce sont les options autorisées. Veuillez en sélectionner une :)',
        },
        buttons: {
            'classic loan': 'Classique, amortissable',
            '0% interest rate loan': 'Prêt à Taux Zéro',
            'loan based on real-estate savings': 'Prêt Epargne Logement'
        },
        oneOf: ['classic loan', '0% interest rate loan', 'loan based on real-estate savings' ],
    },
    'One Loan Ammount Borrowed': {
        response: {
            'res-1': 'Et le montant emprunté (en EUR) ?',
            'valueParserFallback': 'Ce n\'est pas une valeur correcte, veuillez réessayer',
            'validateValueRangeFallback': 'Le montant doit être compris entre 10 000 EUR et 3 000 000 EUR :)'
        },
        switch: {
            '0': 'skip',
            '1': 'full'
        }
    },
    'Many Loans Amount Borrowed': {
        response: {
            'res-1': 'Quelle était la somme (en EUR) que vous avez emprunté pour votre $first$ prêt ?',
            'valueParserFallback': 'Ce n\'est pas une valeur correcte, veuillez réessayer',
            'validateValueRangeFallback': 'Le montant doit être compris entre 10 000 EUR et 3 000 000 EUR :)'
        },
        switch: {
            '0': 'skip',
            '1': 'full'
        }
    },
    // 'askBorrowedAmmountExactNumber': {
    //     response: {
    //         'res-1': 'Did you mean?',
    //         'fb-res-1': 'The value is wrong or unreal, please try again'
    //     },
    //     buttons: {

    //     }
    // },
    // 'confirmAmmountBorrowed-switch': {
    //     response: {
    //         'fb-res-1': 'Sorry I didn\'t get that. Please type the amount you borrowed?'
    //     },
    //     switch: {
    //         '0': 'single',
    //         '1': 'multy',
    //         '2': 'go'
    //     }
    // },
    'Loan Interest Rate': {
        response: {
            'res-1': 'Et enfin : Le taux d’intérêt hors assurance ?',
            'valueParserFallback': 'Le taux semble incorrect, veuillez réessayer',
            'validateValueRangeFallback': 'La taux doit être compris entre 0 et 10%:)'
        },
        switch: {
            '0': 'before',
            '1': 'after'
        }
    },
    'Loan Rate Fixed': {
        response: {
            'res-1': 'Le taux était-il fixe ?',
            'oneOfFallback': 'Vous devez sélectionner l\'un des éléments suivants :'
        },
        buttons: {
            'yes': 'Oui',
            'no': 'Non'
        },
        oneOf: ['yes', 'no']

    },
    'Loan Duration': {
        response: {
            'res-1': 'Pouvez-vous m\'indiquer la durée du prêt ?',
            'valueParserFallback': 'Ce n\'est pas une durée valide, s\'il vous plaît dites-moi la durée en années ou en mois :)',
            'validateYearsOrMonthsFallback': '$loanDuration$ $years/months$, n\'est-ce pas ?',
            'validateValueRangeYearsOrMonths': 'La plage autorisée pour $durationType$ est comprise entre $minValue$ et $maxValue$'
        },
        buttons: {
            'yes': 'Oui',
            'no': 'Non'
        }
    },
    'Loan Differed': {
        response: {
            'res-1': 'Et son remboursement était-il différé ?',
            'oneOfFallback': 'Vous devez sélectionner l\'un des éléments suivants:'
        },
        buttons: {
            'yes': 'Oui',
            'no': 'Non'
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
    'Loan Differed Initial Date': {
        response: {
            'res-1': 'Pouvez-vous me donner la date de la première échéance (jj.mm.aaaa) ?',
            'dateParserFallback': 'Ce n\'est pas une date valide',
            'validateDateIsAfterLoanContractFallback': 'La date doit être postérieure à la date de signature'
        },
        switch: {
            '0': 'pass',
            '1': 'restart',
            '2': 'single',
            '3': 'multy'
        }
    },
    'Loan Contract Before 1.1.2015': {
        response: {
            'res-1': 'Parfait, merci ! Pour terminer, je dois savoir combien vous coûte votre assurance actuelle. Connaissez-vous votre taux d\'assurance ou le montant de votre cotisation mensuelle ?',
            'oneOfFallback': 'Veuillez choisir l\'une des réponses suivantes :)'
        },
        buttons: {
            'yes': 'Le taux d\'assurance',
            'no': 'La cotisation mensuelle',
            'i don\'t know': 'Je ne sais pas'
        },
        oneOf: ['yes', 'no', 'i don\'t know'],
        switch: {
            '0': 'info',
            '1': 'noInfo'
        },
    },
    'What User Knows for Insurance': {
        response: {
            'res-1': `Parfait, merci ! Pour terminer, je dois savoir combien vous coûte votre assurance actuelle. Connaissez-vous votre taux d\'assurance ou le montant de votre cotisation mensuelle ?`,
            'oneOfFallback': 'Veuillez choisir l\'une des réponses suivantes :)'
        },
        buttons: {
            'the insurance rate': 'Le taux d’assurance',
            'the amount you pay every month': 'Le montant de votre cotisation mensuelle'
        },
        oneOf: ['the insurance rate', 'the amount you pay every month'],
        switch: {
            '0': 'the insurance rate',
            '1': 'the amount you pay every month'
        },
    },
    'What User Knows for Insurance After 1.1.2015': {
        response: {
            'res-1': `Parfait, merci ! Pour terminer, je dois savoir combien vous coûte votre assurance actuelle. Connaissez-vous votre TAEA (Taux Annuel Effectif d'\Assurance) ou le montant de votre cotisation mensuelle ?`,
            'oneOfFallback': 'Veuillez choisir l\'une des réponses suivantes :)'
        },
        buttons: {
            'the taea': 'Votre TAEA',
            'the amount you pay every month': 'Le montant de votre cotisation mensuelle'
        },
        oneOf: ['the taea', 'the amount you pay every month'],
        switch: {
            '0': 'the taea',
            '1': 'the amount you pay every month'
        },
    },

    'User Knows Ammount': {
        response: {
            'res-1': `Quelle est le montant (en EUR) de votre cotisation mensuelle ?`,
            'valueParserFallback': 'Ce nombre n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'La limite autorisée pour un montant de prime est 800 EUR :)'
        },
        switch: {
            '0': 'skip',
            '1': 'rate',
            '2': 'amount'
        },
    },
    'User Knows Rate': {
        response: {
            'res-1': `Quel est votre TAEA (en %) ?`,
            'valueParserFallback': 'Ce taux n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'Le taux doit être compris entre 0 et 10%'
        },
        switch: {
            '0': 'skip',
            '1': 'insuranceRate',
            '2': 'ammount'
        },
    },
    'With Cobower and knows Amount': {
        response: {
            'res-1': `Et le montant (en EUR) de la cotisation de $coBorrowerName$ ?`,
            'valueParserFallback': 'Ce nombre n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'La limite autorisée pour un montant de prime est 800 EUR :)'
        },
    },
    'With Cobower and knows Rate': {
        response: {
            'res-1': `Et le taux d’assurance de $coBorrowerName$?`,
            'valueParserFallback': 'Ce taux n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'Le taux doit être compris entre 0 et 10%'
        },
    },
    'After 1.1.2015 Single Loan': {
        response: {
            'res-1': `Parfait, merci ! Pour terminer, je dois savoir combien vous coûte votre assurance actuelle. Connaissez-vous votre TAEA (Taux Annuel Effectif d\'Assurance ou le montant de votre cotisation mensuelle ?`,
            'valueParserFallback': 'Ce taux n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'Le taux doit être compris entre 0 et 10%',
           
        },
        switch: {
            '0': 'full',
            '1': 'skip',
        }
    },
    'After 1.1.2015 Many Loans': {
        response: {
            'res-1': `Merci!  :) Simplement quelques questions sur votre assurance de prêt.`,
            'res-2': `Pouvez-vous m’indiquer le Taux Annuel Effectif d'Assurance (TAEA) de votre prêt $currentLoan$ ? Vous le trouverez sur votre Fiche Standardisée d’Information.`,
            'valueParserFallback': 'Ce taux n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'Le taux doit être compris entre 0 et 10%'
        },
        switch: {
            '0': 'restart',
            '1': 'full',
            '2': 'skip'
        }
    },

    'After 1.1.2015 Single Loan With Coborrower': {
        response: {
            'res-1': `Pouvez-vous m’indiquer le Taux Annuel Effectif d’Assurance (TAEA) de $coBorrowerName$ pour votre prêt. Vous le trouverez sur votre Fiche Standardisée d’Information.`,
            'valueParserFallback': 'Ce taux n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'Le taux doit être compris entre 0 et 10%'
        },
    },
    'After 1.1.2015 Many Loans With Coborrower': {
        response: {
            'res-1': `Pouvez-vous m’indiquer le Taux Annuel Effectif d’Assurance (TAEA) de $coBorrowerName$ pour le prêt $currentLoan$ ?`,
            'valueParserFallback': 'Ce taux n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'Le taux doit être compris entre 0 et 10%'
        },
        switch: {
            '0': 'restart',
            '1': 'pass'
        }
    },
    'User Insurance Coverage': {
        response: {
            'res-1': 'Et enfin, pouvez-vous m\'indiquer votre quotité, c\'est-à-dire votre part du capital garanti. Elle doit être comprise entre 20 et 100% ?',
            'valueParserFallback': 'Ce pourcentage n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'La valeur doit être comprise entre 20 et 100% :)'
        }
    },
    'Coborrower Insurance Coverage': {
        response: {
            'res-1': 'Et la quotité de $coBorrowerName$ ?',
            'valueParserFallback': 'Ce pourcentage n\'est pas valide. Veuillez réessayer.',
            'validateValueRangeFallback': 'La valeur doit être comprise entre 20 et 100% :)'
        }
    },
    'final': {
        response: {
            'res-1': 'Merci pour l\'info :)',
            'res-2': ' Voulez-vous continuer ?',
            'res-3': ' Vous pouvez obtenir la simulation complète ici http://develop.wedou.fr'
        },
        buttons: {
            'yes': 'Oui',
            'no': 'Non'
        },
        switch: {
            '0': 'go',
            '1': 'get a quote'
        }
    },
    'go - get email': {
        response: {
            'res-1': 'Afin de continuer et d\'échanger en toute sécurité, j\'ai besoin de votre adresse e-mail. Elle me permettra de vous enregister et de vous rediriger vers notre plateforme sécurisée sur laquelle je vous demanderai des informations complémentaires qui nous permettront de confirmer cette offre. Votre adresse email : ',
            'emailValidaterFallback': 'Oups, il semblerait que cet utilisateur existe déjà, merci de renseigner une autre adresse :)',
            'emailParserFallback': 'Ce courriel n\'est pas valide, veuillez réessayer. :)'
        }
    },
    'go - continue with registration': {
        response: {
            'res-1': 'Génial, vous pouvez continuer en cliquant sur le lien :)',
        }
    },
    'final-with-error': {
        response: {
            'res-1': 'Merci pour l\'info :)',
        }
    },
    'support-needed': {
        response: {
            'res-1': 'Vous serez contacté par un conseiller très prochainement :)',
        },
		buttons: {
            'leave an email': 'Donner votre e-mail',
            'leave a number': 'Donner votre numéro de téléphone',
        }
    },
    'support-needed-end': {
        response: {
            'res-1': 'Nos conseillers ne sont pas disponibles pour l’instant, ils vous contacterons dès que possible !',
        }
    },
    'user-help-1': {
        response: {
            'res-1': `Comment puis-je vous aider ?`,
            'res-2': 'Voyons ce que nous pouvons faire pour vous',
           	'res-3':  'Ce sont les points sur lesquels je peux vous aider',
            'res-4': 'Sur quels points avez-vous besoin d\'aide',
            'oneOfFallback': 'Désolé, vous devez sélectionner l\'un des éléments suivants :'
        },
        buttons: {
            'restart': 'Recommencer',
            'speak with agent': 'Parler avec moi',
            'go back': 'Continuer'
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
            'res-1': `Peut-être souhaiteriez-vous recommencer la simulation ou entrer en contact avec l’un de nos conseillers ?`,
            'oneOfFallback': 'Désolé, vous devez sélectionner l\'un des éléments suivants :'
        },
        buttons: {
            'restart': 'Recommencer',
            'speak with agent': 'Parler avec un conseiller',
            'go back': 'Continuer'
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
            'res-1': `Comment puis-je vous aider ?`,
            'res-2': 'Voyons ce que nous pouvons faire pour vous',
            'res-3':  'Ce sont les points sur lesquels je peux vous aider',
            'res-4': 'Sur quels points avez-vous besoin d\'aide ?'
        },
        buttons: {
            'info': 'Info',
            'back to questions': 'Retour aux questions'
        }
    },
    'help-switch': {
        starters: ['info', 'retour aux questions', 'back to questions'],
        response: {
            'fb-res-1': 'Désolé, je n\'ai pas compris. Voulez-vous recommencer ?'            
        },
        buttons: {
            'restart': 'Oui',
            'no': 'Non'
        },
        switch: {
            '0': 'info',
            '1': 'back to questions'
        }
    },
    'help-2': {
        response: {
            'res-1': `Heureuse d'avoir pu aider`,
            'res-2': `Voulez-vous revenir à la question ?`
        },
        buttons: {
            'yes': 'Oui',
            'no': 'Non'
        }
    },
    'help-2-switch': {
        response: {
            'fb-res-1': 'Désolé, je n\'ai pas compris. Voulez-vous recommencer ?'
        },
        starters: ['oui', 'non', 'yes', 'no'],
        switch: {
            '0': 'oui',
            '1': 'non'
        },
        buttons: {
            'restart': 'Oui',
            'no': 'Non'
        }
    },
    'fail-switch': {
        starters: ['redémarrer', 'non', 'restart', 'no'],
        switch: {
            '0': 'restart',
            '1': 'no'
        },
        response: {
            'fb-res-1': 'Désolé, je n\'ai pas compris. Voulez-vous recommencer ?'
        },
        buttons: {
            'restart': 'Recommencer',
            'no': 'Non'
        }
    },
    'no-recovory': {
        starters: ['no-recovory', 'no'],
        response: {
            'res-1': 'Ok, parfait. Vous pouvez taper aide pour des informations supplémentaires ou taper recommencer pour démarrer le processus depuis le début',
            'fb-res-1': 'Désolé, je n\'ai pas compris. Voulez-vous recommencer ?'
        },
        buttons: {
            'restart': 'Recommencer',
            'no': 'Non'
        }
    },
    helpers: {
        'first' : 'premier',
        'second': 'second',
        'third' : 'troisième',
        'default' : 'Nombre de prêts invalide'
    },
    dateValues: {
        values: [ 'années', 'mois', 'ans' ]
     },
    values: {
        'années': 'years',
        'ans': 'years',
        'mois': 'months'
    },
    revertValues: {
        'yes': 'Oui',
        'no': 'Non',
        'years': 'ans',
        'months': 'mois'
    },
    hashLinks: {
        'success': 'Continuer'
    },
    go: {
        'alone': 'Et voilà ! Félicitations, avec Wedou vous pouvez économiser $savings$ EUR sur le coût total restant de votre assurance (estimé à $insurance$ EUR)',                                                                                                                                                                                                                                                                       
        'with-coborrower': 'Et voilà ! Félicitations, avec Wedou vous pouvez économiser $savings$ EUR sur le coût total restant de votre assurance (estimé à $insurance$ EUR), sur la durée restante de votre prêt ! Et $coBorrowerName$ pourrait économiser $coSavings$ EUR (estimé à partir d\'un coût total restant d\'assurance de $coInsurance$ EUR) :)',
        'changers': ['savings', 'monthly', 'yearly', 'insurance', 'coSavings', 'coMonthly', 'coYearly', 'coInsurance']
       },
    bravos: {
        0: '$firstName$, malheureusement je ne peux actuellement pas vous offrir un tarif adapté à votre situation.',
        1 : '$firstName$, vous aviez bien négocié votre tarif ! Je vous conseille de ne pas changer votre assurance.',
        2: '$firstName$, nous fonctionnons sur des principes communautaires et nous ne sommes malheureusement pas encore en mesure de couvrir le montant de votre crédit.',
        3: '$firstName$, Vous avez presque remboursé votre prêt ; un changement d’assurance а ce stade ne serait pas intéressant pour vous. Je vous conseille de garder votre assurance actuelle.'
    },
    failReasons: {
        'borrowerTooYoung': 'Désolé, vous devez être âgé d\'au moins 18 ans pour continuer :(',
        'Co-borrowerTooYoung': 'Désolé, votre co-emprunteur est trop jeune :('
    }
}