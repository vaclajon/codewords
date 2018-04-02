import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';

const API = 'http://192.168.0.104:3000/codewords/api/';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true };

		this.loadData = this.loadData.bind(this);
		this.restartGame = this.restartGame.bind(this);
		this.getId = this.getId.bind(this);
	}

	componentDidMount(){
		this.getId();
	}

	loadData() {
		fetch(`${API}/map`)
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({ isLoading: false, game: responseJson })
			}).catch((error) => {
			console.error(error);
		});
	}

	restartGame() {
		fetch(`${API}/start`)
			.then(() => this.loadData())
			.then(() => this.getId())
			.catch((error) => {
				console.error(error);
			});
	}

	getId() {
		fetch(`${API}/id`)
			.then(response => response.text())
			.then(id => {
				this.setState({ id: id })
			});
	}

	getImage(color) {
		switch (color) {
			case 'X':
				return require('./map_black.jpg');
			case 'R':
				return require('./map_red.jpg');
			case 'B':
				return require('./map_blue.jpg');
			default:
				return require('./map_default.jpg');

		}
	}

	render() {
		const { game, isLoading, id } = this.state;
		if (isLoading) {
			return <View style={{ paddingTop: 50, paddingBottom: 0 }}>
				<Button
					onPress={this.loadData}
					title="Load data"
				/>
			</View>
		}
		return (
			[
				<View style={{ paddingTop: 50, paddingBottom: 0 }} key='button'
				>
					<Button
						onPress={this.restartGame}
						title="Restart game"
					/>
					<Text>{id}</Text>
				</View>,
				<View style={styles.container} key='plan'>
					{game.map((item, index) => {
						return (
							<Image key={index} style={{
								width: '18%',
								height: '18%',
								borderRadius: 5
							}} source={this.getImage(item)} />
						)
					})}
				</View>]
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexWrap: 'wrap',
		paddingTop: 5,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'space-around',
		backgroundColor: 'black'
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
		width: '20%'
	}
});
