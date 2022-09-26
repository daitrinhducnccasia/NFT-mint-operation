const { getRandomWallet, getVanityWallet } = require('./vanityEth')
const config = require('config')
const fs = require('fs')

const wallet_A_number = config.get('wallet_A.number')

const exportRandomWallet = async (number) => {
    let walletList = []
    for (var i=0; i<number; i++){
        const {checksumAddress: address, privKey} = getRandomWallet()
        walletList[i] = {address, privKey}
    }
    fs.writeFileSync('./models/walletList.json', JSON.stringify(walletList, null, 2),
        err => {
        if (err) {
            console.error(err)
        } else {
            console.log("GOOD")
        }
    })
    return walletList
}

module.exports = {
    exportRandomWallet
}