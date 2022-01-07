import {ethers} from 'ethers'
import abi from './Transactions.json'

export const contractAddress = '0x70FA561c681baCc151B349cdc9839702dBc0918B'

export const contractAbi = abi.abi

export const makeSimpleAddress = address => {
  if (!!address)
    return (
      address.split('').splice(0, 5).join('') +
      '...' +
      address
        .split('')
        .splice(address.length - 5, address.length)
        .join('')
    )
  return ''
}

export const getEtheriumContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer,
  )
  return transactionContract
}

export const getParsAmount = amount => {
  return ethers.utils.parseEther(amount)
}

const TRANSACTION_COUNT_KEY = 'TRANSACTION_COUNT'
export const getMyTransactionCount = () => {
  return localStorage.getItem(TRANSACTION_COUNT_KEY) || 0
}
