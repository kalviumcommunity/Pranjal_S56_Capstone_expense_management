import React from 'react'
import { Progress } from 'antd';
import '../Styles/Analytics.css'

function Analytics({transactions}) {
const totalTransaction = transactions.length
const totalIncomeTransaction = transactions.filter(transaction => transaction.type === 'income')
const totalExpenseTransaction = transactions.filter(transaction => transaction.type === 'expense')


const totalIncomePercent = (totalIncomeTransaction.length /totalTransaction) * 100
const totalExpensePercent = (totalExpenseTransaction.length /totalTransaction) * 100


  return (
    <>
    <div className="row">
        <div className="tracker">

    <Progress 
    type='circle'
    strokeColor='Green'
    percent={totalIncomePercent}
    />
    <Progress 
    type='circle'
    strokeColor='Red'
    percent={totalExpensePercent}
    />
        </div>



    </div>
    </>
  )
}

export default Analytics