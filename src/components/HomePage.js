import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return(
    <><div>
            <Row>
                <Col>
                    <h1>Welcome: Tennis Tournament Manager CRUD</h1>
                    <p>This application is designed to record TENNIS PLAYERS and TENNIS TOURNAMENT matches.
                        It's best to add your Tennis players in first place.
                        and second add your Tennis Tournament to add them.</p>

                    <p>    We Start?</p>
                    <p>  Jorge Cruz</p>
                </Col>
            </Row>
        </div><div>
                <Row>
                    <Col>
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                                <Card.Title>Add Tennis Tournament</Card.Title>
                                <Card.Text>
                                    Add a new tennis tournament and add tennis players and record matches to it.
                                </Card.Text>
                                <Link to='/tournaments'><Button variant="primary">Tournaments</Button></Link>
                                <br></br>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                            <br></br>
                                <Card.Title>Add Tennis Players</Card.Title>
                                <Card.Text>
                                    Add new Tennis players available for tournaments.
                                </Card.Text>
                                <Link to='/players'><Button variant="primary">Players</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div></>
    )
}

export default HomePage;




//[{"timestamp":1627767053365,"name":"Tournament 1","players":["1","2"],"id":"1","matches":["4"]},
  //{"timestamp":1627775375207,"name":"Tournament 2","players":["1","2"],"id":"2","matches":["3"]},
  //{"timestamp":1646509866846,"name":"Futboll1","players":["1","2"],"id":"3","matches":[]}]





