import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moviesData from './MovieData';
import genresMapData from './data/genresMap.json';
import adsData from './data/ads.json';

export default function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousResults = location.state?.previousResults || [];
  const [showMovies, setShowMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<typeof moviesData>([]);
  const [genresMap, setGenresMap] = useState<typeof genresMapData>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('any');
  const [randomAd, setRandomAd] = useState<string | null>(null);
  const [renderCount, setRenderCount] = useState(0);
  const [ads, setAds] = useState<string[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setMovies(moviesData);
        setGenresMap(genresMapData);
        setAds(adsData);
        if (adsData && adsData.length > 0) {
          const randomIndex = Math.floor(Math.random() * adsData.length);
          const selectedAd = adsData[randomIndex];
          setRandomAd(selectedAd);
          console.log('Random ad selected:', selectedAd);
        } else {
          console.log('No ads data available or empty array.');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
    console.log(
      'Recommendations component rendered:',
      renderCount,
      'ads:',
      ads,
      'randomAd:',
      randomAd
    );
  }, [ads, randomAd]);

  useEffect(() => {
    let intervalId: any;
    if (ads && ads.length > 0) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * ads.length);
        const selectedAd = ads[randomIndex];
        setRandomAd(selectedAd);
        console.log('Cycling to new random ad:', selectedAd);
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [ads]);

  const allGenres = previousResults.reduce((acc, result) => {
    const matchingEntry = genresMap.find(
      (entry) => entry.Answer_Combination === result
    );
    if (matchingEntry) {
      matchingEntry.Top_Genres.forEach((genre) => acc.add(genre));
    }
    return acc;
  }, new Set<string>());

  const uniqueGenres = Array.from(allGenres);

  const getRecommendedMovies = () => {
    const movieScores = movies.map((movie) => {
      let movieGenres: string[] = [];
      let movieLanguages: string[] = [];

      try {
        movieGenres = JSON.parse(movie.genres.replace(/'/g, '"'));
        movieLanguages = JSON.parse(movie.Languages.replace(/'/g, '"'));
      } catch (error) {
        console.error('Error parsing data for movie:', {
          title: movie.Title,
          genres: movie.genres,
          languages: movie.Languages,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        movieGenres = [];
        movieLanguages = [];
      }

      const score = uniqueGenres.reduce((acc, genre) =>
        movieGenres.includes(genre) ? acc + 1 : acc,
        0
      );
      return { ...movie, score, movieLanguages };
    });

    let filteredMovies = movieScores;
    if (selectedLanguage !== 'any') {
      filteredMovies = movieScores.filter((movie) =>
        movie.movieLanguages.includes(selectedLanguage)
      );
    }

    return filteredMovies
      .sort((a, b) => b.score - a.score || parseFloat(b.Rating) - parseFloat(a.Rating))
      .slice(0, 10);
  };

  const recommendedMovies = getRecommendedMovies();

  const allLanguages = Array.from(
    new Set(
      movies.reduce((acc, movie) => {
        try {
          const languages = JSON.parse(movie.Languages.replace(/'/g, '"'));
          languages.forEach((lang: string) => acc.add(lang));
        } catch (error) {
          console.error('Error parsing languages for movie:', {
            title: movie.Title,
            languages: movie.Languages,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
        return acc;
      }, new Set<string>())
    )
  );

  const sortedLanguages = [
    'any',
    'English',
    ...allLanguages.filter((lang) => lang !== 'English').sort(),
  ];

  const handleBackToQuiz = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 mx-auto bg-pink-400 rounded-full mb-4" />
              <p className="text-xl text-gray-300">Loading recommendations...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showMovies) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                  <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                    Top 10 Movie Recommendations
                  </span>
                </h1>
                <div className="flex items-center gap-2">
                  <label htmlFor="language-filter" className="text-gray-300 text-sm">
                    Filter by Language:
                  </label>
                  <select
                    id="language-filter"
                    className="bg-white/10 text-white rounded-md p-2 text-sm"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    {sortedLanguages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {recommendedMovies.map((movie, index) => {
                  if (index === 1 && randomAd) {
                    return (
                      <React.Fragment key="ad-card">
                        <div className="bg-white/5 p-6 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div
                              className="ad-image-container"
                              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                            >
                              {randomAd && (
                                <img
                                  src={`https://images.amazon.com/images/P/${randomAd}.01.LZZZZZZZ.jpg`}
                                  alt="Ad Item"
                                  className="w-32 h-32 object-cover rounded-md"
                                  style={{ display: 'block', margin: '0 auto' }}
                                />
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              {randomAd && (
                                <button
                                  onClick={() =>
                                    window.open(
                                      `https://www.amazon.com/dp/${randomAd}?tag=tvsnacks-20`,
                                      '_blank'
                                    )
                                  }
                                  className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                                >
                                  Buy this for Movie Night!
                                </button>
                              )}
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  marginTop: '10px',
                                  width: '100%',
                                }}
                              >
                                <div
                                  style={{
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    padding: '4px',
                                  }}
                                >
                                  <img
                                    src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png"
                                    alt="Amazon Logo"
                                    className="w-16 h-16 rounded-lg"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div key={index} className="bg-white/5 p-6 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h2 className="text-2xl font-bold mb-2">
                                {movie.Title} ({movie.Year})
                              </h2>
                              <div className="text-pink-400 mb-2">
                                Rating: {movie.Rating} | Match Score: {movie.score}
                              </div>
                              <div className="text-gray-300 mb-4">
                                Genres: {JSON.parse(movie.genres.replace(/'/g, '"')).join(', ')}
                              </div>
                              <div className="text-sm text-gray-400">
                                Languages: {JSON.parse(movie.Languages.replace(/'/g, '"')).join(', ')}
                              </div>
                            </div>
                            <a
                              href={movie.Movie_Link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                            >
                              View on IMDB
                            </a>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  }
                  return (
                    <div key={index} className="bg-white/5 p-6 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">
                            {movie.Title} ({movie.Year})
                          </h2>
                          <div className="text-pink-400 mb-2">
                            Rating: {movie.Rating} | Match Score: {movie.score}
                          </div>
                          <div className="text-gray-300 mb-4">
                            Genres: {JSON.parse(movie.genres.replace(/'/g, '"')).join(', ')}
                          </div>
                          <div className="text-sm text-gray-400">
                            Languages: {JSON.parse(movie.Languages.replace(/'/g, '"')).join(', ')}
                          </div>
                        </div>
                        <a
                          href={movie.Movie_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                        >
                          View on IMDB
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleBackToQuiz}
                className="mt-8 w-full bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Take another Movie Quiz!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

            <div className="space-y-6 mb-8">
              {previousResults.map((result, index) => {
                const matchingEntry = genresMap.find(
                  (entry) => entry.Answer_Combination === result
                );
                const viewerGenres = matchingEntry ? matchingEntry.Top_Genres : [];

                return (
                  <div key={index} className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">
                      Viewer {index + 1} Movie Quiz Results:
                    </h3>
                    <div className="text-sm text-gray-400">
                      Preferred Genres: {viewerGenres.join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowMovies(true)}
              className="mt-8 w-full bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Show Movie Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
