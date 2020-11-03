// SPDX-License-Identifier: MIT

pragma solidity >=0.6.00;

// Based on openzeppelin-solidity@2.5.0:  openzeppelin-solidity\contracts\access\roles\CapperRole.sol

import "../Roles.sol";

contract ProducerRole {
    using Roles for Roles.Role;

    event ProducerAdded(address indexed account);
    event ProducerRemoved(address indexed account);

    Roles.Role private _Producers;

    constructor () public {
        _addProducer(msg.sender);
    }

    modifier onlyProducer() {
        require(isProducer(msg.sender), "ProducerRole: caller does not have the Producer role");
        _;
    }

    function isProducer(address account) public view returns (bool) {
        return _Producers.has(account);
    }

    function addProducer(address account) public onlyProducer {
        _addProducer(account);
    }

    function renounceProducer() public {
        _removeProducer(msg.sender);
    }

    function _addProducer(address account) internal {
        _Producers.add(account);
        emit ProducerAdded(account);
    }

    function _removeProducer(address account) internal {
        _Producers.remove(account);
        emit ProducerRemoved(account);
    }
}
