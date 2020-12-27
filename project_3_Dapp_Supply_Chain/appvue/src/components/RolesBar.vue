
<template>
  <div class="component">
    <v-container>
      <!-- <div
        class="pa-5 font-weight-bold indigo accent-4 white--text text-center"
      >
        <v-btn id="title-dapp" @click="modalRoles" target="_blank" text>
          <span id="btn-roles" class="mr-0 white--text text-center">Roles</span>
        </v-btn>
      </div> -->
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="checkForm"
            >
              Roles
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline"
                >Enables the specified address to each role</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model="is_fa.addr"
                      label="Farmer address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                      @change="checkForm"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      color="indigo"
                      :disabled="is_fa.v"
                      @click="addFarmer"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <span class="mr-2" :style="is_fa.vs">{{ is_fa.vt }}</span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model="is_in.addr"
                      label="Inspector address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                      @change="checkForm"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      :disabled="is_in.v"
                      @click="addInspector"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <span class="mr-2" :style="is_in.vs">{{ is_in.vt }}</span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model="is_pr.addr"
                      label="Producer address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                      @change="checkForm"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      :disabled="is_pr.v"
                      @click="addProducer"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <span class="mr-2" :style="is_pr.vs">{{ is_pr.vt }}</span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model="is_di.addr"
                      label="Distributor address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                      @change="checkForm"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      :disabled="is_di.v"
                      @click="addDistributor"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <span class="mr-2" :style="is_di.vs">{{ is_di.vt }}</span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model="is_co.addr"
                      label="Consumer address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                      @change="checkForm"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      :disabled="is_co.v"
                      @click="addConsumer"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <span class="mr-2" :style="is_co.vs">{{ is_co.vt }}</span>
                  </v-col>
                </v-row>
              </v-container>
              <small
                >*You should set the address of your Metamask wallet to Smart
                Contract Owner and have enough funds.</small
              >
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="checkForm">
                Check Addresses
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>


<script>


export default {
  data: () => ({
    dialog: false,
    is_fa: {
      addr: "0x9D9e3E99127CD227CfbACb84289a5F3F96Ce9922",
      v: false,
      vt: "",
      vs: "color:black",
    },
    is_in: {
      addr: "0xD8c5BcDdAE7896B9d4747cb753283681F262E1CE",
      v: false,
      vt: "",
      vs: "color:black",
    },
    is_pr: {
      addr: "0x78DCba4FEE08726E86a3a6b970B85e684eaDC590",
      v: false,
      vt: "",
      vs: "color:black",
    },
    is_di: {
      addr: "0xC0520D16a972EEAbBc1F82F18187F672b2a7D78c",
      v: false,
      vt: "",
      vs: "color:black",
    },
    is_co: {
      addr: "0xD30ec28932096fC0B5De0b84e4560A533203241f",
      v: false,
      vt: "",
      vs: "color:black",
    },
  }),
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    },
    // addFarmer(addr) {
    addFarmer() {
      var sm = window.vm.$children[0].Web3app.meta.methods;
      this.aux_Add(this.is_fa, sm.addFarmer);
    },
    addInspector() {
      var sm = window.vm.$children[0].Web3app.meta.methods;
      this.aux_Add(this.is_in, sm.addInspector);
    },
    addProducer() {
      var sm = window.vm.$children[0].Web3app.meta.methods;
      this.aux_Add(this.is_pr, sm.addProducer);
    },
    addDistributor() {
      var sm = window.vm.$children[0].Web3app.meta.methods;
      this.aux_Add(this.is_di, sm.addDistributor);
    },
    addConsumer() {
      var sm = window.vm.$children[0].Web3app.meta.methods;
      this.aux_Add(this.is_co, sm.addConsumer);
    },
    aux_Add(m, j) {
      j(m.addr).send({ from: window.vm.$children[0].Web3app.account });
      var msg =
        "processing.. Please click on [Check Addresses] after Metamask confirm transaction.";
      this.aux_setForm(m, true, msg, "color:blue");
    },
    checkForm() {
      var vm = this;
      var sm = window.vm.$children[0].Web3app.meta.methods;

      vm.aux_Form(this.is_fa, sm.isFarmer);
      vm.aux_Form(this.is_in, sm.isInspector);
      vm.aux_Form(this.is_pr, sm.isProducer);
      vm.aux_Form(this.is_di, sm.isDistributor);
      vm.aux_Form(this.is_co, sm.isConsumer);
    },
    aux_Form(m, j) {
      var vm = this;
      var Web3app = window.vm.$children[0].Web3app;

      if (Web3app.web3.utils.isAddress(m.addr)) {
        const tmp = j(m.addr).call();
        this.aux_checkForm(m, tmp);
      } else {
        let msg = "Invalid address! Please check the provided address.";
        vm.aux_setForm(m, true, msg, "color:red");
      }
    },
    aux_checkForm(m, f) {
      var vm = this;
      f.then(function (has) {
        if (has) {
          var msg = "This address already has the role.";
          vm.aux_setForm(m, true, msg, "color:green");
        } else {
          msg = "Click on button to add this role to address.";
          vm.aux_setForm(m, false, msg, "color:blue");
        }
      });
    },
    aux_setForm(m, v, vt, vs) {
      m.v = v;
      m.vt = vt;
      m.vs = vs;
    },
    // lockSelection(i) {
    //   return details.items_locked[i] == true;
    // },
  },
};
</script>