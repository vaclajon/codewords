import React from 'react';
import ReactDOM from 'react-dom';
import './index.html';
import './style.scss';
import CardTable from './components/CardTable';

const wordsApi = 'http://192.168.0.103:3000/codewords/api/words/1000';
const mapApi = 'http://192.168.0.103:3000/codewords/api/map';

Promise.all([fetch(wordsApi), fetch(mapApi)])
  .then(([words, map]) => {
    Promise.all([words.json(), map.json()]).then(([words, map]) =>
      ReactDOM.render(
        <CardTable
          words={ words }
          map={ map  }
        />,
        document.getElementById('root')
      )
    )
  });