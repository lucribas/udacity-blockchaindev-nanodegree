<template>
    <div class="component">
        <v-app>
            <!-- NAV BAR -------------------------- -->
            <v-navigation-drawer app floating permanent>
                <v-container>
                    <v-row>
                        <v-btn :href="'https://rinkeby.etherscan.io/address/' + this.sm_acc.sm.addr" target="_blank" color="indigo" text>
                            <span id="btn-github" class="mr-2">Contract {{ this.sm_acc.sm.addr.substring(0, 7) }}..</span>
                            <i class="fas fa-file-contract fa-2x"></i>
                        </v-btn>
                    </v-row>
                </v-container>
                <v-divider></v-divider>
                <app-modal-workflow ref="Workflow" :user_acc="user_acc" :sm_acc="sm_acc" />
                <app-bar-user :details="user_acc.owner" />
                <app-bar-user :details="user_acc.fa" />
                <app-bar-user :details="user_acc.in" />
                <app-bar-user :details="user_acc.pr" />
                <app-bar-user :details="user_acc.di" />
                <app-bar-user :details="user_acc.co" />
                <app-modal-roles ref="Roles" :user_acc="user_acc" :sm_acc="sm_acc" />

                <!-- FARM -->
                <!-- <app-modal-farm-plant ref="FarmPlant" :user_acc="user_acc" :sm_acc="sm_acc" :sub="user_acc.fa" :item="user_acc.fa.items[0]" /> -->
                <app-modal-farm-plant
                    ref="FarmPlant"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.fa"
                    :item="user_acc.fa.items[0]"
                    :grapeUpc="upc_actions.fa_plant"
                    :params="FarmPlant_params"
                />
                <app-modal-farm-harvest
                    ref="FarmHarvest"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.fa"
                    :item="user_acc.fa.items[1]"
                    :grapeUpc="upc_actions.fa_harv"
                    :params="FarmHarvest_params"
                />
                <app-modal-farm-proc
                    ref="FarmProcess"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.fa"
                    :item="user_acc.fa.items[2]"
                    :grapeUpc="upc_actions.fa_proc"
                    :params="FaProc_params"
                />
                <!-- AUDIT -->
                <app-modal-in-audit
                    ref="InAudit"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.in"
                    :item="user_acc.in.items[0]"
                    :grapeUpc="upc_actions.in_aud"
                    :params="InAudit_params"
                />
                <app-modal-in-cert
                    ref="InCert"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.in"
                    :item="user_acc.in.items[1]"
                    :juiceUpc="upc_actions.in_cer"
                    :params="InCert_params"
                />
                <!-- PRODUCER -->
                <app-modal-pr-cre ref="PrCre" :user_acc="user_acc" :sm_acc="sm_acc" :sub="user_acc.pr" :item="user_acc.pr.items[0]" :params="PrCre_params" />
                <app-modal-pr-ble
                    ref="PrBle"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.pr"
                    :item="user_acc.pr.items[1]"
                    :juiceUpc="upc_actions.pr_ble"
                    :grapeUpc="upc_actions.pr_cr"
                    :params="PrBle_params"
                />

                <!-- parei aqui: - blend with Grape : select Juice -> extend ModalGeneric para suportar select no juiceUpc
