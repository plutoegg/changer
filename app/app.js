/**
 * Created by will.
 */
// Import the page's CSS. Webpack will know what to do with it.
import "./app.css";

// Import libraries we need.
import { default as Web3 } from 'web3'
import {default as BigNumber } from 'bignumber.js'
let changerAddress = '0x645170008170D601fF71b7DFc8cf871b4F7c2Bbe'
let userAddress
let usdt
let dai

window.App = {
  start: function () {
    this.getAccounts()
    this.getBalances()

  },

  getUSDT: function () {
    var self   = this
    var buyAmount = parseInt(document.getElementById("amountToBuyUSDT").value)
    document.getElementById("amountToBuyUSDT").value = ""

    const changerABI = [{"constant":false,"inputs":[{"name":"_amountInDollars","type":"uint256"}],"name":"getDAI","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountInDollars","type":"uint256"}],"name":"getUSDT","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountInDollars","type":"uint256"},{"name":"isUSDT","type":"bool"}],"name":"withdrawEquity","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

    const changer = web3.eth.contract(changerABI).at(changerAddress)

    web3.eth.defaultAccount = web3.eth.accounts[0]
      dai.balanceOf(web3.eth.accounts[0], function(err, balance) {
	         if (balance >= buyAmount * (10 ** 18)) {
             dai.approve(changerAddress, buyAmount * (10 ** 18), {gas: 90000}, function () {
      	        changer.getUSDT(buyAmount, {gas: 150000}, function () {
                    alert('Successfully approved and exchanged. Please monitor via etherscan.io/address/' + changerAddress)
      	        })
              })
	         } else { alert('You do not have enough DAI to buy ' + buyAmount + ' USDT. You only have '+ web3.toBigNumber(balance).shift(-18) + ' DAI.' )}
      })
  },

  getDAI: function () {
    var self   = this
    var buyAmount = parseInt(document.getElementById("amountToBuyDAI").value)
    document.getElementById("amountToBuyDAI").value = ""

    const changerABI = [{"constant":false,"inputs":[{"name":"_amountInDollars","type":"uint256"}],"name":"getDAI","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountInDollars","type":"uint256"}],"name":"getUSDT","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountInDollars","type":"uint256"},{"name":"isUSDT","type":"bool"}],"name":"withdrawEquity","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

    const changer = web3.eth.contract(changerABI).at(changerAddress)
    web3.eth.defaultAccount = web3.eth.accounts[0]
      usdt.balanceOf(web3.eth.accounts[0], function(err, balance) {
	         if (balance >= buyAmount * (10 ** 6)) {
             usdt.approve(changerAddress, buyAmount * (10 ** 6), {gas: 90000}, function () {
      	        changer.getDAI(buyAmount, {gas: 150000}, function () {
                    alert('Successfully approved and exchanged. Please monitor via etherscan.io/address/' + changerAddress)
      	        })
              })
	         } else { alert('You do not have enough USDT to buy ' + buyAmount + ' DAI. You only have '+ web3.toBigNumber(balance).shift(-6) + ' USDT.' )}
      })
  },

  getAccounts: function () {
    let elementID = document.getElementById('availableAddresses')
    try {
      web3.eth.getAccounts(function(error, accounts) {
        web3.eth.defaultAccount = accounts[0]
        console.log(accounts[0])
        userAddress = accounts[0]
        elementID.innerHTML = accounts[0]
      })
    }
    catch (error) {
      elementID.innerHTML = 'You must have MetaMask installed and unlocked to use this DApp.'
    }
  },

  getBalances: function () {
    let USDTbalance = document.getElementById('availableUSDT')
    let DAIbalance = document.getElementById('availableDAI')
    let yourUSDTbalance = document.getElementById('yourUSDT')
    let yourDAIbalance = document.getElementById('yourDAI')
    const tokenAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]
    const token = web3.eth.contract(tokenAbi)
    usdt = token.at('0xdac17f958d2ee523a2206206994597c13d831ec7')
    dai = token.at('0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359')
    usdt.balanceOf(changerAddress, function (err, balance) {
      if (err) console.log(err)
      USDTbalance.innerHTML = web3.toBigNumber(balance).shift(-6).toFixed(5)
    })
    dai.balanceOf(changerAddress, function (err, balance) {
      if (err) console.log(err)
      DAIbalance.innerHTML = web3.toBigNumber(balance).shift(-18).toFixed(5)
    })
    web3.eth.getAccounts(function(error, accounts) {
        usdt.balanceOf(accounts[0], function (err, balance) {
          if (err) console.log(err)
          yourUSDTbalance.innerHTML = web3.toBigNumber(balance).shift(-6).toFixed(5)
        })
        dai.balanceOf(accounts[0], function (err, balance) {
          if (err) console.log(err)
          yourDAIbalance.innerHTML = web3.toBigNumber(balance).shift(-18).toFixed(5)
        })
    })

  }
}

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
         console.warn("Using web3 detected from external source.")
    //     Use Mist/MetaMask's provider
     window.web3 = new Web3(web3.currentProvider);
   } else {
     alert('You need to have Metamask and be logged in to use this webpage')
   }

    App.start();
});
