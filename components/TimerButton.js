import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const TimerButton = ( { color, onPress, small, title } ) => {
	return (
		<TouchableOpacity
			onPress={ onPress }
			style={ [ styles.button, { borderColor: color } ] }
		>
			<Text
				style={ [
					styles.buttonText,
					small ? styles.small : styles.large,
					{ color }
				] }
			>{ title }</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create( {
	button: {
		borderRadius: 3,
		borderWidth: 2,
		marginTop: 10,
		minWidth: 100,
	},
	buttonText: {
		fontWeight: 'bold',
		textAlign: 'center',
	},
	elapsedTime: {
		fontSize: 18,
		fontWeight: 'bold',
		paddingVertical: 10,
		textAlign: 'center',
	},
	large: {
		fontSize: 16,
		padding: 10,
	},
	small: {
		fontSize: 14,
		padding: 5,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
	},
} );

TimerButton.propTypes = {
	color: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	small: PropTypes.bool,
	title: PropTypes.string.isRequired,
};

TimerButton.defaultProps = {
	small: false,
};

export default TimerButton;