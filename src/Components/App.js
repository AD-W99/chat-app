import React from 'react'
import Login from './Login'
import useLocalStorage from '../Hooks/useLocalStorage'
import Dashboard from './Dashboard'
import { ContactsProvider } from '../Contexts/ContactsProvider'

export default function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
      <Dashboard id={id} />
    </ContactsProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />
  );
}


