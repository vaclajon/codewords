let express = require('express');
let shuffle = require('shuffle-array');

let app = express();
let router = express.Router();
let db = [];
let game = ['X', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
let plan;
//DB init
const lineReader = require('readline').createInterface({
	input: require('fs').createReadStream('slovnik.txt')
});
lineReader.on('line', function (line) {
	db.push(line);
});

const getRandom = () => {
	return db[Math.floor(Math.random() * db.length)];
};

const createGame = () => {
	plan = shuffle(game);

	plan = plan.map(team => {
		return { team: team, word: getRandom() }
	});
	return plan;
};
createGame();

router.all('*', (req, res, next) => {
	console.log(req.headers);
	next();

});

router.get('/start', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(createGame());
});

router.get('/game', (req, res, next) => {
	let words = plan.map(word => {
		return word.word;
	});
	res.send(words);
});

router.get('/map', (req, res, next) => {
	let team = plan.map(word => {
		return word.team;
	});
	res.setHeader('Content-Type', 'application/json');
	res.send(team);
});

app.use('/codewords/api', router);

const PORT = 3000;
let server = app.listen(3000, '192.168.0.103' || 'localhost', function () {
	console.log('Server listening on port' + PORT);
});

