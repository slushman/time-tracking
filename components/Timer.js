import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

class Timer extends Component {
	state = {

	};
	handleRemovePress = () => {
		const { id, onRemovePress } = this.props;
		onRemovePress( id );
	}
	handleStartPress = () => {
		const { id, onStartPress } = this.props;
		onStartPress( id );
	}
	handleStopPress = () => {
		const { id, onStopPress } = this.props;
		onStopPress( id );
	}
	renderActionButton = () => {
		const { isRunning } = this.props;
		if ( isRunning ) {
			return (
				<TimerButton
					color="#DB2828"
					onPress={ this.handleStopPress }
					title="Stop"
				/>
			);
		}
		return (
			<TimerButton
				color="#21BA45"
				onPress={ this.handleStartPress }
				title="Start"
			/>
		);
	}
	render() {
		const { title, project, elapsed, onEditPress } = this.props;
		const elapsedString = millisecondsToHuman( elapsed );
		return (
			<View style={ styles.timerContainer }>
				<Text style={ styles.title }>{ title }</Text>
				<Text>{ project }</Text>
				<Text style={ styles.elapsedTime }>{ elapsedString }</Text>
				<View style={ styles.buttonGroup }>
					<TimerButton
						color="blue"
						title="Edit"
						small
						onPress={ onEditPress }
					/>
					<TimerButton
						color="blue"
						onPress={ this.handleRemovePress }
						small
						title="Remove"
					/>
				</View>
				{ this.renderActionButton() }
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	timerContainer:{
		backgroundColor: 'white',
		borderColor: '#d6d7da',
		borderRadius: 10,
		borderWidth: 2,
		margin: 15,
		marginBottom: 0,
		padding: 15,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	elapsedTime: {
		fontSize: 26,
		fontWeight: 'bold',
		paddingVertical: 15,
		textAlign: 'center',
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
} );

Timer.propTypes = {
	elapsed: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	isRunning: PropTypes.bool.isRequired,
	onEditPress: PropTypes.func.isRequired,
	onRemovePress: PropTypes.func.isRequired,
	onStartPress: PropTypes.func.isRequired,
	onStopPress: PropTypes.func.isRequired,
	project: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Timer;