precisa adicionar qndo pedir o select, pode ser qndo for {} -->

                <app-modal-pr-pro
                    ref="PrPro"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.pr"
                    :item="user_acc.pr.items[2]"
                    :juiceUpc="upc_actions.pr_pr"
                    :params="PrPro_params"
                />
                <app-modal-pr-pa
                    ref="PrPack"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.pr"
                    :item="user_acc.pr.items[3]"
                    :juiceUpc="upc_actions.pr_pack"
                    :params="PrPack_params"
                />
                <!-- DISTRIBUTOR -->
                <app-modal-di-sell
                    ref="DiSell"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.di"
                    :item="user_acc.di.items[0]"
                    :juiceUpc="upc_actions.di_sell"
                    :params="DiSell_params"
                />
                <!-- CONSUMER -->
                <app-modal-co-buy
                    ref="CoBuy"
                    :user_acc="user_acc"
                    :sm_acc="sm_acc"
                    :sub="user_acc.co"
                    :item="user_acc.co.items[0]"
                    :juiceUpc="upc_actions.co_buy"
                    :params="CoBuy_params"
                />
            </v-navigation-drawer>

            <!-- APP BAR -------------------------- -->
            <v-app-bar app color="primary" dark>
                <v-row class="flex" justify="space-between">
                    <v-tooltip ref="popover" v-model="wallet_msgshow" bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn id="btn-wallet" target="_blank" v-bind="attrs" v-on="on" text>
                                <!-- WALLET NAME -->
                                <v-icon :color="wallet_color" class="fas fa-link fa-3x"> </v-icon>
                                <div :style="Heading">
                                    <span v-bind:style="wallet_style">
                                        {{ wallet_name }}
                                    </span>
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
                <v-btn href="https://github.com/lucribas/udacity-blockchaindev-nanodegree/tree/master/project_3_Dapp_Supply_Chain" target="_blank" text>
                    <span id="btn-github" class="mr-2">Source code</span>
                    <i class="fab fa-github fa-2x"></i>
                </v-btn>
            </v-app-bar>

            <!-- MAIN -------------------------- -->

            <v-main>
                <br /><br />
                <app-viewer ref="Viewer" :user_acc="user_acc" v-bind:details="supply_chain" :upc_actions="upc_actions" />
                <br /><br /><br />
                <app-walkthrough ref="Walkthrough" v-bind:user_acc="user_acc" />

                <!-- <v-container fluid>
                    <p>Name is {{ farmer_name }}</p>
                    <br /><br />
                    <button @click="changeName">Change Farmer Name</button>
                </v-container> -->
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
// import Vue from "vue";
import UserBar from './components/UserBar.vue'
import ModalRoles from './components/ModalRoles.vue'
import ModalWorkflow from './components/ModalWorkflow.vue'

// import ModalGenericUpc from './components/ModalGenericUpc.vue'
import ModalFarmPlant from './components/ModalGenericUpc.vue'
import ModalCoBuy from './components/ModalGenericUpc.vue'
import ModalDiSell from './components/ModalGenericUpc.vue'
import ModalFarmHarvest from './components/ModalGenericUpc.vue'
import ModalFarmProcess from './components/ModalGenericUpc.vue'
import ModalInAudit from './components/ModalGenericUpc.vue'
import ModalInCert from './components/ModalGenericUpc.vue'
import ModalPrBle from './components/ModalGenericUpc.vue'
import ModalPrCre from './components/ModalGenericUpc.vue'
import ModalPrPack from './components/ModalGenericUpc.vue'
import ModalPrPro from './components/ModalGenericUpc.vue'

import Viewer from './components/Viewer.vue'
import Walkthrough from './components/Walkthrough.vue'
import { tour_steps } from './AppTour.js'
import Web3 from 'web3'
import supplyChainArtifact from '../../build/contracts/SupplyChain.json'

