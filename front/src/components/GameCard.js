import React from 'react';
import Proptypes from 'prop-types';
import Featured from './Featured';
import Price from './Price';

const GameCard = ({ game, toggleFeatured, editGame }) => (
  <div className="ui card">
    <div className="image">
      <span className="ui green ribbon label">
        $<Price prices={game.price} />
      </span>
      <Featured
        featured={game.featured}
        toggleFeatured={toggleFeatured}
        gameId={game._id}
      />
      <img src={game.thumbnail} alt="Game Cover" />
    </div>
    <div className="content">
      <a className="header">{game.name}</a>
      <div className="meta">
        <i className="icon users" /> {game.players}&nbsp;
        <i className="icon wait" /> {game.duration} min.
      </div>
    </div>
    <div className="extra content">
      <div className="ui two buttons">
        <a className="ui green  basic buttons" onClick={() => editGame(game)}>
          <i className="ui icon edit"></i>
        </a>
        <a className="ui red basic buttons">
          <i className="ui icon trash"></i>
        </a>
      </div>
    </div>
  </div>
);

GameCard.propTypes = {
  game: Proptypes.shape({
    name: Proptypes.string.isRequired,
    thumbnail: Proptypes.string.isRequired,
    players: Proptypes.string.isRequired,
    price: Proptypes.number.isRequired,
    duration: Proptypes.number.isRequired,
    featured: Proptypes.bool.isRequired,
  }).isRequired,
  toggleFeatured: Proptypes.func.isRequired,
  editGame: Proptypes.func.isRequired,
};

export default GameCard;
