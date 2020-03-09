import React, { Component } from "react";
import axios from "axios";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RenderTimers from "./renderTimers";
import Styles from "../include/styles";
import { TimerBuild, TimerBreak } from "../include/classes.jsx";
import TimerDisplay from "./TimerDisplay";

export default class Server extends Component {
	state = {
		timers: [
			//
			{
				length: 1000000,
				label: "Timer 1",
				note: "Test"
			},
			{
				length: 1000000,
				label: "Timer 2",
				note: "Test"
			},
			{
				length: 1000000,
				label: "Timer 3",
				note: "Test"
			},

			{
				length: 1000000,
				label: "Timer 4",
				note: "Test"
			}
		],
		timerIndex: 0,
		timer: {
			length: 100,
			label: "test",
			note: "Test"
		},
		time: {
			h: 0,
			m: 0,
			s: 0
		},
		active: false
	};

	componentDidMount() {
		let callServer = async () => {
			const method = {
				method: "GET",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json"
				},
				redirect: "follow",
				referrerPolicy: "no-referrer"
			};

			let serverResponse = await axios.get("http://192.168.1.16:5000");

			if (serverResponse) {
				let json = await serverResponse.data;
				this.setState({ timers: json }, () => console.log(this.state));
			}
		};

		callServer();
	}
	render() {
		let { active, timer, time } = this.state;
		// let active = this.state.active;

		// Set the interval variable
		const interval = 1000;

		// Prepare the interval variable
		let countDown;

		// Decide whether to start the timer or pause it
		let pressTimer = () => {
			if (this.state.active === true) {
				stopTimer();
			} else {
				startTimer();
			}
		};

		let clearTimer = () => {
			let defTime = {
				h: 0,
				m: 0,
				s: 0
			};

			this.setState({ timer: defTime });
		};

		// Start the timer
		let startTimer = () => {
			this.setState({ active: true }, () => {
				countDown = setInterval(setTime, interval);
			});
		};

		// Clear interval
		let stopTimer = () => {
			this.setState({ active: false }, () => {
				clearInterval(countDown);
			});
		};

		// Restart Timer
		let restartTimer = () => {
			stopTimer();
		};

		// Update the time state
		let setTime = () => {
			if (this.state.active) {
				let current = new TimerBreak(this.state.time);
				this.setState({
					time: new TimerBuild(current.ms - interval)
				});
			} else {
				clearInterval(countDown);
			}
		};

		//Change Time by input
		let updateTime = (key, value) => {
			let currentTime = this.state.time;
			currentTime[key] = Number(value);
			let updatedTime = new TimerBreak(currentTime);
			this.setState({
				...this.state,
				time: new TimerBuild(updatedTime.ms)
			});
		};

		// Getting error saying that they're already defined, I believe it's just running this code again ontop of the old code, and that it's never clearing anythign out

		return (
			<View style={styles.container}>
				<TimerDisplay>
					{`${this.state.time.h}:${this.state.time.m}:${this.state.time.s}`}
				</TimerDisplay>
				<RenderTimers timers={this.state.timers} />
				<View style={styles.textContainer}>
					<TextInput
						style={styles.input}
						placeholder="H"
						onChangeText={text => updateTime("h", text)}
						value={`${time.h}`}
					/>
					<TextInput
						style={styles.input}
						placeholder="M"
						onChangeText={text => updateTime("m", text)}
						value={`${time.m}`}
					/>
					<TextInput
						style={styles.input}
						placeholder="S"
						onChangeText={text => updateTime("s", text)}
						value={`${time.s}`}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={pressTimer}>
						<Text style={styles.buttonText}>{active ? "Pause" : "Start"}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={pressTimer}>
						<Text style={styles.buttonText}>Restart</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={pressTimer}>
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.topAlign}>
					<TouchableOpacity style={styles.button} onPress={pressTimer}>
						<Text style={styles.buttonText}>+</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={pressTimer}>
						<Text style={styles.buttonText}>-</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={clearTimer}>
						<Text style={styles.buttonText}>Clear</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create(Styles);
