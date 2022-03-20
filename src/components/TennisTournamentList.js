import React from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Link, useRouteMatch } from 'react-router-dom';
import { DeleteButton } from './TennisDeleteButton';

export const TournamentList = ( props ) => {

    const tournamentList = props.tournamentList;    
    let rMatch = useRouteMatch();

    if(!tournamentList || tournamentList.length === 0) {
        return(
            <div>
            <Alert variant='primary'>
                No Tournaments Found
            </Alert>
            </div>
        )
    } else {
        return (
            <div className="tournament-list col">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Player Count</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody> 
                    {tournamentList.map((tournament) => (
                        <tr key={tournament.id}>
                            <td>{tournament.id}</td>
                            <td><Link to={`${rMatch.url}/${tournament.id}`}>{tournament.name}</Link></td>
                            <td>{tournament.players.length}</td>
                            <td>{new Date(tournament.timestamp).toLocaleString('en-us')}</td>
                            <td><DeleteButton id={tournament.id} deleteAction={props.deleteAction} /></td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            </div>
        )
    }    
}

export default TournamentList;

