import React from 'react'
import { Progress } from 'antd';
import '../Styles/Analytics.css'

function Analytics({transactions}) {


  // Total Transactions
const totalTransaction = transactions.length
const totalIncomeTransaction = transactions.filter(transaction => transaction.type === 'income')
const totalExpenseTransaction = transactions.filter(transaction => transaction.type === 'expense')

const totalIncomePercent = Math.round((totalIncomeTransaction.length /totalTransaction) * 100)
const totalExpensePercent = Math.round((totalExpenseTransaction.length /totalTransaction) * 100)


// Total turnover
const totalTurnover = transactions.reduce((acc,transaction )=> parseInt(acc) + parseInt(transaction.amount), 0)

const totalIncomeTurnover = transactions.filter(transaction=>transaction.type === "income").reduce((acc,transaction)=> acc+transaction.amount,0)

const totalExpenseTurnover = transactions.filter(transaction=>transaction.type === "expense").reduce((acc,transaction)=> acc + transaction.amount,0)

const totalIncTurnoverPercent = Math.round((totalIncomeTurnover/totalTurnover) * 100)
const totalExpenseTurnoverPercent = Math.round((totalExpenseTurnover/totalTurnover) * 100)



  return (
    <>
    <div className="charts">
    <div className="row">
      <p>{`Total Transactions : ${totalTransaction}`}</p>
      <h3 className='textinc'>{`Income : ${totalIncomeTransaction.length} `}</h3>
      <h3 className='textexp'>{`Expense : ${totalExpenseTransaction.length}`}</h3>
      
        <div className="tracker">

    <Progress 
    type='circle'
    strokeColor='Green'
    // trailColor='white'
    
    percent={totalIncomePercent}
    />
    <Progress 
    type='circle'
    strokeColor='Red'
    percent={totalExpensePercent}
    />
        </div>



    </div>

    <div className="row2">
    <p>{`Total Turnover : ${totalTurnover}`}</p>
      <h3 >{`Income : ${totalIncomeTurnover} `}</h3>
      <h3 >{`Expense : ${totalExpenseTurnover}`}</h3>
      
        <div className="tracker">

    <Progress 
    type='circle'
    strokeColor='Green'
    // trailColor='white'
    
    percent={totalIncTurnoverPercent}
    />
    <Progress 
    type='circle'
    strokeColor='Red'
    percent={totalExpenseTurnoverPercent}
    />
        </div>


    </div>
    </div>
    </>
  )
}

export default Analytics