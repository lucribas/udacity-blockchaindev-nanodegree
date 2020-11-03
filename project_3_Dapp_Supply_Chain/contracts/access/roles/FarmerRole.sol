// SPDX-License-Identifier: MIT

pragma solidity >=0.6.00;

// Based on openzeppelin-solidity@2.5.0:  openzeppelin-solidity\contracts\access\roles\CapperRole.sol

import "../Roles.sol";

contract FarmerRole {
    using Roles for Roles.Role;

    event FarmerAdded(address indexed account);
    event FarmerRemoved(address indexed account);

    Roles.Role private _Farmers;

    constructor () public {
        _addFarmer(msg.sender);
    }

    modifier onlyFarmer() {
        require(isFarmer(msg.sender), "FarmerRole: caller does not have the Farmer role");
        _;
    }

    function isFarmer(address account) public view returns (bool) {
        return _Farmers.has(account);
    }

    function addFarmer(address account) public onlyFarmer {
        _addFarmer(account);
    }

    function renounceFarmer() public {
        _removeFarmer(msg.sender);
    }

    function _addFarmer(address account) internal {
        _Farmers.add(account);
        emit FarmerAdded(account);
    }

    function _removeFarmer(address account) internal {
        _Farmers.remove(account);
        emit FarmerRemoved(account);
    }
}
