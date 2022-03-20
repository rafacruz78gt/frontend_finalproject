import React from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { DeleteButton } from './TennisDeleteButton';

export const PlayerList = ( props ) => {    
    const players = props.playerList;
    
    console.log(props.playerList);
    if(players !== undefined && players.length > 0) {
        return(
            <div className="player-list col">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Player Name</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.id}</td>
                                <td>{player.name}</td>
                                <td><DeleteButton id={player.id} deleteAction={props.deleteAction} tid={props.tid} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    } else {
        return(
            <div>
            <Alert variant='primary'>
                No Players Found
            </Alert>
            </div>
        )
    }    
}

export default PlayerList;
