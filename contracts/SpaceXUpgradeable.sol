// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
contract SpaceX is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    // constructor() ERC20("SpaceX", "SPX") {
    //     _mint(msg.sender, 10000000 * 10 ** decimals());
    // }

    function initialize() public initializer {
       __ERC20_init("SpaceX", "SPX");
       __Ownable_init();
       _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}

contract SpaceXV2 is SpaceX {
    uint fee;
    function version() external pure returns (string memory) {
        return "V2";
    }
}

contract SpaceXV3 is SpaceX {
    uint fee;
    string tax;

    function version() external pure returns (string memory) {
        return "V3";
    }
}