import { StyleSheet, Text, View } from 'react-native'

export default function Index() {
	return (
		<View style={styles.view}>
			<Text style={styles.h1}>HOME</Text>
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
		fontSize: 80,
	},
})
