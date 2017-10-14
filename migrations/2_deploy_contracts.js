var EnsRelay = artifacts.require("./EnsRelay.sol");

module.exports = function(deployer) {
  deployer.deploy(EnsRelay);
};
