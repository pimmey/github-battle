import React from 'react';
import Link from 'react-router-dom/Link';

export default () => {
  return (
    <div className="home-container">
      <h1>Battle your friends</h1>

      <Link className="button" to="/battle">
        Battle
      </Link>
    </div>
  )
}
