import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import './style.css'
import Delete from '../../assets/delete.png'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge= useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)
  }

  async function deleteUsers(id){
    await api.delete(`/users/${id}`)
    getUsers()
  }

  async function creatUsers(){
      await api.post('/users', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })


      getUsers()
    }

    useEffect(() => {
      getUsers()
    }, [])




  return (
    <div className='container'>
      <form>
        <h1>User registration</h1>
        <input placeholder='Name' name='name' type='text' ref={inputName} />
        <input placeholder='Age' name='age' type='number' ref={inputAge} />
        <input placeholder='E-mail' name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={creatUsers}>Register</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Age: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button className='delete'><img src={Delete} alt="delete" width="20" onClick={() => deleteUsers(user.id)} /></button>
        </div>
      ))}

    </div>
  )
}

export default Home
