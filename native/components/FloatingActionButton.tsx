// components/FloatingActionButton.tsx
import { Pressable, Text } from "react-native"

type FABProps = {
  onPress: () => void
}

export const FloatingActionButton = ({ onPress }: FABProps) => {
  return (
    <Pressable
      onPress={onPress}
      className='absolute bottom-16 right-6 bg-teal-500 w-14 h-14 rounded-full items-center justify-center shadow-lg'
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text className='text-white text-3xl font-light'>+</Text>
    </Pressable>
  )
}
