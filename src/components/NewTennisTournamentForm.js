import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const NewTournamentForm = ( props ) => {
    const [ tournamentName, setTournamentName ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(tournamentName) {
            props.addTournament(tournamentName);
        } else {
            console.log('invalid input - tournament form');
            console.log(tournamentName);
        }
        setTournamentName('');
    }

    return (
        <div>
            <h3>Add Tennis Tournament</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="newTournamentName">
                    <Form.Label>Tennis Tournament Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Tennis Tournament Name" 
                        onChange={(e) => setTournamentName(e.target.value)}
                        value={tournamentName}
                    />                    
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default NewTournamentForm;