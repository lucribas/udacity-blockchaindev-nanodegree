
//https://medium.com/openberry/deploying-smart-contracts-with-truffle-1c056b452cde

const Message = artifacts.require("Message");

module.exports = function (deployer) {
  deployer.deploy(Message);
};
