import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'




function App() {
  const url = 'https://randomuser.me/api/'
  const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

  useEffect(() => {
    findPeople();
  }, [])
  const findPeople = async () => {
    const data = await fetch(url)
      .then((data) => console.log(data))
  }

  return <h2>random user starter</h2>
}

export default App
