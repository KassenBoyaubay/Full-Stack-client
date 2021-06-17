import { Link } from 'react-router-dom'
import React from 'react'

function PageNotFound() {
    return (
        <div className="pageNotFound">
            <h1>Page Not Found:</h1>
            <h3>Go to the Home Page: <Link to="/">Home Page</Link> </h3>
        </div>
    )
}

export default PageNotFound
