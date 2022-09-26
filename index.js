const { Spot }= require('@binance/connector')
require('dotenv').config()

const secret = process.env.SECRET
const apiKey = process.env.APIKEY
const client = new Spot(apiKey, secret)

const accountStatus = async () => {
    try {
        const res = await client.accountStatus()
        client.logger.log(res.data)
    } catch(e) {
        client.logger.error(e)
    }
}

const userAsset = async () => {
    try {
        const res = await client.userAsset()
        client.logger.log(res.data)
    } catch(e) {
        client.logger.error(e)
    }
}

const withdrawHistory = async () => {
    const opt = {
        coin: 'USDT',
        status: 6,
        startTime: new Date('2022-07-01').getTime()
    }
    try {
        const res = await client.withdrawHistory(opt)
        client.logger.log(res.data)
    } catch(e) {
        client.logger.error(e)
    }
}

const main = async() => {
    // await accountStatus()
    // await userAsset()
    await withdrawHistory()
}

main()