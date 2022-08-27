import React, { useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

export default function NewContactModal({ closedModal }) {
    const idRef = useRef()
    const nameRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        createContact(idRef.current.value, nameRef.current.value)
        closedModal()
    }

    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}></Form>
                <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required />
                </Form.Group>
                <Button type="submit">Create</Button>
            </Modal.Body>
        </>
    )
}