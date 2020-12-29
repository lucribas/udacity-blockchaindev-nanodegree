
<template>
    <div class="component">
        <v-container>
            <v-row>
                <v-btn :href="'https://rinkeby.etherscan.io/address/' + this.sm_acc.sm.addr" target="_blank" color="indigo" text>
                    <span id="btn-github" class="mr-2">Contract {{ this.sm_acc.sm.addr.substring(0, 7) }}..</span>
                    <i class="fas fa-file-contract fa-2x"></i>
                </v-btn>
            </v-row>
            <v-row style="padding: 10px">
                <v-divider></v-divider>
            </v-row>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="850px">
                    <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="checkForm"
            >
              Roles
            </v-btn>
          </template> -->
                    <v-card>
                        <v-card-title>
                            <span class="headline">Enables the specified address to each role</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <div v-for="(n, index) in user_acc" v-bind:key="index">
                                    <v-row v-if="n.role_render">
                                        <v-col cols="8">
                                            <v-text-field v-model="n.addr" :label="n.l" outlined required class="shrink" style="width: 700px" @change="checkForm"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-btn class="mx-2" fab color="indigo" :disabled="n.v" @click="aux_Add(n)">
                                                <v-icon dark> mdi-plus </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <span class="mr-2" :style="n.vs">{{ n.vt }}</span>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-container>
                            *You should set the address of your Metamask wallet to <strong>Smart Contract Owner</strong>, network <strong>Rinkeby</strong> and have
                            <strong>enough funds</strong>.
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="checkForm"> Check Addresses </v-btn>
                            <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>


<script>
export default {
    props: {
        user_acc: {},
        sm_acc: {}
    },
    data: () => ({
        dialog: false
    }),
    methods: {
        set_dialog(m) {
            window.vm.$children[0].$refs.Roles.dialog = m
        },
        aux_Add(m) {
            m.j(m.addr).send({ from: window.vm.$children[0].Web3app.account })
            var msg = 'processing.. Please click on [Check Addresses] after Metamask confirm transaction.'
            this.aux_setForm(m, true, msg, 'color:blue')
        },
        checkForm() {
            var vm = this
            var sm = window.vm.$children[0].Web3app.contract.methods

            vm.aux_Form(this.user_acc.fa, sm.isFarmer)
            vm.aux_Form(this.user_acc.in, sm.isInspector)
            vm.aux_Form(this.user_acc.pr, sm.isProducer)
            vm.aux_Form(this.user_acc.di, sm.isDistributor)
            vm.aux_Form(this.user_acc.co, sm.isConsumer)
        },
        aux_Form(m, j) {
            var vm = this
            var Web3app = window.vm.$children[0].Web3app

            if (Web3app.web3.utils.isAddress(m.addr)) {
                const tmp = j(m.addr).call()
                this.aux_checkForm(m, tmp)
            } else {
                let msg = 'Invalid address! Please check the provided address.'
                vm.aux_setForm(m, true, msg, 'color:red')
            }
        },
        aux_checkForm(m, f) {
            var vm = this
            f.then(function (has) {
                if (has) {
                    var msg = 'This address already has the role.'
                    vm.aux_setForm(m, true, msg, 'color:green')
                } else {
                    msg = 'Click on button to add this role to address.'
                    vm.aux_setForm(m, false, msg, 'color:blue')
                }
            })
        },
        aux_setForm(m, v, vt, vs) {
            m.v = v
            m.vt = vt
            m.vs = vs
        }
    }
}
</script>