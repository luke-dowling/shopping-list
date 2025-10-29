import { useRouter } from "expo-router"
import { useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native"

export default function AddRecipeScreen() {
  const router = useRouter()
  const [recipeName, setRecipeName] = useState("")
  const [ingredients, setIngredients] = useState<string[]>([""])

  const addIngredientField = () => {
    setIngredients([...ingredients, ""])
  }

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
    }
  }

  const handleSave = () => {
    // Filter out empty ingredients
    const validIngredients = ingredients.filter((i) => i.trim() !== "")

    if (!recipeName.trim()) {
      alert("Please enter a recipe name")
      return
    }

    if (validIngredients.length === 0) {
      alert("Please add at least one ingredient")
      return
    }

    // TODO: Save to AsyncStorage
    console.log("Saving recipe:", {
      name: recipeName,
      ingredients: validIngredients,
    })

    // Navigate back
    router.back()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className='flex-1 bg-gray-50'
    >
      <ScrollView className='flex-1' keyboardShouldPersistTaps='handled'>
        <View className='p-4'>
          {/* Recipe Name Section */}
          <View className='mb-6'>
            <Text className='text-lg font-semibold text-gray-800 mb-2'>
              Recipe Name
            </Text>
            <TextInput
              value={recipeName}
              onChangeText={setRecipeName}
              placeholder='e.g., Spaghetti Carbonara'
              className='bg-white border border-gray-300 rounded-lg px-4 py-3 text-base'
              placeholderTextColor='#9ca3af'
            />
          </View>

          {/* Ingredients Section */}
          <View className='mb-6'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-lg font-semibold text-gray-800'>
                Ingredients
              </Text>
              <Pressable
                onPress={addIngredientField}
                className='bg-teal-500 px-3 py-1 rounded'
              >
                <Text className='text-white text-sm font-medium'>+ Add</Text>
              </Pressable>
            </View>

            {ingredients.map((ingredient, index) => (
              <View key={index} className='flex-row mb-3 items-center'>
                <TextInput
                  value={ingredient}
                  onChangeText={(value) => updateIngredient(index, value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className='flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-base'
                  placeholderTextColor='#9ca3af'
                />
                {ingredients.length > 1 && (
                  <Pressable
                    onPress={() => removeIngredient(index)}
                    className='ml-2 bg-red-500 w-10 h-10 rounded-lg items-center justify-center'
                  >
                    <Text className='text-white text-lg font-bold'>×</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>

          {/* Helper Text */}
          <Text className='text-sm text-gray-500 mb-6'>
            Add all ingredients you'll need for this recipe
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className='bg-white border-t border-gray-200 p-4 flex-row gap-3'>
        <Pressable
          onPress={() => router.back()}
          className='flex-1 bg-gray-200 rounded-lg py-3'
        >
          <Text className='text-gray-700 text-center font-semibold'>
            Cancel
          </Text>
        </Pressable>
        <Pressable
          onPress={handleSave}
          className='flex-1 bg-teal-500 rounded-lg py-3'
        >
          <Text className='text-white text-center font-semibold'>
            Save Recipe
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}
