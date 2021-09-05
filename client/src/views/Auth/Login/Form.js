import React from 'react'
import { useDispatch } from 'react-redux'
import useInput from '../../../customHook/useInput'
import { login } from '../../../redux/actions/auth'

const Form = () => {

    const [username, bindUsername, resetUsername] = useInput()
    const [password, bindPassword, resetPassword] = useInput()

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ username, password }))
        resetUsername()
        resetPassword()
    }

    return (
        <div className="section">
            <form onSubmit={handleSubmit} className="white">
                <h5 className='grey-text text-darken-3'>Login</h5>

                <div className="input-field ">
                    {/* <label htmlFor="username">UserName</label> */}
                    <input id="username" type="text" placeholder="Username" className="validate" {...bindUsername} />
                </div>

                <div className="input-field">
                    <input type="password" id="password" className="materialize-textarea" placeholder="Password" {...bindPassword}></input>
                    {/* <label htmlFor="password">Password</label> */}
                </div>
                <button className="btn green">Login</button>
            </form>
        </div>
    )
}

export default Form
