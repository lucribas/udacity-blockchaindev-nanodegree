const StarNotary = artifacts.require("StarNotary"); // Name of the StarNotary contract file

module.exports = function(deployer) {
  deployer.deploy(StarNotary);
};
