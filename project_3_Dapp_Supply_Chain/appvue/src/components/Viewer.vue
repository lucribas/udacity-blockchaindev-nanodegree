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
	Select the <strong>Rinkeby</strong> test network.<br>
    Please <strong>import</strong> the following private keys to your Metamask wallet:<br />
    <br />
    <table style="width:100%; border: 1px solid black;border-collapse: collapse;">
      <tr style="border: 1px solid black;">
        <th style="border: 1px solid black;">Id</th>
        <th style="border: 1px solid black;">Address</th>
        <th style="border: 1px solid black;">Private Key (to import)</th>
      </tr>
      <tr>
        <td >Smart Contract Owner</td>
        <td>0x1225b8112B4bfF7B3332C53d7C18c658B9d1Eb91</td>
        <td>
          ff70fd4493db7815277915cae5c9eab3ab92dfe1d1a397f56a034cae825aa792
        </td>
      </tr>
      <tr>
        <td >Farmer</td>
        <td>0x9D9e3E99127CD227CfbACb84289a5F3F96Ce9922</td>
        <td>
          8f8b0f9ae0d98f029eae72095b419e5f0cb1b8ee7e668740686c46afd7df592e
        </td>
      </tr>
      <tr>
        <td>Inspector</td>
        <td>0xD8c5BcDdAE7896B9d4747cb753283681F262E1CE</td>
        <td>
          8eec02c941cdccb9337b9cea9fa47d1e06edb4d7a3bd45b3655009b02be57dc9
        </td>
      </tr>
      <tr>
        <td>Producer</td>
        <td>0x78DCba4FEE08726E86a3a6b970B85e684eaDC590</td>
        <td>
          b84a51835ac9dd83f12e99f71c0307887711454fbe4dc6d620bc577f37cb8a37
        </td>
      </tr>
      <tr>
        <td>Distributor</td>
        <td>0xC0520D16a972EEAbBc1F82F18187F672b2a7D78c</td>
        <td>
          a746f3cd6f66c9be6a0774990c35b34ef5080e83d0af90fe604399f2381c0957
        </td>
      </tr>
      <tr>
        <td>Consumer</td>
        <td>0xD30ec28932096fC0B5De0b84e4560A533203241f</td>
        <td>
          6fecd14712f0aa2a3e2a89deb3195b122c9d51e138ed73a0d80cd950d56431e7
        </td>
      </tr>
    </table>

   <br /><br />
    <h1 class="display-1 font-weight-bold mb-3">2. Connect as Smart Contract Owner:</h1>
    2.1 Change the address of your Metamask wallet to <strong>Smart Contract Owner</strong>(0x1225b8112B4bfF7B3332C53d7C18c658B9d1Eb91);<br />
    2.2 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-user-tag theme--light green--text"></i>Add users to Roles</div> Button and add the users addresses as requested.<br />	

    <br /><br />
    <h1 class="display-1 font-weight-bold mb-3">3. Connect as Farmer:</h1>
    3.1 Change the address of your Metamask wallet to <strong>Farmer</strong>(0x9D9e3E99127CD227CfbACb84289a5F3F96Ce9922);<br />
    3.2 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-seedling theme--light green--text"></i>Plant a Grape</div> Button;<br />
    3.3 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-tractor theme--light green--text"></i>Harvest a Grape</div> Button;<br />
    3.4 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-box-open theme--light green--text"></i>Process a Grape</div> Button;<br />

    <br /><br />
    <h1 class="display-1 font-weight-bold mb-3">4. Connect as Inspector:</h1>
    4.1 Change the address of your Metamask wallet to <strong>Inspector</strong>(0xD8c5BcDdAE7896B9d4747cb753283681F262E1CE);<br />
    4.2 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-tag theme--light green--text"></i>Audit a Grape</div> Button;<br />
    4.3 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-check-square theme--light green--text"></i>Certify a Juice</div> Button;<br />

    <br /><br />
    <h1 class="display-1 font-weight-bold mb-3">5. Connect as Producer:</h1>
    5.1 Change the address of your Metamask wallet to <strong>Producer</strong>(0x78DCba4FEE08726E86a3a6b970B85e684eaDC590);<br />
    5.2 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-flask theme--light green--text"></i>Create a Juice</div> Button;<br />
    5.3 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-glass-cheers theme--light green--text"></i>Blend a Juice</div> Button;<br />
    5.4 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-industry theme--light green--text"></i>Produce a Juice</div> Button;<br />
    5.5 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-shipping-fast theme--light green--text"></i>Pack a Juice</div> Button;<br />

    <br /><br />
    <h1 class="display-1 font-weight-bold mb-3">6. Connect as Distributor:</h1>
    6.1 Change the address of your Metamask wallet to <strong>Distributor</strong>(0xC0520D16a972EEAbBc1F82F18187F672b2a7D78c);<br />
    6.2 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-store theme--light green--text"></i>For sell a Juice</div> Button;<br />

    <br /><br />
    <h1 class="display-1 font-weight-bold mb-3">7. Connect as Consumer:</h1>
    7.1 Change the address of your Metamask wallet to <strong>Consumer</strong>(0xD30ec28932096fC0B5De0b84e4560A533203241f);<br />
    7.2 Click on <div class="boxed"><i aria-hidden="true" class="v-icon notranslate fas fa-shopping-cart theme--light green--text"></i>Buy a Juice</div> Button;<br />

	</div>
</template>

<script>
export default {};
</script>
