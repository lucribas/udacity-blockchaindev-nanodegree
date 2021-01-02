<style>
.boxed {
    border: 0px solid blue;
    color: blue;
    display: inline-block;
    /* width: 50px; */
    text-align: center;
    background-color: lightblue;
}
</style>

<template>
    <div class="component">
        <!-- SUPPLY CHAIN VIEW -->
        <h2 class="display-2 font-weight-bold mb-3">Supply Chain View:</h2>
        <table style="width: 100%; border: 1px solid black">
            <tr style="border: 1px solid black">
                <th style="border: 1px solid black">Grapes Events</th>
                <th style="border: 1px solid black">Juices Events</th>
            </tr>

            <tr style="border: 1px solid black">
                <!-- Grapes -->
                <th style="border: 1px solid black">
                    <tr v-for="(upc, index) in details_grapes" v-bind:key="index">
                        <td style="text-align: left">
                            upcGrape:{{ index }}-
                            <span v-for="(evt, evt_index) in upc.events" v-bind:key="evt_index">
								<i :class="get_icon(evt.event)" style="color: green" />
                                <a :href="'https://rinkeby.etherscan.io/tx/' + evt.transactionHash" target="_blank">{{ evt.event.split('Grape')[1] }}</a
                                >,
                            </span>
                        </td>
                        <td></td>
                    </tr>
                </th>
                <!-- Juices -->
                <th style="border: 1px solid black">
                    <tr v-for="(upc, index) in details_juices" v-bind:key="index">
                        <td style="text-align: left">
                            upcJuice:{{ index }}-
                            <span v-for="(evt, evt_index) in upc.events" v-bind:key="evt_index">
								<i :class="get_icon(evt.event)" style="color: green" />
                                <a :href="'https://rinkeby.etherscan.io/tx/' + evt.transactionHash" target="_blank">{{ evt.event.split('Juice')[1] }}</a
                                >,
                            </span>
                        </td>
                        <td></td>
                    </tr>
                </th>
            </tr>
        </table>

        <!-- AVAILABLE ACTIONS -->
        <br />
        <h3 class="display-1 font-weight-bold mb-3">Available Actions:</h3>
        <table style="width: 100%; border: 1px solid black">
            <tr style="border: 1px solid black">
                <th style="border: 1px solid black">Grapes</th>
                <th style="border: 1px solid black">Juices</th>
            </tr>

            <tr style="border: 1px solid black">
                <!-- Grapes -->
                <th style="border: 1px solid black">
                    <tr v-for="(n, index) in upc_actions_grapes" v-bind:key="index">
                        <td style="text-align: left">
                            <span>
                                {{ get_role(index).subtitle }} - (<i :class="get_item(index).icon" style="color: green" /> {{ get_item(index).text.split(' a Grape')[0] }})
                            </span>
                            <span v-if="index == 'fa_plant'"> upcGrape: any new</span>
                            <span v-if="Object.keys(n).length > 0 && index != 'fa_plant'">
                                upcGrape:
                                <span v-for="(upc, index) in n" v-bind:key="index"> {{ upc }}, </span>
                            </span>
                        </td>
                        <td></td>
                    </tr>
                </th>
                <!-- Juices -->
                <th style="border: 1px solid black">
                    <tr v-for="(n, index) in upc_actions_juices" v-bind:key="index">
                        <td style="text-align: left">
                            <span>
                                {{ get_role(index).subtitle }} - (<i :class="get_item(index).icon" style="color: green" /> {{ get_item(index).text.split(' a Juice')[0] }})
                            </span>
                            <span v-if="index == 'pr_cr'"> upcJuice: any new</span>
                            <span v-if="Object.keys(n).length > 0 && index != 'pr_cr'">
                                upcJuice:
                                <span v-for="(upc, index) in n" v-bind:key="index"> {{ upc }}, </span>
                            </span>
                            <span v-if="index == 'pr_ble' && index != 'pr_cr'">
                                upcGrape:
                                <span v-for="(upc, index) in upc_actions_juices.pr_cr" v-bind:key="index"> {{ upc }}, </span>
                            </span>
                        </td>
                        <td></td>
                    </tr>
                </th>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        details: {
            type: Object
        },
        upc_actions: {
            type: Object
        },
        user_acc: {
            type: Object
        }
    },
    computed: {
        details_grapes: function () {
            let ret = {}
            for (const upc in this.details) {
                let s = this.details[upc].events
                for (const evt_idx in s) {
                    let evt = s[evt_idx]
                    if (evt.event.includes('Grape')) {
                        if (ret[upc] == null) ret[upc] = { events: {} }
                        ret[upc].events[evt.id] = evt
                    }
                }
            }
            return ret
        },
        details_juices: function () {
            let ret = {}
            for (const upc in this.details) {
                let s = this.details[upc].events
                for (const evt_idx in s) {
                    let evt = s[evt_idx]
                    if (evt.event.includes('Juice')) {
                        if (ret[upc] == null) ret[upc] = { events: {} }
                        ret[upc].events[evt.id] = evt
                    }
                }
            }
            return ret
        },
        upc_actions_grapes: function () {
            const { fa_harv, in_aud, fa_proc } = this.upc_actions
            return { fa_plant: ['any'], fa_harv: fa_harv, in_aud: in_aud, fa_proc: fa_proc }
        },
        upc_actions_juices: function () {
            const { pr_cr, pr_ble, pr_pr, in_cer, pr_pack, di_sell, co_buy } = this.upc_actions
            return { pr_cr: pr_cr, pr_ble: pr_ble, pr_pr: pr_pr, in_cer: in_cer, pr_pack: pr_pack, di_sell: di_sell, co_buy: co_buy }
        }
    },
    methods: {
        get_role: function (m) {
            const idx = m.split('_')[0]
            return this.user_acc[idx]
        },
        get_item: function (sts) {
            const items = this.get_role(sts).items
            let res = {}
            // console.log('----- search for ' + sts)
            // console.log(items)
            for (const idx in items) {
                let i = items[idx]
                // console.log(i.k)
                if (i.k == sts) {
                    res = i
                    break
                }
            }
            // console.log('dxsb')
            return res
        },
        get_icon: function (evtId) {
            const res =
                {
                    GrapePlanted: this.user_acc.fa.items[0].icon,
                    GrapeHarvested: this.user_acc.fa.items[1].icon,
                    GrapeProcessed: this.user_acc.fa.items[2].icon,
                    GrapeAudited: this.user_acc.in.items[0].icon,
                    JuiceCertified: this.user_acc.in.items[1].icon,
					JuiceCreated: this.user_acc.pr.items[0].icon,
					JuiceBlended: this.user_acc.pr.items[1].icon,
                    JuiceProduced: this.user_acc.pr.items[2].icon,
                    JuicePacked: this.user_acc.pr.items[3].icon,
                    JuiceForSale: this.user_acc.di.items[0].icon,
                    JuicePurchased: this.user_acc.co.items[0].icon,
                }[evtId] ?? ''
            return res
        }
    }
}
</script>
