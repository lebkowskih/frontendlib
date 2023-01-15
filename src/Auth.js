import axios, { AxiosHeaders } from "axios"
import React, { useState } from "react"

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [email, setEmail] = useState('')

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const register = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', {
      'name':username,
      'password':password,
      'email':email
    }).then(res => {
      console.log(res);
      console.log(res.data)
    })
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Zaloguj się</h3>
            <div className="text-center">
              Nie masz jeszcze konta?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Zarejestruj się
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Adres e-mail:</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Hasło:</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
              Zaloguj się
              </button>
            </div>
            <p className="text-center mt-2">
              Zapomniałeś <a href="#">hasła?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={() => register()}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Zarejestruj się</h3>
          <div className="text-center">
            Masz już konto?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Zaloguj się
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Nazwa użytkownika:</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Adres e-mail:</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Hasło:</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={register}>
              Zarejestruj się
            </button>
          </div>
          <p className="text-center mt-2">
            Zapomniałeś <a href="#">hasła?</a>
          </p>
        </div>
      </form>
    </div>
  )
}