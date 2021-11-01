import React, { useEffect, useState } from 'react'
import UsersList from "../components/UserList"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"

const Users = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [loadedUsers, setLoadedUsers] = useState()

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const responseData = await sendRequest("http://localhost:5000/api/users")


                setLoadedUsers(responseData.users)
            } catch (error) {
                console.log(error.message)
            }


        }
        fetchUsers()
    }, [sendRequest])

    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedUsers &&

                <UsersList items={loadedUsers} />
            }
        </>
    )
}

export default Users
