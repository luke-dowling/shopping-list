// app/api/weekly-shop/route.ts
import mockWeeklyShop from "@/data/mock-weekly-shop.json"
import mockRecipes from "@/data/mock-recipes.json"
import fs from "node:fs"
import { v4 } from "uuid"

const weeklyShopPath = "./data/mock-weekly-shop.json"

// GET - Get all recipes in weekly shop with full recipe details
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "user_1" // TODO: Get from auth session

  // Filter weekly shop items for this user
  const userWeeklyShop = mockWeeklyShop.filter((item) => item.userId === userId)

  // Enrich with full recipe data
  const weeklyShopWithRecipes = userWeeklyShop
    .map((shopItem) => {
      const recipe = mockRecipes.find((r) => r.id === shopItem.recipeId)

      if (!recipe) {
        return null // Recipe was deleted
      }

      return {
        id: shopItem.id,
        recipeId: shopItem.recipeId,
        portions: shopItem.portions,
        addedAt: shopItem.addedAt,
        recipe: {
          id: recipe.id,
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        },
      }
    })
    .filter(Boolean) // Remove null entries

  return Response.json({
    weeklyShop: weeklyShopWithRecipes,
    summary: {
      totalRecipes: weeklyShopWithRecipes.length,
      totalIngredients: weeklyShopWithRecipes.reduce(
        (acc, item) => acc + item!.recipe.ingredients.length,
        0
      ),
    },
  })
}

// POST - Add recipe to weekly shop
export async function POST(request: Request) {
  const { recipeId, portions, userId = "user_1" } = await request.json()

  // Validate recipe exists
  const recipe = mockRecipes.find((r) => r.id === recipeId)
  if (!recipe) {
    return Response.json({ error: "Recipe not found" }, { status: 404 })
  }

  // Check if recipe already in weekly shop
  const existingIndex = mockWeeklyShop.findIndex(
    (item) => item.userId === userId && item.recipeId === recipeId
  )

  if (existingIndex !== -1) {
    // Update portions if already exists
    mockWeeklyShop[existingIndex].portions = portions

    fs.writeFileSync(weeklyShopPath, JSON.stringify(mockWeeklyShop, null, 2))

    return Response.json({
      message: "Updated portions",
      weeklyShopItem: mockWeeklyShop[existingIndex],
    })
  }

  // Add new item to weekly shop
  const newWeeklyShopItem = {
    id: `weekly_shop_${v4()}`,
    userId,
    recipeId,
    portions,
    addedAt: new Date().toISOString(),
  }

  mockWeeklyShop.push(newWeeklyShopItem)

  fs.writeFileSync(weeklyShopPath, JSON.stringify(mockWeeklyShop, null, 2))

  return Response.json({
    message: "Recipe added to weekly shop",
    weeklyShopItem: newWeeklyShopItem,
  })
}

// DELETE - Remove recipe from weekly shop
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const userId = searchParams.get("userId") || "user_1"

  if (!id) {
    return Response.json(
      { error: "Weekly shop item ID required" },
      { status: 400 }
    )
  }

  const index = mockWeeklyShop.findIndex(
    (item) => item.id === id && item.userId === userId
  )

  if (index === -1) {
    return Response.json(
      { error: "Weekly shop item not found" },
      { status: 404 }
    )
  }

  const removed = mockWeeklyShop.splice(index, 1)[0]

  fs.writeFileSync(weeklyShopPath, JSON.stringify(mockWeeklyShop, null, 2))

  return Response.json({
    message: "Recipe removed from weekly shop",
    removedItem: removed,
  })
}

// PATCH - Update portions for a recipe in weekly shop
export async function PATCH(request: Request) {
  const { id, portions, userId = "user_1" } = await request.json()

  if (!id || !portions) {
    return Response.json({ error: "ID and portions required" }, { status: 400 })
  }

  const index = mockWeeklyShop.findIndex(
    (item) => item.id === id && item.userId === userId
  )

  if (index === -1) {
    return Response.json(
      { error: "Weekly shop item not found" },
      { status: 404 }
    )
  }

  mockWeeklyShop[index].portions = portions

  fs.writeFileSync(weeklyShopPath, JSON.stringify(mockWeeklyShop, null, 2))

  return Response.json({
    message: "Portions updated",
    weeklyShopItem: mockWeeklyShop[index],
  })
}
