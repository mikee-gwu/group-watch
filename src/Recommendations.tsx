import { useLocation } from 'react-router-dom'

export default function Recommendations() {
  const location = useLocation()
  const previousResults = location.state?.previousResults || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Quiz Results
              </span>
            </h1>

            <div className="space-y-6">
              {previousResults.map((result, index) => (
                <div key={index} className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    Viewer {index + 1} Results:
                  </h3>
                  <div className="text-gray-300">
                    Answer Sequence: {result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
