import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Registration() {

    // redirect url
    let history = useHistory()

    const { setAuthState } = useContext(AuthContext)

    const initialValues = {
        username: "",
        password: ""
    }

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            localStorage.setItem("accessToken", response.data.token)
            setAuthState({ username: response.data.username, id: response.data.id, status: true })
            history.push('/')
        })
    }

    // used for validation w/ ErrorMessage
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required()
    })

    return (
        <div className="registrationPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreatePost" name="username" placeholder="Username..." />
                    <label>Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field id="inputCreatePost" name="password" placeholder="Password..." type="password" />
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration
