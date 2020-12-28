<template>
    <div class="component">
        <v-app>
            <!-- NAV BAR -------------------------- -->
            <v-navigation-drawer app floating permanent>
                <app-bar-roles ref="Roles" :user_acc="user_acc" :sm_acc="sm_acc"></app-bar-roles>
                <app-workflow :user_acc="user_acc" :sm_acc="sm_acc"></app-workflow>
                <div id="topDiv"></div>
                <app-bar-user :details="user_acc.owner"></app-bar-user>
                <app-bar-user :details="user_acc.fa"></app-bar-user>
                <app-bar-user :details="user_acc.in"></app-bar-user>
                <app-bar-user :details="user_acc.pr"></app-bar-user>
                <app-bar-user :details="user_acc.di"></app-bar-user>
                <app-bar-user :details="user_acc.co"></app-bar-user>
            </v-navigation-drawer>

            <!-- APP BAR -------------------------- -->
            <v-app-bar app color="primary" dark>
                <v-row class="flex" justify="space-between">
                    <v-tooltip v-model="wallet_msgshow" bottom>
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
import RolesBar from './components/RolesBar.vue'
import Workflow from './components/Workflow.vue'
import Viewer from './components/Viewer.vue'
import { tour_steps } from './AppTour.js'
import Web3 from 'web3'
import supplyChainArtifact from '../../build/contracts/SupplyChain.json'

var Web3app = {
    web3: null,
    account: null,
	meta: null,
	vm: null,

    // start task
    start: async function () {
		this.vm = window.vm.$children[0];
        await this.wallet_detect()
        this.update_methods()
        this.updateUserBarProps()
        await this.read_events()

        window.ethereum.on('accountsChanged', async function (accounts) {
            // Time to reload your interface with accounts[0]!
            console.log('accountsChanged')
            console.log(accounts)
            await Web3app.wallet_detect()
            Web3app.updateUserBarProps()
        })

        window.ethereum.on('networkChanged', async function (networkId) {
            // Time to reload your interface with the new networkId
            console.log('networkChanged')
            console.log(networkId)
            await Web3app.wallet_detect()
        })
        // this.vm.RolesBar.dialog = true;
    },

    // wallet detection
    wallet_detect: async function () {
        const { web3 } = this
        try {
            // get info about metamask
            const networkId = await web3.eth.net.getId()
            const networkType = await web3.eth.net.getNetworkType()

            // check if contract is deployed in current network
            const deployedNetwork = supplyChainArtifact.networks[networkId]
            if (deployedNetwork == undefined) throw Error('smart contract not deployed! (networkId=' + networkId + ', networkType=' + networkType + ')')

            // get contract instance
            this.meta = new web3.eth.Contract(supplyChainArtifact.abi, deployedNetwork.address)

            // get account from Metamask
            const accounts = await web3.eth.getAccounts()
            this.account = accounts[0]

            // update Vue reactive properties
            this.vm.account = this.account
            this.vm.Web3app_meta = this.meta
            this.vm.web3_error = false
            this.vm.web3_connected = true
            this.vm.wallet_msg = 'Connected'

            //   end
        } catch (error) {
            const msg = 'Could not connect to contract or chain -> ' + error
            console.error(msg)
            this.vm.web3_error = true
            this.vm.wallet_msg = msg
        }
    },
    read_events: async function () {
        try {
            // print all events
            this.meta
                .getPastEvents('allEvents', {
                    fromBlock: 0
                    // toBlock: "latest",
                })
                .then(function (events) {
                    console.log(events)
                })

            this.meta
                .getPastEvents('FarmerAdded', {
                    fromBlock: 0
                    // toBlock: "latest",
                })
                .then(function (events) {
                    console.log(events)
                })

            //   end
        } catch (error) {
            const msg = 'Could not connect to contract or chain -> ' + error
            console.error(msg)
            this.vm.web3_error = true
            this.vm.wallet_msgshow = true
            this.vm.wallet_msg = msg
        }
    },

    updateUserBarProps: function () {
        var user_acc = this.vm.user_acc
        for (const idx in user_acc) {
            const acc = user_acc[idx]
            if (this.account == acc.addr) {
                acc.enabled = true
            } else {
                acc.enabled = false
            }
        }
    },

    //   update methods pointers since children was already created
    update_methods: function () {
        let vm = this.vm
        // UserBar actions
        vm.user_acc.owner.items[0].action = function () {
			// show RolesBar modal dialog
			vm.$refs.Roles.checkForm();
            vm.$refs.Roles.set_dialog(true);
        }
        // vm.user_acc.owner.items[1].action = function () {};
        // vm.user_acc.owner.items[2].action = function () {};

        // RolesBar actions
        vm.user_acc.fa.j = this.meta.methods.addFarmer
        vm.user_acc.in.j = this.meta.methods.addInspector
        vm.user_acc.pr.j = this.meta.methods.addProducer
        vm.user_acc.di.j = this.meta.methods.addDistributor
        vm.user_acc.co.j = this.meta.methods.addConsumer
    },

    setStatus: function (message, id) {
        const status = document.getElementById(id)
        status.innerHTML = message
    },
    addFarmer: async function (addr) {
        const { addFarmer } = this.meta.methods
        await addFarmer(addr).send({ from: this.account })
    }

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
}

// this.vm.Web3app = Web3app;

// class App {
//   vm = nul;
// }

// ref="Roles"
// this.vm.$refs.Roles.dialog = true

export default {
    name: 'App',
    components: {
        'app-bar-user': UserBar,
        'app-bar-roles': RolesBar,
        'app-workflow': Workflow,
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
        // 	const { addFarmer } = this.meta.methods;
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

    // reative properties
    data: () => ({
        // components
        Web3app: Web3app,
        RolesBar: RolesBar,
        // labels
        farmer_name: 'none',
        // wallet status
        wallet_name: 'wallet',
        wallet_msg: '',
        wallet_msgshow: false,
        web3_error: false,
        web3_connected: false,
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
                items: [
                    { text: 'Add users to Roles', icon: 'fas fa-user-tag' },
                ],
                items_locked: [false, true, true],
                v: false,
                vt: '',
                vs: 'color:black',
                role_render: false
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
                role_render: true
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
                role_render: true
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
                role_render: true
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
                role_render: true
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
                role_render: true
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
	var vm = window.vm.$children[0];
    if (window.ethereum) {
        vm.wallet_msgshow = true
        vm.wallet_msg = 'connecting..'

        // use MetaMask's provider
        Web3app.web3 = new Web3(window.ethereum)
        await window.ethereum.enable() // get permission to access accounts
        // vm.eth_metamask_sts(true);
        vm.wallet_name = 'Metamask'
    } else {
        console.warn('No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        Web3app.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
        // vm.eth_localhost_sts(true);
        vm.wallet_name = 'localhost:9545'
    }

    Web3app.start()
})
</script>
