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
        <v-row class="flex" justify="space-between">
          <v-tooltip v-model="wallet_msgshow" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                id="btn-wallet"
                target="_blank"
                v-bind="attrs"
                v-on="on"
                text
              >
                <v-icon :color="get_wallet_color()" class="fas fa-link fa-3x">
                </v-icon>
                <div :style="Heading">
                  <div :style="'color:' + get_wallet_color()">
                    {{ wallet_name }}
                  </div>
                </div>
              </v-btn>
            </template>
            <span>{{ wallet_msg }}</span>
          </v-tooltip>
        </v-row>

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
            <br /><br />
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

var Web3app = {
  web3: null,
  account: null,
  meta: null,
  //   vm: "null",

  start: async function () {
    const { web3 } = this;
    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = supplyChainArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        supplyChainArtifact.abi,
        deployedNetwork.address
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      window.vm.$children[0].web3_connected = true;
      window.vm.$children[0].wallet_msg = "Connected";
    } catch (error) {
      console.error("Could not connect to contract or chain.");
      window.vm.$children[0].web3_error = true;
      window.vm.$children[0].wallet_msg =
        "Error: Could not connect to contract or chain.";
      //   window.vm.$children[0].wallet_name = "ERROR";
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
  // 	Web3app.setStatus("New Star Owner is " + this.account + ".", "status");
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
  // 		Web3app.setStatus("Star not owned.", "status");
  // 		Web3app.setStatus("Star ID: ", "starData");
  // 		Web3app.setStatus("Token Name: ", "contract");
  // 		Web3app.setStatus("Token Symbol: ", "symbol");
  // 	} else {
  // 		Web3app.setStatus("Star owned by " + ownerName, "status");
  // 		// Web3app.setStatus("Star owned by ", "status");
  // 		Web3app.setStatus("Star ID: " + id + " is named " + starName, "starData");
  // 		Web3app.setStatus("Token Name: " + contract, "contract");
  // 		Web3app.setStatus("Token Symbol: " + sym, "symbol");
  // 	}
  // },
};

// class App {
//   vm = nul;
// }

export default {
  name: "App",
  components: {
    "app-bar-user": UserBar,
    // popper: Popper,

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
    start() {
      this.wallet_name = "WALLET";
    },
    // eth_metamask_sts(value) {
    //   //   this.metamask_connected = value;
    //   //   console.log("eth_metamask_sts:" + value);
    //   if (value) {
    //     this.wallet_name = "BLA";
    //   }
    // },
    get_wallet_color() {
      return this.web3_connected
        ? "light-green accent-3"
        : this.web3_error
        ? "red"
        : "white";
    },
  },

  data: () => ({
    farmer_name: "none",
    wallet_name: "wallet",
    wallet_msg: "",
    web3_error: false,
    web3_connected: false,
    wallet_msgshow: false,
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
      items: [
        { text: "Audit a Grape", icon: "fas fa-tag" },
        { text: "Certify a Juice", icon: "fas fa-check-square" },
      ],
      selectedItem: 0,
      items_locked: [true, true],
    },
    //----------------------------
    producer_details: {
      id: "b-producer",
      title: "Organic Red Juices",
      subtitle: "Producer",
      avatar: "producer.png",
      items: [
        { text: "Create a Juice", icon: "fas fa-flask" },
        { text: "Blend a Juice", icon: "fas fa-glass-cheers" },
        { text: "Produce a Juice", icon: "fas fa-industry" },
        { text: "Pack a Juice", icon: "fas fa-shipping-fast" },
      ],
      selectedItem: 0,
      items_locked: [true, true, true, true],
    },
    //----------------------------
    distributor_details: {
      id: "b-distributor",
      title: "Carrefour",
      subtitle: "Distributor",
      avatar: "distributor.png",
      items: [{ text: "For sell a Juice", icon: "fas fa-store" }],
      selectedItem: 0,
      items_locked: [true],
    },
    //----------------------------
    consumer_details: {
      id: "b-consumer",
      title: "Franceli",
      subtitle: "Consumer",
      avatar: "consumer.jpg",
      items: [{ text: "Buy a Juice", icon: "fas fa-shopping-cart" }],
      selectedItem: 0,
      items_locked: [true],
    },
    // Tour
    //----------------------------
    steps: tour_steps(),
    // Styles
    Heading: `
  font-family: "Luckiest Guy", sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 30px;
  -webkit-font-smoothing: antialiased;
  margin-top: 15px;
  margin-bottom: 15px;
  line-height: 1.1;
`,
  }),
  mounted: function () {
    this.start();
    // this.eth_metamask_sts(true);
    // this.$tours["myTour"].start();
  },
};

window.addEventListener("load", async function () {
  if (window.ethereum) {
    window.vm.$children[0].wallet_msgshow = true;
    window.vm.$children[0].wallet_msg = "connecting..";

    // use MetaMask's provider
    Web3app.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
    // window.vm.$children[0].eth_metamask_sts(true);
    window.vm.$children[0].wallet_name = "Metamask";
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live"
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    Web3app.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545")
    );
    // window.vm.$children[0].eth_localhost_sts(true);
    window.vm.$children[0].wallet_name = "localhost:9545";
  }

  Web3app.start();
});
</script>
