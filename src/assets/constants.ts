import { ChatCompletionRequestMessage } from "openai";

export type Trip = {
    id: number;
    label: string;
    location: string;
    distance: string;
    distance_from_starting_location: string;
    travel_duration: string;
    cost: string;
    carbon_footprint: string;
    tags: string[];
    music_vibe: string;
    music_playlist: string[];
    itinerary: {
      day: string;
      activity: string;
      time: string;
    }[];
    image: string;
  };
  
export const trips = [
  {
    id: 1,
    label: "Sweet trip at Cherry springs",
    location: "Cherry Springs",
    distance: "150 km",
    distance_from_starting_location: "10 km",
    travel_duration: "2 hours",
    cost: "$200",
    carbon_footprint: "10 kg CO2",
    tags: ["Nature", "Camping", "Stargazing"],
    music_vibe: "Relaxing",
    music_playlist: [
      "🎵 The Beatles - Here Comes the Sun",
      "🎵 Norah Jones - Come Away with Me",
      "🎵 Jack Johnson - Banana Pancakes",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity: "🚗 Drive to Cherry Springs, set up camp",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity: "🌲 Hiking and stargazing",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Pack up and drive back",
        time: "11:00 AM",
      },
    ],
    image:
      "https://lh3.googleusercontent.com/p/AF1QipPAT80niKrYzx7kg9SKMmAm25rVB9Q4fDqzj5EO=s1360-w1360-h1020",
  },
  {
    id: 2,
    label: "Coastal Adventure in Big Sur",
    location: "Big Sur, California",
    distance: "400 km",
    distance_from_starting_location: "100 km",
    travel_duration: "5 hours",
    cost: "$500",
    carbon_footprint: "20 kg CO2",
    tags: ["Nature", "Hiking", "Beach", "Scenic Drive"],
    music_vibe: "Upbeat",
    music_playlist: [
      "🎵 Fleetwood Mac - Dreams",
      "🎵 Tom Petty - Free Fallin'",
      "🎵 Red Hot Chili Peppers - Californication",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Drive to Big Sur and explore the scenic coastline. Hike in Pfeiffer Big Sur State Park.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity: "🏖️ Relax on the beach and watch the sunset.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Drive back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://www.travelinusa.us/wp-content/uploads/sites/3/2015/01/big-sur-8.jpg",
  },

  {
    id: 3,
    label: "Wine Tasting in Napa Valley",
    location: "Napa Valley, California",
    distance: "120 km",
    distance_from_starting_location: "30 km",
    travel_duration: "2 hours",
    cost: "$400",
    carbon_footprint: "5 kg CO2",
    tags: ["Wine", "Food", "Scenic Drive"],
    music_vibe: "Classical",
    music_playlist: [
      "🎵 Wolfgang Amadeus Mozart - Symphony No. 40",
      "🎵 Johann Sebastian Bach - Brandenburg Concerto No. 3",
      "🎵 Ludwig van Beethoven - Symphony No. 5",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Drive to Napa Valley and explore the wineries. Stay in a bed and breakfast.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity:
          "🍷 Wine tasting and visit to a vineyard. Drive along the scenic Silverado Trail.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Drive back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://www.tripsavvy.com/thmb/n23hJcFojjVxRER9m-lwjSY-C-s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/napa-valley-california-wine-country-vineyard-field-harvest-for-winery-494416494-28b52eb2c8ca415a93be31caa5bba097.jpg",
  },
  {
    id: 4,
    label: "Safari Adventure in Serengeti",
    location: "Serengeti National Park, Tanzania",
    distance: "13000 km",
    distance_from_starting_location: "3000 km",
    travel_duration: "20 hours",
    cost: "$5000",
    carbon_footprint: "500 kg CO2",
    tags: ["Nature", "Wildlife", "Adventure"],
    music_vibe: "African Beats",
    music_playlist: [
      "🎵 Fela Kuti - Water No Get Enemy",
      "🎵 Miriam Makeba - Pata Pata",
      "🎵 Salif Keita - Yamore",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Fly to Serengeti and go on a game drive. Stay in a luxury lodge.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity:
          "🐘 Visit an elephant sanctuary and see the Big 5. Enjoy a traditional African dinner.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Drive back to the airport and fly back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Serengeti_sunset-1001.jpg",
  },
  {
    id: 5,
    label: "Winter Wonderland in Banff",
    location: "Banff, Alberta, Canada",
    distance: "3500 km",
    distance_from_starting_location: "2500 km",
    travel_duration: "8 hours",
    cost: "$1500",
    carbon_footprint: "100 kg CO2",
    tags: ["Winter Sports", "Skiing", "Snowboarding"],
    music_vibe: "Alternative",
    music_playlist: [
      "🎵 Arcade Fire - Wake Up",
      "🎵 Modest Mouse - Float On",
      "🎵 The Black Keys - Lonely Boy",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity: "🚗 Fly to Calgary and drive to Banff. Hit the slopes.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity:
          "⛷️ Skiing and snowboarding in the Rockies. Relax in the hot springs.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Drive back to Calgary and fly back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://cdn.audleytravel.com/3980/2847/79/1314674-banff-national-park-alberta.jpg",
  },
  {
    id: 6,
    label: "Historic Road Trip in Route 66",
    location: "Route 66, United States",
    distance: "4000 km",
    distance_from_starting_location: "1000 km",
    travel_duration: "2 weeks",
    cost: "$2000",
    carbon_footprint: "150 kg CO2",
    tags: ["Road Trip", "History", "Scenic Drive"],
    music_vibe: "Classic Rock",
    music_playlist: [
      "🎵 Chuck Berry - Johnny B. Goode",
      "🎵 Eagles - Hotel California",
      "🎵 Lynyrd Skynyrd - Sweet Home Alabama",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity: "🚗 Drive to Chicago and start the Route 66 road trip.",
        time: "10:00 AM",
      },
      {
        day: "Day 2-13",
        activity:
          "🛣️ Drive along the historic highway and explore the sights, museums, and landmarks.",
        time: "All day",
      },
      {
        day: "Day 14",
        activity: "🚗 Drive back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/us-route-66-1534758213-785X440.jpg",
  },
  {
    id: 7,
    label: "Exploring the Outback in Uluru",
    location: "Uluru, Northern Territory, Australia",
    distance: "14000 km",
    distance_from_starting_location: "10000 km",
    travel_duration: "18 hours",
    cost: "$2500",
    carbon_footprint: "300 kg CO2",
    tags: ["Nature", "Hiking", "Desert"],
    music_vibe: "Indigenous",
    music_playlist: [
      "🎵 Yothu Yindi - Treaty",
      "🎵 Gurrumul - Wiyathul",
      "🎵 Baker Boy - Marryuna",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Fly to Alice Springs and drive to Uluru. Enjoy the sunset.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity:
          "🏜️ Hiking in Uluru-Kata Tjuta National Park. Experience the local culture.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Drive back to Alice Springs and fly back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://s1.at.atcdn.net/wp-content/uploads/2018/09/Uluru_hero-768x369.jpg",
  },
  {
    id: 8,
    label: "Camping in the Grand Tetons",
    location: "Grand Teton National Park, Wyoming, United States",
    distance: "3000 km",
    distance_from_starting_location: "2000 km",
    travel_duration: "14 hours",
    cost: "$800",
    carbon_footprint: "50 kg CO2",
    tags: ["Nature", "Camping", "Hiking"],
    music_vibe: "Folk",
    music_playlist: [
      "🎵 The Lumineers - Ho Hey",
      "🎵 Fleet Foxes - Helplessness Blues",
      "🎵 Iron & Wine - Naked as We Came",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Drive to Grand Teton National Park and set up camp. Hike to Inspiration Point.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity:
          "🌲 Hiking and wildlife watching in the park. Enjoy a campfire dinner.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Pack up and drive back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://cdn.aarp.net/content/dam/aarp/travel/Domestic/2021/08/1140-canoe-ride-at-grand-teton.jpg",
  },
  {
    id: 9,
    label: "Exploring the Highlands in Scotland",
    location: "Scottish Highlands, Scotland",
    distance: "500 km",
    distance_from_starting_location: "200 km",
    travel_duration: "6 hours",
    cost: "$1500",
    carbon_footprint: "50 kg CO2",
    tags: ["Nature", "Hiking", "History"],
    music_vibe: "Celtic",
    music_playlist: [
      "🎵 The Corries - Flower of Scotland",
      "🎵 Runrig - Loch Lomond",
      "🎵 Dougie MacLean - Caledonia",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Drive to the Scottish Highlands and hike to the top of Ben Nevis. Stay in a cozy B&B.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity:
          "🏰 Explore historic castles and the Culloden Battlefield. Sample local whisky.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Drive back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://a.cdn-hotels.com/gdcs/production37/d721/2a75874a-eaad-4412-8a34-b0abbc5a098e.jpg?impolicy=fcrop&w=800&h=533&q=medium",
  },
  {
    id: 10,
    label: "Sailing the Amalfi Coast",
    location: "Amalfi Coast, Italy",
    distance: "7500 km",
    distance_from_starting_location: "5000 km",
    travel_duration: "15 hours",
    cost: "$5000",
    carbon_footprint: "200 kg CO2",
    tags: ["Beach", "Island", "Sailing"],
    music_vibe: "Italian",
    music_playlist: [
      "🎵 Andrea Bocelli - Con te partirò",
      "🎵 Laura Pausini - La solitudine",
      "🎵 Lucio Dalla - Caruso",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Fly to Naples and set sail on the Amalfi Coast. Enjoy an evening in Sorrento.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity:
          "⛵ Sailing to Capri and exploring the island. Swimming in the Mediterranean Sea.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity:
          "🚤 Visit Positano and enjoy a seafood dinner on the beach. Sail back to Naples.",
        time: "All day",
      },
      {
        day: "Day 4",
        activity: "🚗 Fly back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://www.travelandleisure.com/thmb/n149x4IEv7uTFUHqaE2tQT8PInQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/header-positano-AMALFI0622-39a49349a2c145e6b3df85f884cf3217.jpg",
  },
  {
    id: 11,
    label: "Experiencing Nature in Yosemite",
    location: "Yosemite National Park, California, United States",
    distance: "3000 km",
    distance_from_starting_location: "1500 km",
    travel_duration: "10 hours",
    cost: "$1200",
    carbon_footprint: "100 kg CO2",
    tags: ["Nature", "Hiking", "Camping"],
    music_vibe: "Folk",
    music_playlist: [
      "🎵 Bob Dylan - The Times They Are A-Changin'",
      "🎵 Simon & Garfunkel - The Sound of Silence",
      "🎵 Joni Mitchell - Big Yellow Taxi",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Drive to Yosemite National Park and set up camp. Hike to Yosemite Falls.",
        time: "10:00 AM",
      },
      {
        day: "Day 2",
        activity:
          "🌲 Hiking in Yosemite Valley and exploring the park. Relax by the campfire.",
        time: "All day",
      },
      {
        day: "Day 3",
        activity: "🚗 Pack up and drive back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://lh3.googleusercontent.com/p/AF1QipPl0KzMc-EVDFOHS7W10Gz6RPa1Kss4JZqszXa7=s1360-w1360-h1020",
  },
  {
    id: 12,
    label: "Cultural Immersion in Tokyo",
    location: "Tokyo, Japan",
    distance: "10000 km",
    distance_from_starting_location: "5000 km",
    travel_duration: "14 hours",
    cost: "$2500",
    carbon_footprint: "200 kg CO2",
    tags: ["Culture", "Food", "City"],
    music_vibe: "J-Pop",
    music_playlist: [
      "🎵 Utada Hikaru - Simple and Clean",
      "🎵 AKB48 - Heavy Rotation",
      "🎵 Radwimps - Zenzenzense",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Fly to Tokyo and check into a traditional Ryokan. Sample local sushi.",
        time: "10:00 AM",
      },
      {
        day: "Day 2-3",
        activity:
          "🏯 Visit the temples and shrines in the city. Experience Japanese culture and cuisine.",
        time: "All day",
      },
      {
        day: "Day 4",
        activity:
          "🚗 Explore the bustling streets of Tokyo and do some shopping. Enjoy a night out.",
        time: "All day",
      },
      {
        day: "Day 5",
        activity: "🚗 Fly back home.",
        time: "11:00 AM",
      },
    ],
    image: "https://i.insider.com/5d26280921a86107bb51bd92?width=700",
  },
  {
    id: 13,
    label: "Adventure in the Swiss Alps",
    location: "Swiss Alps, Switzerland",
    distance: "700 km",
    distance_from_starting_location: "100 km",
    travel_duration: "8 hours",
    cost: "$2000",
    carbon_footprint: "100 kg CO2",
    tags: ["Nature", "Hiking", "Skiing"],
    music_vibe: "Alpine",
    music_playlist: [
      "🎵 Rolf Zuckowski - In der Weihnachtsbäckerei",
      "🎵 Zillertaler Schürzenjäger - Sierra Madre",
      "🎵 Heidi - Soundtrack",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Drive to the Swiss Alps and hike to the Matterhorn. Stay in a cozy chalet.",
        time: "10:00 AM",
      },
      {
        day: "Day 2-3",
        activity:
          "🏔️ Hiking and skiing in the mountains. Enjoy the fresh Alpine air.",
        time: "All day",
      },
      {
        day: "Day 4",
        activity: "🚗 Drive back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://media.worldnomads.com/travel-safety/switzerland/lauterbrunnen-valley-switzerland-gettyimages-1024638132.jpg",
  },
  {
    id: 14,
    label: "Relaxation on the Beaches of Bali",
    location: "Bali, Indonesia",
    distance: "14000 km",
    distance_from_starting_location: "8000 km",
    travel_duration: "20 hours",
    cost: "$3000",
    carbon_footprint: "200 kg CO2",
    tags: ["Beach", "Relaxation", "Island"],
    music_vibe: "Tropical",
    music_playlist: [
      "🎵 Tulus - Monokrom",
      "🎵 Raisa - Usai Di Sini",
      "🎵 Isyana Sarasvati - Tetap Dalam Jiwa",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Fly to Bali and check into a beachside resort. Enjoy a relaxing massage.",
        time: "10:00 AM",
      },
      {
        day: "Day 2-3",
        activity:
          "🌴 Relax on the beautiful beaches of Bali. Explore the local markets and enjoy some traditional cuisine.",
        time: "All day",
      },
      {
        day: "Day 4",
        activity: "🚗 Fly back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg",
  },
  {
    id: 15,
    label: "Exploring the Ancient Pyramids of Giza",
    location: "Giza, Egypt",
    distance: "6000 km",
    distance_from_starting_location: "3000 km",
    travel_duration: "10 hours",
    cost: "$2500",
    carbon_footprint: "200 kg CO2",
    tags: ["History", "Culture", "Desert"],
    music_vibe: "Arabic",
    music_playlist: [
      "🎵 Amr Diab - Tamally Maak",
      "🎵 Fairouz - Ya Ana Ya Ana",
      "🎵 Abdel Halim Hafez - Ahwak",
    ],
    itinerary: [
      {
        day: "Day 1",
        activity:
          "🚗 Fly to Cairo and check into a hotel near the pyramids. Visit the pyramids at sunset.",
        time: "10:00 AM",
      },
      {
        day: "Day 2-3",
        activity:
          "🏛️ Explore the ancient pyramids of Giza and the Sphinx. Visit the Egyptian Museum.",
        time: "All day",
      },
      {
        day: "Day 4",
        activity: "🚗 Fly back home.",
        time: "11:00 AM",
      },
    ],
    image:
      "https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg?w=636&h=424",
  },
];

export const dummyConversation: ChatCompletionRequestMessage[] = [
  { role: "user", content: "Hi, I'm planning a trip to Europe." },
  {
    role: "assistant",
    content:
      "Great! I can help with that. Where in Europe are you planning to go?",
  },
  {
    role: "user",
    content: "I'm thinking of visiting Paris, Rome, and Barcelona.",
  },
  {
    role: "assistant",
    content: "Sounds like a fantastic trip! When are you planning to go?",
  },
  {
    role: "user",
    content: "I'm planning to go in the summer, around August.",
  },
  {
    role: "assistant",
    content:
      "That's a popular time to visit Europe. How long will you be staying?",
  },
  {
    role: "user",
    content: "I'm planning to stay for three weeks.",
  },
  {
    role: "assistant",
    content:
      "Three weeks should give you enough time to explore these cities thoroughly. Do you need help with booking flights or accommodations?",
  },
  {
    role: "user",
    content:
      "Yes, I would appreciate some recommendations for affordable accommodations.",
  },
  {
    role: "assistant",
    content:
      "Sure! For Paris, you can consider staying in budget hotels like Ibis or Holiday Inn Express. In Rome, budget options like Hotel Artemide or Hotel Quirinale are good choices. And in Barcelona, you can check out Hotel Acta Antibes or Hotel Ronda House. Would you like me to help with booking?",
  },
  {
    role: "user",
    content:
      "Yes, please! Can you find me the best deals for flights from my location to these cities?",
  },
  {
    role: "assistant",
    content:
      "Sure! Can you please provide me with your current location and travel dates? I'll find the best flight options for you.",
  },
  // ... continue with more conversation messages
];