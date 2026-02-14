"use client";

const ResumePage = () => {
    return (
        <div className="max-w-3xl mx-auto p-4 mt-20">
            <h1 className="text-3xl font-bold mb-6">Resume</h1>
            {/* List showing polymath skills */}
            <ul className="list-disc list-inside space-y-2">
                <li>Juan Gomez</li>
                <li>Manhattan, 10012</li>
                <li><a href="mailto:c6m1lo@proton.me">c6m1lo@proton.me</a></li>
                <li><a href="https://www.linkedin.com/in/camilogomezvalencia/">LinkedIn</a></li>
                <li>Uber AI Solutions - Bilingual AI Trainer</li>
                <li>ATC Transcriptionist - Alignerr</li>
                <li>Spanish Medical Annotation- Centific</li>
                <li>Certified Medical Interpreter - Propio</li>
                <li>Native Spanish/English</li>
                <li>New Jersey City University</li>
                <li>Hudson County Community College</li>
                <li>North Bergen High School</li>
            </ul>
        </div>
    )
}

export default ResumePage;