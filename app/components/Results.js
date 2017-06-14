import React, { Component } from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import Link from 'react-router-dom/Link';
import Loading from './Loading';
import Player from './Player';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }

  componentDidMount () {
    const players = queryString.parse(this.props.location.search);

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(results => {
      if (results === null) {
        return this.setState({
          error: 'Looks like there was error, check for both users existence.',
          loading: false
        });
      }

      this.setState({
        error: null,
        winner: results[0],
        loser: results[1],
        loading: false
      })
    });
  }

  render() {
    const {
      error,
      winner,
      loser,
      loading
    } = this.state;

    if (loading === true) {
      return <Loading />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      )
    }

    return (
      <div className="row">
        <Player
          label="Winner"
          score={winner.score}
          profile={winner.profile} />

        <Player
          label="Loser"
          score={loser.score}
          profile={loser.profile} />
      </div>
    )
  }
}
