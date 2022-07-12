// Write your JS code here
import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isFirstNameBlur: false,
    isLastNameBlur: false,
    isSubmitted: false,
  }

  blurLastName = () => this.setState({isLastNameBlur: true})

  blurFirstName = () => this.setState({isFirstNameBlur: true})

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state
    if (firstName === '') {
      this.setState({isFirstNameBlur: true})
    }
    if (lastName === '') {
      this.setState({isLastNameBlur: true})
    }
    if (firstName === '' && lastName === '') {
      this.setState({isFirstNameBlur: true, isLastNameBlur: true})
    } else if (firstName !== '' && lastName !== '') {
      this.setState({
        isSubmitted: true,
        firstName: '',
        lastName: '',
        isFirstNameBlur: false,
        isLastNameBlur: false,
      })
    }
  }

  errorMessage = () => <p className="error">*Required</p>

  errorStyleFirstName = () => {
    const {isFirstNameBlur} = this.state
    return isFirstNameBlur ? 'error-input' : 'no-error'
  }

  errorStyleLastName = () => {
    const {isLastNameBlur} = this.state
    return isLastNameBlur ? 'error-input' : 'no-error'
  }

  renderForm = () => {
    const {firstName, lastName, isFirstNameBlur, isLastNameBlur} = this.state
    return (
      <form onSubmit={this.submitForm} className="form-container">
        <label htmlFor="firstName">FIRST NAME</label>
        <input
          type="text"
          placeholder="First Name"
          id="firstName"
          onChange={this.onChangeFirstName}
          onBlur={this.blurFirstName}
          value={firstName}
          className={this.errorStyleFirstName()}
        />
        {/* here the just not a firstname=="" and alsp taken isFirstblur condition
        because, blur has to triggered only after blur function, if we take only
        firstname case,then in initial page load render it showing error mesage
        without blur the input */}
        {isFirstNameBlur && firstName === '' ? this.errorMessage() : null}
        <label htmlFor="lastName">LAST NAME</label>
        <input
          type="text"
          placeholder="Last Name"
          id="lastName"
          onChange={this.onChangeLastName}
          onBlur={this.blurLastName}
          value={lastName}
          className={this.errorStyleLastName()}
        />
        {isLastNameBlur && lastName === '' ? this.errorMessage() : null}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  renderSuccessful = () => (
    <div className="success-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png "
        alt="success"
      />
      <p>Submitted Successfully</p>
      <button
        className="submit-button"
        onClick={this.returnToFrom}
        type="button"
      >
        Submit Another Response
      </button>
    </div>
  )

  returnToFrom = () => this.setState({isSubmitted: false})

  render() {
    const {isSubmitted} = this.state
    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="heading">Registration</h1>
          {isSubmitted === false ? this.renderForm() : this.renderSuccessful()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
