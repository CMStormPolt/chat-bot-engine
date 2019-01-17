
let moment = require('moment');
// let amortize = require('amortize');

console.log(moment('12.1994', 'MM.YYYY').toString())

let data = {
    msg: {
        loan: {
            //type: 'classic',
            initialAmount: '120000',
            duration: '11',
            interestRate: '2',
            interestRateFixed: true
        },
        insuranceRate: "",
        insurancePremium: '152', 
        insurancePremiumFixed: true,
        loanContractDate: '12/12/2010',
        birthDate: '21/05/1995'
    }
}

let state = {
    ammountBorrowed:  {
        value: "50000",
        type: "number"
    },
    birthDate:  {value: "Wed Nov 01 1990 00:00:00 GMT+0200", type: "date"},
    coBorrowerInsuranceCoverage:  {value: "4%", type: "freeText"},
    currentLoan:  {value: "1", type: "number"},
    firstName:  {value: "Ilian", type: "name"},
    fixedRate:  {value: "yes", type: "boolean"},
    lastName:  {value: "Petrov", type: "name"},
    loanBank:  {value: "Societe Generale", type: "freeText"},
    loanDiffered:  {value: "yes", type: "boolean"},
    loanDuration:  {value: "6", type: "number"},
    loanFirstInstallment:  {value: "Sat Nov 11 2014 00:00:00 GMT+0200", type: "date"},
    loanInsuranceSameBank:  {value: "yes", type: "freeText"},
    loanInterestRate:  {value: "5%", type: "number"},
    loans:  {1: {}},
    loansNumber:  {value: "1", type: "freeText"},
    loanType:  {value: "classic loan", type: "freeText"},
    monthlyInsurancePremiumFixed:  {value: "no", type: "boolean"},
    morgageCoBorrower:  {value: "alone", type: "freeText"},
    whatUserKnowsAboutInsurance:  {value: "the insurance rate", type: "freeText"}
} 


function parseDate(date) {
    let cd = new Date(date);
    return `${cd.getDate()}/${cd.getMonth()}/${cd.getFullYear()}`
}


let ageTariffs = {
    20: 0.0482,
    21: 0.0499,
    22: 0.0518,
    23: 0.0540,
    24: 0.0565,
    25: 0.0594,
    26: 0.0628,
    27: 0.0668,
    28: 0.0714,
    29: 0.0767,
    30: 0.0826,
    31: 0.0895,
    32: 0.0974,
    33: 0.1065,
    34: 0.1169,
    35: 0.1288,
    36: 0.1421,
    37: 0.1459,
    38: 0.1472,
    39: 0.1483,
    40: 0.1975,
    41: 0.2021,
    42: 0.2028,
    43: 0.2035,
    44: 0.2043,
    45: 0.2050

}


