// API Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Recipe Types
export interface RecipeWithIngredients {
  id: string
  name: string
  instructions: string | null
  ingredients: {
    id: string
    quantity: string
    ingredient: {
      id: string
      name: string
    }
  }[]
}

// Shopping List Types
export interface ShoppingListItemWithIngredient {
  id: string
  quantity: string
  purchased: boolean
  ingredient: {
    id: string
    name: string
  }
  recipeId: string | null
}
