
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
            <v-btn color="primary" dark v-bind="attrs" v-on="on"> Roles </v-btn>
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
                      value="0x9D9e3E99127CD227CfbACb84289a5F3F96Ce9922"
                      label="Farmer address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      @click="isFarmer"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      value="0xD8c5BcDdAE7896B9d4747cb753283681F262E1CE"
                      label="Inspector address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      @click="addInspector"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      value="0x78DCba4FEE08726E86a3a6b970B85e684eaDC590"
                      label="Producer address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      @click="addProducer"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      value="0xC0520D16a972EEAbBc1F82F18187F672b2a7D78c"
                      label="Distributor address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      @click="addDistributor"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      value="0xD30ec28932096fC0B5De0b84e4560A533203241f"
                      label="Consumer address"
                      outlined
                      required
                      class="shrink"
                      style="width: 700px"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      @click="addConsumer"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
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
console.log("BLABLA");
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    },
    // addFarmer(addr) {
    addFarmer() {
      window.vm.$children[0].Web3app.addFarmer(
        "0x9D9e3E99127CD227CfbACb84289a5F3F96Ce9922"
      );
    },
    isFarmer() {
      const has = window.vm.$children[0].Web3app.isFarmer(
        "0x9D9e3E99127CD227CfbACb84289a5F3F96Ce9922"
      );
      has.then(function (has) {
        console.log("IS FARMER=" + has);
      });
    },
    addInspector() {},
    addProducer() {},
    addDistributor() {},
    addConsumer() {},
    // lockSelection(i) {
    //   return details.items_locked[i] == true;
    // },
  },
};
</script>