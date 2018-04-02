import React from 'react';
import ReactDOM from 'react-dom';
import './index.html';
import './style.scss';
import CardTable from './components/CardTable';

const ADDRESS = 'localhost';
const PORT = 3000;
const api = 'codewords/api';

const wordsApi = `http://${ADDRESS}:${PORT}/${api}/words/1`;
const uuidApi = `http://${ADDRESS}:${PORT}/${api}/id`;
const mapApi = `http://${ADDRESS}:${PORT}/${api}/map`;

Promise.all([fetch(wordsApi), fetch(mapApi), fetch(uuidApi)])
	.then(([words, map, id]) => {
		Promise.all([words.json(), map.json(), id.text()]).then(([words, map, id]) =>
			ReactDOM.render(
				<CardTable
					gameId={id}
					words={words}
					map={map}
				/>,
				document.getElementById('root')
			)
		)
	});
