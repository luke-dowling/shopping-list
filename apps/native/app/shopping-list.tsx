import BottomNavigation from "@/components/BottomNavigation"
import { Text, View } from "react-native"

export default function ShoppingListScreen() {
  return (
    <View>
      <Text className='text-white my-3 text-3xl text-center'>
        Shopping List
      </Text>

      <BottomNavigation />
    </View>
  )
}
