import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import uuid from 'uuid/v4';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils/TimerUtils';

class App extends Component {
	state = {
		timers: [
			{
				title: 'Mow the lawn',
				project: 'House Chores',
				id: uuid(),
				elapsed: 8986300,
				isRunning: true,
			},
			{
				title: 'Bake squash',
				project: 'Kitchen Chores',
				id: uuid(),
				elapsed: 3890985,
				isRunning: false,
			},
		],
	};
	componentDidMount() {
		const TIME_INTERVAL = 1000;
		this.intervalId = setInterval( () => {
			const { timers } = this.state;
			this.setState( {
				timers: timers.map( timer => {
					const { elapsed, isRunning } = timer;
					return {
						...timer,
						elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
					}
				} )
			} );
		}, TIME_INTERVAL );
	}
	componentWillMount() {
		clearInterval( this.intervalId );
	}
	handleCreateFormSubmit = ( timer ) => {
		const { timers } = this.state;
		this.setState( {
			timers: [ newTimer( timer ), ...timers ],
		} );
	}
	handleFormSubmit = ( attrs ) => {
		const { timers } = this.state;
		this.setState( {
			timers: timers.map( timer => {
				if ( timer.id === attrs.id ) {
					const { title, project } = attrs;
					return {
						...timer,
						title,
						project,
					};
				}
				return timer;
			} )
		} );
	}
	handleFormRemove = ( timerId ) => {
		this.setState( {
			timers: this.state.timers.filter( timer => timer.id !== timerId )
		} );
	}
	toggleTimer = timerId => {
		this.setState( prevState => {
			const { timers } = prevState;
			return {
				timers: timers.map( timer => {
					const { id, isRunning } = timer;
					if ( id === timerId ) {
						return {
							...timer,
							isRunning: ! isRunning,
						}
					}
					return timer;
				} ),
			}
		} );
	}
	render() {
		const { timers } = this.state;
		return (
			<View style={ styles.appContainer }>
				<View style={ styles.titleContainer }>
					<Text style={ styles.title }>Timers</Text>
				</View>
				<KeyboardAvoidingView
					behavior="padding"
					style={ styles.timerListContainer }
				>
					<ScrollView style={ styles.timerList }>
						<ToggleableTimerForm onFormSubmit={ this.handleCreateFormSubmit } />
						{
							timers.map( ( { id, title, project, elapsed, isRunning }) => {
								return (
									<EditableTimer
										elapsed={ elapsed }
										id={ id }
										isRunning={ isRunning }
										key={ id }
										onFormSubmit={ this.handleFormSubmit }
										onRemovePress={ this.handleFormRemove }
										onStartPress={ this.toggleTimer }
										onStopPress={ this.toggleTimer }
										project={ project }
										title={ title }
									/>
								);
							} )
						}
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
	},
	titleContainer: {
		paddingTop: 35,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#d6d7da',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	timerList: {
		paddingBottom: 15,
	},
	timerListContainer: {
		flex: 1,
	},
});

export default App;
