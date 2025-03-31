import { Button } from '@/components/ui/button'
import React from 'react'

const CourseProgress = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between mb-4 mt-20">
          <h1 className="text-2xl font-bold">Course Title</h1>
          <Button>Completed</Button>
        </div>
    </div>
  )
}

export default CourseProgress
