import React from 'react';
import ReactDOM from 'react-dom';
import './index.html';
import './style.scss';
import CardTable from './components/CardTable';

const wordsApi = 'http://192.168.0.104:3000/codewords/api/words/1';
const uuidApi = 'http://192.168.0.104:3000/codewords/api/id';
const mapApi = 'http://192.168.0.104:3000/codewords/api/map';

Promise.all([fetch(wordsApi), fetch(mapApi), fetch(uuidApi)])
  .then(([words, map, id]) => {
    Promise.all([words.json(), map.json(), id.text()]).then(([words, map, id]) =>
      ReactDOM.render(
        <CardTable
          gameId={ id }
          words={ words }
          map={ map  }
        />,
        document.getElementById('root')
      )
    )
  });
