import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const NewPlayerForm = ( props ) => {
    const [ playerName, setPlayerName ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(playerName) {
            props.addPlayer(playerName);
        } else {
            console.log('invalid input - player form');
            console.log(playerName);
        }
        setPlayerName('');
    }
    
    return (
        <div>
            <h3>Add New Tennis Player</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlID="newPlayerName">
                    <Form.Label>Tennis Player Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Tennis Player Name" 
                        onChange={(e) => setPlayerName(e.target.value)} 
                        value={playerName}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default NewPlayerForm;

