import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

class ToggleableTimerForm extends Component {
	state = {
		isOpen: false,
	};
	handleFormClose = () => {
		this.setState( { isOpen: false } );
	}
	handleFormOpen = () => {
		this.setState( { isOpen: true } );
	}
	handleFormSubmit = ( timer ) => {
		const { onFormSubmit } = this.props;
		onFormSubmit( timer );
		this.setState( { isOpen: false } );
	}
	render() {
		const { isOpen } = this.state;
		return (
			<View style={ [ styles.container, ! isOpen && styles.buttonPadding ] }>
				{
					isOpen ?
						<TimerForm
							onFormClose={ this.handleFormClose }
							onFormSubmit={ this.handleFormSubmit }
						/> :
						<TimerButton
							color="black"
							onPress={ this.handleFormOpen }
							title="+"
						/>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		paddingVertical: 10,
	},
	buttonPadding: {
		paddingHorizontal: 15,
	},
} );

ToggleableTimerForm.propTypes = {
	onFormSubmit: PropTypes.func.isRequired,
};

export default ToggleableTimerForm;