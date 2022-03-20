import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { PlayerList } from './TennisPlayerList';
import { useParams } from 'react-router-dom';
import { AddMatchForm } from './AddTennisMatchForm';
import { MatchList } from './TennisMatchList';

export const Tournament = (props) => {
    const params = useParams();
    const loadTournament = props.loadTournament;
    const playerList = props.playerList;
    const loadedTournament = props.loadedTournament;
    const fetchMatches = props.fetchMatches;
    const loadedMatches = props.loadedMatches;
    const fetchPlayers = props.fetchPlayers;

    useEffect(() => {
        if(params.tournamentId && !loadedTournament) {
            console.log('Tournament loaded on Line 13 in Tournament.js');
            loadTournament(params.tournamentId);
            fetchMatches(params.tournamentId);            
        }
        if(!playerList) {
            fetchPlayers();
        }

    })
    
    if(params.tournamentId && loadedTournament && props.playerList.length > 0) {
        const tournamentPlayers = props.playerList.filter((player) => loadedTournament.players.includes(player.id));
        console.log('Line 12 Tournament', loadedTournament);
        console.log('Line 13 Tournament', loadedTournament.players);
        return(
            <div className="tournament">
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Tournament ID: {loadedTournament.id}</td>
                            <td>Name: {loadedTournament.name}</td>
                            <td>Date Created: {new Date(loadedTournament.timestamp).toLocaleString('en-us')}</td>                        
                        </tr>                        
                    </tbody>
                </Table>
                <PlayerList
                  playerList={tournamentPlayers}
                  deleteAction={props.deleteAction} 
                  tid={loadedTournament.id}
                />
                <MatchList loadedMatches={loadedMatches} deleteAction={props.deleteMatchAction} matchPlayers={playerList} />
                <AddMatchForm playerList={tournamentPlayers} loadedTournament={loadedTournament} addMatch={props.addMatch} />
            </div>
        )
    }

    return (
        <div className="tournament">
            Tennis Tournament  Not Found
        </div>
    )
}
export default Tournament;
