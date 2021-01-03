<template>
    <div class="component">
        <v-container>
            <v-dialog v-model="dialog" persistent max-width="850px">
                <v-card>
                    <v-card-title>
                        <span class="headline"> {{ sub.subtitle }} - <i :class="item.icon" style="color: green"> </i> {{ item.text }} </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <!-- for each params -->
                            <div v-for="(n, index) in params" v-bind:key="index">
                                <v-row>
                                    <!-- title into Form -->
                                    <v-col v-if="n.t" cols="12" class="ma-0 pa-0">
                                        <h2 class="title mb-2" style="color: blue">{{ n.t }}</h2>
                                    </v-col>
                                    <!-- text field into Form -->
                                    <v-col
                                        v-if="n.l && !((['grapeUpc'].includes(index) && ![2].includes(item.id)) || (['juiceUpc'].includes(index) && ![7].includes(item.id)))"
                                        cols="11"
                                        class="ma-0 pa-0"
                                    >
                                        <v-text-field v-model="n.v" :label="n.l" outlined required class="shrink" @change="checkForm"></v-text-field>
                                    </v-col>
                                    <!-- select field into Form -->
                                    <v-col v-if="n.l && ['grapeUpc'].includes(index) && ![2].includes(item.id)" cols="11" class="ma-0 pa-0">
                                        <v-select v-model="n.v" :items="grapeUpc" :label="n.l" required outlined @change="checkForm"></v-select>
                                    </v-col>
                                    <v-col v-if="n.l && ['juiceUpc'].includes(index) && ![7].includes(item.id)" cols="11" class="ma-0 pa-0">
                                        <v-select v-model="n.v" :items="juiceUpc" :label="n.l" required outlined @change="checkForm"></v-select>
                                    </v-col>
                                    <!-- checkForm result message - only for grapeUpc field -->
                                    <v-col v-if="['grapeUpc', 'juiceUpc'].includes(index)">
                                        <span class="mr-2" :style="msg_vs">{{ msg_vt }}</span>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-container>
                        *You should set the address of your Metamask wallet to <strong>Farmer</strong>, network <strong>Rinkeby</strong> and have <strong>enough funds</strong>.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <v-btn color="blue darken-1" text @click="checkForm"> Check </v-btn> -->
                        <v-btn color="blue darken-1" text @click="checkForm"> Check </v-btn>
                        <v-btn color="blue darken-1" text @click="addForm"> Add </v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
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

