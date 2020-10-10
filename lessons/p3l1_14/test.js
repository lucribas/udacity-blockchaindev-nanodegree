
// correct example
// https://medium.com/coinmonks/signing-and-making-transactions-on-ethereum-using-web3-js-1b5663207d63

// open Ganache app in windows

// Configuration
var Web3 = require("web3")
var web3 = new Web3('HTTP://127.0.0.1:7545')


const EthereumTx = require('ethereumjs-tx').Transaction
const privateKey = Buffer.from(
  '8ffdc60b29849c05e7bb6a03c846046cd7f958fb52cecf49acd77d291bf2c215',
  'hex',
)

var sender = '0x9160B7DA5aB2aD4dA63614606241bBda09d44eC0'
var receiver = '0x407AcE8e9A73AD935733D81E5beC969Fb5d7AD89'

const txParams = {
	nonce: '0x06',
	from: sender,
    to: receiver,
    gasPrice: 20000000,
	gasLimit: 30000,
	value: web3.utils.toHex(web3.utils.toWei("23", "ether")),
	"gas": 200000,	
	// gasPrice: '0x09184e72a000',
	// gasLimit: '0x2710',
	// value: '0x01',
    // data: "0x00"
}

// The second parameter is not necessary if these values are used
const tx = new EthereumTx(txParams)
tx.sign(privateKey)
const serializedTx = tx.serialize()

web3.eth.getBalance(sender).then(console.log)
web3.eth.getBalance(receiver).then(console.log)

web3.eth.sendSignedTransaction(serializedTx).then(receipt => console.log("Transaction receipt: ", receipt))
.catch(err => console.error(err));

web3.eth.getGasPrice().then(console.log)

