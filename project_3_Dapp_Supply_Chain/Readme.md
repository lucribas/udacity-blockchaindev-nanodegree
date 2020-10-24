
# Project 3: Dapp - Supply Chain Decentralized Application
- [Project 3: Dapp - Supply Chain Decentralized Application](#project-3-dapp---supply-chain-decentralized-application)
	- [Project Details](#project-details)
	- [Part 1: Plan the project with write-ups](#part-1-plan-the-project-with-write-ups)
		- [1.1 Project write-up - UML](#11-project-write-up---uml)
		- [1.2 Project write-up - Libraries](#12-project-write-up---libraries)
		- [1.3 Project write-up - IPFS](#13-project-write-up---ipfs)
		- [1.4 General Write Up](#14-general-write-up)
	- [Part 2: Write smart contracts](#part-2-write-smart-contracts)
	- [Part 3: Test smart contract code coverage](#part-3-test-smart-contract-code-coverage)
	- [Part 4: Deploy smart contracts on a public test network (Rinkeby)](#part-4-deploy-smart-contracts-on-a-public-test-network-rinkeby)
	- [Part 5: Modify client code to interact with smart contracts](#part-5-modify-client-code-to-interact-with-smart-contracts)
	- [Optional: Implement Infura to store product image](#optional-implement-infura-to-store-product-image)

## Project Details

Create a DApp supply chain solution backed by the Ethereum platform. Architect smart contracts that manage specific user permission controls as well as contracts that track and verify a product’s authenticity.

## Part 1: Plan the project with write-ups

### 1.1 Project write-up - UML

Project write-up include the following UML diagrams:

| SubTasks   | Details |  Status |
|:-------:|:--------|:--------:|
| Activity |  |  |
| Sequence |  |  |
| State |  |  |
| Classes<br>(Data Model) |  |  |

### 1.2 Project write-up - Libraries

If libraries are used, the project write-up discusses why these libraries were adopted.

### 1.3 Project write-up - IPFS

If IPFS is used, the project write-up discusses how IPFS is used in this project.

### 1.4 General Write Up

A general write up exists to items like steps and contracts address.

## Part 2: Write smart contracts

Write smart contracts with functions

CRITERIA


| CRITERIA   | MEETS SPECIFICATIONS |  Status |
|:-------|:--------|:--------:|
| SupplyChain.sol contains required tracking functions. | Smart contract implements functions to track.<br>For example:<br>- Product ID<br>- Product UPC<br>- Origination Information<br>- Farm<br>- Misc organization info<br>- Longitude & Latitude of geo coordinates<br>- Product notes |  |
| Ownable.sol contains required functions that establish owner and the transfer of ownership. | Ownable.sol has required functions that establish owner and the transfer of ownership. |  |
| ConsumerRole.sol contains required functions that manage the consumer role. | ConsumerRole.sol has required functions that manage the consumer role. |  |
| RetailerRole.sol contains required functions that manage the consumer role. | RetailerRole.sol has required functions that manage the consumer role. |  |
| DistributorRole.sol contains required functions that manage the consumer role. | DistributorRole.sol has required functions that manage the consumer role. |  |
| Additional roles implemented are integrated correctly. | Student has implemented additional roles correctly. |  |

## Part 3: Test smart contract code coverage

| CRITERIA   | MEETS SPECIFICATIONS |  Status |
|:-------|:--------|:--------:|
| Test smart contract tests all required functions. | Project contains tests for the boiler plate functions and all tests are approved without error. | |

## Part 4: Deploy smart contracts on a public test network (Rinkeby)

| CRITERIA   | MEETS SPECIFICATIONS |  Status |
|:-------|:--------|:--------:|
| Deploy smart contract on a public test network. | a) Smart contract is deployed on on the Ethereum RINKEBY test network.<br>b) Project submission includes transaction ID and contract address.<br>c) Project submission includes a document (.md, .txt) that includes:<br>- Transaction ID<br>- Contract address | |


## Part 5: Modify client code to interact with smart contracts

Modify client code to interact with a smart contract

| CRITERIA   | MEETS SPECIFICATIONS |  Status |
|:-------|:--------|:--------:|
| Client code interacts with smart contract. | Front-end is configured to:<br>- Submit a product for shipment (farmer to the distributor, distributor to retailer, etc).<br>- Receive product from shipment.<br>- Validate the authenticity of the product. | |

## Optional: Implement Infura to store product image

Optional: Implement Infura to store product image

Ex: Farmer harvests coffee and upload pics w/ UPC hash
Potentially only 2 methods needed upload() and read()