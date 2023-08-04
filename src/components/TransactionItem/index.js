// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, deleteBtn} = props
  const {id, title, amount, type} = details

  const deleteTransaction = () => {
    deleteBtn(id)
  }
  return (
    <li className="transaction-item">
      <p className="history-title">{title}</p>
      <p className="history-title">Rs {amount}</p>
      <p className="history-title">{type}</p>
      <button
        type="button"
        className="delete-btn"
        data-testid="delete"
        onClick={deleteTransaction}
      >
        <img
          src="http://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
      <hr />
    </li>
  )
}

export default TransactionItem
