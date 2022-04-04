// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "./Gallery.sol";

contract GalleryFactory is Ownable {
    address[] public contracts;
    event Deployed(address gallery);

    function getContractCount() public view returns (uint256 contractCount) {
        return contracts.length;
    }

    function getGalleryByIndex(uint256 _index) public view returns (address) {
        return contracts[_index];
    }

    function deploy(string memory name, string memory symbol)
        public
        onlyOwner
        returns (address)
    {
        Gallery g = new Gallery(name, symbol);
        address newGallery = address(g);
        Gallery(newGallery).transferOwnership(msg.sender);
        contracts.push(newGallery);
        emit Deployed(newGallery);
        return newGallery;
    }
}
