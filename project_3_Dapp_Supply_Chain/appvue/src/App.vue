<template>
  <div class="component">
    <v-app>
      <!-- NAV BAR -------------------------- -->
      <v-navigation-drawer app floating permanent>
        <div
          class="pa-5 font-weight-bold indigo accent-4 white--text text-center"
        >
          Roles
        </div>
        <div id="topDiv"></div>
        <app-bar-user :details="farmer_details"></app-bar-user>
        <app-bar-user :details="inspector_details"></app-bar-user>
        <app-bar-user :details="producer_details"></app-bar-user>
        <app-bar-user :details="distributor_details"></app-bar-user>
        <app-bar-user :details="consumer_details"></app-bar-user>
      </v-navigation-drawer>

      <!-- APP BAR -------------------------- -->
      <v-app-bar app color="primary" dark>
        <v-btn id="btn-wallet" target="_blank" text>
          <i class="fas fa-link fa-3x"></i>
          <span class="mr-2">Wallet</span>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn id="title-dapp" @click="startTour" target="_blank" text>
          <H1><strong>Dapp Supply Chain: Grape and Juice</strong></H1>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn
          href="https://github.com/lucribas/udacity-blockchaindev-nanodegree/tree/master/project_3_Dapp_Supply_Chain"
          target="_blank"
          text
        >
          <span id="btn-github" class="mr-2">Source code</span>
          <i class="fab fa-github fa-2x"></i>
        </v-btn>
      </v-app-bar>

      <!-- MAIN -------------------------- -->

      <v-main>
        <v-container fluid>
          <v-main>
            <Viewer />
            <p>Name is {{ farmer_name }}</p>
            <br /><br />HAHAHA {{ bla }} FFF<br /><br />
            <button @click="changeName">Change Farmer Name</button>
          </v-main>
        </v-container>
      </v-main>

      <!-- FOOTER -------------------------- -->

      <v-footer app>
        <!-- -->
      </v-footer>

      <v-tour name="myTour" :steps="steps"></v-tour>
    </v-app>
  </div>
</template>

<script>
import UserBar from "./components/UserBar.vue";
import Viewer from "./components/Viewer.vue";
import { tour_steps } from "./AppTour.js";
import Web3 from "web3";
import supplyChainArtifact from "../../build/contracts/SupplyChain.json";


const App = {
	web3: null,
	account: null,
	meta: null,

	start: async function () {
		const { web3 } = this;
		try {
			// get contract instance
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = supplyChainArtifact.networks[networkId];
			this.meta = new web3.eth.Contract(
				supplyChainArtifact.abi,
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

	// createStar: async function () {
	// 	const { createStar } = this.meta.methods;
	// 	const name = document.getElementById("starName").value;
	// 	const id = document.getElementById("starId").value;
	// 	await createStar(name, id).send({ from: this.account });
	// 	App.setStatus("New Star Owner is " + this.account + ".", "status");
	// },

	// // Implement Task 4 Modify the front end of the DAPP
	// lookUp: async function () {
	// 	let { name } = this.meta.methods;
	// 	let { symbol } = this.meta.methods;
	// 	let { ownerOf } = this.meta.methods;
	// 	let { lookUptokenIdToStarInfo } = this.meta.methods;
	// 	let id = document.getElementById("lookid").value;
	// 	id = parseInt(id);
	// 	let contract = await name().call();
	// 	let sym = await symbol().call();
	// 	let starName = await lookUptokenIdToStarInfo(id).call();
	// 	let ownerName = await ownerOf(id).call();
	// 	if (starName.length == 0) {
	// 		App.setStatus("Star not owned.", "status");
	// 		App.setStatus("Star ID: ", "starData");
	// 		App.setStatus("Token Name: ", "contract");
	// 		App.setStatus("Token Symbol: ", "symbol");
	// 	} else {
	// 		App.setStatus("Star owned by " + ownerName, "status");
	// 		// App.setStatus("Star owned by ", "status");
	// 		App.setStatus("Star ID: " + id + " is named " + starName, "starData");
	// 		App.setStatus("Token Name: " + contract, "contract");
	// 		App.setStatus("Token Symbol: " + sym, "symbol");
	// 	}
	// },
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

export default {
  name: "App",
  components: {
    "app-bar-user": UserBar,
    Viewer,
  },
  methods: {
    changeName() {
      this.farmer_name = "Anna";
      console.log(this.farmer_name);
    },
    resetName() {
      this.farmer_name = "Max";
    },
    startTour() {
      this.$tours["myTour"].start();
    },
  },

  data: () => ({

    //----------------------------
    farmer_details: {
      id: "b-farmer",
      title: "Kulcheski",
      subtitle: "Farmer",
      avatar: "farmer.jpg",
      selectedItem: 0,
      items: [
        { text: "Plant a Grape", icon: "fas fa-seedling" },
        { text: "Harvest a Grape", icon: "fas fa-tractor" },
        { text: "Process a Grape", icon: "fas fa-box-open" },
      ],
      items_locked: [false, true, true],
    },
    //----------------------------
    inspector_details: {
      id: "b-inspector",
      title: "John Leider",
      subtitle: "Inspector",
      avatar: "inspector.jpg",
      selectedItem: 0,
      items: [
        { text: "Audit a Grape", icon: "fas fa-tag" },
        { text: "Certify a Juice", icon: "fas fa-check-square" },
      ],
      items_locked: [true, true],
    },
    //----------------------------
    producer_details: {
      id: "b-producer",
      title: "Organic Red Juices",
      subtitle: "Producer",
      avatar: "producer.png",
      selectedItem: 0,
      items: [
        { text: "Create a Juice", icon: "fas fa-flask" },
        { text: "Blend a Juice", icon: "fas fa-glass-cheers" },
        { text: "Produce a Juice", icon: "fas fa-industry" },
        { text: "Pack a Juice", icon: "fas fa-shipping-fast" },
      ],
      items_locked: [true, true, true, true],
    },
    //----------------------------
    distributor_details: {
      id: "b-distributor",
      title: "Carrefour",
      subtitle: "Distributor",
      avatar: "distributor.png",
      selectedItem: 0,
      items: [{ text: "For sell a Juice", icon: "fas fa-store" }],
      items_locked: [true],
    },
    //----------------------------
    consumer_details: {
      id: "b-consumer",
      title: "Franceli",
      subtitle: "Consumer",
      avatar: "consumer.jpg",
      selectedItem: 0,
      items: [{ text: "Buy a Juice", icon: "fas fa-shopping-cart" }],
      items_locked: [true],
    },
    // Tour
    //----------------------------
    steps: tour_steps()
  }),
  mounted: function () {
    this.$tours["myTour"].start();
  },
};
</script>
