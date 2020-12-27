const { before } = require("lodash");

const SupplyChain = artifacts.require("SupplyChain");
const truffleAssert = require('truffle-assertions');

var accounts;
var owner;

contract('SupplyChain', (accs) => {
	accounts = accs;
	owner = accounts[0];
});

// Accounts
let acc_owner = accounts[0];	// Contract Owner account
let acc_farm_0 = accounts[1];	// Farm account
let acc_prod_0 = accounts[2];	// Producer account
let acc_insp_0 = accounts[3];	// Inspector account
let acc_dist_0 = accounts[4];	// Distributor account
let acc_cons_0 = accounts[5];	// Consumer account

let instance = null;

describe('Programmatic usage suite', function () {

	describe('#index', function () {

		it('can the Farmer plant a Grape', async function () {
			this.timeout(20000);

			instance = await SupplyChain.deployed();
			await instance.addFarmer(acc_farm_0, { from: acc_owner });
			await instance.addProducer(acc_prod_0, { from: acc_owner });
			await instance.addInspector(acc_insp_0, { from: acc_owner });
			await instance.addDistributor(acc_dist_0, { from: acc_owner });
			await instance.addConsumer(acc_cons_0, { from: acc_owner });

			let upc = 1;
			let ownerID = acc_farm_0;
			let originFarmerID = acc_farm_0;
			let originFarmName = "Aurora Farm";
			let originFarmInformation = "Bento Goncalves";
			let originFarmLatitude = "34.12345543";
			let originFarmLongitude = "34.12345543";
			let harvestNotes = "";
			let auditNotes = "";
			let itemState = 0;

			// Plant a Grape
			let plant = await instance.grapePlantItem(upc,
				originFarmerID,
				originFarmName,
				originFarmInformation,
				originFarmLatitude,
				originFarmLongitude,
				{ from: acc_farm_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchGrapeItemBufferOne.call(upc);
			let res2 = await instance.fetchGrapeItemBufferTwo.call(upc);
			// console.log(res1, 'result buffer 1');
			// console.log(res2, 'result buffer 2');

			// Check results
			assert.equal(res1.upc, upc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID');
			assert.equal(res1.originFarmName, originFarmName, 'Error: Missing or Invalid originFarmName');
			assert.equal(res1.originFarmInformation, originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
			assert.equal(res1.originFarmLatitude, originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
			assert.equal(res1.originFarmLongitude, originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
			assert.equal(res2.harvestNotes, harvestNotes, 'Error: Missing or Invalid harvestNotes');
			assert.equal(res2.auditNotes, auditNotes, 'Error: Missing or Invalid auditNotes');
			assert.equal(res2.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(plant, 'GrapePlanted');
		});


		it('can the Farmer harvest a Grape', async function () {
			this.timeout(20000);
			let upc = 1;
			let ownerID = acc_farm_0;
			let originFarmerID = acc_farm_0;
			let harvestNotes = "bordo wine";
			let itemState = 1;
			let harvest = await instance.grapeHarvestItem(upc, harvestNotes, { from: acc_farm_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchGrapeItemBufferOne.call(upc);
			let res2 = await instance.fetchGrapeItemBufferTwo.call(upc);
			// console.log(res1, 'result buffer 1');
			// console.log(res2, 'result buffer 2');

			assert.equal(res1.upc, upc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID');
			assert.equal(res2.harvestNotes, harvestNotes, 'Error: Missing or Invalid harvestNotes');
			assert.equal(res2.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(harvest, 'GrapeHarvested');
		});

		it('can the Inspector audit a Grape', async function () {
			this.timeout(20000);
			let upc = 1;
			let ownerID = acc_farm_0;
			let originFarmerID = acc_farm_0;
			let auditNotes = "ISO9002 audit passed";
			let itemState = 2;
			let audited = await instance.grapeAuditItem(upc, auditNotes, { from: acc_insp_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchGrapeItemBufferOne.call(upc);
			let res2 = await instance.fetchGrapeItemBufferTwo.call(upc);
			// console.log(res1, 'result buffer 1');
			// console.log(res2, 'result buffer 2');

			assert.equal(res1.upc, upc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID');
			assert.equal(res2.auditNotes, auditNotes, 'Error: Missing or Invalid auditNotes');
			assert.equal(res2.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(audited, 'GrapeAudited');
		});

		it('can the Farm process a Grape', async function () {
			this.timeout(20000);
			let upc = 1;
			let ownerID = acc_farm_0;
			let originFarmerID = acc_farm_0;
			let itemState = 3;
			let processed = await instance.grapeProcessItem(upc, { from: acc_farm_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchGrapeItemBufferOne.call(upc);
			let res2 = await instance.fetchGrapeItemBufferTwo.call(upc);
			// console.log(res1, 'result buffer 1');
			// console.log(res2, 'result buffer 2');

			assert.equal(res1.upc, upc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID');
			assert.equal(res2.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(processed, 'GrapeProcessed');
		});

		it('can the Producer create a Juice', async function () {
			this.timeout(20000);
			let upc = 1;
			let productID = 1001;
			let ownerID = acc_prod_0;
			let itemState = 0;
			let created = await instance.juiceCreateItem(upc, productID, { from: acc_prod_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchJuiceItemBufferOne.call(upc);
			// console.log(res1, 'result buffer 1');

			assert.equal(res1.upc, upc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.productID, productID, 'Error: Missing or Invalid productID');
			assert.equal(res1.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(created, 'JuiceCreated');
		});

		it('can the Producer blend a Juice', async function () {
			this.timeout(20000);
			let juiceUpc = 1;
			let grapeUpc = 1;
			let productID = 1001;
			let ownerID = acc_prod_0;
			let itemState = 1;
			let blended = await instance.juiceBlendItem(juiceUpc, grapeUpc, { from: acc_prod_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchJuiceItemBufferOne.call(juiceUpc);
			// console.log(res1, 'result buffer 1');
			// console.log(res1.grapes, 'grapes');

			assert.equal(res1.upc, juiceUpc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.productID, productID, 'Error: Missing or Invalid productID');
			assert.equal(res1.itemState, itemState, 'Error: Invalid item State');
			assert.equal(res1.grapes[0], grapeUpc, 'Error: Invalid item grapeUpc');
			truffleAssert.eventEmitted(blended, 'JuiceBlended');
		});

		it('can the Producer produce a Juice', async function () {
			this.timeout(20000);
			let juiceUpc = 1;
			let productNotes = "Organic Grape Juice";
			let productPrice = 26;
			let ownerID = acc_prod_0;
			let itemState = 2;
			let produced = await instance.juiceProduceItem(juiceUpc, productNotes, productPrice, { from: acc_prod_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchJuiceItemBufferOne.call(juiceUpc);
			// console.log(res1, 'result buffer 1');
			// console.log(res1.grapes, 'grapes');

			assert.equal(res1.upc, juiceUpc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.productNotes, productNotes, 'Error: Missing or Invalid productNotes');
			assert.equal(res1.productPrice, productPrice, 'Error: Missing or Invalid productPrice');
			assert.equal(res1.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(produced, 'JuiceProduced');
		});

		it('can the Inspector certify a Juice', async function () {
			this.timeout(20000);
			let juiceUpc = 1;
			let certifyNotes = "ISO9002 Certified";
			let ownerID = acc_prod_0;
			let itemState = 3;
			let certified = await instance.juiceCertifyItem(juiceUpc, certifyNotes, { from: acc_insp_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchJuiceItemBufferOne.call(juiceUpc);
			// console.log(res1, 'result buffer 1');
			// console.log(res1.grapes, 'grapes');

			assert.equal(res1.upc, juiceUpc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.certifyNotes, certifyNotes, 'Error: Missing or Invalid certifyNotes');
			assert.equal(res1.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(certified, 'JuiceCertified');
		});

		it('can the Producer pack a Juice', async function () {
			this.timeout(20000);
			let juiceUpc = 1;
			let ownerID = acc_prod_0;
			let itemState = 4;
			let packed = await instance.juicePackItem(juiceUpc, { from: acc_prod_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchJuiceItemBufferOne.call(juiceUpc);
			// console.log(res1, 'result buffer 1');
			// console.log(res1.grapes, 'grapes');

			assert.equal(res1.upc, juiceUpc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(packed, 'JuicePacked');
		});

		it('can the Distributor sell a Juice', async function () {
			this.timeout(20000);
			let juiceUpc = 1;
			let ownerID = acc_prod_0;
			let itemState = 5;
			let forsale = await instance.juiceSellItem(juiceUpc, { from: acc_dist_0 });

			// Read the result from blockchain
			let res1 = await instance.fetchJuiceItemBufferOne.call(juiceUpc);
			// console.log(res1, 'result buffer 1');
			// console.log(res1.grapes, 'grapes');

			assert.equal(res1.upc, juiceUpc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(forsale, 'JuiceForSale');
		});

		it('can the Consumer buy a Juice', async function () {
			this.timeout(20000);
			let juiceUpc = 1;
			let ownerID = acc_cons_0;
			let itemState = 6;
			let res1 = await instance.fetchJuiceItemBufferOne.call(juiceUpc);
			let purchased = await instance.juiceBuyItem(juiceUpc, { from: acc_cons_0, value: res1.productPrice });

			// Read the result from blockchain
			res1 = await instance.fetchJuiceItemBufferOne.call(juiceUpc);
			// console.log(res1, 'result buffer 1');
			// console.log(res1.grapes, 'grapes');

			assert.equal(res1.upc, juiceUpc, 'Error: Invalid item UPC');
			assert.equal(res1.ownerID, ownerID, 'Error: Missing or Invalid ownerID');
			assert.equal(res1.itemState, itemState, 'Error: Invalid item State');
			truffleAssert.eventEmitted(purchased, 'JuicePurchased');
		});
	});
});