var Web3app = {
    web3: null,
    account: null,
    contract: null,
    vm: null, // vue instance
    wm: null, // window children instance

    // start task
    start: async function () {
        this.wm = window.vm.$children[0]
        this.vm = window.vm
        await this.wallet_detect()
        await this.account_detect()
        this.updateUserBarProps()
        this.updateUserBarBalance()
        this.start_threads()

        // TODO: move to thread / monitor
        await this.read_events()
    },
    start_threads: function () {
        // Detects if account changed
        window.ethereum.on('accountsChanged', async function (accounts) {
            // Time to reload your interface with accounts[0]!
            if (!window.vm.$children[0].web3_connected) {
                await Web3app.wallet_detect()
            }
            console.log('accountsChanged:')
            console.log(accounts)
            await Web3app.account_detect()
            Web3app.updateUserBarProps()
            await Web3app.updateUserBarBalance()
        })

        // Detects if network changed
        window.ethereum.on('networkChanged', async function (networkId) {
            // Time to reload your interface with the new networkId
            if (!window.vm.$children[0].web3_connected) {
                await Web3app.wallet_detect()
            }
            console.log('networkChanged: ' + networkId)
            await Web3app.wallet_detect()
            await Web3app.account_detect()
            Web3app.updateUserBarProps()
            await Web3app.updateUserBarBalance()
        })
        // this.wm.ModalRoles.dialog = true;
        this.checkWalletInterval = setInterval(() => {
            // console.time('checkWalletInterval')
            Web3app.updateUserBarProps()
            Web3app.updateUserBarBalance()
            // console.timeEnd('checkWalletInterval')
        }, 5000)
    },
    // wallet detection
    wallet_detect: async function () {
        const { web3 } = this
        try {
            // get info about metamask
            let networkType = 'rinkeby'
            console.time('wallet_detect-getinfo')
            let networkId = await web3.eth.net.getId()
            // due low speed of infura.io during web3.eth.net.getNetworkType()
            //     networkType = await web3.eth.net.getNetworkType()
            console.timeEnd('wallet_detect-getinfo')

            if (networkId != 4) throw Error('You should login into METAMASK using RINKEBY network!')

            // check if contract is deployed in current network
            const deployedNetwork = supplyChainArtifact.networks[networkId]
            if (deployedNetwork == undefined) throw Error('smart contract not deployed! (networkId=' + networkId + ', networkType=' + networkType + ')')
            console.log('smart contract deployed! (networkId=' + networkId + ', networkType=' + networkType + ')')

            // get contract instance
            console.time('wallet_detect-contract')
            this.contract = new web3.eth.Contract(supplyChainArtifact.abi, deployedNetwork.address)
            console.timeEnd('wallet_detect-contract')

            // get account from Metamask
            console.time('wallet_detect-accounts')
            const accounts = await web3.eth.getAccounts()
            console.timeEnd('wallet_detect-accounts')
            this.account = accounts[0]

            // update Vue reactive properties
            this.wm.web3_error = false
            this.wm.web3_connected = true
            this.wm.wallet_msg = 'Connected'
            // deactivate popover message
            window.vm.$children[0].$refs.popover.deactivate()

            // update methods to contract instantiated
            this.update_methods()

            //   end
        } catch (error) {
            const msg = 'Could not connect to contract or chain -> ' + error
            console.error(msg)
            this.wm.web3_error = true
            this.wm.wallet_msg = msg
        }
    },
    account_detect: async function () {
        const { web3 } = this
        // get account from Metamask
        // console.time('wallet_detect-accounts')
        const accounts = await web3.eth.getAccounts()
        // console.timeEnd('wallet_detect-accounts')
        this.account = accounts[0]

        // update Vue reactive properties
        this.wm.account = this.account
    },
    updateUserBarProps: function () {
        var user_acc = this.wm.user_acc
        for (const idx in user_acc) {
            const acc = user_acc[idx]
            if (this.account == acc.addr) {
                acc.enabled = true
                // console.log(acc.balance);
            } else {
                acc.enabled = false
            }
        }
    },
    read_events: async function () {
        try {
            var vm = this
            // print all PAST events
            // this.contract
            //     .getPastEvents('allEvents', {
            //         fromBlock: 0,
            //         toBlock: 'latest'
            //     })
            //     .then(function (events) {
            //         console.log(events)
            //     })

            // // register listen to past and NEW events
            // this.contract.events.GrapePlanted(
            //     {
            // 		fromBlock: 0,
            //         toBlock: "latest",
            //     },
            //     function (error, event) {
            //         console.log(event)
            //         // console.log(error)
            //         // Vue.set
            //         // Web3app.evt_GrapePlanted[event.id] = event
            //         window.vm.$children[0].Web3app.vm.$set(Web3app.evt_GrapePlanted, event.id, event)
            //     }
            // )

            // register listen to past and NEW events
            this.contract.events.allEvents(
                {
                    fromBlock: 0,
                    toBlock: 'latest'
                },
                function (error, event) {
                    // console.log(event)
                    // console.log(error)
                    // Vue.set
                    // Web3app.evt_GrapePlanted[event.id] = event
                    // window.vm.$children[0].Web3app.vm.$set(Web3app.evt_GrapePlanted, event.id, event)
                    vm.processEvent(event)
                }
            )

            //   end
        } catch (error) {
            const msg = 'Could not connect to contract or chain -> ' + error
            console.error(msg)
            this.wm.web3_error = true
            this.wm.wallet_msgshow = true
            this.wm.wallet_msg = msg
        }
    },
    processEvent: function (event) {
        var supply_chain = this.wm.supply_chain
        console.log('new event: ' + event.event)
        console.log(event)
        if (event != null) {
            let upc = event.returnValues.upc
            if (event.event.includes('Juice')) {
				upc = event.returnValues.juiceUpc
			} else {
                upc = event.returnValues.grapeUpc
			}
            if (upc != null) {
                if (supply_chain[upc] == null) {
                    const n = {
                        events: {},
                        sts: {
                            fa_plant: true,
                            fa_harv: false,
                            in_aud: false,
                            fa_proc: false,
                            pr_cr: false,
                            pr_ble: false,
                            pr_pr: false,
                            in_cer: false,
                            pr_pack: false,
                            di_sell: false,
                            co_buy: false
                        }
                    }
                    // supply_chain[upc] = n
                    Web3app.vm.$set(supply_chain, upc, n)
                }

                // supply_chain[upc].events[event.id] = event
                Web3app.vm.$set(supply_chain[upc].events, event.id, event)

                this.processUpcStatusEvt(supply_chain[upc], event)
                this.updateUserBarDetails()
            } else  {
				console.error('upc is null on '+event.event+' is juice:'+event.event.includes('Juice'))
				console.log(event.returnValues.juiceUpc)
			}
            // console.log(supply_chain[upc].sts)
            console.log('supply_chain')
            console.log(supply_chain)
        }
    },
    updateUserBarDetails: function () {
        let sts = {
            fa_plant: true,
            fa_harv: false,
            in_aud: false,
            fa_proc: false,
            pr_cr: true,
            pr_ble: false,
            pr_pr: false,
            in_cer: false,
            pr_pack: false,
            di_sell: false,
            co_buy: false
        }
        var upc_actions = this.wm.upc_actions
        var supply_chain = this.wm.supply_chain
        // clear upc_actions
        for (const s in sts) {
            upc_actions[s] = []
        }
        // process all upc and OR status
        for (const idx in supply_chain) {
            let u = supply_chain[idx]
            for (const s in sts) {
                // consolidates sts.s ORed
                sts[s] ||= u.sts[s]
                // maps sts.s -> all upc
                if (u.sts[s] && s != 'fa_plant') upc_actions[s].push(idx)
                if (s == 'pr_cr') {
                    console.log('Grape to blend:')
                    console.log(upc_actions.pr_cr)
                }
                // if (u.sts[s] && s != 'fa_plant' && s != 'pr_cr') upc_actions[s].push(idx)
                // if (s == 'pr_ble') upc_actions[s].push(idx)
            }
        }
        console.log('upc_actions')
        console.log(upc_actions)
        var ua = this.wm.user_acc
        ua.fa.items_unlocked = [sts.fa_plant, sts.fa_harv, sts.fa_proc]
        ua.in.items_unlocked = [sts.in_aud, sts.in_cer]
        ua.pr.items_unlocked = [sts.pr_cr, sts.pr_ble, sts.pr_pr, sts.pr_pack]
        ua.di.items_unlocked = [sts.di_sell]
        ua.co.items_unlocked = [sts.co_buy]
        console.log(ua.fa.items_unlocked)
    },
    processUpcStatus: function (m) {
        // process all events
        for (const idx in m.events) {
            let e = m.events[idx]
            this.processUpcStatusEvt(m, e)
        }
    },

    processUpcStatusEvt: function (m, e) {
        switch (e.event) {
            // Grape workflow ----------------
            case 'GrapePlanted':
                m.sts.fa_plant = false
                m.sts.fa_harv = true
                break
            case 'GrapeHarvested':
                m.sts.fa_harv = false
                m.sts.in_aud = true
                break
            case 'GrapeAudited':
                m.sts.in_aud = false
                m.sts.fa_proc = true
                break
            case 'GrapeProcessed':
                m.sts.fa_proc = false
                m.sts.pr_cr = true // hold grape values to JuiceBlend
                break
            // Juice workflow -------------------
            case 'JuiceCreated':
                m.sts.pr_ble = true
                m.sts.pr_pr = true
                break
            // case 'JuiceBlended':
            case 'JuiceProduced':
                m.sts.pr_ble = false
                m.sts.pr_pr = false
                m.sts.in_cer = true
                break
            case 'JuiceCertified':
                m.sts.in_cer = false
                m.sts.pr_pack = true
                break
            case 'JuicePacked':
                m.sts.pr_pack = false
                m.sts.di_sell = true
                break
            case 'JuiceForSale':
                m.sts.di_sell = false
                m.sts.co_buy = true
                break
            case 'JuicePurchased':
                m.sts.co_buy = false
                break
        }
    },
    updateUserBarBalance: async function () {
        const { web3 } = this
        var user_acc = this.wm.user_acc
        for (const idx in user_acc) {
            const acc = user_acc[idx]
            if (this.account == acc.addr) {
                // console.log('waiting getBalance of ' + this.account)
                await web3.eth.getBalance(this.account).then(function (v) {
                    acc.balance = web3.utils.fromWei(v, 'ether')
                    acc.balance_style = acc.balance > 0.0001 ? 'color:blue' : 'color:red'
                    // console.log('Balance of ' + acc.addr + ' is ' + acc.balance + ' ' + acc.balance_style)
                })
                // console.log(acc.balance);
            }
        }
    },

    //   update methods pointers since children was already created
    update_methods: function () {
        // UserBar actions
        this.wm.user_acc.owner.items[0].action = function () {
            // show ModalRoles modal dialog
            window.vm.$children[0].$refs.Roles.checkForm()
            window.vm.$children[0].$refs.Roles.set_dialog(true)
        }
        //grapePlantItem
        this.wm.user_acc.fa.items[0].action = function () {
            window.vm.$children[0].$refs.FarmPlant.set_dialog(true)
        }
        //grapeHarvestItem
        this.wm.user_acc.fa.items[1].action = function () {
            window.vm.$children[0].$refs.FarmHarvest.set_dialog(true)
        }
        //grapeProcessItem
        this.wm.user_acc.fa.items[2].action = function () {
            window.vm.$children[0].$refs.FarmProcess.set_dialog(true)
        }

        //grapeAuditItem
        this.wm.user_acc.in.items[0].action = function () {
            window.vm.$children[0].$refs.InAudit.set_dialog(true)
            // console.log(window.vm.$children[0].InAudit_params)
        }
        //juiceCertifyItem
        this.wm.user_acc.in.items[1].action = function () {
            window.vm.$children[0].$refs.InCert.set_dialog(true)
        }
        //juiceCreateItem
        this.wm.user_acc.pr.items[0].action = function () {
            window.vm.$children[0].$refs.PrCre.set_dialog(true)
        }
        //juiceBlendItem
        this.wm.user_acc.pr.items[1].action = function () {
            window.vm.$children[0].$refs.PrBle.set_dialog(true)
        }
        //juiceProduceItem
        this.wm.user_acc.pr.items[2].action = function () {
            window.vm.$children[0].$refs.PrPro.set_dialog(true)
        }
        //juicePackItem
        this.wm.user_acc.pr.items[3].action = function () {
            window.vm.$children[0].$refs.PrPack.set_dialog(true)
        }
        //juiceSellItem
        this.wm.user_acc.di.items[0].action = function () {
            window.vm.$children[0].$refs.DiSell.set_dialog(true)
        }
        //juiceBuyItem
        this.wm.user_acc.co.items[0].action = function () {
            window.vm.$children[0].$refs.CoBuy.set_dialog(true)
        }

        // RolesBar actions
        this.wm.user_acc.fa.j = this.contract.methods.addFarmer
        this.wm.user_acc.in.j = this.contract.methods.addInspector
        this.wm.user_acc.pr.j = this.contract.methods.addProducer
        this.wm.user_acc.di.j = this.contract.methods.addDistributor
        this.wm.user_acc.co.j = this.contract.methods.addConsumer
        // backup original addr
        for (let idx in this.wm.user_acc) {
            let acc = this.wm.user_acc[idx]
            acc.addr_txt = acc.addr
            if (acc.addr_org == null) acc.addr_org = acc.addr
            if (acc.priv_org == null) acc.priv_org = acc.priv
        }
    },

    setStatus: function (message, id) {
        const status = document.getElementById(id)
        status.innerHTML = message
    }
    // addFarmer: async function (addr) {
    //     const { addFarmer } = this.contract.methods
    //     await addFarmer(addr).send({ from: this.account })
    // }

    // createStar: async function () {
    // 	const { createStar } = this.contract.methods;
    // 	const name = document.getElementById("starName").value;
    // 	const id = document.getElementById("starId").value;
    // 	await createStar(name, id).send({ from: this.account });
    // 	Web3app.setStatus("New Star Owner is " + this.account + ".", "status");
    // },

    // // Implement Task 4 Modify the front end of the DAPP
    // lookUp: async function () {
    // 	let { name } = this.contract.methods;
    // 	let { symbol } = this.contract.methods;
    // 	let { ownerOf } = this.contract.methods;
    // 	let { lookUptokenIdToStarInfo } = this.contract.methods;
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
}

