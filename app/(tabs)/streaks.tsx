import {
	COMPLETIONS_COLLECTION_ID,
	DATABASE_ID,
	databases,
	HABITS_COLLECTION_ID,
} from '@/lib/appwrite'
import { useAuth } from '@/lib/auth-context'
import { Habit, HabitCompletions } from '@/types/database.type'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Query } from 'react-native-appwrite'
import { Text } from 'react-native-paper'

export default function StreaksScreen() {
	const [habits, setHabits] = useState<Habit[]>([])
	const [completedHabits, setCompletedHabits] = useState<HabitCompletions[]>([])
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

	interface StreakData {
		streak: number
		bestStreak: number
		total: number
	}

	const getStreaksData = (habitId: string): StreakData => {
		const habitCompletions = completedHabits
			?.filter((c) => c.habit_id === habitId)
			.sort(
				(a, b) =>
					new Date(a.completed_at).getTime() -
					new Date(b.completed_at).getTime()
			)

		if (habitCompletions?.length === 0) {
			return { streak: 0, bestStreak: 0, total: 0 }
		}

		// build streaks data
		let streak = 0
		let bestStreak = 0
		let total = habitCompletions.length

		let lastDate: Date | null = null
		let currentStreak = 0

		habitCompletions?.forEach((c) => {
			const date = new Date(c.completed_at)
			if (lastDate) {
				const diff =
					(date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)

				if (diff <= 1.5) {
					currentStreak += 1
				} else {
					currentStreak = 1
				}
			} else {
				if (currentStreak > bestStreak) bestStreak = currentStreak
				streak = currentStreak
				lastDate = date
			}
		})

		return { streak, bestStreak, total }
	}

	const habitStreaks = habits.map((habit) => {
		const { streak, bestStreak, total } = getStreaksData(habit.$id)
		return { habit, streak, bestStreak, total }
	})

	const rankedHabits = habitStreaks.sort((a, b) => a.bestStreak - b.bestStreak)

	return (
		<View>
			<Text>Habit Streaks</Text>
		</View>
	)
}
