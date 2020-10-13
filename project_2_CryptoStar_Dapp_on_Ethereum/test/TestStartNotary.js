const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
	accounts = accs;
	owner = accounts[0];
});

it('can Create a Star', async () => {
	let tokenId = 1;
	let instance = await StarNotary.deployed();
	await instance.createStar('Awesome Star!', tokenId, { from: accounts[0] })
	assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let starId = 2;
	let starPrice = web3.utils.toWei(".01", "ether");
	await instance.createStar('awesome star', starId, { from: user1 });
	await instance.putStarUpForSale(starId, starPrice, { from: user1 });
	assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let user2 = accounts[2];
	let starId = 3;
	let starPrice = web3.utils.toWei(".01", "ether");
	let balance = web3.utils.toWei(".05", "ether");
	let gas = 3000000;
	await instance.createStar('awesome star', starId, { from: user1 });
	await instance.putStarUpForSale(starId, starPrice, { from: user1 });
	await instance.approve(user2, starId, { from: user1 });
	let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
	await instance.buyStar(starId, { from: user2, value: balance, gas: gas });
	let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
	let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
	let value2 = Number(balanceOfUser1AfterTransaction);
	assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let user2 = accounts[2];
	let starId = 4;
	let starPrice = web3.utils.toWei(".01", "ether");
	let balance = web3.utils.toWei(".05", "ether");
	await instance.createStar('awesome star', starId, { from: user1 });
	await instance.putStarUpForSale(starId, starPrice, { from: user1 });
	let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
	await instance.approve(user2, starId, { from: user1 });
	await instance.buyStar(starId, { from: user2, value: balance });
	assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let user2 = accounts[2];
	let starId = 5;
	let starPrice = web3.utils.toWei(".01", "ether");
	let balance = web3.utils.toWei(".05", "ether");
	await instance.createStar('awesome star', starId, { from: user1 });
	await instance.putStarUpForSale(starId, starPrice, { from: user1 });
	let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
	const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
	await instance.approve(user2, starId, { from: user1 });
	await instance.buyStar(starId, { from: user2, value: balance, gasPrice: 0 });
	const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
	let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
	assert.equal(value, starPrice);
});



// subtask 1.1 - Add a name and a symbol for your starNotary tokens.
// subtask 1.2 - Looks up the stars using the Token ID, and then returns the name of the star.
it('can add the star name and star symbol properly', async () => {
	//1. Create a star
	let instance = await StarNotary.deployed();
	let user1 = accounts[1];
	let starId = 6;
	await instance.createStar('Awesome Star 2', starId, { from: user1 });

	//2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
	let ContractName = await instance.name();
	let ContractSymbol = await instance.symbol();
	// subtask 1.2 - Looks up the stars using the Token ID, and then returns the name of the star.
	let starLookUp = await instance.lookUptokenIdToStarInfo(starId);

	assert.equal(ContractName, 'Shiny Star Token');
	assert.equal(ContractSymbol, 'SST');
	assert.equal(starLookUp, 'Awesome Star 2');
});

// subtask 1.3 - Add a function called exchangeStars, so 2 users can exchange their star tokens...Do not worry about the price, just write code to exchange stars between users.
it('lets 2 users exchange stars', async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[0];
	let user2 = accounts[1];
	let starId1 = 7;
	let starId2 = 8;

	// 1. Create stars
	await instance.createStar('Star 1', starId1, { from: user1 });
	await instance.createStar('Star 2', starId2, { from: user2 });
	// 2. approve transfer to, from user
	await instance.approve(user2, starId1, { from: user1 });
	await instance.approve(user1, starId2, { from: user2 });
	// 3. Call the exchangeStars functions implemented in the Smart Contract
	await instance.exchangeStars(starId1, starId2, { from: user1 });
	let star1 = await instance.ownerOf.call(starId1);
	let star2 = await instance.ownerOf.call(starId2);
	// 4. Verify that the owners changed
	assert.equal(star1, user2);
	assert.equal(star2, user1);
});

// substask 1.4 - Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.
it('lets a user transfer a star', async () => {
	let instance = await StarNotary.deployed();
	let user1 = accounts[0];
	let user2 = accounts[1];
	let starId = 9;
	// 1. create a Star
	await instance.createStar('Star 1', starId, { from: user1 });
	// 2. use the transferStar function implemented in the Smart Contract
	await instance.transferStar(user2, starId, { from: user1 });
	// 3. Verify the star owner changed.
	let starUser = await instance.ownerOf.call(starId);
	assert.equal(starUser, user2);
});
