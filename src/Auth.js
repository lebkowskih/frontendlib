import axios, { AxiosHeaders } from "axios"
import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [email, setEmail] = useState('')


  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  }

  const register = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/register', {
      'name':username,
      'password':password,
      'email':email
    }).then(() => {
      toast.success("Rejestracja udana!");
    }).catch(() => {
      toast.error("Rejestracja niepowiodła się!")
    }) 
  }

  const login = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/login/', {
      'email':email,
      'password':password
    }).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Hasło:</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={login}>
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
      <ToastContainer />
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