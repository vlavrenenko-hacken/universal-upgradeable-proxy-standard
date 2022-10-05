import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import hre from "hardhat";

describe("SpaceXUpgradeable Test", function () {
    let SpaceX;
    let SpaceXV2;
    let SpaceXV3;
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySetupFixture() {
    SpaceX = await ethers.getContractFactory("SpaceX");
    SpaceXV2 = await ethers.getContractFactory("SpaceXV2");
    SpaceXV3 = await ethers.getContractFactory("SpaceXV3");
    return {SpaceX, SpaceXV2, SpaceXV3};
  }

  it("goes to Space", async function () {
    // normal deployment
    const {SpaceX, SpaceXV2, SpaceXV3} = await loadFixture(deploySetupFixture);
    // const spacex = await SpaceX.deploy();
    // expect(await spacex.name()).to.eq("SpaceX");
    const spacex = await hre.upgrades.deployProxy(SpaceX, {kind: "uups"});
    expect(await spacex.name() === "SpaceX");

    const spacexv2 = await hre.upgrades.upgradeProxy(spacex, SpaceXV2);
    expect(await spacexv2.version()).to.eq("V2");

    const spacexv3 = await hre.upgrades.upgradeProxy(spacex, SpaceXV3);
    expect(await spacexv3.version()).to.eq("V3");

  })
});
