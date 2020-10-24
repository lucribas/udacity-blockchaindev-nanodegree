
var ExerciseC6A = artifacts.require("ExerciseC6A");

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0xea3af30a425e5F542F069b52FE0Ae4935afd226a",
        "0x5b53615f9bA95F8b339151d921DF1aA4a5257F36",
        "0x2cFbbb0565502CE2A6D9677C3dD98e03bc936fD7",
        "0x9bC1169Ca09555bf2721A5C9eC6D69c8073bfeB4",
        "0xa23eAEf02F9E0338EEcDa8Fdd0A73aDD781b2A86",
        "0x6b85cc8f612d5457d49775439335f83e12b8cfde",
        "0xcbd22ff1ded1423fbc24a7af2148745878800024",
        "0xc257274276a4e539741ca11b590b9447b26a8051",
        "0x2f2899d6d35b1a48a4fbdc93a37a72f264a9fca7"
    ];


    let owner = accounts[0];
    let exerciseC6A = await ExerciseC6A.new();
    
    return {
        owner: owner,
        testAddresses: testAddresses,
        exerciseC6A: exerciseC6A
    }
}

module.exports = {
    Config: Config
};