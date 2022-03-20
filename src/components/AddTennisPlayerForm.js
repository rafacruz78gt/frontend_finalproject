import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export const AddPlayerForm = ( props ) => {
    const [ playerId, setPlayerId ] = useState('');
    const params = useParams();
    const tournamentId = params.tournamentId;
    const players = props.playerList;
    const addTournamentPlayer = props.addPlayer;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(playerId) {        
            addTournamentPlayer(playerId, tournamentId);
        }

    }

    if(!players || players.length === 0 ) {
        return(
            <div>Loading playerlist...</div>
        )
    } else {
        return(
            <div>
                   <h3>Add Tennis Player</h3>
                   <Form onSubmit={handleSubmit}>
                       <Form.Group className="mb-3" controlId="addPlayer">
                           <Form.Control as="select" onChange={(e) => setPlayerId(e.target.value)}>
                               <option>Select Player</option>
                               {players.map((player) => <option key={player.id} value={player.id}>{player.name}</option> )}                            
                           </Form.Control>
                           <Button variant="primary" type="submit">
                               Submit
                           </Button>
                       </Form.Group>
                   </Form>
            </div>   
           )
    }

}

export default AddPlayerForm;
