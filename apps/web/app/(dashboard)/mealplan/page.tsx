// app/(dashboard)/this-week/page.tsx
import { GenerateShoppingListButton } from "./_components/GenerateShoppingList"
import { AddRecipeButton } from "./_components/AddRecipeButton"
import { MealPlanCard } from "./_components/MealPlanCard"
import { ShoppingCart, ChefHat } from "lucide-react"

async function getWeeklyShop() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mealplan?userId=user_1`,
    { cache: "no-store" }
  )
  return res.json()
}

export default async function ThisWeekPage() {
  const { weeklyShop, summary } = await getWeeklyShop()

  const isEmpty = weeklyShop.length === 0

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-4xl mx-auto px-4 py-6'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>This Week</h1>
            {!isEmpty && (
              <p className='text-sm text-gray-600 mt-1'>
                {summary.totalRecipes}{" "}
                {summary.totalRecipes === 1 ? "recipe" : "recipes"},{" "}
                {summary.totalIngredients} ingredients
              </p>
            )}
          </div>
          <AddRecipeButton />
        </div>

        {isEmpty ? (
          <div className='text-center py-16 bg-white rounded-lg border border-gray-200'>
            <ChefHat size={64} className='mx-auto text-gray-300 mb-4' />
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>
              No recipes planned yet
            </h2>
            <p className='text-gray-600 mb-6'>
              Add recipes from your library to start planning your week
            </p>
            <AddRecipeButton variant='primary' />
          </div>
        ) : (
          <>
            <div className='grid gap-4 mb-6'>
              {weeklyShop.map((item) => (
                <MealPlanCard key={item.id} item={item} />
              ))}
            </div>

            <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                  <ShoppingCart className='text-blue-600' size={24} />
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                    Ready to shop?
                  </h3>
                  <p className='text-sm text-gray-600 mb-4'>
                    Generate your shopping list from the recipes you've planned
                    this week
                  </p>
                  <GenerateShoppingListButton
                    recipeCount={summary.totalRecipes}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
