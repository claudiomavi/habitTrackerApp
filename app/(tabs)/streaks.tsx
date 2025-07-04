import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function StreaksScreen() {
	return (
		<View style={styles.view}>
			<Text style={styles.h1}>Hello, This is the login page</Text>
			<Link
				href="/"
				style={styles.button}>
				Home...
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		gap: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	h1: {
		textAlign: 'center',
		margin: 20,
		fontSize: 40,
	},
	button: {
		textAlign: 'center',
		backgroundColor: 'coral',
		color: 'white',
		padding: 8,
	},
})
