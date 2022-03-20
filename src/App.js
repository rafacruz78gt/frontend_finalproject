import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { tournApi } from './rest/TournApi';
import TournamentList from './components/TennisTournamentList';
import { PlayerList } from './components/TennisPlayerList';
import { HomePage } from './components/HomePage';
import { Tournament } from './components/TennisTournament';
import { AddPlayerForm } from './components/AddTennisPlayerForm';
import { NewTournamentForm } from './components/NewTennisTournamentForm';
import { NewPlayerForm } from './components/NewTennisPlayerForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [ playerList, setPlayerList ] = useState('');
  const [ tournamentList, setTournamentList ] = useState('');
  const [ loadedTournament, setLoadedTournament ] = useState('');
  const [ loadedMatches, setLoadedMatches ] = useState('');

  const addTournament = async (newTournamentName) => {
    let newTournament = {
      name: newTournamentName,
      players: [],
      matches: [],
      timestamp: Date.now()
    }

    await tournApi.postTournament(newTournament);
    await fetchTournaments();
  }

  const deleteTournament = async (tournamentId) => {
    await tournApi.deleteTournament(tournamentId);
    await fetchTournaments();
  }

  const addPlayer = async (newPlayerName) => {
    let newPlayer = {
      name: newPlayerName,
      points: null,
      matches: [],
    }

    await tournApi.postPlayer(newPlayer);
    await fetchPlayers();
  }
  
  const deletePlayer = async (playerId) => {
    await tournApi.deletePlayer(playerId);
    await fetchPlayers();
  }

  const addTournamentPlayer = async ( newTournamentPlayerId, tournamentId ) => {
    console.log(newTournamentPlayerId, tournamentId);
    let playerTournament = await tournApi.getTournament(tournamentId);
    console.log(playerTournament);

    playerTournament.players.push(newTournamentPlayerId);
    let newTournament = await tournApi.putTournament(playerTournament);
    setLoadedTournament(newTournament);
  }
  
  const deleteTournamentPlayer = async ( playerId, tournamentId ) => {
    let playerTournament = await tournApi.getTournament(tournamentId);
    let newPlayers = [];
    for (let i = 0; i < playerTournament.players.length; i++) {
      if(playerTournament.players[i] !== playerId) {
        newPlayers.push(playerTournament.players[i]);
      }      
    }
    playerTournament.players = newPlayers;    
    let newTournament = await tournApi.putTournament(playerTournament);
    setLoadedTournament(newTournament);
  }

  const fetchTournaments = async () => {
    const tournaments = await tournApi.getAllTournaments();
    
    setTournamentList( tournaments );
    console.log(`tournamentList line 58 App.js`, tournamentList);
  }

  const fetchPlayers = async () => {
    const players = await tournApi.getAllPlayers();
    console.log(players);
    setPlayerList(players);   
  }

  const loadTournament = async (tournamentId) => {
    let tournament = {};
    console.log('We ran loadTournament', tournamentList);
    tournament = await tournApi.getTournament(tournamentId);
    setLoadedTournament(tournament);
  }

  const addMatch = async (players, tournamentId, winner) => {
    let newMatch = {
      players: players,
      winner: winner,
    }
    let updatedMatch = await tournApi.postTournamentMatch(tournamentId, newMatch);
    if(updatedMatch.id) {
      let tournamentToUpdate = await tournApi.getTournament(tournamentId);
      tournamentToUpdate.matches.push(updatedMatch.id);
      let updatedTournament = await tournApi.putTournament(tournamentToUpdate);
      setLoadedTournament(updatedTournament);
      fetchMatches(tournamentId);
    }
  }

  const fetchMatches = async (tournamentId) => {
    let matches = await tournApi.getAllTournMatches(tournamentId);
    setLoadedMatches(matches);
  }

  const deleteMatch = async (matchId, tournamentId) => {
    await tournApi.deleteTournamentMatch(tournamentId, matchId);
    let tournamentToUpdate = await tournApi.getTournament(tournamentId);
    let matchesToUpdate = [];
    for (let i = 0; i < tournamentToUpdate.matches.length; i++) {
      if(tournamentToUpdate.matches[i] !== matchId) {
        matchesToUpdate.push(tournamentToUpdate.matches[i]);
      }
    }
    tournamentToUpdate.matches = matchesToUpdate;
    let updatedTournament = await tournApi.putTournament(tournamentToUpdate);
    setLoadedTournament(updatedTournament);
    fetchMatches(tournamentId);
  }

  useEffect(() => {
    fetchTournaments();
    fetchPlayers();
  }, []);

  return (
    <div className="App">

      <Container>
        <Row>
          <Col>          
              <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Tournament Tennis Manager</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/tournaments">Tournaments</Nav.Link>
                  <Nav.Link href="/players">Players</Nav.Link>
                </Nav>
              </Navbar>
            
          </Col>
        </Row>
        <Row>
          <Col>
          <Router>
            <Switch>
              <Route path={`/tournaments/:tournamentId`}>
                <Tournament 
                  loadTournament={loadTournament}
                  fetchMatches={fetchMatches}
                  fetchPlayers={fetchPlayers}
                  playerList={playerList}
                  loadedTournament={loadedTournament}
                  loadedMatches={loadedMatches}
                  deleteAction={deleteTournamentPlayer}
                  deleteMatchAction={deleteMatch}
                  addMatch={addMatch}
                />
                <AddPlayerForm playerList={playerList} addPlayer={addTournamentPlayer} />                
              </Route>
              <Route path="/tournaments">
                <TournamentList 
                  tournamentList={tournamentList}
                  fetchTournaments={fetchTournaments}
                  deleteAction={deleteTournament}
                 />
                <NewTournamentForm addTournament={addTournament} />
              </Route>
              <Route path="/players">
                <PlayerList 
                  fetchPlayers={fetchPlayers}
                  playerList={playerList}
                  deleteAction={deletePlayer}
                />
                <NewPlayerForm addPlayer={addPlayer} />
              </Route>
              <Route path='/'>
                <HomePage />
              </Route>
            </Switch>
            </Router>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;

