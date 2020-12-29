
<template>
    <div class="component">
        <v-container>
            <v-dialog v-model="farm_plant_dialog" persistent max-width="850px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Farm - Plan a Grape</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <div v-for="(n, index) in user_acc" v-bind:key="index">
                                <v-row v-if="n.role_render">
                                    <v-col cols="8">
                                        <v-text-field v-model="n.addr" :label="n.l" outlined required class="shrink" style="width: 700px" @change="checkForm"></v-text-field>
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
                        <v-btn color="blue darken-1" text @click="farm_plant_dialog = false"> Close </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
        farm_plant_dialog: false
    }),
    methods: {
        set_FarmPlantDialog(m) {
            this.farm_plant_dialog = m
        },
        checkForm() {}
    }
}
</script>