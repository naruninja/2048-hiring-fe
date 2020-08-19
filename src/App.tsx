import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';
import { TScore } from './types';

const HIGH_SCORES = gql`
  query GetHighScores {
    allScores(orderBy: "score_DESC") {
      player {
        name
      }
      score
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(HIGH_SCORES);

  if (error) {
    console.error(error);
  }

  return (
    <div className="App">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <pre>{data.allScores.map((score: TScore) => `${score.player.name} : ${score.score}\n`)}</pre>
      )}
    </div>
  );
};

export default App;
