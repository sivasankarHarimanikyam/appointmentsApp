// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, onClickFavorite} = props
  const {id, title, date, favorite} = appointment

  const starImage = favorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onChangeFavorite = () => {
    onClickFavorite(id)
  }

  return (
    <li className="appointment-container">
      <div className="title-block">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          onClick={onChangeFavorite}
          className="favorite-button"
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
