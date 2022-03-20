const TournApiUrl = "https://60fe0c171fa9e90017c70fd5.mockapi.io/tournament";

//const TournApiUrl = "https://623225fec5ec1188ad2bc0cc.mockapi.io/torneo/torneo"
const PlayerApiUrl = "https://60fe0c171fa9e90017c70fd5.mockapi.io/player";



class TournApi {
    getAllTournaments = async () => {
        try{
            const resp = await fetch(TournApiUrl);
            const json = await resp.json();
            return json;
        } catch (e) {
            console.log('Error fetching tournaments: ', e);
        }
    }

    getTournament = async (tournId) => {
        if(tournId){
            try {
                const resp = await fetch(`${TournApiUrl}/${tournId}`);
                const json = await resp.json();
                return json;
            } catch (e) {
                console.log(`Error fetching tournament with id ${tournId}: `, e);
            }
        } else {
            console.log('No tournament ID provided');
        }

    }

    putTournament = async (tourn) => {
        try {
            const resp = await fetch(`${TournApiUrl}/${tourn.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tourn)
            });
            
            return await resp.json();

        } catch(e) {
            console.log(`Error updating tournament with id ${tourn.id}`, e);
        }
    }

    postTournament = async (tourn) => {
        try {
            const resp = await fetch(TournApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tourn)
            });
            return await resp.json();            
        } catch(e) {
            console.log('Error adding new tourn', e);
        }
    }

    deleteTournament = async (tournId) => {
        console.log(`Time to delete ${tournId}!`);
        try {
            const resp = await fetch(`${TournApiUrl}/${tournId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const json = await resp.json();
            return json;
        } catch(e) {
            console.log(`Error deleting tourn with id ${tournId}`, e);
        }
    }

    getAllTournMatches = async (tournId) => {
        try {
            const resp = await fetch(`${TournApiUrl}/${tournId}/match`);
            const json = await resp.json();
            return json;
        } catch (e) {
            console.log(`Error getting Tennis matches from tournament ${tournId}: `, e);
        }
    }

    getTournamentMatch = async (tournId, matchId) => {
        try {
            const resp = await fetch(`${TournApiUrl}/${tournId}/match/${matchId}`);
            const json = await resp.json();
            return json;
        } catch (e) {
            console.log(`Error fetching  Tennis tournament (${tournId}) with id ${matchId}: `, e);
        }
    }

    putTournamentMatch = async (tournId, match) => {
        try {
            const resp = await fetch(`${TournApiUrl}/${tournId}/match/${match.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(match)
            });
            
            return await resp.json();

        } catch(e) {
            console.log(`Error updating Tennis tournament (${tournId}) match with id ${match.id}`, e);
        }
    }

    postTournamentMatch = async (tournId, match) => {
        try {
            const resp = await fetch(`${TournApiUrl}/${tournId}/match`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(match)
            });
            return await resp.json();            
        } catch(e) {
            console.log('Error adding new Tennis tournament', e);
        }
    }

    deleteTournamentMatch = async (tournId, matchId) => {
        console.log(`Time to delete ${tournId} + ${matchId} !`);
        try {
            const resp = await fetch(`${TournApiUrl}/${tournId}/match/${matchId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            return await resp.json();
        } catch(e) {
            console.log(`Error deleting tourn match with id ${tournId} + ${matchId}`, e);
        }
    }

    getAllPlayers = async () => {
        try {
            const resp = await fetch(PlayerApiUrl);
            const json = await resp.json();
            return json;
        } catch (e) {
            console.log(`Error getting tennis players`, e);
        }
    }

    getPlayer = async (playerId) => {
        try {
            const resp = await fetch(`${PlayerApiUrl}/${playerId}`);
            const json = await resp.json();
            return json;
        } catch (e) {
            console.log(`Error getting tennis player ${playerId}`, e);
        }
    }

    postPlayer = async (player) => {
        try {
            const resp = await fetch (PlayerApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player), 
            });
            return await resp.json();
        } catch(e) {
            console.log(`Error adding new tennis player`, e);
        }
    }

    putPlayer = async (player) => {
        try {
            const resp = await fetch(`${PlayerApiUrl}/${player.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            });
            
            return await resp.json();

        } catch(e) {
            console.log(`Error updating tournament with id ${player.id}`, e);
        }
    }

    deletePlayer = async (playerId) => {
        console.log(`Time to delete ${playerId}!`);
        try {
            const resp = await fetch(`${PlayerApiUrl}/${playerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            return await resp.json();
        } catch(e) {
            console.log(`Error deleting tennis tournament with id ${playerId}`, e);
        }
    }

}

export const tournApi = new TournApi();