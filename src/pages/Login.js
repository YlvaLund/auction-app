import React, { useState } from "react";
import "./login.scss";
import "./Signup.scss";
import { userLogin } from "../utils/users";
import { storeUser } from "../utils/token";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Perform signup action
      const res = await userLogin(formData);
      if (res?.status === 200 && res?.data?.accessToken?.length > 0) {
        storeUser(res.data.accessToken, res?.data?.name ?? "", res?.data?.credits ?? 0);
        window.location = "/auctions";
      } else {
        alert("Error when trying to log in...");
      }
    }
  };

  const validate = (data) => {
    const errors = {};

    if (!data.email.endsWith("stud.noroff.no")) {
      errors.email = "Email should end with stud.noroff.no";
    }

    if (!data.email) {
      // The username must not have any spaces.
      errors.email = "You have to have an email to login";
    }

    if (!data.password) {
      errors.password = "You need to set a password to login";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} autoComplete="on">
        <div style={{ display: "grid" }}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div style={{ display: "grid" }}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" autoComplete="current-password" id="password" minLength={8} value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
