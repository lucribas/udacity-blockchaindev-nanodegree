
pragma solidity ^0.5.16;

contract Message {
    string myMessage;

    function setMessage(string memory x) public {
        myMessage = x;
    }

    function clearMessage() public {
        myMessage = "";
    }


    function getMessage() public view returns (string memory) {
        return myMessage;
    }
}