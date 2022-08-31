import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";

import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER, DELETE_USER, UPDATE_USER } from "./mutations/user";
import "./App.scss"

interface UpdateInput {
   username?: string,
   age?: number
}

function App() {
   const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
   const {
      data: oneUser, loading: loadingOneUser, error: errorOneUser, refetch: refetchOneUser
   } = useQuery(GET_ONE_USER, {
      variables: {
         id: 1
      }
   })

   const [addUser] = useMutation(CREATE_USER)
   const [deleteUser] = useMutation(DELETE_USER)
   const [updateUser] = useMutation(UPDATE_USER)

   const [users, setUsers] = useState([])
   const [userName, setUserName] = useState("")
   const [age, setAge] = useState("")

   const addUserHandler = (event: any) => {
      if (!userName || !age) return
      event.preventDefault()
      addUser({
         variables: {
            input: {
               username: userName,
               age: Number(age)
            }
         }
      })
         .then(() => {
            setUserName("")
            setAge("")
         }
         )
      refetch()
   }

   const updateUserHandler = (event: any, id: number) => {
      if (!userName && !age) return
      event.preventDefault()

      const updateInput: UpdateInput = {}
      if (userName) {
         updateInput.username = userName
      }
      if (age) {
         updateInput.age = Number(age)
      }

      updateUser({
         variables: {
            id,
            input: updateInput
         }
      })
         .then(() => {
            setUserName("")
            setAge("")
         }
         )
      refetch()
   }

   const deleteUserHandler = (event: any, id: number) => {
      event.preventDefault()
      deleteUser({
         variables: { id }
      })
      refetch()
   }

   const getAll = (event: any) => {
      event.preventDefault()
      refetch()
   }

   useEffect(() => {
      console.log(data);
      console.log(oneUser);

      if (!loading) {
         const users = data.getAllUsers
         setUsers(users)
      }
   }, [data])

   useEffect(() => {
      console.log(users);
   }, [users])

   if (loading) return <h1>Loading...</h1>
   return (
      <div className="App">
         <form>
            <input
               type="text"
               name="name"
               placeholder="Enter the name"
               value={userName}
               onChange={(event: any) => setUserName(event.target.value)} />
            <input
               type="number"
               name="age"
               placeholder="Enter the age of the user"
               value={age}
               onChange={(event: any) => setAge(event.target.value)} />
            <div className="buttons">
               <button
                  type="button"
                  onClick={addUserHandler}>
                  Create user
               </button>
               <button
                  type="button"
                  onClick={getAll}>
                  Get users
               </button>
            </div>
         </form>

         <div>
            {users.map((user: any) => {
               return <div
                  className="user"
                  key={user.id}>
                  {`id: ${user.id} name: ${user.username} age: ${user.age}`}
                  <button
                     type="button"
                     onClick={(event) => deleteUserHandler(event, user.id)}>
                     X
                  </button>
                  <button
                     type="button"
                     onClick={(event) => updateUserHandler(event, user.id)}>
                     Update
                  </button>
               </div>
            })}
         </div>
      </div>
   );
}

export default App;
