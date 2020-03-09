import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Styles from "../include/styles";
import { TimerBuild } from "../include/classes";
let RenderTimers = ({ timers }) => {
	let outputTimers = timers.map(timer => {
		let { label, length } = timer;
		let time = new TimerBuild(length);
		console.log(time);
		return (
			<View style={styles.timerContainer}>
				<Text style={styles.timerContainerText}>{`${label}`}</Text>
				<View style={styles.timerContainerTime}>
					<Text style={styles.timerContainerText}>{`${time.h}`}H</Text>
					<Text style={styles.timerContainerText}>{`${time.m}`}M</Text>
					<Text style={styles.timerContainerText}>{`${time.s}`}S</Text>
				</View>
				<TouchableOpacity style={styles.timerContainerButton}>
					<Text style={styles.timerContainerText}>Start/Stop/Ran</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.timerContainerButton}>
					<Text style={styles.timerContainerText}>-</Text>
				</TouchableOpacity>
			</View>
		);
	});
	return <View>{outputTimers}</View>;
};
export default RenderTimers;

const styles = StyleSheet.create(Styles);
