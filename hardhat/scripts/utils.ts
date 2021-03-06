const { deriveSponsorWalletAddress } = require("@api3/airnode-admin");
const airnodeProtocol = require("@api3/airnode-protocol");
require("dotenv").config();
import hre from "hardhat";
import { ethers } from "hardhat";
import fs from "fs";

async function getSponsorWallet() {
  const anuXpub =
    "xpub6DXSDTZBd4aPVXnv6Q3SmnGUweFv6j24SK77W4qrSFuhGgi666awUiXakjXruUSCDQhhctVG7AQt67gMdaRAsDnDXv23bBRKsMWvRzo6kbf";
  const anuAirnode = "0x9d3C147cA16DB954873A498e0af5852AB39139f2";
  const privateKey = process.env.PRIVATE_KEY || "";
  const wallet = new ethers.Wallet(privateKey);

  const sponsorWalletAddress: string = await deriveSponsorWalletAddress(
    anuXpub,
    anuAirnode,
    wallet.address
  );
  return sponsorWalletAddress;
}
// getSponsorWallet();

async function sponsorRequester(requesterAddress: string) {
  let { chainId } = await ethers.provider.getNetwork();
  if (chainId == 31337) chainId = 4;
  const [wallet] = await ethers.getSigners();
  const rrp = new ethers.Contract(
    airnodeProtocol.AirnodeRrpAddresses[chainId],
    airnodeProtocol.AirnodeRrpV0Factory.abi,
    wallet
  );
  const tx = await rrp.setSponsorshipStatus(requesterAddress, true);
  await tx.wait();
  console.log("Sponsored!");
}

async function getRaffleContract() {
  let { chainId } = await ethers.provider.getNetwork();
  const rafflerAddress = require("../deployed-contracts.json")[chainId];
  const [account] = await ethers.getSigners();
  return await ethers.getContractAt("Raffler", rafflerAddress, account);
}

async function getRRPContract() {
  let { chainId } = await ethers.provider.getNetwork();
  if (chainId == 31337) chainId = 4;
  const [wallet] = await ethers.getSigners();
  return new ethers.Contract(
    airnodeProtocol.AirnodeRrpAddresses[chainId],
    airnodeProtocol.AirnodeRrpV0Factory.abi,
    wallet
  );
}

async function verifyContract() {
  console.log("Verifying Contract...");
  let { chainId } = await ethers.provider.getNetwork();
  const address = require("../deployed-contracts.json")[chainId];

  const rrp = await getRRPContract();
  const sponsorWallet = await getSponsorWallet();
  console.log(`Sponsor Wallet: ${sponsorWallet}`);
  console.log(`Raffler Address: ${address}`);
  await hre.run("verify:verify", {
    address,
    constructorArguments: [rrp.address, sponsorWallet],
  });
  console.log("\nVerified!");
}

function storeAddress(address: string, chainId: number) {
  // If "./deployed-contract.json" exists, update it.
  // Otherwise, create it.
  let addresses: any = {};
  if (fs.existsSync("deployed-contracts.json")) {
    console.log("Adding to existing deployed-contracts.json");
    addresses = require("../deployed-contracts.json");
  }

  addresses[chainId] = address;
  fs.writeFileSync("deployed-contracts.json", JSON.stringify(addresses));
  fs.writeFileSync(
    "../frontend/src/utils/deployed-contracts.json",
    JSON.stringify(addresses)
  );
  console.log("Addresses Stored!");
}

export {
  getSponsorWallet,
  sponsorRequester,
  getRaffleContract,
  getRRPContract,
  verifyContract,
  storeAddress,
};
