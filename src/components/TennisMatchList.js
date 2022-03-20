import React from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { DeleteButton } from './TennisDeleteButton';

export const MatchList = ( props ) => {         
    const matchPlayers = props.matchPlayers;
    const loadedMatches = props.loadedMatches;

    if(!loadedMatches || loadedMatches.length === 0) {
        return(
            <Alert variant='primary'>
                No Tennis Matches Loaded
            </Alert>
        )
    } else if(loadedMatches && loadedMatches.length !== 0) {    
        console.log('Loaded Matches', loadedMatches);
        console.log('Loaded Match Players', matchPlayers);
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Player 1</th>
                        <th>Player 2</th>
                        <th>Winner</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loadedMatches.map((match) => (                    
                        <tr key={match.id}>
                            <td>{match.id}</td>
                            <td>{match.players[0]}</td>
                            <td>{match.players[1]}</td>
                            <td>{match.winner === null ? "TBA" : match.winner}</td>
                            <td><DeleteButton tid={match.tournamentId} id={match.id} deleteAction={props.deleteAction} /></td>                            
                        </tr>
                    ))}                    
                </tbody>
            </Table>
        )                    
    } else {
        <Alert variant='primary'>
            No Tennis Matches Loaded
        </Alert>
    }

    return(
        <div>Tennis Match List Goes Here</div>
    )

}

export default MatchList;


