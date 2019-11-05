import React from 'react'
import jwt from 'jsonwebtoken'
const detail = ({ url: { query: { id } } }) => {
    return (
        <div>
            <h1>hello {id}</h1>
        </div>
    )
}
export default detail;