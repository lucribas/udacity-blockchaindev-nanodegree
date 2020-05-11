/**
 *                          Blockchain Class
 *  The Blockchain class contains the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because an array
 *  isn't a persistent storage method.
 *  
 */

const hex2ascii = require('hex2ascii');
const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');

class Blockchain {

    /**
     * Constructor of the class, you will need to setup your chain array and the height
     * of your chain (the length of your chain array).
     * Also everytime you create a Blockchain class you will need to initialized the chain creating
     * the Genesis Block.
     * The methods in this class will always return a Promise to allow client applications or
     * other backends to call asynchronous functions.
     */
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     * You should use the `addBlock(block)` to create the Genesis Block
     * Passing as a data `{data: 'Genesis Block'}`
     */
    async initializeChain() {
        if( this.height === -1){
            let block = new BlockClass.Block({data: 'Genesis Block'});
            await this._addBlock(block);
        }
    }

    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */
    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't forget 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */
    _addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            let height = self.chain.length;
            block.previousBlockHash = self.chain[height - 1] ? self.chain[height - 1].hash : null;
            block.height = height;
            block.time = new Date().getTime().toString().slice(0,-3);
            block.hash = await SHA256(JSON.stringify(block)).toString();
			const blockValid = block.hash && (block.hash.length === 64) && (block.height === self.chain.length) && block.time;
            blockValid ? resolve(block) : reject(new Error('Cannot add invalid block.'));
        })
        .catch(error => console.log('[ERROR] ', error)) 
        .then(block => {
            this.chain.push(block);
            this.height = this.chain.length - 1;
            return block;
        });
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            let unsignedMessage = `${address}:${new Date().getTime().toString().slice(0,-3)}:starRegistry`;
            resolve(unsignedMessage);
        });
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * Algorithm steps:
     * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
     * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
     * 3. Check if the time elapsed is less than 5 minutes
     * 4. Verify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
     * 5. Create the block and add it to the chain
     * 6. Resolve with the block added.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */
    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            let requestTime = parseInt(message.split(':')[1]);
            let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
			const spendTime = (currentTime - requestTime);
            // reject on timeout
            if (spendTime >= (5 * 60)) reject(new Error('Request timed out.'));
            if (!bitcoinMessage.verify(message, address, signature)) reject(new Error('Invalid message.'));
            // add block to chain & resolve
            let block = new BlockClass.Block({ star });
            block.owner = address;
            block = await self._addBlock(block)
            resolve(block);             
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
           resolve(self.chain.filter(block => block.hash === hash)[0]);
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.height === height)[0];
            block ? resolve(block) : resolve(null);
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */
    getStarsByWalletAddress (address) {
        let self = this;
        let stars = [];
        // validate chain
        this.validateChain().then(errors => typeof errors === 'string' ?  console.log('[SUCCESS] ', errors) : errors.forEach(error => console.log('[ERROR] ', error)));
        return new Promise(async (resolve, reject) => {
            let ownedBlocks = self.chain.filter(block => block.owner === address);
            if (ownedBlocks.length === 0) reject(new Error('Address not found.'));
            stars = ownedBlocks.map(block => JSON.parse(hex2ascii(block.body)));
            stars ? resolve(stars) : reject(new Error('Failed to return stars.'));
        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check with the previousBlockHash
     */
    validateChain() {
        let self = this;
        let errorLog = [];
        return new Promise(async (resolve, reject) => {
            for (let block of self.chain) {
                if (await block.validate()) {
                    if (block.height > 0) { // skip genesis block
                        let prevBlock = self.chain.filter(b => b.height === block.height - 1)[0];
                        if (block.previousBlockHash !== prevBlock.hash) {
                            errorLog.push(new Error(`Invalid link: Block #${block.height} not linked to the hash of block #${block.height - 1}.`));
                        }
                    }
                } else {
                    errorLog.push(new Error(`Invalid block #${block.height}: ${block.hash}`))
                }
            }
            errorLog.length > 0 ? resolve(errorLog) : resolve('No errors detected.');
        });
    }

}

module.exports.Blockchain = Blockchain;   