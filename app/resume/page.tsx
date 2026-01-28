"use client";

import { useState, useEffect } from 'react'

const ResumePage = () => {
    return (
        <div className="max-w-3xl mx-auto p-4 mt-20">
            <h1 className="text-3xl font-bold mb-6">Resume</h1>
            {/* List showing polymath skills */}
            <ul className="list-disc list-inside space-y-2 list-none">
                <li><strong>Skill 1:</strong> Full-Stack Web Development</li>
                <li><strong>Skill 2:</strong> Machine Learning & AI</li>
                <li><strong>Skill 3:</strong> Mobile App Development</li>
                <li><strong>Skill 4:</strong> Cloud Computing & DevOps</li>
                <li><strong>Skill 5:</strong> Data Science & Analytics</li>
                <li><strong>Skill 6:</strong> Cybersecurity</li>
                <li><strong>Skill 7:</strong> UI/UX Design</li>
            </ul>
        </div>
    )
}

export default ResumePage;