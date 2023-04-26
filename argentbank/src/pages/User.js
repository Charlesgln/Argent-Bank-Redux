import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserData } from "../feature/user.slice";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.user);
  const [isEdit, setIsEditing] = useState(false);
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:3001/api/v1/user/profile", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => dispatch(setUserData(res.data.body)));
    } else {
      navigate("/");
    }
  }, []);

  const userLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(setUserData({}));
  };

  const updateUser = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    axios
      .put(
        "http://localhost:3001/api/v1/user/profile",
        {
          userName: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(
        dispatch(
          setUserData({
            ...dataUser,
            userName: username,
          })
        )
      );
  };

  return (
    <>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo-image">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>

        <div>
          <NavLink to="/user" className="main-nav-item">
            <i className="fa fa-user-circle"></i> {dataUser.userName}
          </NavLink>

          <NavLink to="/" className="main-nav-item" onClick={userLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {dataUser.userName} !
          </h1>
          {isEdit ? (
            <form onSubmit={(event) => updateUser(event)}>
              <label htmlFor="username">
                UserName
                <input
                  type="text"
                  className="inputUser"
                  placeholder={dataUser.userName}
                  id="username"
                />
              </label>
              <br />
              <label>
                First Name
                <input
                  type="text"
                  className="inputUserOff"
                  placeholder={dataUser.firstName}
                  disabled
                />
              </label>
              <br />
              <label>
                Last Name
                <input
                  type="email"
                  className="inputUserOff"
                  placeholder={dataUser.lastName}
                  disabled
                />
              </label>
              <br />
              <button type="submit" id="submitButton">
                Save
              </button>
              <button
                type="button"
                id="cancelButton"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default User;
