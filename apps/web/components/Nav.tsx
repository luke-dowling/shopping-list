import { ChefHat, ShoppingCart } from "lucide-react"
import Link from "next/link"

export const Nav = () => {
  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-10'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <Link href={"/"}>
            <h1 className='text-xl font-bold text-gray-900'>Kitchen Manager</h1>
          </Link>
          <div className='flex gap-2'>
            <Link
              href='/recipes'
              className='flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-blue-100 text-blue-700'
            >
              <ChefHat size={20} />
              <span className='hidden sm:inline'>All Recipes</span>
            </Link>
            <Link
              href='/mealplan'
              className='flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-blue-100 text-blue-700'
            >
              <ChefHat size={20} />
              <span className='hidden sm:inline'>Meal Plan</span>
            </Link>
            <Link
              href='/shopping'
              className='flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-blue-100 text-blue-700'
            >
              <ShoppingCart size={20} />
              <span className='hidden sm:inline'>Shopping List</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
