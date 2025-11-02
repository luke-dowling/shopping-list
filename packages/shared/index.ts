// API Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Ingredient Types
export interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string | null
}

// Recipe Types
export interface Recipe {
  id: string
  name: string
  ingredients: Ingredient[]
  instructions: string | null
}

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
export interface ShoppingListItem {
  id: string
  name: string
  quantity: string
  purchased: boolean
  recipeId: string | null
}

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

// Weekly Shop Types
export interface WeeklyShopItem {
  id: string
  userId: string
  recipeId: string
  portions: number
  addedAt: string
}
