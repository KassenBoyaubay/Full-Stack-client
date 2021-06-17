import React, { useEffect, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function CreatePost() {

    // redirect url
    let history = useHistory()

    const { authState } = useContext(AuthContext)

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login")
        }
    }, [])

    const initialValues = {
        title: "",
        postText: ""
        // username: ""
    }

    const onSubmit = (data) => {
        axios.post("https://full-stack-api-kas.herokuapp.com/posts", data,
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then((response) => {
            history.push('/')
        })
    }

    // used for validation w/ ErrorMessage
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title"),
        postText: Yup.string().required()
        // username: Yup.string().min(3).max(15).required()
    })

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title:</label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="Title..." autoComplete="off" />
                    <label>Post:</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field id="inputCreatePost" name="postText" placeholder="Post..." autoComplete="off" />
                    {/* <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreatePost" name="username" placeholder="Username..." /> */}
                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
