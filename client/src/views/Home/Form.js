import React from 'react'
import useInput from '../../customHook/useInput'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/actions/user'

const Form = () => {

    const [first_name, bindFirstName, resetFirstName] = useInput()
    const [last_name, bindLastName, resetLastName] = useInput()
    const [username, bindUsername, resetUsername] = useInput()
    const [password, bindPassword, resetPassword] = useInput()

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addUser({ first_name, last_name, username, password }))
        resetFirstName()
        resetLastName()
        resetUsername()
        resetPassword()
    }

    return (
        <div className="section">
            <form onSubmit={handleSubmit} className="white">
                <h5 className='grey-text text-darken-3'>New Customer</h5>

                <div className="input-field ">
                    <input id="first_name" type="text" className="validate" {...bindFirstName} />
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field ">
                    <input id="last_name" type="text" className="validate" {...bindLastName} />
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="input-field ">
                    <input id="username" type="text" className="validate" {...bindUsername} />
                    <label htmlFor="username">UserName</label>
                </div>
                <div className="input-field ">
                    <input id="password" type="text" className="validate" {...bindPassword} />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="btn green">Add</button>
            </form>
        </div>
    )
}

export default Form
