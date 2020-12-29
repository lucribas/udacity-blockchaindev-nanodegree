<template>
    <div class="component">
        <v-container>
            <v-dialog v-model="farm_plant_dialog" persistent max-width="850px">
                <v-card>
                    <v-card-title>
                        <span class="headline"> {{ title[0] }} <i :class="title[1]" style="color: green"> </i> {{ title[2] }} </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <div v-for="(n, index) in params" v-bind:key="index">
                                <v-row>
                                    <v-col v-if="n.t" cols="12" class="ma-0 pa-0">
                                        <h2 class="title mb-2" style="color: blue">{{ n.t }}</h2>
                                    </v-col>
                                    <v-col v-if="n.l" cols="11" class="ma-0 pa-0">
                                        <v-text-field v-model="n.v" :label="n.l" outlined required class="shrink" @change="checkForm"></v-text-field>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-container>
                        *You should set the address of your Metamask wallet to <strong>Farmer</strong>, network <strong>Rinkeby</strong> and have <strong>enough funds</strong>.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <v-btn color="blue darken-1" text @click="checkForm"> Check </v-btn> -->
                        <v-btn color="blue darken-1" text @click="addForm"> Add </v-btn>
                        <v-btn color="blue darken-1" text @click="farm_plant_dialog = false"> Close </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>


<script>
// https://blog.logrocket.com/build-deploy-vue-js-app-github-pages/

// https://medium.com/swlh/create-an-interactive-location-selector-with-vue-js-and-leaflet-5808c55b4636
// https://toughnickel.com/starting-business/Vineyard-Winery-Names
// https://www.wtso.com/blog/category/wtso-features/page/3/

// https://vuetifyjs.com/en/components/combobox/#usage

//https://ylv.io/10-web3-metamask-use-cases-ever-blockchain-developer-needs/

export default {
    props: {
        user_acc: {},
        sm_acc: {}
    },
    data: () => ({
        farm_plant_dialog: false,
        title: ['Farm - ', 'fas fa-seedling fa-2x', 'Plant a Grape'],
        params: {
            t1: { t: 'Product' },
            upc: { l: 'Universal Product Code (unique number for each Grape planted)', v: 1 },
            t2: { t: 'Farm' },
            originFarmName: { l: 'Farm Name (text)', v: 'Miolo Winery' },
            originFarmInformation: { l: 'Farm Information (text)', v: 'RS-444, 21, Bento Gonçalves - RS' },
            originFarmLatitude: { l: 'Farm Latitude', v: -29.17963727858983 },
            originFarmLongitude: { l: 'Farm Latitude', v: -51.58366857790086 }
        }
    }),
    methods: {
        set_FarmPlantDialog(m) {
            this.farm_plant_dialog = m
        },
        checkForm() {
            // fetchGrapeItemBufferOne
        },
        addForm() {
            // grapePlantItem
            var contract = window.vm.$children[0].Web3app.contract
            var account = window.vm.$children[0].Web3app.account
            console.log(contract)
            var p = this.params
            contract.methods
                .grapePlantItem(p.upc.v, account, p.originFarmName.v, p.originFarmInformation.v, p.originFarmLatitude.v, p.originFarmLongitude.v)
                .send({ from: account })
        }
    }
}
</script>