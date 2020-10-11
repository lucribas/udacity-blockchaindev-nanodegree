# Decentralized Star Notary Project

For this project, you will create DApp notary service leveraging the Ethereum platform. You write smart contract that offer securely prove the existence for any digital asset - in this case unique stars and their metadata!



## Project Instructions

### Task 1 - Add Smart Contract Functions
Your Project is to Modify the StarNotary version 2 contract code to achieve the following:
| SubTasks   | Details |  Status |
|:-------:|:--------|:--------:|
| 1.1 | Add a name and a symbol for your starNotary tokens. | :ok_hand: |
| 1.2 | Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.   | :ok_hand: |
| 1.3 | Add a function called exchangeStars, so 2 users can exchange their star tokens...Do not worry about the price, just write code to exchange stars  between users.  | :ok_hand: |
| 1.4 | Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.  | :ok_hand: |


### Task 2 - Add supporting Unit Tests
Add supporting unit tests, to test the following:
| SubTasks   | Details |  Status |
|:-------:|:--------|:--------:|
| 2.1 | The token name and token symbol are added properly.  | :ok_hand: |
| 2.2 | 2 users can exchange their stars.  | :ok_hand: |
| 2.3 | Stars Tokens can be transferred from one address to another.  | :ok_hand: |

### Task 3 - Deploy your Contract to Rinkeby
Deploy your Contract to Rinkeby.
| SubTasks   | Details |  Status |
|:-------:|:--------|:--------|
| 3.1 | Edit the truffle.config file to add settings to deploy your contract to the Rinkeby Public Network.  |  |

### Task 4 - Modify the front end of the DAPP
Modify the front end of the DAPP to achieve the following:

| SubTasks   | Details |  Status |
|:-------:|:--------|:--------|
| 4.1 | Lookup a star by ID using tokenIdToStarInfo() (you will have to add code for this in your index.html and index.js files)  |  |

### Task 5 - Add a ``Readme.md`` file
The ``Readme.md`` file should include the following:
| SubTasks   | Details |  Status |
|:-------:|:--------|:--------|
| 5.1 | Your ERC-721 Token Name  |  |
| 5.2 | Your ERC-721 Token Symbol  |  |
| 5.3 | Version of the Truffle and OpenZeppelin used  |  |



### Helpful Links
- [Fixed parser error in Solidity extension of VSCode: ParserError: Expected identifier, got 'LParen'](https://ethereum.stackexchange.com/questions/51353/parsererror-expected-identifier-got-lparen/87686#87686)


## Steps to Install the Environment

### Node.js

Install a clean version of nodejs. I´m using the nvm (Node Version Manager) tool to allow install and switch between versions. Currently only version 10 of node.js works:
```
nvm install 10.22.1
nvm use 10.22.1
```

### OpenZeppelin

install openzeppelin-solidity:
```
npm i openzeppelin-solidity
```

### Truffle

install truffle:
```
npm install -g truffle
```

## To compile and run tests

For starting the development console, run:
```
truffle develop
```

For compiling the contract, inside the development console, run:
```
compile
```

For migrating the contract to the locally running Ethereum network, inside the development console, run:
```
migrate --reset
```

For running unit tests the contract, inside the development console, run:
```
test
```

For running the Front End of the DAPP, open another terminal window and go inside the project directory, and run:
```
cd app
npm run dev
```

## Versions


| Package   | Version |
|:-------:|:-------------|
|Truffle| v5.1.48 (core: 5.1.48) |
|Solidity| 0.6.12 (solc-js) |
|Node| v10.22.1 |
|Web3.js| v1.2.1 |

As configured in truffle-config.js the smart contracts was compiled successfully using:
   - solc: 0.6.12+commit.27d51765.Emscripten.clang

# Results


### Unit Tests Terminal Output


### Deployment Terminal Output


### Contract Address


### Contract Hash


### Transaction Hashes


### Frontend screenshots

