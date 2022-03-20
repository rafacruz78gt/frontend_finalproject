import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

export const AddMatchForm = ( props ) => {
    const [ player1Id, setPlayer1Id ] = useState('');
    const [ player2Id, setPlayer2Id ] = useState('');
    const [ winner, setWinner ] = useState('');
    const params = useParams();
    const tournamentId = params.tournamentId;

    const handleSubmit = (e) => {

        e.preventDefault();
        if(player1Id && player2Id && winner) {
            let players = [player1Id, player2Id];
            props.addMatch(players, tournamentId, winner);
        } else { 
            console.log('Missing Tennis player or players');
        }        

    }

    return(
        <div>
            <h3>Record Match</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="matchPlayer1">
                    <Form.Control as="select" onChange={(e) => setPlayer1Id(e.target.value)}>
                        <option>Select Tennis Player 1</option>
                        {props.playerList.map((player) => <option key={player.id} value={player.name}>{player.name}</option> )}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="matchPlayer2">
                    <Form.Control as="select" onChange={(e) => setPlayer2Id(e.target.value)}>
                        <option>Select Tennis Player 2</option>
                        {props.playerList.map((player) => <option key={player.id} value={player.name}>{player.name}</option> )}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-e" controlId="matchWinner">
                    <Form.Control as="select" onChange={(e) => setWinner(e.target.value)}>
                        <option>Set Winning Tennis Player</option>
                        {props.playerList.map((player) => <option key={player.id} value={player.name}>{player.name}</option> )}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>                       
            </Form>
        </div>   
       )
}

export default AddMatchForm;