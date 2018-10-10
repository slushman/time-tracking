import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import TimerButton from './TimerButton';

class TimerForm extends Component {
	constructor( props ) {
		super( props );
		const { id, title, project } = props;
		this.state = {
			title: id ? title : '',
			project: id ? project : '',
		};
	}
	static propTypes = {
		id: PropTypes.string,
		onFormClose: PropTypes.func,
		onFormSubmit: PropTypes.func,
		project: PropTypes.string,
		title: PropTypes.string,
	}
	static defaultTypes = {
		id: null,
		project: '',
		title: '',
	};
	handleProjectChange = ( project ) => {
		this.setState( { project } );
	}
	handleTitleChange = ( title ) => {
		this.setState( { title } );
	}
	handleSubmit = () => {
		const { onFormSubmit, id } = this.props;
		const { title, project } = this.state;
		onFormSubmit( {
			id,
			title,
			project,
		} );
	}
	render() {
		const { id, onFormClose } = this.props;
		const { title, project } = this.state;
		const submitText = id ? 'Update' : 'Create';
		return (
			<View style={ styles.formContainer }>
				<View style={ styles.attributeContainer }>
					<Text style={ styles.textInputTitle }>Title</Text>
					<View style={ styles.textInputContainer }>
						<TextInput
							onChangeText={ this.handleTitleChange }
							style={ styles.textInput }
							underlineColorAndroid="transparent"
							value={ title }
						/>
					</View>
				</View>
				<View style={ styles.attributeContainer }>
					<Text style={ styles.textInputTitle }>Project</Text>
					<View style={ styles.textInputContainer }>
						<TextInput
							onChangeText={ this.handleProjectChange }
							style={ styles.textInput }
							underlineColorAndroid="transparent"
							value={ project }
						/>
					</View>
				</View>
				<View style={ styles.buttonGroup }>
					<TimerButton
						color="#21BA45"
						onPress={ this.handleSubmit }
						small
						title={ submitText }
					/>
					<TimerButton
						color="#DB2828"
						onPress={ onFormClose }
						small
						title="Cancel"
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	formContainer: {
		backgroundColor: 'white',
		borderColor: '#D6D7DA',
		borderRadius: 10,
		borderWidth: 2,
		margin: 15,
		marginBottom: 0,
		padding: 15,
	},
	attributeContainer: {
		marginVertical: 8,
	},
	textInputContainer: {
		borderColor: '#D6D7DA',
		borderRadius: 2,
		borderWidth: 1,
		marginBottom: 5,
	},
	textInput: {
		fontSize: 12,
		height: 30,
		padding: 5,
	},
	textInputTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
} );

export default TimerForm;