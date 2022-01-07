// https://eth-ropsten.alchemyapi.io/v2/jFGhVfO7-hrXLNcocOOGYd0L-Pfdp187

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/jFGhVfO7-hrXLNcocOOGYd0L-Pfdp187',
      accounts: [
        '8ee3627f76dd151d989510092f2596c4b7b8e156acfe9223a346a1d0258ee49b',
      ],
    },
  },
}
