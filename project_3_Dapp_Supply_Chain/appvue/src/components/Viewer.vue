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
        <h2 class="display-2 font-weight-bold mb-3">Supply Chain View:</h2>
        <table style="width: 100%; border: 1px solid black">
            <tr style="border: 1px solid black">
                <th style="border: 1px solid black">Grapes</th>
                <th style="border: 1px solid black">Wines</th>
            </tr>

            <tr style="border: 1px solid black">
                <th style="border: 1px solid black">
                    <tr v-for="(n, index) in details" v-bind:key="index">
                        <td>
                            <a :href="'https://rinkeby.etherscan.io/tx/' + n.transactionHash" target="_blank"> upc:{{ n.returnValues.upc }}-{{ n.event }} </a>
                        </td>
                        <td></td>
                    </tr>
                </th>
                <th style="border: 1px solid black"></th>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        details: {
            type: Object
        }
    }
}
</script>
