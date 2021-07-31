const Web3 = require("web3");
const abiJSON =
  '[{"inputs":[{"internalType":"contract IERC20","name":"_dvdToken","type":"address"},{"internalType":"uint256","name":"_contractExpiryTime","type":"uint256"},{"internalType":"uint256","name":"_strikePrice","type":"uint256"},{"internalType":"uint256","name":"_bidPeriod","type":"uint256"},{"internalType":"address","name":"_aggregator","type":"address"},{"internalType":"string","name":"_pair","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"biddingAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bids","type":"uint256"},{"indexed":false,"internalType":"int256","name":"amount","type":"int256"}],"name":"Bid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"strikePrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bidPeriod","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"expiry","type":"uint256"},{"indexed":false,"internalType":"address","name":"oracleAggregatorAddress","type":"address"},{"indexed":false,"internalType":"string","name":"assetPair","type":"string"}],"name":"Deployment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"payerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Paid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oraclePrice","type":"uint256"}],"name":"PriceFeed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"strike","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"actual","type":"uint256"}],"name":"ResultLong","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"strike","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"actual","type":"uint256"}],"name":"ResultShort","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_toAdd","type":"address"}],"name":"addAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"announceResult","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_bids","type":"uint256"}],"name":"bidLong","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_bids","type":"uint256"}],"name":"bidShort","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBidPeriodLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractDVDBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractExpiry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getDVDBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLongs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOracleAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOraclePrice","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPair","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"aggregator","type":"address"}],"name":"getPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPriceAtExpiry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getShorts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStrikePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getUserBids","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getUserLongs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getUserShorts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isAdminEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_toRemove","type":"address"}],"name":"removeAuthorized","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"value","type":"bool"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"pause","type":"bool"}],"name":"setPause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]';
const { projectId, contractAddress } = require("./secrets.json");
const abi = JSON.parse(abiJSON);

window.addEventListener("load", onDocumentLoad);
// document.addEventListener("DOMContentLoaded", onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}
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
    document.getElementById("wallet").innerHTML = accounts[0];
    if (!firstUpdate) {
      DApp.render();
    }
  },

  initContract: async function () {
    let networkId = await DApp.web3.eth.net.getId();
    document.getElementById("nwid").innerHTML = networkId;
    DApp.contracts.binaryoptions = new DApp.web3.eth.Contract(
      abi,
      contractAddress
    );
    return DApp.render();
  },

  render: async function () {
    //function loaded at page load
    this.information();
  },

  positive: function (addr) {
    DApp.contracts.binaryoptions.methods
      .getContractExpiry()
      .call()
      .then(function (info) {
        console.log("info: ", info);
        document.getElementById("clicked").innerHTML = info;
      });
  },

  negative: function (addr) {
    DApp.contracts.binaryoptions.methods
      .voteNegative(addr)
      .call()
      .then(function (info) {
        console.log("info: ", info);
        document.getElementById("lastInfo").innerHTML = info;
      });
  },

  information: function () {
    DApp.contracts.binaryoptions.methods
      .getContractExpiry()
      .call()
      .then(function (info) {
        var a = new Date(info * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time =
          date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
        document.getElementById("expiry").innerHTML = time;
      });
    DApp.contracts.binaryoptions.methods
      .getStrikePrice()
      .call()
      .then(function (info) {
        document.getElementById("strike").innerHTML = info;
      });
    DApp.contracts.binaryoptions.methods
      .getShorts()
      .call()
      .then(function (info) {
        document.getElementById("shorts").innerHTML = info;
      });
    DApp.contracts.binaryoptions.methods
      .getLongs()
      .call()
      .then(function (info) {
        document.getElementById("longs").innerHTML = info;
      });
    DApp.contracts.binaryoptions.methods
      .getContract()
      .call()
      .then(function (info) {
        document.getElementById("contract").innerHTML = info;
      });
    DApp.contracts.binaryoptions.methods
      .getPair()
      .call()
      .then(function (info) {
        document.getElementById("asset").innerHTML = info;
      });
    DApp.contracts.binaryoptions.methods
      .getDVDBalance(DApp.accounts[0])
      .call()
      .then(function (info) {
        document.getElementById("bid").innerHTML = info / 10000000000000;
      });
    DApp.contracts.binaryoptions.methods
      .getOwner()
      .call()
      .then(function (info) {
        document.getElementById("owner").innerHTML = info;
      });
    DApp.contracts.binaryoptions.methods
      .getUserShorts(DApp.accounts[0])
      .call()
      .then(function (info) {
        document.getElementById("usershorts").innerHTML = info;
      });
    DApp.contracts.binaryoptions.methods
      .getUserLongs(DApp.accounts[0])
      .call()
      .then(function (info) {
        document.getElementById("userlongs").innerHTML = info;
      });
    DApp.contracts.binaryoptions.methods
      .getBidPeriodLimit()
      .call()
      .then(function (info) {
        var a = new Date(info * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time =
          date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
        document.getElementById("bidlimit").innerHTML = time;
      });
  },
};

module.exports = { test: function () {} };
