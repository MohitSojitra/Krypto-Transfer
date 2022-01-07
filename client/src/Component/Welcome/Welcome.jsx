import React, {useContext, useCallback} from 'react'
import {TransactionCotext} from '../../context/TransactionContext'
import SiteInfo from './SiteInfo'
import MyCard from './MyCard'
import {Loader} from '..'

const Input = ({placeholder, name, type, value, handleChange}) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={e => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
)

const Welcome = () => {
  const {transferMoney, handleChangeInput, loading, transactionCount} =
    useContext(TransactionCotext)

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <SiteInfo />

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <MyCard />
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChangeInput}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChangeInput}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChangeInput}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChangeInput}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {loading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={transferMoney}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
