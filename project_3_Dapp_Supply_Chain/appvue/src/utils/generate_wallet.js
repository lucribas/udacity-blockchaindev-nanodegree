
const fs = require("fs")
const wallet = require("ethereumjs-wallet")

const pk = new Buffer.from('c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3', 'hex') // replace by correct private key
const account = wallet.fromPrivateKey(pk)
const password = 'something' // will be required to unlock/sign after importing to a wallet like MyEtherWallet
const content = JSON.stringify(account.toV3(password, {id: 'Farm' }))

// writes to a file
const address = account.getAddress().toString('hex')
const file = `UTC--${new Date().toISOString().replace(/[:]/g, '-')}--${address}`
fs.writeFileSync(file, content)