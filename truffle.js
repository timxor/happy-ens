// inlcude these in your package.json under dev dependencies in a package.json file and `npm install`
const HDWalletProvider = require("truffle-hdwallet-provider")
// const fs = require("fs")

/* To deploy (`truffle migrate`) your contracts to a network you will need to
 * add the network config object below and specify it with
 * `truffle migrate kovan` etc.
 */

/* Available networks:
 * Mainnet	production network	https://mainnet.infura.io/       local net_id= 1
 * Ropsten	test network	https://ropsten.infura.io/           local net_id= 3
 * INFURAnet	test network	https://infuranet.infura.io/
 * Kovan	test network	https://kovan.infura.io/            local net_id= 42
 * Rinkeby	test network	https://rinkeby.infura.io/           local net_id= 4
 */

// address info for acct used to deploy contracts (for developer use so you don't have to look it up everytime)
// address: 0xabcd...

// Enter in the 12 word mnemonic that you saved when you created your MetaMask acct.
let mnemonic = '';

module.exports = {

    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        // kovan: { // use this code if you plan to run the Kovan parity client locally
        //     host: "localhost",
        //     port: 8545,
        //     network_id: "42"
        // },
        kovan: {
            provider: new HDWalletProvider(mnemonic, "https://kovan.infura.io"),
            network_id: "*",
            gas: 4500000,
            gasPrice: 25000000000
        },
        rinkeby: {
            provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io"),
            network_id: "*",
            gas: 4500000,
            gasPrice: 25000000000
        },
        mainnet: {
            provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io"),
            network_id: "1",
            gas: 0,//ONLY SET THIS IF YOU KNOW WHAT YOU'RE DOING
            gasPrice: 0//ONLY SET THIS IF YOU KNOW WHAT YOU'RE DOING
        }
    }

}
