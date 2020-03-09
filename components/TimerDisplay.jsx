import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Styles from "../include/styles";

export default TimerDisplay = props => {
	console.log(props);
	return (
		<View style={styles.TimerDisplayContainer}>
			<Text style={styles.TimerDisplayText}>{`${props.children}`}</Text>
		</View>
	);
};
const styles = StyleSheet.create(Styles);
