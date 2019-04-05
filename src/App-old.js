import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const QUERY = gql`
  query HeroFriends($episode: Episode!) {
    hero(episode: $episode) {
      name
      friends {
        name
      }
    }
  }
`;

const HeroAndFriends = ({ episode }) => (
  <Query query={QUERY} variables={{ episode }}>
    {
      ({ data, error, loading }) => {
        if (error) return '💩 Oops!';
        if (loading) return 'Patience young grasshopper...';

        return (
          <React.Fragment>
            <h1>Hero: { data.hero.name }</h1>
            <h2>His/her friends:</h2>
            <ul>
              { data.hero.friends.map(friend => (
                <li key={friend.name}>{friend.name}</li>
              ))}
            </ul>
          </React.Fragment>
        );
      }
    }
    </Query>
);

HeroAndFriends.propTypes = { episode: PropTypes.string };
HeroAndFriends.defaultProps = { episode: 'NEWHOPE'};

const App = () => <HeroAndFriends episode="EMPIRE" />

export default App;
