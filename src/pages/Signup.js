import React, { useState } from "react";
import "./Signup.scss";
import { hasNoWhitespaces, registerNewUser } from "../utils/users";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "", // Name can only use a-Z, 0-9, and _ - NO SPACES - Therefore this is a username not an actual name.
    email: "",
    password: "",
    password2: "", // Needs to be the identical password as the one above.
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Perform signup action
      console.log("Form submitted successfully");
      registerNewUser(formData);
    }
  };

  const validate = (data) => {
    const errors = {};

    if (!data.name) {
      // The username must not have any spaces.
      errors.name = "Your name is required";
    }

    // Make sure the data.name does not contain any whitespaces.
    if (!hasNoWhitespaces(data.name)) {
      errors.name = "You can not have any spaces";
    }

    if (!data.email.endsWith("stud.noroff.no")) {
      errors.email = "Email should end with stud.noroff.no";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    if (data?.password?.length < 8) {
      errors.password = "The password must have atleast 8 characters";
    }

    if (!data.password2 || data?.password !== data?.password2) {
      errors.password2 = "The password must be identical";
    }

    return errors;
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid" }}>
          <label htmlFor="name">User Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div style={{ display: "grid" }}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ display: "grid" }}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" minLength={8} value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div style={{ display: "grid" }}>
            <label htmlFor="password">Confirm Password:</label>
            <input type="password" name="password2" id="password2" value={formData.password2} onChange={handleChange} />
            {errors.password2 && <p className="error">{errors.password2}</p>}
          </div>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
