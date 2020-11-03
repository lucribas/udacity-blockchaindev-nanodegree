// SPDX-License-Identifier: MIT

pragma solidity >=0.6.00;

// Based on openzeppelin-solidity@2.5.0:  openzeppelin-solidity\contracts\access\roles\CapperRole.sol

import "../Roles.sol";

contract DistributorRole {
    using Roles for Roles.Role;

    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);

    Roles.Role private _Distributors;

    constructor () public {
        _addDistributor(msg.sender);
    }

    modifier onlyDistributor() {
        require(isDistributor(msg.sender), "DistributorRole: caller does not have the Distributor role");
        _;
    }

    function isDistributor(address account) public view returns (bool) {
        return _Distributors.has(account);
    }

    function addDistributor(address account) public onlyDistributor {
        _addDistributor(account);
    }

    function renounceDistributor() public {
        _removeDistributor(msg.sender);
    }

    function _addDistributor(address account) internal {
        _Distributors.add(account);
        emit DistributorAdded(account);
    }

    function _removeDistributor(address account) internal {
        _Distributors.remove(account);
        emit DistributorRemoved(account);
    }
}
