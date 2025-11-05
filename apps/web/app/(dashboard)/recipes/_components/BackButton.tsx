"use client"

import Link from "next/link"

export default function BackButton() {
  return (
    <div className='max-w-4xl mx-auto px-4 pt-4 flex justify-end'>
      <Link href={"/recipes"}>
        <button className='text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors'>
          ← Back
        </button>
      </Link>
    </div>
  )
}
