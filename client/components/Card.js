import React, { Fragment } from 'react';
import cx from 'classnames';
import './Card.scss';

class Card extends React.Component {
  state = {
    flipped: false
  };

  handleClick = () => {
    !this.state.flipped && this.setState({
      flipped: true
    })
  };

  render() {
    const { word, team, ...props } = this.props;

    const classes = cx({
      cardContainer: true,
      [team]: this.state.flipped && team
    });

    return (
      <div className={ classes } onClick={ this.handleClick } { ...props }>
        {
          !this.state.flipped && (
            <Fragment>
              <span className="cardWord">{ word }</span>
              <span className="cardWordFlipped">{ word }</span>
            </Fragment>
          )
        }
      </div>
    )
  }
}

export default Card;
