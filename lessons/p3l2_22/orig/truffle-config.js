
const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "dd1ae394542e4e84a2c95922d1c9efc8";
//
// const fs = require('fs');
const privatekey = "12cac7fdde084ca78a84f98cbca04747";


module.exports = {

	networks: {
	  development: {
		host: "127.0.0.1",     // Localhost (default: none)
		port: 7545,            // Standard Ethereum port (default: none)
		network_id: "*",       // Any network (default: none)
	   },
	  // Useful for deploying to a public network.
	  // NB: It's important to wrap the provider as a function.
	  rinkeby: {
		provider: () => new HDWalletProvider(privatekey, `https://rinkeby.infura.io/v3/${infuraKey}`),
		  network_id: 4,       // rinkeby's id
		  gas: 4500000,        // rinkeby has a lower block limit than mainnet
		  gasPrice: 10000000000
	  },
	},
  
	// Set default mocha options here, use special reporters etc.
	mocha: {
	  // timeout: 100000
	},
  
	// Configure your compilers
	compilers: {
	  solc: {
		// version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
		// docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
		// settings: {          // See the solidity docs for advice about optimization and evmVersion
		//  optimizer: {
		//    enabled: false,
		//    runs: 200
		//  },
		//  evmVersion: "byzantium"
		// }
	  }
	}
  }
  
