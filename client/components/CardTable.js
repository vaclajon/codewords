import React, { Fragment } from 'react';
import Card from './Card';
import './CardTable.scss'


const teamClasses = {
  'R': 'red',
  'B': 'blue',
  'E': 'empty',
  'X': 'black'
};

class CardTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.words);
    this.state = {
      cardTeams: props.map.map(color => teamClasses[color] + (Math.random() > 0.5 ? '1' : '2')),
      words: props.words.slice(0, 25)
    }
  }

  changeWord = (event, index) => {
    event.preventDefault();
    const words = this.state.words;
    words.splice(index, 1, this.props.words[Math.floor(Math.random() * this.props.words.length)]);
    this.setState({
      words
    })
  };

  render() {
    const { gameId } = this.props;
    const { words } = this.state;

    return (
      <Fragment>
        <h3 className="gameId">{ gameId }</h3>
        <div className="cardTableContainer">
          {
            words.map((word, i) =>
                <Card
                  onContextMenu={ (e) =>  this.changeWord(e, i) }
                  word={ word }
                  team={ this.state.cardTeams[i] }
                />
            )
          }
        </div>
      </Fragment>
    )
  }
}

export default CardTable;
