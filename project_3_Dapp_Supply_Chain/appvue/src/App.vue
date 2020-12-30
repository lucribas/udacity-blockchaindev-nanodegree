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
                <app-modal-workflow ref="Workflow" :user_acc="user_acc" :sm_acc="sm_acc"></app-modal-workflow>
                <app-bar-user :details="user_acc.owner"></app-bar-user>
                <app-bar-user :details="user_acc.fa"></app-bar-user>
                <app-bar-user :details="user_acc.in"></app-bar-user>
                <app-bar-user :details="user_acc.pr"></app-bar-user>
                <app-bar-user :details="user_acc.di"></app-bar-user>
                <app-bar-user :details="user_acc.co"></app-bar-user>
                <app-modal-roles ref="Roles" :user_acc="user_acc" :sm_acc="sm_acc"></app-modal-roles>
                <app-modal-farm-plant ref="FarmPlant" :user_acc="user_acc" :sm_acc="sm_acc"></app-modal-farm-plant>
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
                <v-container>
                    <div v-for="(n, index) in evt_GrapePlanted" v-bind:key="index">
                        <v-row>
                            <v-col cols="12" class="ma-0 pa-0">
                                <h2 class="title mb-2" style="color: blue">{{ n.event }}</h2>
                                <h2 class="title mb-2" style="color: blue">{{ n.returnValues.upc }}</h2>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>

                <v-container fluid>
                    <Viewer />
                    <p>Name is {{ farmer_name }}</p>
                    <br /><br />
                    <button @click="changeName">Change Farmer Name</button>
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
// import Vue from "vue";
import UserBar from './components/UserBar.vue'
import ModalRoles from './components/ModalRoles.vue'
import ModalWorkflow from './components/ModalWorkflow.vue'
import ModalFarmPlant from './components/ModalFarmPlant.vue'
import Viewer from './components/Viewer.vue'
import { tour_steps } from './AppTour.js'
import Web3 from 'web3'
import supplyChainArtifact from '../../build/contracts/SupplyChain.json'

var Web3app = {
    web3: null,
    account: null,
    contract: null,
    vm: null, // vue instance
    wm: null, // window children instance
    evt_GrapePlanted: {},

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
    read_events: async function () {
        try {
            // print all past events
            this.contract
                .getPastEvents('allEvents', {
                    fromBlock: 0
                    // toBlock: "latest",
                })
                .then(function (events) {
                    console.log(events)
                })

            // register listen to past and new events
            this.contract.events.GrapePlanted(
                {
                    fromBlock: 0
                    // toBlock: "latest",
                },
                function (error, event) {
                    console.log(event)
                    // console.log(error)
                    // Vue.set
					// Web3app.evt_GrapePlanted[event.id] = event
					window.vm.$children[0].Web3app.vm.$set(Web3app.evt_GrapePlanted, event.id, event)
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
        this.wm.user_acc.fa.items[0].action = function () {
            window.vm.$children[0].$refs.FarmPlant.set_FarmPlantDialog(true)
        } //grapePlantItem
        this.wm.user_acc.fa.items[1].action = function () {} //grapeHarvestItem
        this.wm.user_acc.fa.items[2].action = function () {} //grapeProcessItem

        this.wm.user_acc.in.items[0].action = function () {} //grapeAuditItem
        this.wm.user_acc.in.items[1].action = function () {} //juiceCertifyItem

        this.wm.user_acc.pr.items[0].action = function () {} //juiceCreateItem
        this.wm.user_acc.pr.items[1].action = function () {} //juiceBlendItem
        this.wm.user_acc.pr.items[2].action = function () {} //juiceProduceItem
        this.wm.user_acc.pr.items[3].action = function () {} //juicePackItem

        this.wm.user_acc.di.items[0].action = function () {} //juiceSellItem

        this.wm.user_acc.co.items[0].action = function () {} //juiceSellItem

        // RolesBar actions
        this.wm.user_acc.fa.j = this.contract.methods.addFarmer
        this.wm.user_acc.in.j = this.contract.methods.addInspector
        this.wm.user_acc.pr.j = this.contract.methods.addProducer
        this.wm.user_acc.di.j = this.contract.methods.addDistributor
        this.wm.user_acc.co.j = this.contract.methods.addConsumer
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
        'app-modal-farm-plant': ModalFarmPlant,
        // popper: Popper,

        Viewer
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
        // labels
        farmer_name: 'none',
        // wallet status
        wallet_name: 'wallet',
        wallet_msg: '',
        wallet_msgshow: false,
        web3_error: false,
        web3_connected: false,
        // events
        evt_GrapePlanted: Web3app.evt_GrapePlanted,
        // smart contract address
        sm_acc: {
            sm: {
                addr: '0xd4a4265df78f092023ea5870545ca88609006fa5'
            }
        },
        // user account addresses
        user_acc: {
            owner: {
                enabled: false,
                subtitle: 'Smart Contract Owner',
                avatar: 'owner.svg',
                l: 'Smart Contract Owner address',
                addr: '0x1225b8112B4bfF7B3332C53d7C18c658B9d1Eb91',
                id: 'b-owner',
                selectedItem: 0,
                items: [{ text: 'Add users to Roles', icon: 'fas fa-user-tag' }],
                items_locked: [false, true, true],
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
                addr: '0x9D9e3E99127CD227CfbACb84289a5F3F96Ce9922',
                id: 'b-farmer',
                selectedItem: 0,
                items: [
                    { text: 'Plant a Grape', icon: 'fas fa-seedling' },
                    { text: 'Harvest a Grape', icon: 'fas fa-tractor' },
                    { text: 'Process a Grape', icon: 'fas fa-box-open' }
                ],
                items_locked: [false, true, true],
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
                id: 'b-inspector',
                items: [
                    { text: 'Audit a Grape', icon: 'fas fa-tag' },
                    { text: 'Certify a Juice', icon: 'fas fa-check-square' }
                ],
                selectedItem: 0,
                items_locked: [true, true],
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
                id: 'b-producer',
                items: [
                    { text: 'Create a Juice', icon: 'fas fa-flask' },
                    { text: 'Blend a Juice', icon: 'fas fa-glass-cheers' },
                    { text: 'Produce a Juice', icon: 'fas fa-industry' },
                    { text: 'Pack a Juice', icon: 'fas fa-shipping-fast' }
                ],
                selectedItem: 0,
                items_locked: [true, true, true, true],
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
                id: 'b-distributor',
                items: [{ text: 'For sell a Juice', icon: 'fas fa-store' }],
                selectedItem: 0,
                items_locked: [true],
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
                id: 'b-consumer',
                items: [{ text: 'Buy a Juice', icon: 'fas fa-shopping-cart' }],
                selectedItem: 0,
                items_locked: [true],
                v: false,
                vt: '',
                vs: 'color:black',
                role_render: true,
                balance: '...',
                balance_style: 'color:gray'
            }
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
})
</script>
