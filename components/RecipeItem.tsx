// components/RecipeItem.tsx
import { Recipe } from "@/types/recipe"
import { Pressable, Switch, Text, View } from "react-native"

type RecipeItemProps = {
  recipe: Recipe
  onToggle: (id: string) => void
  onPress?: (id: string) => void
}

export const RecipeItem = ({ recipe, onToggle, onPress }: RecipeItemProps) => {
  return (
    <Pressable
      onPress={() => onPress?.(recipe.id)}
      className='bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200'
    >
      <View className='flex-row justify-between items-center mb-2'>
        <Text className='text-xl font-semibold text-gray-800 flex-1'>
          {recipe.name}
        </Text>
        <Switch
          value={recipe.isActive}
          onValueChange={() => onToggle(recipe.id)}
          trackColor={{ false: "#d1d5db", true: "#10b981" }}
          thumbColor={recipe.isActive ? "#059669" : "#f3f4f6"}
        />
      </View>

      <View className='mt-2'>
        <Text className='text-sm text-gray-600 mb-1'>
          {recipe.ingredients.length} ingredients
        </Text>
        <Text className='text-xs text-gray-500' numberOfLines={1}>
          {recipe.ingredients.join(", ")}
        </Text>
      </View>

      {recipe.isActive && (
        <View className='mt-2 bg-green-50 px-2 py-1 rounded self-start'>
          <Text className='text-xs text-green-700 font-medium'>Active</Text>
        </View>
      )}
    </Pressable>
  )
}
