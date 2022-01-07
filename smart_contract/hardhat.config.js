require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'Your live ropsten network url',
      accounts: ['Your metamask private key'],
    },
  },
}
