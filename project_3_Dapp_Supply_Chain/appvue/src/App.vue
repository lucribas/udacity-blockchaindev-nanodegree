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
