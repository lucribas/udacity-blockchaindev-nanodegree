- [Smart Contract - step by step](#smart-contract---step-by-step)
	- [Versions](#versions)
	- [Steps to Install the Environment](#steps-to-install-the-environment)
		- [Node.js](#nodejs)
		- [Truffle and other packets](#truffle-and-other-packets)
	- [To compile and run tests](#to-compile-and-run-tests)
- [Deployment](#deployment)
	- [Ganache](#ganache)
	- [Get some funds](#get-some-funds)
	- [To deploy in Brinkeby](#to-deploy-in-brinkeby)
		- [Deployment Terminal Output](#deployment-terminal-output)
		- [Contract Address](#contract-address)
		- [Transaction Hashes](#transaction-hashes)
		- [Etherscan screenshots](#etherscan-screenshots)
- [Frontend](#frontend)
	- [Frontend Online - Vue](#frontend-online---vue)
	- [Frontend Video Walkthrough](#frontend-video-walkthrough)
	- [Frontend screenshots](#frontend-screenshots)

# Smart Contract - step by step

## Versions

Run `truffle version` command:

| Package   | Version |
|:-------:|:-------------|
|Truffle| v5.1.58 (core: 5.1.58) |
|Solidity| 0.6.12 (solc-js) |
|Node| v14.15.1 |
|Web3.js| v1.2.9 |

As configured in truffle-config.js the smart contracts was compiled successfully using:

- solc: 0.6.12

## Steps to Install the Environment

### Node.js

Install a clean version of nodejs. I´m using the nvm (Node Version Manager) tool to allow install and switch between versions. Currently the version 14 of node.js works:

```bash
nvm install 14.15.1
nvm use 14.15.1
```

### Truffle and other packets

install truffle, openzelepin, webpack and dependences:

```bash
cd project_3_Dapp_Supply_Chain\
npm i -g truffle
npm i --save openzeppelin-solidity
npm i --save truffle-hdwallet-provider
npm i -g webpack
npm i -g webpack-dev-server webpack-cli webpack-dev-middleware webpack-hot-middleware copy-webpack-plugin
```

## To compile and run tests

For starting the development console, run:

```bash
truffle develop
```

For compiling the contract, inside the development console, run:

```bash
compile
```
![](docs/compile_output.png)

For migrating the contract to the locally running Ethereum network, inside the development console, run:

```bash
migrate --reset
```
![](docs/migrate_output.png)

For running unit tests the contract, inside the development console, run:

```bash
test
```
![](docs/test_output.png)



# Deployment

## Ganache
```bash
npm install -g ganache-cli
```

create a file called ./secret.txt with your mnemonics of your wallet, like:

```txt
skin impose this task range body amused apple spin jazz inhale bench
```

edit line 24 of ./truffle-config.js and replace with your Infura Key:

```js
24:   const infuraKey = "c216e74355924a518e5d0d183e67b23c";	// INFURA - PROJECT ID
```

## Get some funds
Fist send some funds to your account. Use Ganache to get the addess of the first account from your secrets.txt mnemonic.
Go to https://faucet.rinkeby.io/ and send a tweet as instructions. Copy-past your tweet url and have fun!


## To deploy in Brinkeby

Then, execute the command:

```bash
truffle migrate --network rinkeby --reset
```

### Deployment Terminal Output

```bash
PS D:\GITHUB_M2\udacity-blockchaindev-nanodegree\project_3_Dapp_Supply_Chain> truffle migrate --network rinkeby --reset

Compiling your contracts...
===========================
> Compiling .\contracts\access\Roles.sol
> Compiling .\contracts\access\roles\ConsumerRole.sol
> Compiling .\contracts\access\roles\DistributorRole.sol
> Compiling .\contracts\access\roles\FarmerRole.sol
> Compiling .\contracts\access\roles\InspectorRole.sol
> Compiling .\contracts\access\roles\ProducerRole.sol
> Compiling .\contracts\core\Ownable.sol
> Artifacts written to D:\GITHUB_M2\udacity-blockchaindev-nanodegree\project_3_Dapp_Supply_Chain\build\contracts
> Compiled successfully using:
   - solc: 0.6.12+commit.27d51765.Emscripten.clang



Migrations dry-run (simulation)
===============================
> Network name:    'rinkeby-fork'
> Network id:      4
> Block gas limit: 10000000 (0x989680)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > block number:        7826129
   > block timestamp:     1609619370
   > account:             0x6b0790A0E8186D0AFd09BCBD64D83778ab318650
   > balance:             1.027869274
   > gas used:            205035 (0x320eb)
   > gas price:           21 gwei
   > value sent:          0 ETH
   > total cost:          0.004305735 ETH

   -------------------------------------
   > Total cost:         0.004305735 ETH


2_deploy_contracts.js
=====================

   Replacing 'SupplyChain'
   -----------------------
   > block number:        7826131
   > block timestamp:     1609619402
   > account:             0x6b0790A0E8186D0AFd09BCBD64D83778ab318650
   > balance:             0.95085673
   > gas used:            3639904 (0x378a60)
   > gas price:           21 gwei
   > value sent:          0 ETH
   > total cost:          0.076437984 ETH

   -------------------------------------
   > Total cost:         0.076437984 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.080743719 ETH





Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 10000000 (0x989680)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xe73d1dc36379d2e8691122b12d6b8e49356c2e3a92b65a04b17d576f7522666d
   > Blocks: 1            Seconds: 9
   > contract address:    0xD2Ce97573b2C0d367E6b942E4A2BF3B60ee20785
   > block number:        7826132
   > block timestamp:     1609619430
   > account:             0x6b0790A0E8186D0AFd09BCBD64D83778ab318650
   > balance:             1.027554274
   > gas used:            220035 (0x35b83)
   > gas price:           21 gwei
   > value sent:          0 ETH
   > total cost:          0.004620735 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.004620735 ETH


2_deploy_contracts.js
=====================

   Replacing 'SupplyChain'
   -----------------------
   > transaction hash:    0x1d1610918c0f5b5af92c8131048acaae360dbba09ff8c3d8c89b8e4e3d744d7e
   > Blocks: 0            Seconds: 8
   > contract address:    0x82EE57820D2e9d4b1b2eCe739FEEc0acA61e3213
   > block number:        7826134
   > block timestamp:     1609619460
   > account:             0x6b0790A0E8186D0AFd09BCBD64D83778ab318650
   > balance:             0.94802173
   > gas used:            3744904 (0x392488)
   > gas price:           21 gwei
   > value sent:          0 ETH
   > total cost:          0.078642984 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.078642984 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.083263719 ETH




```

### Contract Address

contract address:    0x82EE57820D2e9d4b1b2eCe739FEEc0acA61e3213

<https://rinkeby.etherscan.io/address/0x82EE57820D2e9d4b1b2eCe739FEEc0acA61e3213>

### Transaction Hashes

deployment transaction hash:   <https://rinkeby.etherscan.io/tx/0x1d1610918c0f5b5af92c8131048acaae360dbba09ff8c3d8c89b8e4e3d744d7e>



### Etherscan screenshots

<https://rinkeby.etherscan.io/address/0x82EE57820D2e9d4b1b2eCe739FEEc0acA61e3213>
![alt text](docs/sm_deployed.png "Token")


# Frontend

For running the Front End of the DAPP, open another terminal window and go inside the project directory, and run:

```bash
cd appvue
```

Then follow the instruction in [link](../appvue/)


## Frontend Online - Vue

Following there is a online version of Fronted deployed in GitHub pages:
[https://lucribas.github.io/prj3_Dapp_Supply_Chain/index.html](https://lucribas.github.io/prj3_Dapp_Supply_Chain/index.html).

## Frontend Video Walkthrough

[![Walkthrough of Supply Chain Dapp](https://img.youtube.com/vi/l4dS7XAedws/0.jpg)](https://www.youtube.com/watch?v=l4dS7XAedws)


## Frontend screenshots

![alt text](docs/frontend_1.png "Token")