// TODO:
// - validate upc: show error if already exists
// - use map to lat long
export default {
    props: {
        user_acc: {},
        sm_acc: {},
        sub: {},
        item: {},
        grapeUpc: {},
        juiceUpc: {},
        params: {}
    },
    data: () => ({
        dialog: false,
        valid: false,
        msg_vt: '',
        msg_vs: 'color:blue',
        co_price: ''
    }),
    methods: {
        set_dialog(m) {
            this.dialog = m
            if (m) this.checkForm()
        },
        checkForm() {
            var contract = window.vm.$children[0].Web3app.contract
            // var account = window.vm.$children[0].Web3app.account
            // console.log(contract)
            // console.log("generic:")
            // console.log(this.params)
            var p = this.params
            var vm = this
            if ([3, 4, 5].includes(this.item.id)) {
                // Selects grapeUpc: check if grapeUpc exists
                console.log('p.grapeUpc.v')
                console.log(p.grapeUpc.v)
                contract.methods
                    .fetchGrapeItemBufferOne(p.grapeUpc.v * 1)
                    .call()
                    .then(function (res1) {
                        let v = vm.params.grapeUpc.v * 1
                        if (res1.upc == 0 && v != 0) {
                            vm.msg_vt = 'grapeUpc:' + res1.upc + ' not exists. Please choose a valid upc!'
                            vm.msg_vs = 'color:red'
                            vm.valid = false
                            console.log(vm.msg_vt)
                            console.log(res1)
                        } else {
                            vm.msg_vt = ''
                            vm.msg_vs = 'color:blue'
                            vm.valid = true
                        }
                    })
            } else if ([2].includes(this.item.id)) {
                // Selects grapeUpc: check if grapeUpc exists
                console.log('p.grapeUpc.v')
                console.log(p.grapeUpc.v)
                contract.methods
                    .fetchGrapeItemBufferOne(p.grapeUpc.v * 1)
                    .call()
                    .then(function (res1) {
                        let v = vm.params.grapeUpc.v * 1
                        if (res1.upc == 0 && v != 0) {
                            vm.msg_vt = ''
                            vm.msg_vs = 'color:blue'
                            vm.valid = true
                        } else {
                            vm.msg_vt = 'grapeUpc:' + res1.upc + ' already exists. Please choose a new grapeUpc!'
                            vm.msg_vs = 'color:red'
                            vm.valid = false
                            console.log(vm.msg_vt)
                            console.log(res1)
                        }
                    })
            } else if ([7].includes(this.item.id)) {
                // New juiceUpc: check if juiceUpc not exists
                console.log('p.juiceUpc.v')
                console.log(p.juiceUpc.v)
                contract.methods
                    .fetchJuiceItemBufferOne(p.juiceUpc.v * 1)
                    .call()
                    .then(function (res1) {
                        let v = vm.params.juiceUpc.v * 1
                        if (res1.upc == 0 && v != 0) {
                            vm.msg_vt = ''
                            vm.msg_vs = 'color:blue'
                            vm.valid = true
                        } else {
                            vm.msg_vt = 'juiceUpc:' + res1.upc + ' already exists. Please choose a new juiceUpc!'
                            vm.msg_vs = 'color:red'
                            vm.valid = false
                            console.log(vm.msg_vt)
                            console.log(res1)
                        }
                    })
            } else {
                // Selects juiceUpc: check if juiceUpc exists
                console.log('p.juiceUpc.v')
                console.log(p.juiceUpc.v)
                let idem_id = this.item.id
                contract.methods
                    .fetchJuiceItemBufferOne(p.juiceUpc.v * 1)
                    .call()
                    .then(function (res1) {
                        let v = vm.params.juiceUpc.v * 1
                        if (res1.upc == 0 && v != 0) {
                            vm.msg_vt = 'juiceUpc:' + res1.upc + ' not exists. Please choose a valid upc!'
                            vm.msg_vs = 'color:red'
                            vm.valid = false
                            console.log(vm.msg_vt)
                            console.log(res1)
                        } else if ([12].includes(idem_id) && v != 0) {
                            vm.co_price = window.vm.$children[0].Web3app.web3.utils.fromWei(res1.productPrice, 'ether')
                            vm.msg_vt = 'price is ' + vm.co_price + 'ETH'
                            vm.msg_vs = 'color:blue'
                            vm.valid = true
                        } else {
                            vm.msg_vt = ''
                            vm.msg_vs = 'color:blue'
                            vm.valid = true
                        }
                    })
            }

            // fetchGrapeItemBufferOne
        },
        addForm() {
            // grapePlantItem
            var contract = window.vm.$children[0].Web3app.contract
            var account = window.vm.$children[0].Web3app.account
            var price = ''
            // console.log(contract)
            var p = this.params
            console.log(p)
            if (this.valid) {
                switch (this.item.id) {
                    // Owner -------------
                    case 1:
                        // addFarmer
                        // addInspector
                        // addProducer
                        // addDistributor
                        // addConsumer
                        break

                    // Farmer -------------
                    case 2:
                        // grapePlantItem
                        contract.methods
                            .grapePlantItem(p.grapeUpc.v, account, p.originFarmName.v, p.originFarmInformation.v, p.originFarmLatitude.v, p.originFarmLongitude.v)
                            .send({ from: account })

                        break
                    case 3:
                        contract.methods.grapeHarvestItem(p.grapeUpc.v, p.harvestNotes.v).send({ from: account })
                        break
                    case 4:
                        contract.methods.grapeProcessItem(p.grapeUpc.v).send({ from: account })
                        break

                    // Inspector -------------
                    case 5:
                        contract.methods.grapeAuditItem(p.grapeUpc.v, p.auditNotes.v).send({ from: account })
                        break
                    case 6:
						// console.log(p.juiceUpc.v)
						// console.log(p.certifyNotes.v)
                        contract.methods.juiceCertifyItem(p.juiceUpc.v, p.certifyNotes.v).send({ from: account })
                        break

                    // Producer -------------
                    case 7:
                        contract.methods.juiceCreateItem(p.juiceUpc.v, p.productID.v).send({ from: account })
                        break
                    case 8:
                        contract.methods.juiceBlendItem(p.juiceUpc.v, p.grapeUpc.v).send({ from: account })
                        break
                    case 9:
						price = window.vm.$children[0].Web3app.web3.utils.toWei(p.productPrice.v.toString(), 'ether')
						console.log('price:'+price)
                        contract.methods.juiceProduceItem(p.juiceUpc.v, p.productNotes.v, price).send({ from: account })
                        break
                    case 10:
                        contract.methods.juicePackItem(p.juiceUpc.v).send({ from: account })
                        break

                    // Distributor -------------
                    case 11:
                        contract.methods.juiceSellItem(p.juiceUpc.v).send({ from: account })
                        break

                    // Consumer -------------
                    case 12:
                        price = window.vm.$children[0].Web3app.web3.utils.toWei(this.co_price, 'ether')
                        contract.methods.juiceBuyItem(p.juiceUpc.v).send({ value: price, from: account })
                        break
                }
            }
            // .then(function (value, error) {
            // 	console.log("TX grapePlantItem:")
            //     console.log(value)
            //     console.log(error)
            // })
            this.dialog = false
            // you edit only html part then you need modify one line of code to force the recompile
            console.log('abba')
        }
    }
}
</script>