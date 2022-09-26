const { Spot } = require("@binance/connector")
const fs = require("fs")
require("dotenv").config()

const secret = process.env.SECRET
const apiKey = process.env.APIKEY
const client = new Spot(apiKey, secret)

const accountStatus = async () => {
  try {
    const res = await client.accountStatus()
    client.logger.log(res.data)
  } catch (e) {
    client.logger.error(e)
  }
}

const userAsset = async (asset) => {
  console.log("userAsset:", asset)
  const options = { asset }
  try {
    const res = await client.userAsset(options)
    client.logger.log(res.data)
  } catch (e) {
    client.logger.error(e)
  }
}

const withdrawHistory = async (_asset, _counter) => {
  const opt = {
    coin: _asset,
    status: 6,
    withdrawOrderId: _counter.toString() // withdrawCounter.toString()
  }
  try {
    const res = await client.withdrawHistory(opt)
    client.logger.log(res.data)
    return res.data
  } catch (err) {
    client.logger.error(err.response.headers) // full response header
    client.logger.error(err.response.status) // 400
    client.logger.error(err.response.data)
  }
}

// 10.0 is the minimal. 0.29 USDT network fee
const withdarwAmoutUSDT = 10.29
// withdraw USDT from BSC network.
const withdrawUSDT = async (addr, _counter) => {
  const options = {
    withdrawOrderId: _counter.toString(),
    network: "BSC"
    // walletType: 0 //default: 0-Spot
  }
  try {
    const res = await client.withdraw("USDT", addr, withdarwAmoutUSDT, options)
    // client.logger.log(res.data)// {id: 0418060f3f4e416ca7686acdc4e33955}
    _counter++
    return res.data
  } catch (err) {
    client.logger.error(err.response.headers) // full response header
    client.logger.error(err.response.status) // 400
    client.logger.error(err.response.data) // error code and msg
  }
}

// 0.0098 is minimal. 0.00096 ETH is network fee.
const withdarwAmoutETH = 0.01
// withdraw ETH from ETH network.
const withdrawETH = async (addr, _counter) => {
  const options = {
    withdrawOrderId: _counter.toString(),
    network: "ETH"
    // walletType: 0 //default: 0-Spot
  }
  try {
    const res = await client.withdraw("ETH", addr, withdarwAmoutETH, options)
    // client.logger.log(res.data)// e.g. {id: 0418060f3f4e416ca7686acdc4e33955}
    _counter++
    return res.data
  } catch (err) {
    client.logger.error(err.response.headers) // full response header
    client.logger.error(err.response.status) // 400
    client.logger.error(err.response.data) // error code and msg
  }
}

// Ref: https://binance.github.io/binance-connector-node/module-Wallet.html#withdraw
const withdraw = async (_destinationAddressList) => {
  /// Configuration for withdrawAsset
  const asset = "USDT"
  // Note: Counterは毎回ユニークに。
  let withdrawCounter = 100
  const destinationAddressList = ["0xa6829D7C72618A54b77F5D63158d7333dD4dD293"]
  let withdrawIds = []

  try {
    await userAsset(asset)

    await Promise.all(
      _destinationAddressList.map(async (addr) => {
        /// Comment Out: Execution to withdraw
        switch (asset) {
          case "ETH":
            // const id = await withdrawUSDT(addr, withdrawCounter)
            withdrawIds.push(id)
            break
          case "USDT":
            // const id = await withdrawUSDT(addr, withdrawCounter)
            withdrawIds.push(id)
        }
      })
    )

    let logArray = new Array()
    await Promise.all(
      withdrawIds.map(async (id, idx) => {
        const logPerId = await withdrawHistory(asset, idx)
        logArray[idx] = logPerId
      })
    )

    const dateTime = new Date().toISOString()
    const fileName = dateTime + "-" + asset + "-output.log"
    console.log(fileName)
    var file = fs.createWriteStream(fileName)
    file.on("error", (err) => {
      console.error(err)
    })
    logArray.forEach((line) => {
      file.write(JSON.stringify(line) + "\n")
    })
    file.end()
  } catch (e) {
    console.error(e)
  }
}

const str = "Hello!"

module.exports = {
  str,
  withdraw
}