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
import Styles from "../include/styles";
import { TimerBuild, TimerBreak } from "../include/classes.jsx";
export default class Server extends Component {
	state = {
		timers: [
			{
				length: 100,
				label: "test",
				note: "Test"
			}
		],
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
		// Set the interval variable
		const interval = 1000;

		// Prepare the interval variable
		let countDown;

		// Decide whetehr to pause or start the timer
		let timer = () => {
			if (this.state.active) {
				setTime();
			} else {
				clearInterval(countDown);
				clearInterval();
			}
		};
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
				countDown = setInterval(timer, interval);
			});
		};

		// Clear interval
		let stopTimer = () => {
			this.setState({ active: false }, () => {
				clearInterval(countDown);
			});
		};

		// Update the time state
		let setTime = () => {
			let current = new TimerBreak(this.state.time);
			this.setState({ time: new TimerBuild(current.ms - interval) });
		};

		//
		let updateTime = (key, value) => {
			let currentTime = this.state.time;
			currentTime[key] = Number(value);
			let updatedTime = new TimerBreak(currentTime);
			this.setState({
				...this.state,
				time: new TimerBuild(updatedTime.ms)
			});
		};

		let { active, timers, time } = this.state;
		return (
			<View style={styles.container}>
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
