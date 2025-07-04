import { useAuth } from '@/lib/auth-context'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Index() {
	const { signOut } = useAuth()

	return (
		<View style={styles.view}>
			<Text style={styles.h1}>HOME</Text>
			<Button
				mode="text"
				onPress={signOut}
				icon={'logout'}>
				Sign Out
			</Button>
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
