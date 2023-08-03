// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {Title, details, imgUrl, imgAlt, classname, dataTest} = props
  return (
    <li className={`list-item ${classname}`}>
      <img src={imgUrl} alt={imgAlt} className="financial-image" />
      <div>
        <p className="financial-heading">{Title}</p>
        <p className="financial-description" data-testid={dataTest}>
          Rs {details}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
