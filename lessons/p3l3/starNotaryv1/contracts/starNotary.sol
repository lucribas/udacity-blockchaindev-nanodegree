pragma solidity >=0.4.24;

contract StarNotary {

    string public starName;
    address public starOwner;

    event starClaimed(address owner);
    event NameChanged(string starName);

    constructor() public {
        starName = "Awesome Udacity Star";
    }

    function claimStar() public {
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }


    function changeName(string memory newName) public {
        starName = newName;
        emit NameChanged(newName);
    }

}