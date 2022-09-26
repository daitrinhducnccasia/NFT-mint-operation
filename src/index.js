const { withdraw } = require("./withdraw")
const fs = require('fs')
const { exportRandomWallet } = require("./wallet")


const loadWalletList = async() => {

    // Async case:
    // fs.readFile('walletList.json', "utf8", (err, jsonData) => {
    //     console.log("need jsonData:", jsonData)
    //     if (err) throw err
    //     let data = JSON.parse(jsonData)
    //     console.log("jsonData:", data)
    //     return JSON.parse(data)
    // })
    let rawData= fs.readFileSync('./models/walletList.json')
    let data = JSON.parse(rawData)
    return data
    }

const app = async () => {
    await exportRandomWallet(1000)
    const walletList = await loadWalletList()
    console.log(walletList.length)
    var addressList = walletList.map(item => item.address)
    console.log(addressList.slice(0, 3))
    // await withdraw(addressList)
}

app()