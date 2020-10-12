import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
	web3: null,
	account: null,
	meta: null,

	start: async function () {
		const { web3 } = this;
		try {
			// get contract instance
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = starNotaryArtifact.networks[networkId];
			this.meta = new web3.eth.Contract(
				starNotaryArtifact.abi,
				deployedNetwork.address,
			);

			// get accounts
			const accounts = await web3.eth.getAccounts();
			this.account = accounts[0];
		} catch (error) {
			console.error("Could not connect to contract or chain.");
		}
	},

	setStatus: function (message, id) {
		const status = document.getElementById(id);
		status.innerHTML = message;
	},

	createStar: async function () {
		const { createStar } = this.meta.methods;
		const name = document.getElementById("starName").value;
		const id = document.getElementById("starId").value;
		await createStar(name, id).send({ from: this.account });
		App.setStatus("New Star Owner is " + this.account + ".", "status");
	},

	// Implement Task 4 Modify the front end of the DAPP
	lookUp: async function () {
		let { name } = this.meta.methods;
		let { symbol } = this.meta.methods;
		let { ownerOf } = this.meta.methods;
		let { lookUptokenIdToStarInfo } = this.meta.methods;
		let id = document.getElementById("lookid").value;
		id = parseInt(id);
		let contract = await name().call();
		let sym = await symbol().call();
		let starName = await lookUptokenIdToStarInfo(id).call();
		let ownerName = await ownerOf(id).call();
		if (starName.length == 0) {
			App.setStatus("Star not owned.", "status");
			App.setStatus("Star ID: ", "starData");
			App.setStatus("Token Name: ", "contract");
			App.setStatus("Token Symbol: ", "symbol");
		} else {
			App.setStatus("Star owned by " + ownerName, "status");
			// App.setStatus("Star owned by ", "status");
			App.setStatus("Star ID: " + id + " is named " + starName, "starData");
			App.setStatus("Token Name: " + contract, "contract");
			App.setStatus("Token Symbol: " + sym, "symbol");
		}
	},
};

window.App = App;

window.addEventListener("load", async function () {
	if (window.ethereum) {
		// use MetaMask's provider
		App.web3 = new Web3(window.ethereum);
		await window.ethereum.enable(); // get permission to access accounts
	} else {
		console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
	}

	App.start();
});
