
<template>
    <div class="component">
        <v-container>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="1000px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on" > Workflow </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Workflow</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-img v-bind:src="getImgUrl('uml_activity.png')"></v-img>
                            </v-container>
                            *You should set the address of your Metamask wallet to <strong>each actor</strong>, network <strong>Rinkeby</strong> and have
                            <strong>enough funds</strong>.
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
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
    getImgUrl(pic) {
      return require("../assets/" + pic);
	},
  },
}
</script>