import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./FormSection.css";

// Validation for Signup Form
const validateSignup = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (!values.age) {
    errors.age = "Age is required";
  } else if (isNaN(values.age)) {
    errors.age = "Age must be a number";
  }
  if (!values.mobile) {
    errors.mobile = "Mobile number is required";
  }
  if (!values.gender) {
    errors.gender = "Gender is required";
  }
  if (!values.profilePicture) {
    errors.profilePicture = "Profile picture is required";
  }
  return errors;
};

const validateLogin = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

function FormSection() {
  const [isSignup, setIsSignup] = useState(true);

  // Formik for Signup
  const formikSignup = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      mobile: "",
      gender: "",
      profilePicture: null,
    },
    validate: validateSignup,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        

        const res = await axios.post("http://localhost:3000/signup", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Signup Response:", res.data);
        formikSignup.setFieldValue("message", "Registration successful!");
      } catch (err) {
        console.error("Signup Error:", err);
        formikSignup.setFieldValue("message", "Registration failed!");
      }
    },
  });

  // Formik for Login
  const formikLogin = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:3000/login", values, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Login Response:", res.data);
        formikLogin.setFieldValue("message", "Login successful!");
      } catch (err) {
        console.error("Login Error:", err);
        formikLogin.setFieldValue("message", "Login failed!");
      }
    },
  });

  return (
    <div className="main-container">
      {/* Toggle Switch */}
      <div className="toggle-switch-container">
        <div
          className={`toggle-switch-option toggle-switch ${isSignup ? "active" : "inactive"}`}
          onClick={() => setIsSignup(true)}
        >
          Signup
        </div>
        <div
          className={`toggle-switch-option toggle-switch ${!isSignup ? "active" : "inactive"}`}
          onClick={() => setIsSignup(false)}
        >
          Login
        </div>
      </div>

      {/* Forms */}
      <div className="section-container">
        <div className="form-container">
          {isSignup ? (
            <>
              <div className="form-title">SIGN UP</div>
              <form onSubmit={formikSignup.handleSubmit} className="signup-form">
    <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={formikSignup.handleChange}
        onBlur={formikSignup.handleBlur}
        value={formikSignup.values.username}
        className="username"
    />
    <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={formikSignup.handleChange}
        onBlur={formikSignup.handleBlur}
        value={formikSignup.values.email}
        className="email"
    />
    <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={formikSignup.handleChange}
        onBlur={formikSignup.handleBlur}
        value={formikSignup.values.password}
        className="password"
    />
    <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={formikSignup.handleChange}
        onBlur={formikSignup.handleBlur}
        value={formikSignup.values.confirmPassword}
        className="confirmPassword"
    />
    <input
        type="text"
        placeholder="Age"
        name="age"
        onChange={formikSignup.handleChange}
        onBlur={formikSignup.handleBlur}
        value={formikSignup.values.age}
        className="age"
    />
    <input
        type="text"
        placeholder="Mobile"
        name="mobile"
        onChange={formikSignup.handleChange}
        onBlur={formikSignup.handleBlur}
        value={formikSignup.values.mobile}
        className="mobile"
    />
    <select
        name="gender"
        onChange={formikSignup.handleChange}
        onBlur={formikSignup.handleBlur}
        value={formikSignup.values.gender}
        className="gender"
    >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
    </select>
    <input
        type="file"
        name="profilePicture"
        accept="image/*"
        onChange={(event) =>
            formikSignup.setFieldValue("profilePicture", event.target.files[0])
        }
        className="profilePicture"
    />
    <button type="submit">SIGNUP</button>
    {formikSignup.values.message && (
        <div className="form-message">
            {formikSignup.values.message}
        </div>
    )}
              </form>

            </>
          ) : (
            <>
              <div className="form-title">LOGIN</div>
              <form onSubmit={formikLogin.handleSubmit} className="login-form">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={formikLogin.handleChange}
                  onBlur={formikLogin.handleBlur}
                  value={formikLogin.values.username}
                />
                {formikLogin.touched.username && formikLogin.errors.username && (
                  <div className="error">{formikLogin.errors.username}</div>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={formikLogin.handleChange}
                  onBlur={formikLogin.handleBlur}
                  value={formikLogin.values.password}
                />
                {formikLogin.touched.password && formikLogin.errors.password && (
                  <div className="error">{formikLogin.errors.password}</div>
                )}

                <button type="submit">LOGIN</button>
                {formikLogin.values.message && (
                  <div className="form-message">
                    {formikLogin.values.message}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormSection;
