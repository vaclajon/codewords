let express = require('express');
let shuffle = require('shuffle-array');

let app = express();
let router = express.Router();
let db = [];
let game = ['X', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
let plan;
//DB init
var lineReader = require('readline').createInterface({
	input: require('fs').createReadStream('slovnik.txt')
});
lineReader.on('line', function (line) {
	db.push(line);
});

const getRandom = () => {
	return db[Math.floor(Math.random() * db.length)];
};


router.all('*', (req, res, next) => {
	console.log(req.headers);
	next();

});

router.get('/start', (req, res, next) => {
	plan = shuffle(game);

	plan = plan.map(team => {
		return { team: team, word: getRandom() }
	});
	res.send(plan);
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
	res.send(team);
});

app.use('/codewords/api', router);

let server = app.listen('3000', '127.0.0.1', function () {
	console.log('Server listening on port 3000');
});

