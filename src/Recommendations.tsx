import { useLocation } from 'react-router-dom'

// Genre mapping based on answer sequences
const genresMap = {
  '1': ['Action', 'Adventure'],
  '2': ['Drama', 'Romance'],
  '3': ['Mystery', 'Thriller'],
  '4': ['Comedy', 'Animation']
}

export default function Recommendations() {
  const location = useLocation()
  const previousResults = location.state?.previousResults || []

  // Analyze genres from all answer sequences
  const allGenres = previousResults.reduce((acc, result) => {
    result.split('').forEach(answer => {
      const genres = genresMap[answer] || []
      genres.forEach(genre => acc.add(genre))
    })
    return acc
  }, new Set())

  const uniqueGenres = Array.from(allGenres)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Quiz Results & Recommendations
              </span>
            </h1>

            {/* Genre Analysis */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Top Genres Based on Group Preferences:
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueGenres.map((genre, index) => (
                  <div key={index} className="bg-pink-500/20 px-4 py-2 rounded-full text-sm">
                    {genre}
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Results */}
            <div className="space-y-6 mb-8">
              {previousResults.map((result, index) => {
                const viewerGenres = result.split('').reduce((acc, answer) => {
                  const genres = genresMap[answer] || []
                  genres.forEach(genre => acc.add(genre))
                  return acc
                }, new Set())

                return (
                  <div key={index} className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">
                      Viewer {index + 1} Results:
                    </h3>
                    <div className="text-gray-300 mb-4">
                      Answer Sequence: {result}
                    </div>
                    <div className="text-sm text-gray-400">
                      Preferred Genres: {Array.from(viewerGenres).join(', ')}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Deduplicated Superset of Genres */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h2 className="text-xl font-semibold mb-4">
                Combined Group Preferences:
              </h2>
              <div className="bg-white/5 p-4 rounded-lg">
                <pre className="text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(uniqueGenres, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
