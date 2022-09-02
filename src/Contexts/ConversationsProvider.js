import React, { useContext, useState } from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const { contacts } = useContacts()

    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    function addMessageToConversation({ recipients, text, sender }) {
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text }
            const newConversations = prevConversations.map
            (convo => {
                if (arrayEquality(convo.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...convo,
                        messages: [...convo.messages, newMessage]
                    }
                }

                return convo
            })

            if (madeChange) {
                return newConversations
            } else {
                return [
                    ...prevConversations,
                    { recipients, message: [newMessage] }
                ]
            }
        })
    }

    function sendMessage(recipients, text) {
        addMessageToConversation({ recipients, text, sender: id })
    }

    const formattedConversations = conversations.map((convo, index) => {
        const recipients = convo.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
        const name = (contact && contact.name) || recipient
        return {id: recipient, name}
        })

        const messages = convo.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
        const name = (contact && contact.name) || message.sender
        const fromMe = id === message.sender

        return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex
        return { ...convo, messages, recipients, selected }
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
        {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}