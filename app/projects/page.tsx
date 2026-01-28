"use client"

import { useState, useEffect } from 'react'

const ProjectsPage = () => {
  return (
    // Tik Tok Style display of projects
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <ul className="list-disc list-inside space-y-2 list-none">
        <li><strong>Project 1:</strong> File Transfer App</li>
        <li><strong>Project 2:</strong> Self Hosted AI Chatbot</li>
        <li><strong>Project 3:</strong> Productivity App</li>
        <li><strong>Project 4:</strong> 3D Mapping</li>
      </ul>
    </div>
  )
}

export default ProjectsPage;