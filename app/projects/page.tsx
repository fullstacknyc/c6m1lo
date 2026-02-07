"use client"

const ProjectsPage = () => {
  return (
    // Tik Tok Style display of projects
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>
      <ul className="list-disc list-inside space-y-2 text-center ">
        <li><a href="https://www.camilo777.com">Camilo777</a></li>
        <li><a href="/notes">Notes App</a></li>
        <li><a href="/diet">Diet Generator</a></li>
        <li><a href="/workout">Workout Generator</a></li>
        <li><a href="/scheduler">Scheduler App</a></li>
      </ul>
    </div>
  )
}

export default ProjectsPage;