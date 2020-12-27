- [Smart Contract - step by step](#smart-contract---step-by-step)
	- [Steps to Install the Environment](#steps-to-install-the-environment)
		- [Node.js](#nodejs)
		- [Truffle and other packets](#truffle-and-other-packets)
	- [To compile and run tests](#to-compile-and-run-tests)
	- [Frontend](#frontend)
	- [Versions](#versions)
	- [Results](#results)
		- [Unit Tests Terminal Output](#unit-tests-terminal-output)
	- [To deploy in Brinkeby](#to-deploy-in-brinkeby)
		- [Deployment Terminal Output](#deployment-terminal-output)
		- [Contract Address](#contract-address)
		- [Token Address](#token-address)
		- [Transaction Hashes](#transaction-hashes)
		- [Frontend screenshots](#frontend-screenshots)
		- [Etherscan screenshots](#etherscan-screenshots)

# Smart Contract - step by step

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


## Frontend

For running the Front End of the DAPP, open another terminal window and go inside the project directory, and run:

```bash
cd appvue
```

Then follow the instruction in [link](../appvue/)

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

## Results

### Unit Tests Terminal Output

```bash
truffle develop

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



      √ can the Farmer plant a Grape (460047 gas)
      √ can the Farmer harvest a Grape (271603 gas)
      √ can the Inspector audit a Grape (121943 gas)
      √ can the Farm process a Grape (83263 gas)
      √ can the Producer create a Juice (144102 gas)
      √ can the Producer blend a Juice (206483 gas)
      √ can the Producer produce a Juice (187807 gas)
      √ can the Inspector certify a Juice (147415 gas)
      √ can the Producer pack a Juice (84184 gas)
      √ can the Distributor sell a Juice (83211 gas)
      √ can the Consumer buy a Juice (121986 gas)

  11 passing (23s)

truffle(develop)>
```

## To deploy in Brinkeby

Fist send some funds to your account. Use Ganache to get the addess of the first account from your secrets.txt mnemonic.


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

   Deploying 'Migrations'
   ----------------------
   > block number:        7788338
   > block timestamp:     1609005216
   > account:             0x1225b8112B4bfF7B3332C53d7C18c658B9d1Eb91
   > balance:             0.490716305
   > gas used:            205035 (0x320eb)
   > gas price:           21 gwei
   > value sent:          0 ETH
   > total cost:          0.004305735 ETH

   -------------------------------------
   > Total cost:         0.004305735 ETH


2_deploy_contracts.js
=====================

   Deploying 'SupplyChain'
   -----------------------
   > block number:        7788340
   > block timestamp:     1609005248
   > account:             0x1225b8112B4bfF7B3332C53d7C18c658B9d1Eb91
   > balance:             0.413703509
   > gas used:            3639916 (0x378a6c)
   > gas price:           21 gwei
   > value sent:          0 ETH
   > total cost:          0.076438236 ETH

   -------------------------------------
   > Total cost:         0.076438236 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.080743971 ETH





Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 10000000 (0x989680)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x30594b283676f07fff9dc17e8da7e1b6a682a00eac2b1a3a456ac72773abb1b1
   > Blocks: 2            Seconds: 20
   > contract address:    0x7DB630e043dD49FD349840555099cca485490688
   > block number:        7788342
   > block timestamp:     1609005286
   > account:             0x1225b8112B4bfF7B3332C53d7C18c658B9d1Eb91
   > balance:             0.490401305
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

   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xfe2bbc1d62ba9148f589d3dbb8bb06817c2d0a316f0cd629ef88f0bb41b29f38
   > Blocks: 1            Seconds: 12
   > contract address:    0xD4A4265DF78F092023ea5870545ca88609006FA5
   > block number:        7788344
   > block timestamp:     1609005317
   > account:             0x1225b8112B4bfF7B3332C53d7C18c658B9d1Eb91
   > balance:             0.410868509
   > gas used:            3744916 (0x392494)
   > gas price:           21 gwei
   > value sent:          0 ETH
   > total cost:          0.078643236 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.078643236 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.083263971 ETH

```

### Contract Address

contract address:    0xD4A4265DF78F092023ea5870545ca88609006FA5

### Token Address

<https://rinkeby.etherscan.io/address/0xD4A4265DF78F092023ea5870545ca88609006FA5>

### Transaction Hashes

transaction hash:   <https://rinkeby.etherscan.io/tx/0xfe2bbc1d62ba9148f589d3dbb8bb06817c2d0a316f0cd629ef88f0bb41b29f38>

### Frontend screenshots

![alt text](docs/frontend_1.png "Token")

### Etherscan screenshots

<https://rinkeby.etherscan.io/address/0xD4A4265DF78F092023ea5870545ca88609006FA5>
![alt text](docs/sm_deployed.png "Token")
