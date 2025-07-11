import {
	COMPLETIONS_COLLECTION_ID,
	DATABASE_ID,
	databases,
	HABITS_COLLECTION_ID,
} from '@/lib/appwrite'
import { useAuth } from '@/lib/auth-context'
import { Habit, HabitCompletions } from '@/types/database.type'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Query } from 'react-native-appwrite'

export default function StreaksScreen() {
	const [habits, setHabits] = useState<Habit[]>()
	const [completedHabits, setCompletedHabits] = useState<HabitCompletions[]>()
	const { user } = useAuth()

	useEffect(() => {
		if (user) {
			fetchHabits()
			fetchCompletions()
		}
	}, [user])

	const fetchHabits = async () => {
		try {
			const response = await databases.listDocuments(
				DATABASE_ID,
				HABITS_COLLECTION_ID,
				[Query.equal('user_id', user?.$id ?? '')]
			)
			setHabits(response.documents as Habit[])
		} catch (error) {
			console.log(error)
		}
	}

	const fetchCompletions = async () => {
		try {
			const response = await databases.listDocuments(
				DATABASE_ID,
				COMPLETIONS_COLLECTION_ID,
				[Query.equal('user_id', user?.$id ?? '')]
			)

			const completions = response.documents as HabitCompletions[]
			setCompletedHabits(completions)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.view}>
			<Link
				href="/"
				style={styles.h1}
			>
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
