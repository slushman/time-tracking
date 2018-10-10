import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimerForm from './TimerForm';
import Timer from './Timer';

class EditableTimer extends Component {
	state = {
		editFormOpen: false,
	};
	handleEditPress = () => {
		this.openForm();
	}
	handleFormClose = () => {
		this.closeForm();
	}
	handleSubmit = ( timer ) => {
		const { onFormSubmit } = this.props;
		onFormSubmit( timer );
		this.closeForm();
	}
	closeForm = () => {
		this.setState( { editFormOpen: false } );
	}
	openForm = () => {
		this.setState( { editFormOpen: true } );
	}
	render() {
		const { id, title, project, elapsed, isRunning, onRemovePress, onStartPress, onStopPress } = this.props;
		const { editFormOpen } = this.state;
		if ( editFormOpen ) {
			return <TimerForm
				id={ id }
				onFormClose={ this.handleFormClose }
				onFormSubmit={ this.handleSubmit }
				project={ project }
				title={ title }
			/>;
		}
		return (
			<Timer
				elapsed={ elapsed }
				id={ id }
				isRunning={ isRunning }
				onEditPress={ this.handleEditPress }
				onRemovePress={ onRemovePress }
				onStartPress={ onStartPress }
				onStopPress={ onStopPress }
				project={ project }
				title={ title }
			/>
		);
	}
}

EditableTimer.propTypes = {
	elapsed: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	isRunning: PropTypes.bool.isRequired,
	onFormSubmit: PropTypes.func.isRequired,
	onRemovePress: PropTypes.func.isRequired,
	onStartPress: PropTypes.func.isRequired,
	onStopPress: PropTypes.func.isRequired,
	project: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default EditableTimer;