import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    totalExpenses: 0,
    totalIncome: 0,
    totalBalance: 0,
    historyList: [],
    title: '',
    amount: '',
    type: 'Income',
  }

  ChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  ChangeAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  ChangeFinancialItem = event => {
    this.setState({type: event.target.value})
  }

  addTransaction = () => {
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    if (type === 'Income') {
      this.setState(prevState => ({
        totalIncome: prevState.totalIncome + amount,
      }))
    } else {
      this.setState(prevState => ({
        totalExpenses: prevState.totalExpenses + amount,
      }))
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newTransaction],
      title: '',
      amount: '',
      totalBalance: prevState.totalIncome - prevState.totalExpenses,
    }))
  }

  deleteBtn = id => {
    const {historyList} = this.state
    const Transaction = historyList.filter(each => each.id === id)
    if (Transaction[0].type === 'Income') {
      this.setState(prevState => ({
        totalIncome: prevState.totalIncome - Transaction[0].amount,
      }))
    }
    if (Transaction[0].type === 'Expenses') {
      this.setState(prevState => ({
        totalExpenses: prevState.totalExpenses - Transaction[0].amount,
      }))
    }
    this.setState(prevState => ({
      totalBalance: prevState.totalIncome - prevState.totalExpenses,
    }))
    const FilterTransactions = historyList.filter(each => each.id !== id)
    this.setState({historyList: FilterTransactions})
  }

  render() {
    const {
      title,
      amount,
      totalIncome,
      totalBalance,
      totalExpenses,
      historyList,
      type,
    } = this.state
    return (
      <div className="Money-container">
        <div className="name-card">
          <h1 className="heading">Hi,Richard</h1>
          <p className="description">
            Welcome back to your <span className="spanEl">Money Manager</span>
          </p>
        </div>
        <div className="financials">
          <ul className="unorderedList">
            <MoneyDetails
              key="Balance"
              Title="Your Balance"
              details={totalBalance}
              imgUrl="http://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              imgAlt="balance"
              classname="background-color-bal"
              dataTest="balanceAmount"
            />
            <MoneyDetails
              key="Income"
              Title="Your Income"
              details={totalIncome}
              imgUrl="http://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              imgAlt="income"
              classname="background-color-inc"
              dataTest="incomeAmount"
            />
            <MoneyDetails
              key="Expenses"
              Title="Your Expenses"
              details={totalExpenses}
              imgUrl="http://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              imgAlt="expenses"
              classname="background-color-exp"
              dataTest="expensesAmount"
            />
          </ul>
        </div>
        <div className="transactions-container">
          <div className="add-transaction">
            <h1 className="transaction-heading">Add Transaction</h1>
            <label htmlFor="title" className="labelEl">
              TITLE
            </label>
            <br />
            <input
              type="text"
              placeholder="Title"
              id="title"
              className="inputEl"
              onChange={this.ChangeTitle}
              value={title}
            />
            <br />
            <label htmlFor="amount" className="labelEl">
              AMOUNT
            </label>
            <br />
            <input
              type="text"
              placeholder="Amount"
              id="amount"
              className="inputEl"
              onChange={this.ChangeAmount}
              value={amount}
            />
            <br />
            <label htmlFor="type" className="labelEl">
              TYPE
            </label>
            <br />
            <select
              className="select"
              value={type}
              onChange={this.ChangeFinancialItem}
            >
              {transactionTypeOptions.map(each => (
                <option id={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <br />
            <button
              type="button"
              className="button"
              onClick={this.addTransaction}
            >
              Add
            </button>
          </div>
          <div className="transaction-history">
            <h1 className="transaction-heading">History</h1>
            <hr />
            <div className="transaction-title">
              <p className="history-title">Title</p>
              <p className="history-title">Amount</p>
              <p className="history-title">Type</p>
            </div>
            <ul className="transactions-ul">
              {historyList.map(each => (
                <TransactionItem
                  key={each.id}
                  details={each}
                  deleteBtn={this.deleteBtn}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
