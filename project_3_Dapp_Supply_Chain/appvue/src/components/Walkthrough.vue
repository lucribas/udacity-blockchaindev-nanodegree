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
        <h2 class="display-2 font-weight-bold mb-3">Walkthrough:</h2>
        <h1 class="display-1 font-weight-bold mb-1">1. Setup Metamask wallet:</h1>
        SupplyChain is a sample Dapp running on the Ethereum Rinkeby Testnet. Make sure your Metamask network is set to 'Rinkeby'. Click <a href="https://faucet.rinkeby.io/" target="_blank">here</a> to acquire Ether from the Rinkeby faucet.
        Select the <strong>Rinkeby</strong> test network.<br />
        Please <strong>import</strong> the following private keys to your Metamask wallet:<br />
        <br />
        <table style="width: 100%; border: 1px solid black; border-collapse: collapse">
            <tr style="border: 1px solid black">
                <th style="border: 1px solid black">Id</th>
                <th style="border: 1px solid black">Address</th>
                <th style="border: 1px solid black">Private Key (to import)</th>
            </tr>
            <tr v-for="(n, index) in user_acc" v-bind:key="index">
                <td>{{ n.subtitle }}</td>
                <td>{{ n.addr_txt }}</td>
                <td>{{ n.priv }}</td>
            </tr>
        </table>

        <br /><br />
        <h1 class="display-1 font-weight-bold mb-3">2. Connect as Smart Contract Owner:</h1>
        2.1 Change the address of your Metamask wallet to <strong>Smart Contract Owner</strong>({{ user_acc.owner.addr_txt }});<br />
        2.2 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-user-tag theme--light green--text"></i>Add users to Roles</div>
        Button and add the users addresses as requested.<br />

        <br /><br />
        <h1 class="display-1 font-weight-bold mb-3">3. Connect as Farmer:</h1>
        3.1 Change the address of your Metamask wallet to <strong>Farmer</strong>({{ user_acc.fa.addr_txt }});<br />
        3.2 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-seedling theme--light green--text"></i>Plant a Grape</div>
        Button;<br />
        3.3 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-tractor theme--light green--text"></i>Harvest a Grape</div>
        Button;<br />
        3.4 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-box-open theme--light green--text"></i>Process a Grape</div>
        Button;<br />

        <br /><br />
        <h1 class="display-1 font-weight-bold mb-3">4. Connect as Inspector:</h1>
        4.1 Change the address of your Metamask wallet to <strong>Inspector</strong>({{ user_acc.in.addr_txt }});<br />
        4.2 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-tag theme--light green--text"></i>Audit a Grape</div>
        Button;<br />
        4.3 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-check-square theme--light green--text"></i>Certify a Juice</div>
        Button;<br />

        <br /><br />
        <h1 class="display-1 font-weight-bold mb-3">5. Connect as Producer:</h1>
        5.1 Change the address of your Metamask wallet to <strong>Producer</strong>({{ user_acc.pr.addr_txt }});<br />
        5.2 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-flask theme--light green--text"></i>Create a Juice</div>
        Button;<br />
        5.3 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-glass-cheers theme--light green--text"></i>Blend a Juice</div>
        Button;<br />
        5.4 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-industry theme--light green--text"></i>Produce a Juice</div>
        Button;<br />
        5.5 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-shipping-fast theme--light green--text"></i>Pack a Juice</div>
        Button;<br />

        <br /><br />
        <h1 class="display-1 font-weight-bold mb-3">6. Connect as Distributor:</h1>
        6.1 Change the address of your Metamask wallet to <strong>Distributor</strong>({{ user_acc.di.addr_txt }});<br />
        6.2 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-store theme--light green--text"></i>For sell a Juice</div>
        Button;<br />

        <br /><br />
        <h1 class="display-1 font-weight-bold mb-3">7. Connect as Consumer:</h1>
        7.1 Change the address of your Metamask wallet to <strong>Consumer</strong>({{ user_acc.co.addr_txt }});<br />
        7.2 Click on
        <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-shopping-cart theme--light green--text"></i>Buy a Juice</div>
        Button;<br />
    </div>
</template>

<script>
export default {
    props: {
        user_acc: {}
    }
}
</script>>
