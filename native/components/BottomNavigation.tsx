import { Link } from "expo-router"
import { Pressable, Text, View } from "react-native"

export default function BottomNavigation() {
  return (
    <View className='bg-white border-t border-gray-200 flex-row'>
      <Link href='/' asChild>
        <Pressable className='flex-1 items-center py-3'>
          <Text className='text-teal-500 font-semibold'>Recipes</Text>
        </Pressable>
      </Link>
      <Link href='/shopping-list' asChild>
        <Pressable className='flex-1 items-center py-3'>
          <Text className='text-gray-500'>Shopping List</Text>
        </Pressable>
      </Link>
    </View>
  )
}
