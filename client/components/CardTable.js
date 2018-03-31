import React from 'react';
import Card from './Card';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './CardTable.scss'



class CardTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
      cardTeams: props.map.map(color => teamClasses[color] + (Math.random() > 0.5 ? '1' : '2')),
      words: props.words.slice(0, 25)
    }
  }

  changeWord = (event) => {
    event.preventDefault();
    const words = this.state.words;
    words.splice(this.state.selectedCard, 1, this.props.words[Math.floor(Math.random() * this.props.wordCount)]);
    this.setState({
      words
    })
  };

  render() {
    const { words } = this.state;

    return (
      <div className="cardTableContainer">
        {
          words.map((word, i) =>
            <ContextMenuTrigger>
              <Card
                onContextMenu={ () => this.setState({ selectedCard: i }) }
                word={ word }
                team={ this.state.cardTeams[i] }
              />
            </ContextMenuTrigger>
          )
        }
        <ContextMenu>
          <MenuItem onClick={this.changeWord}>
            Change word
          </MenuItem>
        </ContextMenu>
      </div>
    )
  }
}

export default CardTable;