teaserCalculate = params => {

    let { msg } = params;
    let { loan, insuranceRate, insurancePremium, insurancePremiumFixed } = msg;

    if (!loan.interestRateFixed) {
        throw new Error('currentlyBenefitFromGuaranteesAndTariff');
    }

    let loanAmount = Number.parseFloat(loan.initialAmount);
    let loanInterestRate = Number.parseFloat(loan.interestRate);
    let loanDuration = Number.parseFloat(loan.duration);
    insuranceRate = Number.parseFloat(insuranceRate);
    insurancePremium = Number.parseFloat(insurancePremium);

    // Dates
    const now = moment(new Date());
    const twoMonthsFromNow = now.add(2, 'months');
    const loanContractDate = moment(msg.loanContractDate, 'DD/MM/YYYY');
    const thisYearAnniversary = moment(`${now.year()}-${loanContractDate.format('MM')}-${loanContractDate.format('DD')}`);

    // If contract anniversary is before two months from now, set anniversary for next year.
    const nextAnniversary = twoMonthsFromNow.diff(thisYearAnniversary, 'days') > 0
        ? moment(thisYearAnniversary).add(1, 'year')
        : thisYearAnniversary;

    // Check borrower's age at next anniversary
    const ageAtAnniversary = nextAnniversary.diff(moment(msg.birthDate, ['DD/MM/YYYY', 'MM/YYYY']), 'years'); // TODO: Check this?
    if (ageAtAnniversary < 20) {
        // throw new Error('Age Anniversary is bellow 20!');
        throw new Error('currentlyBenefitFromGuaranteesAndTariff');
    }
    if (ageAtAnniversary > 45) {
        // You benefit from guaranties and a tariff adapted to your situation. We recommend you keep your current insurance
        throw new Error('ageTooHigh');
    }

    if (insuranceRate < ageTariffs[ageAtAnniversary]) {
        throw new Error('currentlyBenefitFromGuaranteesAndTariff');
    }

    // Check if outstanding principal at next anniversary is more than 20 000 TODO: make this configurable
    const loanDurationMonths = loanDuration * 12;
    // RS 170823 [Typofix] Variable name changed to monthsPaid :)
    const monthsPaid = nextAnniversary.diff(loanContractDate, 'months');
    const monthsRemaining = loanDurationMonths - monthsPaid;
    let outstandingPrincipalAtAnniversary;

    // RS 170921 [Bugfix] You can't substitute an insurance, for which there will be no loan :)
    if (monthsRemaining < 12) {
        // throw new Error('The loan will expire soon! '); // TODO: Move all validation and error handling in one place
        return 0;
        // throw new Error('currentlyBenefitFromGuaranteesAndTariff'); // TODO: Move all validation and error handling in one place
    }

    // RS 170823 [Improvement] Interest rate is always mandatory => it's still better to have validation in one place
    if (loanInterestRate === false || loanInterestRate === null || typeof loanInterestRate === 'undefined') {
        // throw new Error('No interest rate provided!');
        throw new Error('currentlyBenefitFromGuaranteesAndTariff');
    }

    // msg amount remaining at anniversary date
    outstandingPrincipalAtAnniversary = amortize({
        amount: loanAmount,
        totalTerm: loanDurationMonths,
        rate: loanInterestRate,
        amortizeTerm: monthsPaid
    });

    // Now, let's see about insurance
    let insuranceSavings;
    if (insurancePremiumFixed === true) {
        // RS 170823 [Bugfix] Multiplied by monthsRemaining => result checked and OK
        insuranceSavings = insurancePremium
            ? (insurancePremium * monthsRemaining) / 2
            : (((insuranceRate / 100) * loanAmount) / 12) * monthsRemaining / 2;
    } else if (insurancePremiumFixed === false) {
        const balances = [];
        for (let i = 0; i < monthsRemaining; i++) {
            balances.push(amortize({
                amount: loanAmount,
                totalTerm: loanDurationMonths,
                rate: loanInterestRate,
                // RS 170823 [Bugfix] Start with monthsPaid
                // amortizeTerm: (monthsPaid + i + 1) 
                amortizeTerm: (monthsPaid + i)
            }).balance);
        }

        // RS 170823 [Bugfix] premium = balance * insuranceRate / 12 => no need to get previous balance
        insuranceSavings = balances
            .map((balance) => (balance * (insuranceRate / 12) / 100))
            .reduce((acc, cur) => {
                return acc + cur;
            }, 0) / 2;
        // insuranceSavings = balances
        //    .map((balance, index, array) => ((array[index - 1] || array[0]) * ((insuranceRate) / 12)) / 100)
        //    .reduce((acc, cur) => {
        //        return acc + cur;
        //    }, 0) / 2;
    } else {
        // throw new Error('No insurance premium type supplied!'); // TODO: Move all validation and error handling in one place
        throw new Error('currentlyBenefitFromGuaranteesAndTariff'); // TODO: Move all validation and error handling in one place
    }

    if (outstandingPrincipalAtAnniversary < 20000) {
        // throw new Error('Outstanding Principal At Anniversary is less than 20000'); // TODO: Move all validation and error handling in one place
        throw new Error('currentlyBenefitFromGuaranteesAndTariff'); // TODO: Move all validation and error handling in one place
    }

    // RS 170823 [Improvement] Return rounded result, it's a teaser so no decimal digits
    let round = Math.round(insuranceSavings);
    if (Number.isNaN(round)) {
        // throw new Error('Savings not a number!');
        throw new Error('currentlyBenefitFromGuaranteesAndTariff');
    }
    // RS 170921 [Bugfix] If savings <= 0, bravo => shouldn't ever come here
    if (round <= 0) {
        // throw new Error('Savings not a positive value!');
        throw new Error('currentlyBenefitFromGuaranteesAndTariff');
    }
    console.log(round)
    return round;
}


function Calculate(params) {
        let loanContractDate = parseDate(params.loanFirstInstallment.value);
        let birthDate = parseDate(params.birthDate.value);
    
        let data = {
            msg: {
                loan: {
                    initialAmount: params.ammountBorrowed.value,
                    duration: params.loanDuration.value,
                    interestRate: params.loanInterestRate.value.replace('%', ''),
                    interestRateFixed: params.fixedRate.value === "yes" ? true : false
                },
                insuranceRate: params.loanInterestRate.value.replace('%', '') || '',
                insurancePremium: '',
                insurancePremiumFixed: params.monthlyInsurancePremiumFixed.value === "yes" ? true : false,
                loanContractDate,
                birthDate
            }
        }
        return teaserCalculate(data)
    }

    Calculate(state)