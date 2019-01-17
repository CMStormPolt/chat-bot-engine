let { bankSynonims } = require('./db/banks')
let { insurersSynonims } = require('./db/insurers')

let synonims = {
    bankSynonims,
    insurersSynonims
}
// let banks = [
//     {
//         name: 'Societe Generale',
//         synonims: ['societe generale', 'soc gener', 'soce', 'generale','societegenerale', 'sg'],
//         id: 'societeGenerale'
//     },
    // {
    //     name: 'Crédit du Nord',
    //     synonims: ['crédit du nord','credit du nord','nord', 'nort','creditDuNord'],
    //     id: 'creditDuNord'
    // },
    // {
    //     name: 'Boursorama',
    //     synonims: ['boursorama','boursorama banque','Bursorama banqe','boursorama'],
    //     id: 'boursorama'
    // },
    // {
    //     name: 'Banque Populaire de l\'Ouest',
    //     synonims: ['banke populaire','bankque populaire', 'populaire de', 'de l\'quest','banquePopulaireDeLOuest'],
    //     id: 'banquePopulaireDeLOuest'
    // },
    // {
    //     name: 'Banque Populaire Val de France',
    //     synonims: ['banque populaire val de france','banke populaire','bankque populaire', 'populaire val', 'val de france', 'banquePopulaireValDeFrance'],
    //     id: 'banquePopulaireValDeFrance'
    // },
    // {
    //     name: 'Barclays',
    //     synonims: ['barclays','barkleis','barcleis', 'barklays', 'barkleys'],
    //     id: 'barclays'
    // },
    // {
    //     name: 'BFM',
    //     synonims: ['bfm','b f m','bmf'],
    //     id: 'bfm'
    // },
    // {
    //     name: 'BNP Paribas',
    //     synonims: ['bnp paribas','paribas','bnp', 'b n p', 'parybas','bnpParibas'],
    //     id: 'bnpParibas'
    // },
    // {
    //     name: 'BPE Banque privée',
    //     synonims: ['bpe banque privée','b p e','privee', 'bpe Banque', 'bpe Banke','bpeBanquePrivee'],
    //     id: 'bpeBanquePrivee'
    // },
    // {
    //     name: 'BRED',
    //     synonims: ['bred','b r e d','bret', 'bret', 'brat'],
    //     id: 'bred'
    // },
    // {
    //     name: 'Caisse d\'Epargne',
    //     synonims: ['caisse d\'epargne','caise','kaise', 'kaisse', 'depargne', 'depergne','caisseDEpargne'],
    //     id: 'caisseDEpargne'
    // },
    // {
    //     name: 'Casden',
    //     synonims: ['casden','kasden', 'kasdan', 'casdan', 'cesdan'],
    //     id: 'casden'
    // },
    // {
    //     name: 'Crédit Agricole',
    //     synonims: ['crédit agricole','credit agricole', 'agrikole', 'agrycole','creditAgricole'],
    //     id: 'creditAgricole'
    // },
    // {
    //     name: 'Crédit Coopératif',
    //     synonims: ['crédit coopératif','credit cooperatif', 'kooperatif', 'koperatif','coperatif','creditCooperatif'],
    //     id: 'creditCooperatif'
    // },
    // {
    //     name: 'Crédit Foncier de France',
    //     synonims: ['crédit foncier de france','credit foncier de france', 'foncier', 'de france','creditFoncierDeFrance'],
    //     id: 'creditFoncierDeFrance'
    // },
    // {
    //     name: 'Crédit Mutuel Arkéa',
    //     synonims: ['crédit mutuel arkéa','credit mutuel arkea', 'arkea', 'mutuel', 'arka','creditMutuelArkea'],
    //     id: 'creditMutuelArkea'
    // },
    // {
    //     name: 'Crédit Mutuel Centre-Est Europe',
    //     synonims: ['crédit mutuel centre-est europe','credit mutuel centre-est europe', 'centre-est', 'europe','creditMutuelCentreEstEurope'],
    //     id: 'creditMutuelCentreEstEurope'
    // },
    // {
    //     name: 'Crédit Mutuel Nord Europe',
    //     synonims: ['crédit mutuel nord europe','credit mutuel nord europe', 'nord', 'europe','creditMutuelNordEurope'],
    //     id: 'creditMutuelNordEurope'
    // },
    // {
    //     name: 'HSBC',
    //     synonims: ['hsbc','h s b c'],
    //     id: 'hsbc'
    // },
    // {
    //     name: 'La Banque Postale',
    //     synonims: ['la banque postale','postale', 'la banque', 'la banke','laBanquePostale'],
    //     id: 'laBanquePostale'
    // },
    // {
    //     name: 'LCL',
    //     synonims: ['lcl','l c l'],
    //     id: 'lcl'
    // },
    // {
    //     name: 'Mutlog',
    //     synonims: ['mutlog','mutlok'],
    //     id: 'mutlog'
    // }
// ]



function transformToLocalBanksFormat(itemNames = []){
    return itemNames.map((itemName)=>{
        return {
            id: itemName.key,
            name: itemName.name,
            synonims: getSynonims(itemName.name, itemName.key)
        }
    })
}

function getSynonims(bankName, key){
    // let synonims = bankName.split(' ').filter((synonym)=>{
    //     // console.log(synonym)
    //     // console.log(synonym.toLowerCase() !== 'banque' && synonym.toLowerCase() !== 'bank')
    //      return synonym.toLowerCase() !== 'banque' && synonym.toLowerCase() !== 'bank'
    // }).map((synon)=>{
    //     return synon.toLowerCase()
    // })
    // return synonims
    return [bankName.toLowerCase(), key]
}

function mergeBanks(itemNames, synonimsName){
    itemNames = itemNames.map((itemName)=>{
        let itemSynonims = synonims[synonimsName][itemName.name] || bankSynonims[itemName.id]
        if(itemSynonims){
            itemName.synonims = itemName.synonims.concat(itemSynonims)
        }
        return itemName
    })
    return itemNames
}

module.exports = {
    mergeBanks,
    transformToLocalBanksFormat
}