import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const backgroundColorList = [
  'yellow',
  'green',
  'blue',
  'red',
  'orange',
  'brown',
  'purple',
]

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    isPassWrdShow: false,
    isPasswrdList: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const backgroundColor = backgroundColorList[Math.floor(Math.random() * 7)]

    const newPasswordDetails = {
      id: uuidv4(),
      initialChar: initial,
      websiteUrl: website,
      userName: username,
      passwordAuthen: password,
      backgroundColorAdd: backgroundColor,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordDetails],
      website: '',
      username: '',
      password: '',
      isPasswrdList: true,
      searchInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckbox = event => {
    if (event.target.checked) {
      this.setState({isPassWrdShow: true})
    } else {
      this.setState({isPassWrdShow: false})
    }
  }

  onClickDeleteBtn = id => {
    const {passwordList} = this.state
    const newPasswordList = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordList: newPasswordList})

    if (newPasswordList.length === 0) {
      this.setState({isPasswrdList: false})
    } else {
      this.setState({isPasswrdList: true})
    }
  }

  render() {
    const {
      website,
      username,
      password,
      passwordList,
      isPassWrdShow,
      searchInput,
    } = this.state

    const newPasswordList = passwordList.filter(eachPassword =>
      eachPassword.websiteUrl.toLowerCase().includes(searchInput.toLowerCase()),
    )
    let {isPasswrdList} = this.state
    if (newPasswordList.length !== 0) {
      isPasswrdList = true
    } else {
      isPasswrdList = false
    }

    return (
      <div className="app-container">
        <div className="content-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="add-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="sm-image"
            />
            <div className="form-container">
              <h1 className="form-heading">Add New Password</h1>
              <form className="form" onSubmit={this.onSubmitForm}>
                <div className="website-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="web-icon"
                  />
                  <input
                    className="website"
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsite}
                    value={website}
                  />
                </div>

                <div className="username-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="user-icon"
                  />
                  <input
                    className="username"
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                </div>

                <div className="passwrd-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt=" password"
                    className="password-icon"
                  />
                  <input
                    className="passwrd"
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </div>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="lg-image"
            />
          </div>

          <div className="passwords-container">
            <div className="count-search-input-container">
              <div className="count-container">
                <h1 className="count-heading">Your Passwords</h1>
                <p className="count">{newPasswordList.length}</p>
              </div>
              <div className="search-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  className="search-input"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="passwords-body-container">
              <div className="checkbox-container">
                <input
                  className="check-box"
                  type="checkbox"
                  onChange={this.onChangeCheckbox}
                  id="check"
                />
                <label htmlFor="check" className="checkbox-label">
                  Show Passwords
                </label>
              </div>
              {!isPasswrdList && (
                <div className="no-password-view-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-password-view-image"
                  />
                  <p className="no-passwrd-view-heading">No Passwords</p>
                </div>
              )}

              {isPasswrdList && (
                <div className="password-view-container">
                  <ul className="password-list">
                    {newPasswordList.map(eachPassword => (
                      <li
                        className="password-list-item"
                        value={eachPassword.id}
                        key={eachPassword.id}
                      >
                        <div className="initial-password-details">
                          <p
                            className={`initial ${eachPassword.backgroundColorAdd}`}
                          >
                            {eachPassword.initialChar}
                          </p>
                          <div className="password-details-container">
                            <p className="each-website">
                              {eachPassword.websiteUrl}
                            </p>
                            <p className="each-username">
                              {eachPassword.userName}
                            </p>

                            <div className="password-show-container">
                              {isPassWrdShow && (
                                <p className="each-password">
                                  {eachPassword.passwordAuthen}
                                </p>
                              )}

                              {!isPassWrdShow && (
                                <img
                                  src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                                  alt="stars"
                                  className="stars-icon"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          className="delete-btn"
                          type="button"
                          data-testid="delete"
                          onClick={() => this.onClickDeleteBtn(eachPassword.id)}
                        >
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                            alt="delete"
                            className="delete-icon"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
