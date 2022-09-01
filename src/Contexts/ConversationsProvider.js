import React, { useContext, useState } from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider({ children }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const { contacts } = useContacts()

    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    function addMessageToConversation({ recipients, text, sender }) {

    }

    const formattedConversations = conversations.map((convo, index) => {
        const recipients = convo.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
        const name = (contact && contact.name) || recipient
        return {id: recipient, name}
        })
        const selected = index === selectedConversationIndex
        return { ...convo, recipients, selected }
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
        {children}
        </ConversationsContext.Provider>
    )
}