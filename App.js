import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Server from "./components/server.jsx";
export default function App() {
	return (
		<View style={styles.container}>
			<Server />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
