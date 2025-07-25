const tracks = [
  {
    id: 1,
    title: "Eternal Sunset",
    artist: "Skyline Sounds",
    duration: 9.36,
    size_mb: 8.57,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1OTBf/Charlie%20Lewis%20-%20Constant.mp3",
  },
  {
    id: 2,
    title: "City Nights",
    artist: "Urban Beats",
    duration: 4.24,
    size_mb: 3.88,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0NzBf/Charlie%20Lewis%20-%20But%20I%20Don%27t%20Know.mp3",
  },
  {
    id: 3,
    title: "Ocean Breeze",
    artist: "Deep Wave",
    duration: 3.93,
    size_mb: 3.6,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1OTRf/Charlie%20Lewis%20-%20For%20Us.mp3",
  },
  {
    id: 4,
    title: "Morning Dew",
    artist: "Fresh Air",
    duration: 8.47,
    size_mb: 7.75,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1OTZf/Charlie%20Lewis%20-%20Holdover.mp3",
  },
  {
    id: 5,
    title: "Starlit Road",
    artist: "Cosmic Rhythms",
    duration: 2.2,
    size_mb: 2.01,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1NzZf/Charlie%20Lewis%20-%20Never%20Going%20Home.mp3",
  },
  {
    id: 6,
    title: "Midnight Escape",
    artist: "Nightfall",
    duration: 5.23,
    size_mb: 4.77,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MzFf/Charlie%20Lewis%20-%20Penelope.mp3",
  },
  {
    id: 7,
    title: "Electric Heart",
    artist: "Volt Sparks",
    duration: 6.85,
    size_mb: 6.33,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1NDlf/Charlie%20Lewis%20-%20Rhondoh.mp3",
  },
  {
    id: 8,
    title: "Sunrise Over The City",
    artist: "Dawn Architects",
    duration: 4.96,
    size_mb: 4.57,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MTJf/Charlie%20Lewis%20-%20Soft%20Fanfare.mp3",
  },
  {
    id: 9,
    title: "Lost in the Echo",
    artist: "Wave Form",
    duration: 7.56,
    size_mb: 6.98,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MDNf/Charlie%20Lewis%20-%20Twelve%20Tones%20for%20Candace.mp3",
  },
  {
    id: 10,
    title: "Neon Pulse",
    artist: "Urban Vibes",
    duration: 3.87,
    size_mb: 3.54,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1NTVf/Charlie%20Lewis%20-%20View%20from%20the%20Tower.mp3",
  },
  {
    id: 11,
    title: "Underwater Dreams",
    artist: "Aqua Groove",
    duration: 6.62,
    size_mb: 6.09,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0OTZf/Circus%20Marcus%20-%20Pompas%20de%20Jab%C3%B3n.mp3",
  },
  {
    id: 12,
    title: "Desert Mirage",
    artist: "Sahara Beats",
    duration: 4.77,
    size_mb: 4.38,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1NjNf/Fabian%20Measures%20-%20Did%20you%20know_%20%28Curiouser%20and%20curiouser%29.mp3",
  },
  {
    id: 13,
    title: "Night Sky",
    artist: "Celestial Sounds",
    duration: 3.94,
    size_mb: 3.61,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MDRf/Fabian%20Measures%20-%20LifeCycle.mp3",
  },
  {
    id: 14,
    title: "Horizon Shift",
    artist: "Future Horizons",
    duration: 7.33,
    size_mb: 6.74,
    encoded_audio: "https://od.lk/s/NzBfMjcwMjI0MzJf/Hawkin%20-%20Woods.mp3",
  },
  {
    id: 15,
    title: "Echoes of the Past",
    artist: "Timeless Waves",
    duration: 5.64,
    size_mb: 5.16,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0Mjlf/Il%20Sogno%20Del%20Marinaio%20-%20Partisian%20Song.mp3",
  },
  {
    id: 16,
    title: "Rising Tide",
    artist: "Ocean Flow",
    duration: 6.41,
    size_mb: 5.88,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0NzNf/Jahzzar%20-%20Breaking%20Bad.mp3",
  },
  {
    id: 17,
    title: "Blue Horizon",
    artist: "Sky Coast",
    duration: 8.15,
    size_mb: 7.47,
    encoded_audio: "https://od.lk/s/NzBfMjcwMjI0NjJf/Jahzzar%20-%20Change.mp3",
  },
  {
    id: 18,
    title: "Northern Lights",
    artist: "Aurora Dream",
    duration: 6.94,
    size_mb: 6.39,
    encoded_audio: "https://od.lk/s/NzBfMjcwMjI0NDVf/Jahzzar%20-%20T800.mp3",
  },
  {
    id: 19,
    title: "Silent Night",
    artist: "Solitude Beats",
    duration: 4.48,
    size_mb: 4.13,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MDBf/JBlanked%20-%20Always%20Something%20%28Instrumental%29%29.mp3",
  },
  {
    id: 20,
    title: "Moonlit Journey",
    artist: "Lunar Orchestra",
    duration: 9.23,
    size_mb: 8.44,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0NThf/JBlanked%20-%20Boro%20%28ft.%20Debo%2C%20Mar%24haine%2C%20%26%20Seth%20Simmons%29.mp3",
  },
  {
    id: 21,
    title: "Frozen Moments",
    artist: "Ice Queen",
    duration: 4.03,
    size_mb: 3.71,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0NDBf/JBlanked%20-%20Cobie%20Sample.mp3",
  },
  {
    id: 22,
    title: "Violet Sky",
    artist: "Dusk Echo",
    duration: 7.29,
    size_mb: 6.73,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MTVf/JBlanked%20-%20Danny%20Boy%20%28Guitar%20Arrangement%20Instrumental%29.mp3",
  },
  {
    id: 23,
    title: "Waves of Change",
    artist: "Fluid Motion",
    duration: 6.75,
    size_mb: 6.17,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MTlf/JBlanked%20-%20Hardwork%20%28Instrumental%29.mp3",
  },
  {
    id: 24,
    title: "Crystal Lake",
    artist: "Nature Spirits",
    duration: 5.49,
    size_mb: 5.05,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0OTlf/JBlanked%20-%20I%27m%20Down%20%28ft.%20Dolphie%2C%20Seth%20Simmons%2C%20%26%20Soul%20Frenzy%29.mp3",
  },
  {
    id: 25,
    title: "Timeless Moment",
    artist: "Vintage Rhythms",
    duration: 7.64,
    size_mb: 7.02,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0Nzdf/JBlanked%20-%20I%27m%20Down%20%28Instrumental%29.mp3",
  },
  {
    id: 26,
    title: "Galaxy's Edge",
    artist: "Stellar Frequencies",
    duration: 8.28,
    size_mb: 7.64,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0Nzdf/JBlanked%20-%20I%27m%20Down%20%28Instrumental%29.mp3",
  },
  {
    id: 27,
    title: "Infinite Dreams",
    artist: "Endless Journey",
    duration: 6.52,
    size_mb: 5.99,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1NzFf/JBlanked%20-%20Tenderly.mp3",
  },
  {
    id: 28,
    title: "Solar Flare",
    artist: "Heatwave",
    duration: 5.89,
    size_mb: 5.42,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MjZf/JBlanked%20-%20True%20Friends.mp3",
  },
  {
    id: 29,
    title: "Into the Wilderness",
    artist: "Wild Roots",
    duration: 4.21,
    size_mb: 3.88,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1NDBf/JBlanked%20-%20Yet%20%28ft.%20OD%29.mp3",
  },
  {
    id: 30,
    title: "Echo in the Mountains",
    artist: "Alpine Voice",
    duration: 8.14,
    size_mb: 7.46,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0MjZf/Raul%20Diaz%20Palomar%20-%20Abdal%C3%A1%20%28demo%2C%20bonus%29.mp3",
  },
  {
    id: 31,
    title: "Morning Mist",
    artist: "Cloudrise",
    duration: 6.47,
    size_mb: 5.95,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0MjZf/Raul%20Diaz%20Palomar%20-%20Abdal%C3%A1%20%28demo%2C%20bonus%29.mp3",
  },
  {
    id: 32,
    title: "Chasing the Moon",
    artist: "Lunar Run",
    duration: 4.92,
    size_mb: 4.5,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0MTFf/SalmonLikeTheFish%20-%20Sequoia.mp3",
  },
  {
    id: 33,
    title: "Whispers of the Forest",
    artist: "Green Echoes",
    duration: 7.02,
    size_mb: 6.44,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0MjRf/SalmonLikeTheFish%20-%20Shenandoah.mp3",
  },
  {
    id: 34,
    title: "Crimson Sunset",
    artist: "Red Sky",
    duration: 5.8,
    size_mb: 5.33,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0MTlf/SalmonLikeTheFish%20-%20Yellowstone.mp3",
  },
  {
    id: 35,
    title: "Digital Dreams",
    artist: "Techno Pulse",
    duration: 6.33,
    size_mb: 5.9,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0MDdf/SalmonLikeTheFish%20-%20Zion.mp3",
  },
  {
    id: 36,
    title: "Gravity Waves",
    artist: "Planetary Sound",
    duration: 7.15,
    size_mb: 6.56,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0ODRf/Squire%20Tuck%20-%20A%20Journey%20In%20To%20The%20Great%20Unknown.mp3",
  },
  {
    id: 37,
    title: "Electric Dreams",
    artist: "Neon Flux",
    duration: 5.91,
    size_mb: 5.46,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0ODhf/Squire%20Tuck%20-%20A%20Mexican%20Love%20Affair.mp3",
  },
  {
    id: 38,
    title: "Wind in the Pines",
    artist: "Whispering Winds",
    duration: 7.67,
    size_mb: 7.05,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0Nzlf/Squire%20Tuck%20-%20Dancing%20%27til%20the%20Sun%20Goes%20Down.mp3",
  },
  {
    id: 39,
    title: "Silent Sea",
    artist: "Blue Horizon",
    duration: 6.0,
    size_mb: 5.5,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0NTVf/Squire%20Tuck%20-%20Dreams%20Like%20These.mp3",
  },
  {
    id: 40,
    title: "Autumn Breeze",
    artist: "Harvest Song",
    duration: 8.1,
    size_mb: 7.42,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0NTZf/Squire%20Tuck%20-%20Heavy%20Heart.mp3",
  },
  {
    id: 41,
    title: "Falling Stars",
    artist: "Cosmic Voyagers",
    duration: 6.25,
    size_mb: 5.75,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1MDdf/Squire%20Tuck%20-%20Little%20Peace%20at%20Christmas.mp3",
  },
  {
    id: 42,
    title: "Nightfall",
    artist: "The Dark Knights",
    duration: 7.52,
    size_mb: 6.92,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0ODJf/Squire%20Tuck%20-%20Making%20Sense%20of%20the%20Senseless_.mp3",
  },
  {
    id: 43,
    title: "Deep Blue",
    artist: "Aqua Beat",
    duration: 6.82,
    size_mb: 6.26,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0ODZf/Squire%20Tuck%20-%20Squire%20Tuck%20-%20Irrational%20Fear%20of%20Fearing%20Nothing%20at%20all.mp3",
  },
  {
    id: 44,
    title: "Melancholy Dream",
    artist: "Dream State",
    duration: 5.92,
    size_mb: 5.48,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0OTRf/Squire%20Tuck%20-%20Squire%20Tuck%20-%20Lost%20in%20the%20Moment.mp3",
  },
  {
    id: 45,
    title: "Golden Hour",
    artist: "Sunset Sounds",
    duration: 7.35,
    size_mb: 6.76,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0ODdf/Squire%20Tuck%20-%20Squire%20Tuck%20-%20Rockulele.mp3",
  },
  {
    id: 46,
    title: "Distant Echoes",
    artist: "Faraway Rhythm",
    duration: 6.51,
    size_mb: 5.99,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0OTFf/Squire%20Tuck%20-%20Squire%20Tuck%20-%20To%20Absent%20Friends.mp3",
  },
  {
    id: 47,
    title: "Winter Solstice",
    artist: "Chillwave",
    duration: 8.33,
    size_mb: 7.65,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0NTNf/Squire%20Tuck%20-%20Yearning%20for%20Better%20Days.mp3",
  },
  {
    id: 48,
    title: "Electric Skies",
    artist: "Future Electro",
    duration: 7.88,
    size_mb: 7.23,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0MzZf/The%20Sluts%20With%20Nuts%20-%20Instrumental%20Prelude.mp3",
  },
  {
    id: 49,
    title: "Lost Time",
    artist: "Retro Wave",
    duration: 6.12,
    size_mb: 5.64,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI0MzZf/The%20Sluts%20With%20Nuts%20-%20Instrumental%20Prelude.mp3",
  },
  {
    id: 50,
    title: "Firefly Lights",
    artist: "Night Dreams",
    duration: 5.72,
    size_mb: 5.26,
    encoded_audio:
      "https://od.lk/s/NzBfMjcwMjI1ODFf/What%20Cheer_%20Brigade%20-%20CCMFC.mp3",
  },
];

