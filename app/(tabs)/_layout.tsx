import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: 'coral' }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => {
						return focused ? (
							<Ionicons
								name="home"
								size={24}
								color={color}
							/>
						) : (
							<Ionicons
								name="home-outline"
								size={24}
								color={color}
							/>
						)
					},
				}}
			/>
			<Tabs.Screen
				name="login"
				options={{
					title: 'Login',
					tabBarIcon: ({ color, focused }) => {
						return focused ? (
							<AntDesign
								name="login"
								size={24}
								color={color}
							/>
						) : (
							<AntDesign
								name="logout"
								size={24}
								color="black"
							/>
						)
					},
				}}
			/>
		</Tabs>
	)
}
