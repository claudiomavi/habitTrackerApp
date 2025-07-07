import { Link } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function StreaksScreen() {
	return (
		<View style={styles.view}>
			<Link
				href="/prueba/1"
				style={styles.h1}>
				1
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
