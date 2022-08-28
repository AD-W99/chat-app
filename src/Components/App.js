import React from 'react'
import Login from './Login'
import useLocalStorage from '../Hooks/useLocalStorage'
import Dashboard from './Dashboard'
import { ContactsProvider } from '../Contexts/ContactsProvider'
import { ConversationsProvider } from '../Contexts/ConversationsProvider'

export default function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />
  );
}


