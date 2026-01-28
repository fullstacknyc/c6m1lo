"use client"

import { useState, useEffect } from 'react'

const ProjectsPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <ul className="list-disc list-inside space-y-4">
        <li>
          <h2 className="text-xl font-semibold">Project One</h2>
          <p>Self Hosted AI Chatbot</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Project Two</h2>
          <p>Productivity Machine</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Project Three</h2>
          <p>3D Mapping</p>
        </li>
      </ul>
    </div>
  )
}

export default ProjectsPage;