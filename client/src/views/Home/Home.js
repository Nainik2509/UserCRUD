import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../layout/Navbar'
import { userData } from '../../redux/actions/user'
import Form from './Form'
import UserList from './UserList'

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userData())
    }, [])

    const userLoggedIn = useSelector(state => state.authApp.data)
    const userList = useSelector(state => state.userApp.userList)
    return (
        <div>
            {userLoggedIn && userLoggedIn.role === 'administrator' ?
                (
                    <div>
                        <Navbar />
                        <div className="container" style={{ marginTop: '10px' }}>
                            <div className="row center-align">
                                <div className="col-7"><UserList userList={userList} /></div>
                                <div className="col-5"><Form /> </div>
                            </div>
                        </div>
                    </div>
                ) :
                (
                    <div>
                        <Navbar />
                        <div className="text-center">
                            <h4>Customer Dashboard!!</h4>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Home
