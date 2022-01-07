import {useState, useEffect, createContext, useCallback} from 'react'

import {ToastContainer, toast} from 'react-toastify'
import {
  getEtheriumContract,
  getMyTransactionCount,
  getParsAmount,
} from '../utils/config'

export const TransactionCotext = createContext()

export const TransactionProvider = ({children}) => {
  const [connectedAccount, setConnectedAccount] = useState(null)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [transactionCount, setTransactionCount] = useState(() =>
    getMyTransactionCount(),
  )

  const checkIfWalletIsConected = useCallback(async () => {
    //  check metamask install or not
    if (!window.ethereum) {
      toast.error('Please install metamask')
    }
    const accounts = await window.ethereum.request({method: 'eth_accounts'})
    if (accounts?.length > 0) {
      setConnectedAccount(accounts[0])
    }
  }, [])

  const connectToWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        toast.error('Please install metamask')
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      setConnectedAccount(accounts[0])
    } catch (error) {
      console.log({error})
    }
  }, [])

  const handleChangeInput = useCallback(
    (e, name) => {
      setFormData({...formData, [name]: e.target.value})
    },
    [formData],
  )

  const transferMoney = useCallback(async () => {
    if (!window.ethereum) {
      toast.error('Please install metamask')
      return
    }
    if (!connectedAccount) {
      toast.error('Please Connect wallet, first.')
      return
    }

    const {addressTo, amount, keyword, message} = formData
    if (!addressTo || !amount || !keyword || !message) {
      toast.warning('Please enter all the fields.')
      return
    }

    try {
      const contract = getEtheriumContract()
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x5208',
            value: getParsAmount(amount)._hex,
          },
        ],
      })

      const transactionHash = await contract.addToBlockChain(
        addressTo,
        getParsAmount(amount)._hex,
        message,
        keyword,
      )
      setLoading(true)
      console.log('Transaction occure')
      await transactionHash.wait()

      const tCount = await contract.getTransactionCount()
      setTransactionCount(tCount.toNumber())
      console.log('Transaction sucessfull')

      setLoading(false)
    } catch (error) {
      console.log('Erorr', error)
      toast.error(error)
    }
  }, [formData])

  const getAllTransactions = useCallback(async () => {
    if (!!connectedAccount) {
      const contract = getEtheriumContract()
      // console.log({contract})
      const transactions = await contract.getTransactions()
      // console.log({transactions})
      const structuredTransaction = transactions.map(transaction => {
        return {
          addressTo: transaction.reciver,
          addressFrom: transaction.from,
          message: transaction.message,
          keyword: transaction.keyword,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000,
          ).toLocaleDateString(),
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }
      })

      setTransactions([...structuredTransaction])
    }
  }, [connectedAccount])

  useEffect(() => {
    checkIfWalletIsConected()
  }, [getAllTransactions])

  useEffect(() => {
    getAllTransactions()
  }, [getAllTransactions])

  return (
    <TransactionCotext.Provider
      value={{
        connectToWallet,
        connectedAccount,
        handleChangeInput,
        transferMoney,
        loading,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </TransactionCotext.Provider>
  )
}
