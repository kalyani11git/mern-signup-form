import React from "react";
import { useFormik } from "formik";
import axios from 'axios';

const validate = (values) => {
    const errors = {};
  
    if (!values.firstname) {
      errors.firstname = "First Name cannot be empty";
    } else if (values.firstname.length > 15) {
      errors.firstname = "Must be 15 characters or less";
    }
  
    if (!values.lastname) {
      errors.lastname = "Last Name cannot be empty";
    } else if (values.lastname.length > 20) {
      errors.lastname = "Must be 20 characters or less";
    }
  
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must not be less than 8 characters";
    }
  
    if (!values.age) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(values.age) || parseInt(values.age, 10) <= 0) {
      errors.age = "Age must be a valid positive number";
    }
  
    if (!values.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(values.mobile)) {
      errors.mobile = "Mobile number must be a 10-digit number";
    }
  
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
  
    return errors;
};

function FormSection() {
    const formik = useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        age: "",
        mobile: "",
        gender: "",
      },
      validate,
      onSubmit: async (values) => {
        try {
          const res = await axios.post('https://mern-signup-form-henna.vercel.app/signup', {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            age: values.age,
            mobile: values.mobile,
            gender: values.gender
          },{
                headers: {
                    'Content-Type': 'application/json',
                }
            });

          console.log('Response:', res.data);
          formik.setFieldValue('message', 'Registration successful!');
        } catch (err) {
          console.error('Error:', err);
          formik.setFieldValue('message', 'Registration failed!');
        }
      },
    });

    return (
      <>
      <div className="main-container">
      <div className="sign-up">SIGN UP</div>
      <div className="section-container">
        <div className="form-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.setTouched({
                firstname: true,
                lastname: true,
                email: true,
                password: true,
                age: true,
                mobile: true,
                gender: true,
              });
              formik.handleSubmit();
            }}
          >
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              id="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="error">{formik.errors.firstname}</div>
            )}

            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              id="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="error">{formik.errors.lastname}</div>
            )}

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}

            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}

            <input
              type="text"
              placeholder="Age"
              name="age"
              id="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && (
              <div className="error">{formik.errors.age}</div>
            )}

            <input
              type="text"
              placeholder="Mobile Number"
              name="mobile"
              id="mobile"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="error">{formik.errors.mobile}</div>
            )}

            <div className="gender-container">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                Female
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <div className="error">{formik.errors.gender}</div>
            )}

            <button type="submit" className="submit-btn text-white cursor-pointer">
              SIGNUP
            </button>
            {formik.values.message && (
              <div className="form-message">
                {formik.values.message}
              </div>
            )}
          </form>
        </div>
      </div>
      </div>
      </>
    );
}

export default FormSection;
