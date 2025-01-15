import React from "react";
import { useFormik } from "formik";
import axios from 'axios';

const validate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = "Username cannot be empty";
    } else if (values.username.length > 15) {
        errors.username = "Must be 15 characters or less";
    } else if (/\s/.test(values.username)) {
        errors.username = "Username must not contain spaces";
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

    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must match";
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
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            age: "",
            mobile: "",
            gender: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                const res = await axios.post(
                    "https://mern-signup-form-backend.vercel.app/signup",
                    {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        age: values.age,
                        mobile: values.mobile,
                        gender: values.gender,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

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
                                    username: true,
                                    email: true,
                                    password: true,
                                    confirmPassword: true,
                                    age: true,
                                    mobile: true,
                                    gender: true,
                                });
                                formik.handleSubmit();
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                id="username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className="error">{formik.errors.username}</div>
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
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                id="confirmPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className="error">{formik.errors.confirmPassword}</div>
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