const podcasts = [
  {
    id: 1,
    title: "Tech Talk Weekly",
    host: "John Doe",
    duration: 40.15,
    size_mb: 37.5,
    category: "Technology",
    description:
      "In this episode, we dive deep into the latest trends in AI, the impact of machine learning, and how it’s changing industries worldwide.",
    encoded_audio:
      "QXVkaW8gZGF0YSBmb3IgVGVjaCBUaWxrIFdlZWtseSBieSBKb2huIERvZQ==",
  },
  {
    id: 2,
    title: "History Unfolded",
    host: "Jane Smith",
    duration: 58.22,
    size_mb: 53.7,
    category: "History",
    description:
      "A captivating journey through the ancient civilizations of Egypt, Greece, and Rome, uncovering lost secrets and forgotten tales.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgSGlzdG9yeSBVbmZvbGRlZA==",
  },
  {
    id: 3,
    title: "Mindful Moments",
    host: "Emily White",
    duration: 30.5,
    size_mb: 28.3,
    category: "Wellness",
    description:
      "This episode focuses on meditation techniques for reducing stress and staying calm in challenging situations.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgTWluZGZ1bCBNb21lbnRzIGluIFdlbGxuZXNz",
  },
  {
    id: 4,
    title: "The Startup Diaries",
    host: "David Brown",
    duration: 45.1,
    size_mb: 42.3,
    category: "Business",
    description:
      "Listen to the real stories of entrepreneurs who have built their startups from scratch. This episode features an interview with a successful tech founder.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgVGhlIFN0YXJ0dXAgRGlhcmllcw==",
  },
  {
    id: 5,
    title: "Global Perspectives",
    host: "Sarah Lee",
    duration: 65.4,
    size_mb: 60.4,
    category: "Politics",
    description:
      "A deep dive into global political issues, exploring international relations, conflicts, and strategies for peace.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgR2xvYmFsIFBlcnNwZWN0aXZl",
  },
  {
    id: 6,
    title: "Urban Exploration",
    host: "Mike Green",
    duration: 38.2,
    size_mb: 35.3,
    category: "Travel",
    description:
      "Exploring the world’s most fascinating cities. In this episode, we take you through hidden gems in Paris that only locals know.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgVXJiYW4gRXhwbG9yYXRpb24=",
  },
  {
    id: 7,
    title: "Creative Conversations",
    host: "Laura Adams",
    duration: 52.3,
    size_mb: 48.3,
    category: "Arts",
    description:
      "This episode features an in-depth discussion on the role of creativity in solving modern problems, featuring a guest artist.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgQ3JlYXRpdmUgQ29udmVyc2F0aW9ucw==",
  },
  {
    id: 8,
    title: "Tech for Good",
    host: "Rachel Green",
    duration: 40.0,
    size_mb: 37.2,
    category: "Technology",
    description:
      "Discover how technology is being used for social good. In this episode, we focus on tech innovations that are addressing environmental issues.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgVGVjaCBmb3IgR29vZA==",
  },
  {
    id: 9,
    title: "Creative Coding",
    host: "Alex Turner",
    duration: 55.7,
    size_mb: 51.2,
    category: "Programming",
    description:
      "This episode is all about using code for creative projects, with practical tips and real-world examples from creative coders.",
    encoded_audio:
      "QXVkaW8gZGF0YSBmb3IgQ3JlYXRpdmUgQ29kaW5nIGZvciBQcm9ncmFtbWluZyBIZWxw",
  },
  {
    id: 10,
    title: "Culinary Secrets",
    host: "Olivia Harris",
    duration: 50.3,
    size_mb: 46.5,
    category: "Food & Drink",
    description:
      "Learn the culinary secrets from top chefs! In this episode, we uncover tips for cooking like a pro at home.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgQ3VsYXJ5IFNlY3JldHM=",
  },
  {
    id: 11,
    title: "The Innovator's Mindset",
    host: "Michael Johnson",
    duration: 43.2,
    size_mb: 39.9,
    category: "Innovation",
    description:
      "In this episode, we explore the mindset of innovators and what drives creative thinking in today’s fast-paced world.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgVGhlIElubm92YXRvciBNaW5kc2V0",
  },
  {
    id: 12,
    title: "Music and Technology",
    host: "Sophie Turner",
    duration: 49.8,
    size_mb: 45.5,
    category: "Music",
    description:
      "Join us as we discuss the intersection of music and technology, featuring interviews with industry professionals.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgTXVzaWMgYW5kIFRlY2hub2xvZ3k=",
  },
  {
    id: 13,
    title: "Business Breakthroughs",
    host: "Chris Martin",
    duration: 62.4,
    size_mb: 57.8,
    category: "Business",
    description:
      "This episode dives into the strategies that successful businesses are using to break through their competition and thrive.",
    encoded_audio:
      "QXVkaW8gZGF0YSBmb3IgQnVzaW5lc3MgQnJlYWt0aHJvdWdocyBmb3Igc3VjY2VzcyBkdXN0cmllcw==",
  },
  {
    id: 14,
    title: "Exploring the Unknown",
    host: "Mark Lee",
    duration: 55.5,
    size_mb: 51.2,
    category: "Science",
    description:
      "Join us as we uncover the latest scientific discoveries, from the depths of the ocean to outer space.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgRXhwbG9yaW5nIHRoZSBVbmtub3du",
  },
  {
    id: 15,
    title: "The Art of Storytelling",
    host: "Anna Collins",
    duration: 42.8,
    size_mb: 39.1,
    category: "Arts",
    description:
      "Explore the art of storytelling and how it shapes our culture, featuring renowned authors and narrators.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgVGhlIEFydCBvZiBTdG9yeXRlbGxpbmc=",
  },
  {
    id: 16,
    title: "Fitness Fundamentals",
    host: "Laura Smith",
    duration: 38.6,
    size_mb: 35.4,
    category: "Health",
    description:
      "Learn the fundamentals of fitness, from strength training to nutrition, and how to build a sustainable workout routine.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgRml0bmVzcyBGdW5kYW1lbnRhbHM=",
  },
  {
    id: 17,
    title: "Future of Education",
    host: "David Wilson",
    duration: 53.3,
    size_mb: 49.0,
    category: "Education",
    description:
      "This episode explores how technology and innovation are reshaping the future of education, from AI in classrooms to virtual learning.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgRnV0dXJlIG9mIEVkdWNhdGlvbg==",
  },
  {
    id: 18,
    title: "Health in the Digital Age",
    host: "Emily Parker",
    duration: 60.1,
    size_mb: 55.5,
    category: "Health",
    description:
      "Discussing how digital tools and telemedicine are revolutionizing healthcare, and what it means for patients and doctors.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgSGVhbHQgaW4gdGhlIERpZ2l0YWwgQWdl",
  },
  {
    id: 19,
    title: "Sustainable Living",
    host: "Rachel Adams",
    duration: 47.7,
    size_mb: 43.9,
    category: "Environment",
    description:
      "In this episode, we talk about sustainable living practices, from eco-friendly homes to reducing your carbon footprint.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgU3VzdGFpbmFibGUgTGl2aW5n",
  },
  {
    id: 20,
    title: "Tech Trends Today",
    host: "Jordan Evans",
    duration: 41.4,
    size_mb: 38.1,
    category: "Technology",
    description:
      "A quick roundup of the most exciting tech trends in the industry, from new gadgets to emerging software.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgVGVjaCBUcmVuZHMgVG9kYXk=",
  },
  {
    id: 21,
    title: "Mastering the Mind",
    host: "Thomas Reed",
    duration: 50.3,
    size_mb: 46.3,
    category: "Self-Improvement",
    description:
      "Explore how mastering your mindset can lead to success in all areas of life, featuring expert psychologists and motivational speakers.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgTWFzdGVyaW5nIHRoZSBNaW5k",
  },
  {
    id: 22,
    title: "Crypto Chronicles",
    host: "Jason Foster",
    duration: 58.2,
    size_mb: 53.7,
    category: "Finance",
    description:
      "In this episode, we dive into the world of cryptocurrency, discussing market trends, the future of digital currency, and expert insights.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgQ3J5cHRvIENocm9uaWNsZXM=",
  },
  {
    id: 23,
    title: "Creative Writing Tips",
    host: "Lisa Taylor",
    duration: 41.1,
    size_mb: 37.8,
    category: "Arts",
    description:
      "Get valuable tips and techniques for creative writing, from crafting compelling characters to building engaging plots.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgQ3JlYXRpdmUgV3JpdGluZyBUaXBo",
  },
  {
    id: 24,
    title: "Fitness for Everyone",
    host: "John Carter",
    duration: 45.4,
    size_mb: 41.7,
    category: "Health",
    description:
      "This episode breaks down fitness for people of all levels, providing easy-to-follow workouts and health tips for a balanced lifestyle.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgRml0bmVzcyBmb3IgRXZlcnlvbWU=",
  },
  {
    id: 25,
    title: "Tech Talk Weekly",
    host: "Eva Wong",
    duration: 52.6,
    size_mb: 48.2,
    category: "Technology",
    description:
      "Stay up-to-date with the latest tech news, from new product releases to breakthroughs in AI and beyond.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgVGVjaCBUb3VrIFdlZWtseQ==",
  },
  {
    id: 26,
    title: "Food for Thought",
    host: "Jessica Brooks",
    duration: 47.2,
    size_mb: 43.1,
    category: "Food",
    description:
      "This episode features discussions on food trends, culinary arts, and interviews with top chefs from around the world.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgRm9vZCBmb3IgVGhvdWdodA==",
  },
  {
    id: 27,
    title: "The Entrepreneur's Journey",
    host: "Michael Lee",
    duration: 54.0,
    size_mb: 49.5,
    category: "Business",
    description:
      "Learn how entrepreneurs overcome challenges and build successful businesses through real-life stories and expert advice.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgVGhlIEVudHJlcHJlbmV1ciBKb3VybmV5",
  },
  {
    id: 28,
    title: "History's Mysteries",
    host: "Olivia Clark",
    duration: 63.5,
    size_mb: 58.2,
    category: "History",
    description:
      "Join us as we uncover the mysteries of history, from lost civilizations to unsolved historical events.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgSGlzdG9yeSVzIE15c3Rlcmllcw==",
  },
  {
    id: 29,
    title: "Eco Warriors",
    host: "Nathan Green",
    duration: 46.7,
    size_mb: 42.9,
    category: "Environment",
    description:
      "A podcast dedicated to environmental issues and how we can take action to protect the planet for future generations.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgRWNvIFdhcnJpb3Jz",
  },
  {
    id: 30,
    title: "Innovation in Education",
    host: "Sophia James",
    duration: 59.8,
    size_mb: 54.8,
    category: "Education",
    description:
      "Discover the innovative approaches that are transforming education, from digital classrooms to personalized learning.",
    encoded_audio: "QXVkaW8gZGF0YSBmb3IgSW5ub3ZhdGlvbiBpbiBFZHVjYXRpb24=",
  },
];

module.exports = { tracks, podcasts };
