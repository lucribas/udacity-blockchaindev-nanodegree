const Migrations = artifacts.require("SampleToken");

module.exports = function (deployer) {
  deployer.deploy(SampleToken, "UdacityExampleToken_LR", 18, 1000);
};
