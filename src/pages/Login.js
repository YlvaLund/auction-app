import React, { useState } from "react";
import "./login.scss";
import "./Signup.scss";
import { userLogin } from "../utils/users";
import { storeToken } from "../utils/token";

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
      console.log("Form submitted successfully");
      const res = await userLogin(formData);
      console.log(res);
      if (res?.status === 200 && res?.data?.accessToken?.length > 0) {
        console.log("!");
        storeToken(res.data.accessToken);
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
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid" }}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div style={{ display: "grid" }}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" minLength={8} value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
