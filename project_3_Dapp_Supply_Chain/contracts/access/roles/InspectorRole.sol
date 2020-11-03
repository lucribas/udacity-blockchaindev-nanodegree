// SPDX-License-Identifier: MIT

pragma solidity >=0.6.00;

// Based on openzeppelin-solidity@2.5.0:  openzeppelin-solidity\contracts\access\roles\CapperRole.sol

import "../Roles.sol";

contract InspectorRole {
    using Roles for Roles.Role;

    event InspectorAdded(address indexed account);
    event InspectorRemoved(address indexed account);

    Roles.Role private _Inspectors;

    constructor () public {
        _addInspector(msg.sender);
    }

    modifier onlyInspector() {
        require(isInspector(msg.sender), "InspectorRole: caller does not have the Inspector role");
        _;
    }

    function isInspector(address account) public view returns (bool) {
        return _Inspectors.has(account);
    }

    function addInspector(address account) public onlyInspector {
        _addInspector(account);
    }

    function renounceInspector() public {
        _removeInspector(msg.sender);
    }

    function _addInspector(address account) internal {
        _Inspectors.add(account);
        emit InspectorAdded(account);
    }

    function _removeInspector(address account) internal {
        _Inspectors.remove(account);
        emit InspectorRemoved(account);
    }
}
