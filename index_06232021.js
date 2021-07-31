const Web3 = require("web3");
const abiJSON =
  '[{"inputs":[{"internalType":"uint256","name":"_contractExpiryTime","type":"uint256"},{"internalType":"uint256","name":"_strikePrice","type":"uint256"},{"internalType":"uint256","name":"_bidPeriod","type":"uint256"},{"internalType":"address","name":"_aggregator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"message1","type":"string"},{"indexed":false,"internalType":"uint256","name":"currentTime","type":"uint256"},{"indexed":false,"internalType":"string","name":"message2","type":"string"},{"indexed":false,"internalType":"uint256","name":"expiryTime","type":"uint256"}],"name":"announce","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"logString","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"logUint","type":"event"},{"inputs":[],"name":"announceResult","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBidPeriodLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractExpiry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNegative","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPositive","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"aggregator","type":"address"}],"name":"getPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getStrikePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"voteNegative","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"votePositive","outputs":[],"stateMutability":"payable","type":"function"}]';

const abi = JSON.parse(abiJSON);

document.addEventListener("DOMContentLoaded", onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}

const contractAddress = "0x24B022084cad57D628367e1b9BA15D85B9542230";

const DApp = {
  web3: null,
  contracts: {},
  accounts: [],

  init: function () {
    return DApp.initWeb3();
  },

  initWeb3: async function () {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Accounts now exposed, use them
        DApp.updateAccounts(accounts);

        // Opt out of refresh page on network change
        // Ref: https://docs.metamask.io/guide/ethereum-provider.html#properties
        ethereum.autoRefreshOnNetworkChange = false;

        // When user changes to another account,
        // trigger necessary updates within DApp
        window.ethereum.on("accountsChanged", DApp.updateAccounts);
      } catch (error) {
        // User denied account access
        console.error("User denied web3 access");
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      // Deprecated web3 provider
      DApp.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
    }
    // No web3 provider
    else {
      console.error("No web3 provider detected");
      return;
    }
    return DApp.initContract();
  },

  updateAccounts: async function (accounts) {
    const firstUpdate = !(DApp.accounts && DApp.accounts[0]);
    DApp.accounts = accounts || (await DApp.web3.eth.getAccounts());
    console.log("updateAccounts", accounts[0]);
    if (!firstUpdate) {
      DApp.render();
    }
  },

  test: function () {
    console.log("test function invoked");
    return;
  },

  initContract: async function () {
    let networkId = await DApp.web3.eth.net.getId();
    console.log("networkId", networkId);

    // let deployedNetwork = mySmartContractArtefact.networks[networkId];
    // if (!deployedNetwork) {
    //   console.error(
    //     "No contract deployed on the network that you are connected. Please switch networks."
    //   );
    //   return;
    // }
    // console.log("deployedNetwork", deployedNetwork);

    // DApp.contracts.MySmartContract = new DApp.web3.eth.Contract(
    //   '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"voteNegative","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"votePositive","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"announceResult","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNegative","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPositive","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
    //   deployedNetwork.address
    // );

    DApp.contracts.mycontract = new DApp.web3.eth.Contract(
      abi,
      contractAddress
    );
    return DApp.render();
  },

  render: async function () {
    // show spinner before loading data from smart contract
    // TODO
    // set or refresh any event listeners
    // update DOM to render account address where relevant
    // TODO using DApp.accounts[0]
    // retrieve data from smart contract and render it
    // TODO using DApp.contracts.MySmartContract
    // Hide spinner after loading and rendering data from smart contract
    //this.positive();
    this.total();
  },

  positive: function (addr) {
    DApp.contracts.mycontract.methods
      .votePositive(addr)
      .call()
      .then(function (info) {
        console.log("info: ", info);
        document.getElementById("lastInfo").innerHTML = info;
      });
  },

  negative: function (addr) {
    DApp.contracts.mycontract.methods
      .voteNegative(addr)
      .call()
      .then(function (info) {
        console.log("info: ", info);
        document.getElementById("lastInfo").innerHTML = info;
      });
  },

  total: function () {
    DApp.contracts.mycontract.methods
      .getTotal()
      .call()
      .then(function (info) {
        console.log("total: ", info);
        document.getElementById("totalparticipants").innerHTML = info;
      });
  },
};
