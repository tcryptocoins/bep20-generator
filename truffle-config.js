require('chai/register-should');

const solcStable = {
  version: '0.8.3',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

const solcNightly = {
  version: 'nightly',
  docker: true,
};

const useSolcNightly = process.env.SOLC_NIGHTLY === 'true';
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
    },
    coverage: {
      host: 'localhost',
      network_id: '*', // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: useSolcNightly ? solcNightly : solcStable,
  },
  // Configure your compilers
//   compilers: {
//     solc: {
//       version: "^0.6.12", // A version or constraint - Ex. "^0.5.0"
//     }
//   },
  plugins: ['solidity-coverage'],
};