// this.wm.Web3app = Web3app;

// class App {
//   vm = nul;
// }

// ref="Roles"
// this.wm.$refs.Roles.dialog = true

export default {
    name: 'App',
    components: {
        'app-bar-user': UserBar,
        'app-modal-roles': ModalRoles,
        'app-modal-workflow': ModalWorkflow,

        'app-modal-co-buy': ModalCoBuy,
        'app-modal-di-sell': ModalDiSell,
        'app-modal-farm-plant': ModalFarmPlant,
        'app-modal-farm-harvest': ModalFarmHarvest,
        'app-modal-farm-proc': ModalFarmProcess,
        'app-modal-in-audit': ModalInAudit,
        'app-modal-in-cert': ModalInCert,
        'app-modal-pr-ble': ModalPrBle,
        'app-modal-pr-cre': ModalPrCre,
        'app-modal-pr-pa': ModalPrPack,
        'app-modal-pr-pro': ModalPrPro,

        'app-walkthrough': Walkthrough,
        'app-viewer': Viewer
        // popper: Popper,
    },
    methods: {
        changeName() {
            this.farmer_name = 'Anna'
            console.log(this.farmer_name)
        },
        resetName() {
            this.farmer_name = 'Max'
        },
        startTour() {
            this.$tours['myTour'].start()
        },
        modalRoles() {
            this.$modal['Roles'].start()
        },
        start() {
            this.wallet_name = 'WALLET'
        }
        // addFarmer(addr) {
        // 	console.log("BLBLBLBLBLBBLA");
        // 	const { addFarmer } = this.contract.methods;
        // 	await addFarmer(addr).send({ from: this.account });
        // },
        // eth_metamask_sts(value) {
        //   //   this.metamask_connected = value;
        //   //   console.log("eth_metamask_sts:" + value);
        //   if (value) {
        //     this.wallet_name = "BLA";
        //   }
        // },
    },

    // reactive properties
    data: () => ({
        // components
        Web3app: Web3app,
        ModalRoles: ModalRoles,
        ModalWorkflow: ModalWorkflow,
        ModalFarmPlant: ModalFarmPlant,
        // ModalGenericUpc: ModalGenericUpc,
        // labels
        farmer_name: 'none',
        // wallet status
        wallet_name: 'wallet',
        wallet_msg: '',
        wallet_msgshow: false,
        web3_error: false,
        web3_connected: false,
        supply_chain: {},
        // events
        upc_actions: {
            fa_plant: [],
            fa_harv: [],
            in_aud: [],
            fa_proc: [],
            pr_cr: [],
            pr_ble: [],
            pr_pr: [],
            in_cer: [],
            pr_pack: [],
            di_sell: [],
            co_buy: []
        },

        // smart contract address
        sm_acc: {
            sm: {
                addr: '0x82EE57820D2e9d4b1b2eCe739FEEc0acA61e3213'
            }
        },
        // user account addresses
        user_acc: {
            owner: {
                enabled: false,
                subtitle: 'Smart Contract Owner',
                avatar: 'owner.svg',
                l: 'Smart Contract Owner address',
                addr: '0x6b0790A0E8186D0AFd09BCBD64D83778ab318650',
                addr_txt: '',
                priv: '8f59b444e449433903757d2b55f1522733f7ff0d978760f4f084d8048fa9d1cc',
                id: 'b-owner',
                items: [{ id: 1, text: 'Add users to Roles', icon: 'fas fa-user-tag' }],
                items_unlocked: [true],
                v: false,
                vt: '',
                vs: 'color:black',
                role_render: false,
                balance: '...',
                balance_style: 'color:gray'
            },
            fa: {
                enabled: false,
                subtitle: 'Farmer',
                avatar: 'farmer.jpg',
                l: 'Farmer address',
                addr_txt: '',
                addr: '0x9D9e3E99127CD227CfbACb84289a5F3F96Ce9922',
                priv: '8f8b0f9ae0d98f029eae72095b419e5f0cb1b8ee7e668740686c46afd7df592e',
                id: 'b-farmer',
                items: [
                    { id: 2, k: 'fa_plant', text: 'Plant a Grape', icon: 'fas fa-seedling' },
                    { id: 3, k: 'fa_harv', text: 'Harvest a Grape', icon: 'fas fa-tractor' },
                    { id: 4, k: 'fa_proc', text: 'Process a Grape', icon: 'fas fa-box-open' }
                ],
                items_unlocked: [true, false, false],
                v: false,
                vt: '',
                vs: 'color:black',
                role_render: true,
                balance: '...',
                balance_style: 'color:gray'
            },
            in: {
                enabled: false,
                subtitle: 'Inspector',
                avatar: 'inspector.jpg',
                l: 'Inspector address',
                addr: '0xD8c5BcDdAE7896B9d4747cb753283681F262E1CE',
                addr_txt: '',
                priv: '8eec02c941cdccb9337b9cea9fa47d1e06edb4d7a3bd45b3655009b02be57dc9',
                id: 'b-inspector',
                items: [
                    { id: 5, k: 'in_aud', text: 'Audit a Grape', icon: 'fas fa-tag' },
                    { id: 6, k: 'in_cer', text: 'Certify a Juice', icon: 'fas fa-check-square' }
                ],
                items_unlocked: [false, false],
                v: false,
                vt: '',
                vs: 'color:black',
                role_render: true,
                balance: '...',
                balance_style: 'color:gray'
            },
            pr: {
                enabled: false,
                subtitle: 'Producer',
                avatar: 'producer.png',
                l: 'Producer address',
                addr: '0x78DCba4FEE08726E86a3a6b970B85e684eaDC590',
                addr_txt: '',
                priv: 'b84a51835ac9dd83f12e99f71c0307887711454fbe4dc6d620bc577f37cb8a37',
                id: 'b-producer',
                items: [
                    { id: 7, k: 'pr_cr', text: 'Create a Juice', icon: 'fas fa-flask' },
                    { id: 8, k: 'pr_ble', text: 'Blend a Juice', icon: 'fas fa-glass-cheers' },
                    { id: 9, k: 'pr_pr', text: 'Produce a Juice', icon: 'fas fa-industry' },
                    { id: 10, k: 'pr_pack', text: 'Pack a Juice', icon: 'fas fa-shipping-fast' }
                ],
                items_unlocked: [false, false, false, false],
                v: false,
                vt: '',
                vs: 'color:black',
                role_render: true,
                balance: '...',
                balance_style: 'color:gray'
            },
            di: {
                enabled: false,
                subtitle: 'Distributor',
                avatar: 'distributor.png',
                l: 'Distributor address',
                addr: '0xC0520D16a972EEAbBc1F82F18187F672b2a7D78c',
                addr_txt: '',
                priv: 'a746f3cd6f66c9be6a0774990c35b34ef5080e83d0af90fe604399f2381c0957',
                id: 'b-distributor',
                items: [{ id: 11, k: 'di_sell', text: 'For sell a Juice', icon: 'fas fa-store' }],
                items_unlocked: [false],
                v: false,
                vt: '',
                vs: 'color:black',
                role_render: true,
                balance: '...',
                balance_style: 'color:gray'
            },
            co: {
                enabled: false,
                subtitle: 'Consumer',
                avatar: 'consumer.jpg',
                l: 'Consumer address',
                addr: '0xD30ec28932096fC0B5De0b84e4560A533203241f',
                addr_txt: '',
                priv: '6fecd14712f0aa2a3e2a89deb3195b122c9d51e138ed73a0d80cd950d56431e7',
                id: 'b-consumer',
                items: [{ id: 12, k: 'co_buy', text: 'Buy a Juice', icon: 'fas fa-shopping-cart' }],
                items_unlocked: [false],
                v: false,
                vt: '',
                vs: 'color:black',
                role_render: true,
                balance: '...',
                balance_style: 'color:gray'
            }
        },
        // ModalForm options
        FarmPlant_params: {
            t1: { t: 'Grape' },
            grapeUpc: { l: 'grapeUpc - Universal Product Code (unique number for each Grape planted)', v: 1 },
            t2: { t: 'Farm' },
            originFarmName: { l: 'Farm Name (text)', v: 'Miolo Winery' },
            originFarmInformation: { l: 'Farm Information (text)', v: 'RS-444, 21, Bento Gonçalves - RS' },
            originFarmLatitude: { l: 'Farm Latitude', v: -29.17963727858983 },
            originFarmLongitude: { l: 'Farm Latitude', v: -51.58366857790086 }
        },
        FarmHarvest_params: {
            t1: { t: 'Grape' },
            grapeUpc: { l: 'grapeUpc - Universal Product Code (unique number for each Grape planted)', v: 1 },
            t2: { t: 'Harvest' },
            harvestNotes: { l: 'Harvest Notes (text)', v: 'details here important harvest notes' }
        },
        FaProc_params: {
            t1: { t: 'Grape' },
            grapeUpc: { l: 'grapeUpc - Universal Product Code (unique number for each Grape planted)', v: 1 }
        },
        InAudit_params: {
            t1: { t: 'Grape' },
            grapeUpc: { l: 'grapeUpc - Select the upc of Grape', v: 1 },
            t2: { t: 'Audit' },
            auditNotes: { l: 'Audit Notes (text)', v: 'details here important audit notes' }
        },
        InCert_params: {
            t1: { t: 'Juice' },
            juiceUpc: { l: 'juiceUpc - Select the upc of Juice', v: 1 },
            t2: { t: 'Certify' },
            certifyNotes: { l: 'Certify Notes (text)', v: 'details here important certify notes' }
        },
        PrCre_params: {
            t1: { t: 'Create Juice' },
            juiceUpc: { l: 'juiceUpc - Universal Product Code (unique number for each Juice Produced)', v: 1 },
            productID: { l: 'productID - ID of product', v: 1 }
        },
        PrBle_params: {
            t1: { t: 'Juice' },
            juiceUpc: { l: 'juiceUpc - Select the upc of Juice', v: 1 },
            t2: { t: 'Blend with Grape' },
            grapeUpc: { l: 'grapeUpc - Select the upc of Grape to Blend the Juice', v: 1 }
        },
        PrPack_params: {
            t1: { t: 'Juice' },
            juiceUpc: { l: 'juiceUpc - Select the upc of Juice', v: 1 }
        },
        PrPro_params: {
            t1: { t: 'Juice' },
            juiceUpc: { l: 'juiceUpc - Select the upc of Juice', v: 1 },
            t2: { t: 'Juice Product info' },
            productNotes: { l: 'Juice product notes (text)', v: 'details here important product notes' },
            productPrice: { l: 'Price (in ETH)', v: 0.01 }
        },

        DiSell_params: {
            t1: { t: 'Juice' },
            juiceUpc: { l: 'juiceUpc - Select the upc of Juice', v: 1 }
        },
        CoBuy_params: {
            t1: { t: 'Juice' },
            juiceUpc: { l: 'juiceUpc - Select the upc of Juice', v: 1 }
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
`
    }),
    computed: {
        wallet_color: function () {
            var nc = this.web3_connected ? (this.web3_error ? 'red' : 'light-green accent-3') : this.web3_error ? 'red' : 'white'
            return nc
        },
        wallet_style: function () {
            var nc = this.web3_error ? 'red' : this.web3_connected ? 'white' : 'red'
            return 'color:' + nc
        }
    },
    mounted: function () {
        this.start()
        // this.eth_metamask_sts(true);
        // this.$tours["myTour"].start();
    }
}

window.addEventListener('load', async function () {
    var wm = window.vm.$children[0]
    if (window.ethereum) {
        wm.wallet_msgshow = true
        wm.wallet_msg = 'connecting..'

        // use MetaMask's provider
        Web3app.web3 = new Web3(window.ethereum)
        await window.ethereum.enable() // get permission to access accounts
        // wm.eth_metamask_sts(true);
        wm.wallet_name = 'Metamask'
    } else {
        console.warn('No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        Web3app.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
        // wm.eth_localhost_sts(true);
        wm.wallet_name = 'localhost:9545'
    }

    Web3app.start()
    console.log('dfb')
})
</script>
