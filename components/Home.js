import React, { Component } from 'react';
import { AsyncStorage, Button, Text, StyleSheet, View } from 'react-native';


class Home extends Component {
	constructor() {
		super();
	}

	state = {
		map: ["B", "B", "B", "R", "E", "R", "B", "E", "R", "B", "E", "R", "R", "E", "E", "B", "R", "B", "E", "E", "R", "R", "X", "R", "B"]
	};

	componentDitMount() {
		fetch('https://localhost:3000/codewords/api/map')
			.then((response) => this.setState({ map: response.json() }));

	}

	static getColor(field) {
		switch (field) {
			case 'X':
				return 'black';
			case 'B':
				return 'blue';
			case 'R':
				return 'red';
			default:
				return 'gray';
		}
	}

	render() {
		const { map } = this.state;
		return (
			<View style={styles.container}>
				{map && map.map(field => {
					return (
						<Text style={{ width: '20%', height: '20%', backgroundColor: Home.getColor(field) }} />
					)
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexWrap: 'wrap',
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	}
});

export default Home;
