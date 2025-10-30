// app/index.tsx
import BottomNavigation from "@/components/BottomNavigation"
import { FloatingActionButton } from "@/components/FloatingActionButton"
import { RecipeItem } from "@/components/RecipeItem"
import { Recipe } from "@/types/recipe"
import { useRouter } from "expo-router"
import { useState } from "react"
import { FlatList, Text, View } from "react-native"

const MOCK_RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    isActive: true,
    ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan", "Black Pepper"],
  },
  {
    id: "2",
    name: "Caesar Salad",
    isActive: false,
    ingredients: ["Romaine Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
  },
  {
    id: "3",
    name: "Chicken Stir Fry",
    isActive: true,
    ingredients: [
      "Chicken Breast",
      "Bell Peppers",
      "Soy Sauce",
      "Rice",
      "Garlic",
    ],
  },
]

export default function RecipesScreen() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES)

  const toggleRecipe = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isActive: !recipe.isActive } : recipe
      )
    )
  }

  const handleAddRecipe = () => {
    router.push("/add-recipe")
  }

  const activeRecipeCount = recipes.filter((r) => r.isActive).length

  return (
    <View className='flex-1 bg-gray-50 dark:bg-gray-800'>
      {/* Header */}
      <View className='bg-teal-500 pt-12 pb-6 px-4'>
        <Text className='text-3xl font-bold text-white mb-2'>My Recipes</Text>
        <Text className='text-teal-100'>
          {activeRecipeCount} active recipe{activeRecipeCount !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Recipe List */}
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <RecipeItem recipe={item} onToggle={toggleRecipe} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className='items-center justify-center py-12'>
            <Text className='text-gray-500 text-lg'>No recipes yet</Text>
            <Text className='text-gray-400 text-sm mt-2'>
              Add your first recipe to get started
            </Text>
          </View>
        }
      />

      <FloatingActionButton onPress={handleAddRecipe} />

      <BottomNavigation />
    </View>
  )
}
