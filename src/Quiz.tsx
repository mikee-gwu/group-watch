import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Brain, Sword, User, Puzzle, Smile, Globe, Home, Eye, Zap, Heart, Search, Laugh, Trophy, BookOpen, Key } from 'lucide-react'

const quizQuestions = [
  {
    question_text: "What kind of protagonist do you usually find most engaging?",
    answers: [
      { answer_value: 1, answer_text: "The Bold Hero: Courageous, action-oriented, and ready to face any challenge.", icon: Sword },
      { answer_value: 2, answer_text: "The Relatable Individual: Down-to-earth, with flaws and everyday struggles.", icon: User },
      { answer_value: 3, answer_text: "The Clever Thinker: Intelligent, analytical, and enjoys solving puzzles.", icon: Puzzle },
      { answer_value: 4, answer_text: "The Fun-Loving Character: Lighthearted, humorous, and brings joy to situations.", icon: Smile }
    ]
  },
  {
    question_text: "What setting usually captivates your imagination the most?",
    answers: [
      { answer_value: 1, answer_text: "Epic Worlds: Vast landscapes, historical empires, or fantastical realms.", icon: Globe },
      { answer_value: 2, answer_text: "Real-Life Scenarios: Everyday places, relatable environments, and human interactions.", icon: Home },
      { answer_value: 3, answer_text: "Mysterious Locations: Dark alleys, hidden rooms, or suspenseful environments.", icon: Eye },
      { answer_value: 4, answer_text: "Absurd Situations: Over-the-top scenarios, wacky worlds, and comical settings.", icon: Laugh }
    ]
  },
  {
    question_text: "Which element is most crucial for you to enjoy a movie?",
    answers: [
      { answer_value: 1, answer_text: "Thrilling Action: Fast-paced sequences, intense conflicts, and exciting stunts.", icon: Zap },
      { answer_value: 2, answer_text: "Emotional Depth: Character development, heartfelt moments, and relatable emotions.", icon: Heart },
      { answer_value: 3, answer_text: "Intriguing Plot: Twists, turns, mysteries, and suspense that keep you guessing.", icon: Search },
      { answer_value: 4, answer_text: "Humor and Wit: Clever jokes, funny situations, and lighthearted entertainment.", icon: Laugh }
    ]
  },
  {
    question_text: "What kind of mood do you typically seek when watching a movie?",
    answers: [
      { answer_value: 1, answer_text: "Adrenaline Rush: Excitement, high energy, and a sense of adventure.", icon: Zap },
      { answer_value: 2, answer_text: "Emotional Connection: Empathy, heartwarming moments, and a sense of belonging.", icon: Heart },
      { answer_value: 3, answer_text: "Suspense and Intrigue: Mystery, tension, and a desire to uncover secrets.", icon: Key },
      { answer_value: 4, answer_text: "Laughter and Joy: Lightness, amusement, and a good time.", icon: Smile }
    ]
  },
  {
    question_text: "What theme often resonates with you most strongly in a story?",
    answers: [
      { answer_value: 1, answer_text: "Triumph Over Adversity: Overcoming obstacles, saving the day, and achieving victory.", icon: Trophy },
      { answer_value: 2, answer_text: "Personal Growth: Self-discovery, coming-of-age, and understanding oneself better.", icon: BookOpen },
      { answer_value: 3, answer_text: "Unraveling Secrets: Solving mysteries, uncovering conspiracies, and finding the truth.", icon: Key },
      { answer_value: 4, answer_text: "Embracing the Absurd: Satire, social commentary, and finding humor in the unexpected.", icon: Laugh }
    ]
  }
]
const genresMap= [
  {
    "Answer_Combination": "11111",
    "Top_Genres": [
      "Action Epic",
      "Adventure Epic",
      "War Epic"
    ]
  },
  {
    "Answer_Combination": "11112",
    "Top_Genres": [
      "Action Epic",
      "Adventure Epic",
      "Epic"
    ]
  },
  {
    "Answer_Combination": "11113",
    "Top_Genres": [
      "Action Epic",
      "Conspiracy Thriller",
      "Political Thriller"
    ]
  },
  {
    "Answer_Combination": "11114",
    "Top_Genres": [
      "Action Epic",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "11121",
    "Top_Genres": [
      "Action Epic",
      "Adventure Epic",
      "Superhero"
    ]
  },
  {
    "Answer_Combination": "11122",
    "Top_Genres": [
      "Action Epic",
      "Adventure Epic",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "11123",
    "Top_Genres": [
      "Action Epic",
      "Cyber Thriller",
      "Sci-Fi Epic"
    ]
  },
  {
    "Answer_Combination": "11124",
    "Top_Genres": [
      "Action Epic",
      "Buddy Comedy",
      "Action"
    ]
  },
  {
    "Answer_Combination": "11131",
    "Top_Genres": [
      "Action Epic",
      "One-Person Army Action",
      "Gun Fu"
    ]
  },
  {
    "Answer_Combination": "11132",
    "Top_Genres": [
      "Action Epic",
      "Adventure Epic",
      "Historical Epic"
    ]
  },
  {
    "Answer_Combination": "11133",
    "Top_Genres": [
      "Action Epic",
      "Conspiracy Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "11134",
    "Top_Genres": [
      "Action Epic",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "11141",
    "Top_Genres": [
      "Action Epic",
      "Superhero",
      "Sci-Fi Epic"
    ]
  },
  {
    "Answer_Combination": "11142",
    "Top_Genres": [
      "Action Epic",
      "Adventure Epic",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "11143",
    "Top_Genres": [
      "Action Epic",
      "Caper",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "11144",
    "Top_Genres": [
      "Action Epic",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "11211",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Superhero"
    ]
  },
  {
    "Answer_Combination": "11212",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Family"
    ]
  },
  {
    "Answer_Combination": "11213",
    "Top_Genres": [
      "Action",
      "Spy",
      "Thriller"
    ]
  },
  {
    "Answer_Combination": "11214",
    "Top_Genres": [
      "Action",
      "Buddy Cop",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "11221",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Disaster"
    ]
  },
  {
    "Answer_Combination": "11222",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "11223",
    "Top_Genres": [
      "Action",
      "Conspiracy Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "11224",
    "Top_Genres": [
      "Action",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "11231",
    "Top_Genres": [
      "Action",
      "Gun Fu",
      "Martial Arts"
    ]
  },
  {
    "Answer_Combination": "11232",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Survival"
    ]
  },
  {
    "Answer_Combination": "11233",
    "Top_Genres": [
      "Action",
      "Cyber Thriller",
      "Political Thriller"
    ]
  },
  {
    "Answer_Combination": "11234",
    "Top_Genres": [
      "Action",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "11241",
    "Top_Genres": [
      "Action",
      "Superhero",
      "Spy"
    ]
  },
  {
    "Answer_Combination": "11242",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "11243",
    "Top_Genres": [
      "Action",
      "Caper",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "11244",
    "Top_Genres": [
      "Action",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "11311",
    "Top_Genres": [
      "Action",
      "Sci-Fi",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "11312",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "11313",
    "Top_Genres": [
      "Action",
      "Cyber Thriller",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "11314",
    "Top_Genres": [
      "Action",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "11321",
    "Top_Genres": [
      "Action",
      "Sci-Fi",
      "Superhero"
    ]
  },
  {
    "Answer_Combination": "11322",
    "Top_Genres": [
      "Action",
      "Sci-Fi",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "11323",
    "Top_Genres": [
      "Action",
      "Cyber Thriller",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "11324",
    "Top_Genres": [
      "Action",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "11331",
    "Top_Genres": [
      "Action",
      "Gun Fu",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "11332",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "11333",
    "Top_Genres": [
      "Action",
      "Cyber Thriller",
      "Political Thriller"
    ]
  },
  {
    "Answer_Combination": "11334",
    "Top_Genres": [
      "Action",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "11341",
    "Top_Genres": [
      "Action",
      "Superhero",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "11342",
    "Top_Genres": [
      "Action",
      "Adventure",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "11343",
    "Top_Genres": [
      "Action",
      "Caper",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "11344",
    "Top_Genres": [
      "Action",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "11411",
    "Top_Genres": [
      "Action Comedy",
      "Superhero",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "11412",
    "Top_Genres": [
      "Action Comedy",
      "Adventure Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "11413",
    "Top_Genres": [
      "Action Comedy",
      "Spy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "11414",
    "Top_Genres": [
      "Action Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "11421",
    "Top_Genres": [
      "Action Comedy",
      "Superhero",
      "Family"
    ]
  },
  {
    "Answer_Combination": "11422",
    "Top_Genres": [
      "Action Comedy",
      "Adventure Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "11423",
    "Top_Genres": [
      "Action Comedy",
      "Caper",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "11424",
    "Top_Genres": [
      "Action Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "11431",
    "Top_Genres": [
      "Action Comedy",
      "Superhero",
      "Gun Fu"
    ]
  },
  {
    "Answer_Combination": "11432",
    "Top_Genres": [
      "Action Comedy",
      "Adventure Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "11433",
    "Top_Genres": [
      "Action Comedy",
      "Caper",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "11434",
    "Top_Genres": [
      "Action Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "11441",
    "Top_Genres": [
      "Action Comedy",
      "Superhero",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "11442",
    "Top_Genres": [
      "Action Comedy",
      "Adventure Comedy",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "11443",
    "Top_Genres": [
      "Action Comedy",
      "Parody",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "11444",
    "Top_Genres": [
      "Action Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "12111",
    "Top_Genres": [
      "Drama",
      "Coming-of-Age",
      "Biography"
    ]
  },
  {
    "Answer_Combination": "12112",
    "Top_Genres": [
      "Drama",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "12113",
    "Top_Genres": [
      "Drama",
      "Psychological Thriller",
      "Mystery"
    ]
  },
  {
    "Answer_Combination": "12114",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "12121",
    "Top_Genres": [
      "Drama",
      "Coming-of-Age",
      "Family"
    ]
  },
  {
    "Answer_Combination": "12122",
    "Top_Genres": [
      "Drama",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "12123",
    "Top_Genres": [
      "Drama",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "12124",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "12131",
    "Top_Genres": [
      "Drama",
      "Prison Drama",
      "Legal Drama"
    ]
  },
  {
    "Answer_Combination": "12132",
    "Top_Genres": [
      "Drama",
      "Coming-of-Age",
      "Period Drama"
    ]
  },
  {
    "Answer_Combination": "12133",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "12134",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "12141",
    "Top_Genres": [
      "Drama",
      "Family",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "12142",
    "Top_Genres": [
      "Drama",
      "Coming-of-Age",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "12143",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "12144",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "12211",
    "Top_Genres": [
      "Drama",
      "Romance",
      "Tragic Romance"
    ]
  },
  {
    "Answer_Combination": "12212",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "12213",
    "Top_Genres": [
      "Drama",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "12214",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "12221",
    "Top_Genres": [
      "Drama",
      "Romance",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "12222",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "12223",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "12224",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "12231",
    "Top_Genres": [
      "Drama",
      "Legal Drama",
      "Medical Drama"
    ]
  },
  {
    "Answer_Combination": "12232",
    "Top_Genres": [
      "Drama",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "12233",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "12234",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "12241",
    "Top_Genres": [
      "Drama",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "12242",
    "Top_Genres": [
      "Drama",
      "Comedy",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "12243",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "12244",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "12311",
    "Top_Genres": [
      "Drama",
      "Sci-Fi",
      "Psychological Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "12312",
    "Top_Genres": [
      "Drama",
      "Sci-Fi",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "12313",
    "Top_Genres": [
      "Drama",
      "Psychological Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "12314",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "12321",
    "Top_Genres": [
      "Drama",
      "Sci-Fi",
      "Psychological Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "12322",
    "Top_Genres": [
      "Drama",
      "Sci-Fi",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "12323",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "12324",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "12331",
    "Top_Genres": [
      "Drama",
      "Legal Drama",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "12332",
    "Top_Genres": [
      "Drama",
      "Sci-Fi",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "12333",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "12334",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "12341",
    "Top_Genres": [
      "Drama",
      "Feel-Good Romance",
      "Sci-Fi Romance"
    ]
  },
  {
    "Answer_Combination": "12342",
    "Top_Genres": [
      "Drama",
      "Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "12343",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "12344",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "12411",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "12412",
    "Top_Genres": [
      "Drama Comedy",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "12413",
    "Top_Genres": [
      "Drama Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "12414",
    "Top_Genres": [
      "Drama Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "12421",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "12422",
    "Top_Genres": [
      "Drama Comedy",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "12423",
    "Top_Genres": [
      "Drama Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "12424",
    "Top_Genres": [
      "Drama Comedy",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "12431",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "12432",
    "Top_Genres": [
      "Drama Comedy",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "12433",
    "Top_Genres": [
      "Drama Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "12434",
    "Top_Genres": [
      "Drama Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "12441",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "12442",
    "Top_Genres": [
      "Drama Comedy",
      "Slice of Life",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "12443",
    "Top_Genres": [
      "Drama Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "12444",
    "Top_Genres": [
      "Drama Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "13111",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "13112",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "13113",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "13114",
    "Top_Genres": [
      "Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13121",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Cop Drama"
    ]
  },
  {
    "Answer_Combination": "13122",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "13123",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "13124",
    "Top_Genres": [
      "Thriller",
      "Buddy Cop",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13131",
    "Top_Genres": [
      "Thriller",
      "Crime",
      "Gangster"
    ]
  },
  {
    "Answer_Combination": "13132",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Period Drama"
    ]
  },
  {
    "Answer_Combination": "13133",
    "Top_Genres": [
      "Thriller",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "13134",
    "Top_Genres": [
      "Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13141",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "13142",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13143",
    "Top_Genres": [
      "Thriller",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "13144",
    "Top_Genres": [
      "Thriller",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13211",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Serial Killer"
    ]
  },
  {
    "Answer_Combination": "13212",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "13213",
    "Top_Genres": [
      "Thriller",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "13214",
    "Top_Genres": [
      "Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13221",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Psychological Horror"
    ]
  },
  {
    "Answer_Combination": "13222",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "13223",
    "Top_Genres": [
      "Thriller",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "13224",
    "Top_Genres": [
      "Thriller",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13231",
    "Top_Genres": [
      "Thriller",
      "Crime",
      "Drug Crime"
    ]
  },
  {
    "Answer_Combination": "13232",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Period Drama"
    ]
  },
  {
    "Answer_Combination": "13233",
    "Top_Genres": [
      "Thriller",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "13234",
    "Top_Genres": [
      "Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13241",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "13242",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13243",
    "Top_Genres": [
      "Thriller",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "13244",
    "Top_Genres": [
      "Thriller",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "13311",
    "Top_Genres": [
      "Thriller",
      "Sci-Fi",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "13312",
    "Top_Genres": [
      "Thriller",
      "Sci-Fi",
      "Mystery"
    ]
  },
  {
    "Answer_Combination": "13313",
    "Top_Genres": [
      "Thriller",
      "Cyber Thriller",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "13314",
    "Top_Genres": [
      "Thriller",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "13321",
    "Top_Genres": [
      "Thriller",
      "Sci-Fi",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "13322",
    "Top_Genres": [
      "Thriller",
      "Sci-Fi",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "13323",
    "Top_Genres": [
      "Thriller",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "13324",
    "Top_Genres": [
      "Thriller",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "13331",
    "Top_Genres": [
      "Thriller",
      "Crime",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "13332",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "13333",
    "Top_Genres": [
      "Thriller",
      "Political Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "13334",
    "Top_Genres": [
      "Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13341",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "13342",
    "Top_Genres": [
      "Thriller",
      "Mystery",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13343",
    "Top_Genres": [
      "Thriller",
      "Cozy Mystery",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "13344",
    "Top_Genres": [
      "Thriller",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "13411",
    "Top_Genres": [
      "Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13412",
    "Top_Genres": [
      "Thriller Comedy",
      "Mystery",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13413",
    "Top_Genres": [
      "Thriller Comedy",
      "Mystery",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "13414",
    "Top_Genres": [
      "Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13421",
    "Top_Genres": [
      "Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13422",
    "Top_Genres": [
      "Thriller Comedy",
      "Mystery",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13423",
    "Top_Genres": [
      "Thriller Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "13424",
    "Top_Genres": [
      "Thriller Comedy",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13431",
    "Top_Genres": [
      "Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13432",
    "Top_Genres": [
      "Thriller Comedy",
      "Mystery",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13433",
    "Top_Genres": [
      "Thriller Comedy",
      "Mystery",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "13434",
    "Top_Genres": [
      "Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13441",
    "Top_Genres": [
      "Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "13442",
    "Top_Genres": [
      "Thriller Comedy",
      "Mystery Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "13443",
    "Top_Genres": [
      "Thriller Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "13444",
    "Top_Genres": [
      "Thriller Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14111",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14112",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14113",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14114",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14121",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14122",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14123",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14124",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14131",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14132",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14133",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14134",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14141",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14142",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14143",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14144",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14211",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14212",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "14213",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14214",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14221",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "14222",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "14223",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14224",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14231",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14232",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14233",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14234",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14241",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "14242",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "14243",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14244",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14311",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14312",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "14313",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "14314",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "14321",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14322",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "14323",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "14324",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "14331",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14332",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "14333",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "14334",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14341",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14342",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "14343",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "14344",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14411",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14412",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14413",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14414",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14421",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14422",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14423",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14424",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "14431",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14432",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14433",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14434",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14441",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14442",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "14443",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "14444",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "21111",
    "Top_Genres": [
      "Drama",
      "Biography",
      "History"
    ]
  },
  {
    "Answer_Combination": "21112",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "21113",
    "Top_Genres": [
      "Drama",
      "Mystery",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "21114",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "21121",
    "Top_Genres": [
      "Drama",
      "Family",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "21122",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "21123",
    "Top_Genres": [
      "Drama",
      "Suspense Mystery",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "21124",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "21131",
    "Top_Genres": [
      "Drama",
      "Prison Drama",
      "Legal Drama"
    ]
  },
  {
    "Answer_Combination": "21132",
    "Top_Genres": [
      "Drama",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "21133",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "21134",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "21141",
    "Top_Genres": [
      "Drama",
      "Family",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "21142",
    "Top_Genres": [
      "Drama",
      "Coming-of-Age",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "21143",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "21144",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "21211",
    "Top_Genres": [
      "Drama",
      "Romance",
      "Tragic Romance"
    ]
  },
  {
    "Answer_Combination": "21212",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "21213",
    "Top_Genres": [
      "Drama",
      "Suspense Mystery",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "21214",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "21221",
    "Top_Genres": [
      "Drama",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "21222",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "21223",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "21224",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "21231",
    "Top_Genres": [
      "Drama",
      "Legal Drama",
      "Medical Drama"
    ]
  },
  {
    "Answer_Combination": "21232",
    "Top_Genres": [
      "Drama",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "21233",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "21234",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "21241",
    "Top_Genres": [
      "Drama",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "21242",
    "Top_Genres": [
      "Drama",
      "Comedy",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "21243",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "21244",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "21311",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Mystery"
    ]
  },
  {
    "Answer_Combination": "21312",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Psychological Drama"
    ]
  },
  {
    "Answer_Combination": "21313",
    "Top_Genres": [
      "Drama",
      "Psychological Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "21314",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "21321",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Mystery"
    ]
  },
  {
    "Answer_Combination": "21322",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Psychological Drama"
    ]
  },
  {
    "Answer_Combination": "21323",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "21324",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "21331",
    "Top_Genres": [
      "Drama",
      "Legal Drama",
      "Medical Drama"
    ]
  },
  {
    "Answer_Combination": "21332",
    "Top_Genres": [
      "Drama",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "21333",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "21334",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "21341",
    "Top_Genres": [
      "Drama",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "21342",
    "Top_Genres": [
      "Drama",
      "Comedy",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "21343",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "21344",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "21411",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "21412",
    "Top_Genres": [
      "Drama Comedy",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "21413",
    "Top_Genres": [
      "Drama Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "21414",
    "Top_Genres": [
      "Drama Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "21421",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "21422",
    "Top_Genres": [
      "Drama Comedy",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "21423",
    "Top_Genres": [
      "Drama Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "21424",
    "Top_Genres": [
      "Drama Comedy",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "21431",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "21432",
    "Top_Genres": [
      "Drama Comedy",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "21433",
    "Top_Genres": [
      "Drama Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "21434",
    "Top_Genres": [
      "Drama Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "21441",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "21442",
    "Top_Genres": [
      "Drama Comedy",
      "Slice of Life",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "21443",
    "Top_Genres": [
      "Drama Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "21444",
    "Top_Genres": [
      "Drama Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "22111",
    "Top_Genres": [
      "Drama",
      "Biography",
      "History"
    ]
  },
  {
    "Answer_Combination": "22112",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "22113",
    "Top_Genres": [
      "Drama",
      "Mystery",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "22114",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "22121",
    "Top_Genres": [
      "Drama",
      "Family",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "22122",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "22123",
    "Top_Genres": [
      "Drama",
      "Suspense Mystery",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "22124",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "22131",
    "Top_Genres": [
      "Drama",
      "Prison Drama",
      "Legal Drama"
    ]
  },
  {
    "Answer_Combination": "22132",
    "Top_Genres": [
      "Drama",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "22133",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "22134",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "22141",
    "Top_Genres": [
      "Drama",
      "Family",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "22142",
    "Top_Genres": [
      "Drama",
      "Coming-of-Age",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "22143",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "22144",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "22211",
    "Top_Genres": [
      "Drama",
      "Romance",
      "Tragic Romance"
    ]
  },
  {
    "Answer_Combination": "22212",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "22213",
    "Top_Genres": [
      "Drama",
      "Suspense Mystery",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "22214",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "22221",
    "Top_Genres": [
      "Drama",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "22222",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "22223",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "22224",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "22231",
    "Top_Genres": [
      "Drama",
      "Legal Drama",
      "Medical Drama"
    ]
  },
  {
    "Answer_Combination": "22232",
    "Top_Genres": [
      "Drama",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "22233",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "22234",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "22241",
    "Top_Genres": [
      "Drama",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "22242",
    "Top_Genres": [
      "Drama",
      "Comedy",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "22243",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "22244",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "22311",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Mystery"
    ]
  },
  {
    "Answer_Combination": "22312",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Psychological Drama"
    ]
  },
  {
    "Answer_Combination": "22313",
    "Top_Genres": [
      "Drama",
      "Psychological Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "22314",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "22321",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Mystery"
    ]
  },
  {
    "Answer_Combination": "22322",
    "Top_Genres": [
      "Drama",
      "Slice of Life",
      "Psychological Drama"
    ]
  },
  {
    "Answer_Combination": "22323",
    "Top_Genres": [
      "Drama",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "22324",
    "Top_Genres": [
      "Drama",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "22331",
    "Top_Genres": [
      "Drama",
      "Legal Drama",
      "Medical Drama"
    ]
  },
  {
    "Answer_Combination": "22332",
    "Top_Genres": [
      "Drama",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "22333",
    "Top_Genres": [
      "Drama",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "22334",
    "Top_Genres": [
      "Drama",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "22341",
    "Top_Genres": [
      "Drama",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "22342",
    "Top_Genres": [
      "Drama",
      "Comedy",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "22343",
    "Top_Genres": [
      "Drama",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "22344",
    "Top_Genres": [
      "Drama",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "22411",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "22412",
    "Top_Genres": [
      "Drama Comedy",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "22413",
    "Top_Genres": [
      "Drama Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "22414",
    "Top_Genres": [
      "Drama Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "22421",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "22422",
    "Top_Genres": [
      "Drama Comedy",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "22423",
    "Top_Genres": [
      "Drama Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "22424",
    "Top_Genres": [
      "Drama Comedy",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "22431",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "22432",
    "Top_Genres": [
      "Drama Comedy",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "22433",
    "Top_Genres": [
      "Drama Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "22434",
    "Top_Genres": [
      "Drama Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "22441",
    "Top_Genres": [
      "Drama Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "22442",
    "Top_Genres": [
      "Drama Comedy",
      "Slice of Life",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "22443",
    "Top_Genres": [
      "Drama Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "22444",
    "Top_Genres": [
      "Drama Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "23111",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Hard-boiled Detective"
    ]
  },
  {
    "Answer_Combination": "23112",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "23113",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "23114",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23121",
    "Top_Genres": [
      "Mystery",
      "Cop Drama",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "23122",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "23123",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "23124",
    "Top_Genres": [
      "Mystery",
      "Buddy Cop",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "23131",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Gangster"
    ]
  },
  {
    "Answer_Combination": "23132",
    "Top_Genres": [
      "Mystery",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "23133",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "23134",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23141",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "23142",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "23143",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "23144",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "23211",
    "Top_Genres": [
      "Mystery",
      "Serial Killer",
      "True Crime"
    ]
  },
  {
    "Answer_Combination": "23212",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "23213",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "23214",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23221",
    "Top_Genres": [
      "Mystery",
      "Psychological Horror",
      "Monster Horror"
    ]
  },
  {
    "Answer_Combination": "23222",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Psychological Drama"
    ]
  },
  {
    "Answer_Combination": "23223",
    "Top_Genres": [
      "Mystery",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "23224",
    "Top_Genres": [
      "Mystery",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "23231",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Drug Crime"
    ]
  },
  {
    "Answer_Combination": "23232",
    "Top_Genres": [
      "Mystery",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "23233",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "23234",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23241",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "23242",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "23243",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "23244",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "23311",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "23312",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "23313",
    "Top_Genres": [
      "Mystery",
      "Cyber Thriller",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "23314",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "23321",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "23322",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "23323",
    "Top_Genres": [
      "Mystery",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "23324",
    "Top_Genres": [
      "Mystery",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "23331",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "23332",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "23333",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "23334",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23341",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "23342",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "23343",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "23344",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "23411",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23412",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "23413",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23414",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23421",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23422",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "23423",
    "Top_Genres": [
      "Mystery Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "23424",
    "Top_Genres": [
      "Mystery Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "23431",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23432",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "23433",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23434",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23441",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "23442",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "23443",
    "Top_Genres": [
      "Mystery Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "23444",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24111",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24112",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24113",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24114",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24121",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24122",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24123",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24124",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24131",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24132",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24133",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24134",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24141",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24142",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24143",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24144",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24211",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24212",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "24213",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24214",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24221",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "24222",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "24223",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24224",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24231",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24232",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24233",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24234",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24241",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "24242",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "24243",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24244",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24311",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24312",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "24313",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "24314",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "24321",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24322",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "24323",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "24324",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "24331",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24332",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "24333",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "24334",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24341",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24342",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "24343",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "24344",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24411",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24412",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24413",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24414",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24421",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24422",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24423",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24424",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "24431",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24432",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24433",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24434",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24441",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24442",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "24443",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "24444",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "31111",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Hard-boiled Detective"
    ]
  },
  {
    "Answer_Combination": "31112",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "31113",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "31114",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31121",
    "Top_Genres": [
      "Mystery",
      "Cop Drama",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "31122",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "31123",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "31124",
    "Top_Genres": [
      "Mystery",
      "Buddy Cop",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "31131",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Gangster"
    ]
  },
  {
    "Answer_Combination": "31132",
    "Top_Genres": [
      "Mystery",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "31133",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "31134",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31141",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "31142",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "31143",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "31144",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "31211",
    "Top_Genres": [
      "Mystery",
      "Serial Killer",
      "True Crime"
    ]
  },
  {
    "Answer_Combination": "31212",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "31213",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "31214",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31221",
    "Top_Genres": [
      "Mystery",
      "Psychological Horror",
      "Monster Horror"
    ]
  },
  {
    "Answer_Combination": "31222",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Psychological Drama"
    ]
  },
  {
    "Answer_Combination": "31223",
    "Top_Genres": [
      "Mystery",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "31224",
    "Top_Genres": [
      "Mystery",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "31231",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Drug Crime"
    ]
  },
  {
    "Answer_Combination": "31232",
    "Top_Genres": [
      "Mystery",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "31233",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "31234",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31241",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "31242",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "31243",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "31244",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "31311",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "31312",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "31313",
    "Top_Genres": [
      "Mystery",
      "Cyber Thriller",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "31314",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "31321",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "31322",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "31323",
    "Top_Genres": [
      "Mystery",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "31324",
    "Top_Genres": [
      "Mystery",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "31331",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "31332",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "31333",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "31334",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31341",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "31342",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "31343",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "31344",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "31411",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31412",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "31413",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31414",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31421",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31422",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "31423",
    "Top_Genres": [
      "Mystery Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "31424",
    "Top_Genres": [
      "Mystery Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "31431",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31432",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "31433",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31434",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31441",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "31442",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "31443",
    "Top_Genres": [
      "Mystery Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "31444",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "32111",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Hard-boiled Detective"
    ]
  },
  {
    "Answer_Combination": "32112",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "32113",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "32114",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32121",
    "Top_Genres": [
      "Mystery",
      "Cop Drama",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "32122",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "32123",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "32124",
    "Top_Genres": [
      "Mystery",
      "Buddy Cop",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "32131",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Gangster"
    ]
  },
  {
    "Answer_Combination": "32132",
    "Top_Genres": [
      "Mystery",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "32133",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "32134",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32141",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "32142",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "32143",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "32144",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "32211",
    "Top_Genres": [
      "Mystery",
      "Serial Killer",
      "True Crime"
    ]
  },
  {
    "Answer_Combination": "32212",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "32213",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "32214",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32221",
    "Top_Genres": [
      "Mystery",
      "Psychological Horror",
      "Monster Horror"
    ]
  },
  {
    "Answer_Combination": "32222",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Psychological Drama"
    ]
  },
  {
    "Answer_Combination": "32223",
    "Top_Genres": [
      "Mystery",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "32224",
    "Top_Genres": [
      "Mystery",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "32231",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Drug Crime"
    ]
  },
  {
    "Answer_Combination": "32232",
    "Top_Genres": [
      "Mystery",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "32233",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "32234",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32241",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "32242",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "32243",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "32244",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "32311",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "32312",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "32313",
    "Top_Genres": [
      "Mystery",
      "Cyber Thriller",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "32314",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "32321",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "32322",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "32323",
    "Top_Genres": [
      "Mystery",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "32324",
    "Top_Genres": [
      "Mystery",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "32331",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "32332",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "32333",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "32334",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32341",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "32342",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "32343",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "32344",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "32411",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32412",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "32413",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32414",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32421",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32422",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "32423",
    "Top_Genres": [
      "Mystery Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "32424",
    "Top_Genres": [
      "Mystery Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "32431",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32432",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "32433",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32434",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32441",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "32442",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "32443",
    "Top_Genres": [
      "Mystery Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "32444",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "33111",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33112",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33113",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "33114",
    "Top_Genres": [
      "Cyber Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33121",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33122",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "33123",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "33124",
    "Top_Genres": [
      "Cyber Thriller",
      "Buddy Cop",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "33131",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Gangster"
    ]
  },
  {
    "Answer_Combination": "33132",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33133",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Political Thriller"
    ]
  },
  {
    "Answer_Combination": "33134",
    "Top_Genres": [
      "Cyber Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33141",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "33142",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "33143",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "33144",
    "Top_Genres": [
      "Cyber Thriller",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "33211",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Sci-Fi Horror"
    ]
  },
  {
    "Answer_Combination": "33212",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33213",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "33214",
    "Top_Genres": [
      "Cyber Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33221",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Psychological Horror"
    ]
  },
  {
    "Answer_Combination": "33222",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "33223",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "33224",
    "Top_Genres": [
      "Cyber Thriller",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "33231",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Drug Crime"
    ]
  },
  {
    "Answer_Combination": "33232",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33233",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Political Thriller"
    ]
  },
  {
    "Answer_Combination": "33234",
    "Top_Genres": [
      "Cyber Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33241",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "33242",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "33243",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "33244",
    "Top_Genres": [
      "Cyber Thriller",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "33311",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33312",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33313",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Political Thriller"
    ]
  },
  {
    "Answer_Combination": "33314",
    "Top_Genres": [
      "Cyber Thriller",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "33321",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "33322",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "33323",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "33324",
    "Top_Genres": [
      "Cyber Thriller",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "33331",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Political Thriller"
    ]
  },
  {
    "Answer_Combination": "33332",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "33333",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Political Thriller"
    ]
  },
  {
    "Answer_Combination": "33334",
    "Top_Genres": [
      "Cyber Thriller",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33341",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "33342",
    "Top_Genres": [
      "Cyber Thriller",
      "Sci-Fi",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "33343",
    "Top_Genres": [
      "Cyber Thriller",
      "Cyberpunk",
      "Heist"
    ]
  },
  {
    "Answer_Combination": "33344",
    "Top_Genres": [
      "Cyber Thriller",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "33411",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33412",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "33413",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33414",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33421",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33422",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "33423",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "33424",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "33431",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33432",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "33433",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33434",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33441",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33442",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Sci-Fi Comedy",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "33443",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "33444",
    "Top_Genres": [
      "Cyber Thriller Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34111",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34112",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34113",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34114",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34121",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34122",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34123",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34124",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34131",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34132",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34133",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34134",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34141",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34142",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34143",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34144",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34211",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34212",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "34213",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34214",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34221",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "34222",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "34223",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34224",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34231",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34232",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34233",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34234",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34241",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "34242",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "34243",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34244",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34311",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34312",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "34313",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "34314",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "34321",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34322",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "34323",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "34324",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "34331",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34332",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "34333",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "34334",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34341",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34342",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "34343",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "34344",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34411",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34412",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34413",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34414",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34421",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34422",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34423",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34424",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "34431",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34432",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34433",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34434",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34441",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34442",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "34443",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "34444",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41111",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41112",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41113",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41114",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41121",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41122",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41123",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41124",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41131",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41132",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41133",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41134",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41141",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41142",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41143",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41144",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41211",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41212",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "41213",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41214",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41221",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "41222",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "41223",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41224",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41231",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41232",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41233",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41234",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41241",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "41242",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "41243",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41244",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41311",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41312",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "41313",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "41314",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "41321",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41322",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "41323",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "41324",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "41331",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41332",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "41333",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "41334",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41341",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "41342",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "41343",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "41344",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41411",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41412",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41413",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41414",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41421",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41422",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41423",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41424",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "41431",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41432",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41433",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41434",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41441",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41442",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "41443",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "41444",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "42111",
    "Top_Genres": [
      "Comedy",
      "Biography",
      "Mockumentary"
    ]
  },
  {
    "Answer_Combination": "42112",
    "Top_Genres": [
      "Comedy",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "42113",
    "Top_Genres": [
      "Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "42114",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42121",
    "Top_Genres": [
      "Comedy",
      "Family",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "42122",
    "Top_Genres": [
      "Comedy",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "42123",
    "Top_Genres": [
      "Comedy",
      "Suspense Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "42124",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "42131",
    "Top_Genres": [
      "Comedy",
      "Prison Comedy",
      "Legal Comedy"
    ]
  },
  {
    "Answer_Combination": "42132",
    "Top_Genres": [
      "Comedy",
      "Period Comedy",
      "Costume Comedy"
    ]
  },
  {
    "Answer_Combination": "42133",
    "Top_Genres": [
      "Comedy",
      "Political Satire",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "42134",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42141",
    "Top_Genres": [
      "Comedy",
      "Family",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "42142",
    "Top_Genres": [
      "Comedy",
      "Coming-of-Age",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "42143",
    "Top_Genres": [
      "Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "42144",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "42211",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Tragic Romance"
    ]
  },
  {
    "Answer_Combination": "42212",
    "Top_Genres": [
      "Comedy",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "42213",
    "Top_Genres": [
      "Comedy",
      "Suspense Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "42214",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42221",
    "Top_Genres": [
      "Comedy",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "42222",
    "Top_Genres": [
      "Comedy",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "42223",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42224",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "42231",
    "Top_Genres": [
      "Comedy",
      "Legal Comedy",
      "Medical Comedy"
    ]
  },
  {
    "Answer_Combination": "42232",
    "Top_Genres": [
      "Comedy",
      "Period Comedy",
      "Costume Comedy"
    ]
  },
  {
    "Answer_Combination": "42233",
    "Top_Genres": [
      "Comedy",
      "Political Satire",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "42234",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42241",
    "Top_Genres": [
      "Comedy",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "42242",
    "Top_Genres": [
      "Comedy",
      "Comedy",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "42243",
    "Top_Genres": [
      "Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "42244",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "42311",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Mockumentary"
    ]
  },
  {
    "Answer_Combination": "42312",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "42313",
    "Top_Genres": [
      "Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "42314",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "42321",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Mockumentary"
    ]
  },
  {
    "Answer_Combination": "42322",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "42323",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42324",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "42331",
    "Top_Genres": [
      "Comedy",
      "Legal Comedy",
      "Medical Comedy"
    ]
  },
  {
    "Answer_Combination": "42332",
    "Top_Genres": [
      "Comedy",
      "Period Comedy",
      "Costume Comedy"
    ]
  },
  {
    "Answer_Combination": "42333",
    "Top_Genres": [
      "Comedy",
      "Political Satire",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "42334",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42341",
    "Top_Genres": [
      "Comedy",
      "Feel-Good Romance",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "42342",
    "Top_Genres": [
      "Comedy",
      "Comedy",
      "Romantic Comedy"
    ]
  },
  {
    "Answer_Combination": "42343",
    "Top_Genres": [
      "Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "42344",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "42411",
    "Top_Genres": [
      "Comedy Comedy",
      "Romantic Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "42412",
    "Top_Genres": [
      "Comedy Comedy",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "42413",
    "Top_Genres": [
      "Comedy Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "42414",
    "Top_Genres": [
      "Comedy Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42421",
    "Top_Genres": [
      "Comedy Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "42422",
    "Top_Genres": [
      "Comedy Comedy",
      "Slice of Life",
      "Coming-of-Age"
    ]
  },
  {
    "Answer_Combination": "42423",
    "Top_Genres": [
      "Comedy Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42424",
    "Top_Genres": [
      "Comedy Comedy",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "42431",
    "Top_Genres": [
      "Comedy Comedy",
      "Romantic Comedy",
      "Family"
    ]
  },
  {
    "Answer_Combination": "42432",
    "Top_Genres": [
      "Comedy Comedy",
      "Coming-of-Age",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "42433",
    "Top_Genres": [
      "Comedy Comedy",
      "Mystery",
      "Cozy Mystery"
    ]
  },
  {
    "Answer_Combination": "42434",
    "Top_Genres": [
      "Comedy Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "42441",
    "Top_Genres": [
      "Comedy Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "42442",
    "Top_Genres": [
      "Comedy Comedy",
      "Slice of Life",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "42443",
    "Top_Genres": [
      "Comedy Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "42444",
    "Top_Genres": [
      "Comedy Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "43111",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Hard-boiled Detective"
    ]
  },
  {
    "Answer_Combination": "43112",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "43113",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "43114",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43121",
    "Top_Genres": [
      "Mystery",
      "Cop Drama",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "43122",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "43123",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Police Procedural"
    ]
  },
  {
    "Answer_Combination": "43124",
    "Top_Genres": [
      "Mystery",
      "Buddy Cop",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "43131",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Gangster"
    ]
  },
  {
    "Answer_Combination": "43132",
    "Top_Genres": [
      "Mystery",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "43133",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "43134",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43141",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "43142",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "43143",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "43144",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "43211",
    "Top_Genres": [
      "Mystery",
      "Serial Killer",
      "True Crime"
    ]
  },
  {
    "Answer_Combination": "43212",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Crime"
    ]
  },
  {
    "Answer_Combination": "43213",
    "Top_Genres": [
      "Mystery",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "43214",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43221",
    "Top_Genres": [
      "Mystery",
      "Psychological Horror",
      "Monster Horror"
    ]
  },
  {
    "Answer_Combination": "43222",
    "Top_Genres": [
      "Mystery",
      "Drama",
      "Psychological Drama"
    ]
  },
  {
    "Answer_Combination": "43223",
    "Top_Genres": [
      "Mystery",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "43224",
    "Top_Genres": [
      "Mystery",
      "Buddy Comedy",
      "Comedy"
    ]
  },
  {
    "Answer_Combination": "43231",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Drug Crime"
    ]
  },
  {
    "Answer_Combination": "43232",
    "Top_Genres": [
      "Mystery",
      "Period Drama",
      "Costume Drama"
    ]
  },
  {
    "Answer_Combination": "43233",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "43234",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43241",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "43242",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Caper"
    ]
  },
  {
    "Answer_Combination": "43243",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "43244",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "43311",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "43312",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "43313",
    "Top_Genres": [
      "Mystery",
      "Cyber Thriller",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "43314",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "43321",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "43322",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Drama"
    ]
  },
  {
    "Answer_Combination": "43323",
    "Top_Genres": [
      "Mystery",
      "Psychological Drama",
      "Psychological Thriller"
    ]
  },
  {
    "Answer_Combination": "43324",
    "Top_Genres": [
      "Mystery",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "43331",
    "Top_Genres": [
      "Mystery",
      "Crime",
      "Cyberpunk"
    ]
  },
  {
    "Answer_Combination": "43332",
    "Top_Genres": [
      "Mystery",
      "Sci-Fi",
      "Dystopian Sci-Fi"
    ]
  },
  {
    "Answer_Combination": "43333",
    "Top_Genres": [
      "Mystery",
      "Political Thriller",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "43334",
    "Top_Genres": [
      "Mystery",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43341",
    "Top_Genres": [
      "Mystery",
      "Heist",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "43342",
    "Top_Genres": [
      "Mystery",
      "Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "43343",
    "Top_Genres": [
      "Mystery",
      "Cozy Mystery",
      "Cyber Thriller"
    ]
  },
  {
    "Answer_Combination": "43344",
    "Top_Genres": [
      "Mystery",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "43411",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43412",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "43413",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43414",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43421",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43422",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "43423",
    "Top_Genres": [
      "Mystery Comedy",
      "Psychological Thriller",
      "Suspense Mystery"
    ]
  },
  {
    "Answer_Combination": "43424",
    "Top_Genres": [
      "Mystery Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "43431",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43432",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "43433",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43434",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43441",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "43442",
    "Top_Genres": [
      "Mystery Comedy",
      "Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "43443",
    "Top_Genres": [
      "Mystery Comedy",
      "Cozy Mystery",
      "Whodunnit"
    ]
  },
  {
    "Answer_Combination": "43444",
    "Top_Genres": [
      "Mystery Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44111",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44112",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44113",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44114",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44121",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44122",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44123",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44124",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44131",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44132",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44133",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44134",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44141",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44142",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44143",
    "Top_Genres": [
      "Comedy",
      "Farce",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44144",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44211",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44212",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "44213",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44214",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44221",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "44222",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "44223",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44224",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44231",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44232",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44233",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44234",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44241",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Feel-Good Romance"
    ]
  },
  {
    "Answer_Combination": "44242",
    "Top_Genres": [
      "Comedy",
      "Romantic Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "44243",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44244",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44311",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44312",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Dark Comedy"
    ]
  },
  {
    "Answer_Combination": "44313",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "44314",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "44321",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44322",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "44323",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "44324",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "44331",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44332",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "44333",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "44334",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44341",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Farce"
    ]
  },
  {
    "Answer_Combination": "44342",
    "Top_Genres": [
      "Comedy",
      "Sci-Fi Comedy",
      "Slice of Life"
    ]
  },
  {
    "Answer_Combination": "44343",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Sci-Fi Comedy"
    ]
  },
  {
    "Answer_Combination": "44344",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44411",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44412",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44413",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44414",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44421",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44422",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44423",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44424",
    "Top_Genres": [
      "Comedy",
      "Buddy Comedy",
      "Parody"
    ]
  },
  {
    "Answer_Combination": "44431",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44432",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44433",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44434",
    "Top_Genres": [
      "Comedy",
      "Dark Comedy",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44441",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44442",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  },
  {
    "Answer_Combination": "44443",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Satire"
    ]
  },
  {
    "Answer_Combination": "44444",
    "Top_Genres": [
      "Comedy",
      "Parody",
      "Slapstick"
    ]
  }
]

	
export default function Quiz() {
  const location = useLocation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [allResults, setAllResults] = useState<string[]>(location.state?.previousResults || [])
  const navigate = useNavigate()

  // If we somehow land here without starting the quiz, redirect to home
  if (!location.state?.started) {
    navigate('/')
    return null
  }

  // Ensure current question exists
  const currentQuestionData = quizQuestions[currentQuestion]
  if (!currentQuestionData) {
    navigate('/')
    return null
  }

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Show alert with current results
      const resultString = newAnswers.join('')
      alert(`Current quiz results: ${resultString}\nAll results: ${allResults.join(', ')}`)
      
      // Update all results
      const updatedResults = [...allResults, resultString]
      setAllResults(updatedResults)

      // Navigate to completion screen
      navigate('/complete', { state: { previousResults: updatedResults } })
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div 
                className="bg-pink-500 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-300">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {currentQuestionData.question_text}
            </h2>
            
            {/* Answers */}
            <div className="space-y-4">
              {currentQuestionData.answers.map((answer, index) => {
                const Icon = answer.icon
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer.answer_value)}
                    className="w-full text-left bg-white/5 hover:bg-white/10 p-6 rounded-lg transition-all duration-200 flex items-center gap-6"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-pink-400" />
                    </div>
                    <span className="text-lg">{answer.answer_text}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quiz Info */}
          <div className="flex items-center gap-4 text-gray-300">
            <Brain className="w-6 h-6 text-pink-400" />
            <span>Your answers help our AI find the perfect movie match!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
