// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    starredActive: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      favorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickStarred = () => {
    const {starredActive} = this.state
    this.setState({starredActive: !starredActive})
  }

  onClickFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {
            ...eachAppointment,
            favorite: !eachAppointment.favorite,
          }
        }
        return eachAppointment
      }),
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, starredActive} = this.state
    if (starredActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.favorite === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, starredActive} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    const filterClassName = starredActive ? 'filter-filled' : 'filter-empty'

    return (
      <div className="appointments-bg-container">
        <div className="appointments-container">
          <div className="head-container">
            <form className="input-container" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="input-title">TITLE</label>
              <input
                type="text"
                id="input-title"
                onChange={this.onChangeTitle}
                value={title}
                placeholder="Title"
              />
              <label htmlFor="input-date">DATE</label>
              <input
                type="date"
                id="input-date"
                value={date}
                onChange={this.onChangeDate}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="head-image"
            />
          </div>
          <hr className="h-line" />
          <div className="appointments-section">
            <h1 className="bottom-heading">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointment={eachAppointment}
                onClickFavorite={this.onClickFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
