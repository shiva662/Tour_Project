export interface Trip {
  id: string;
  name: string;
  category: 'weekend' | 'short' | 'long';
  duration: string;
  image: string;
  description: string;
  overview: string;
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  saved?: boolean;
  completed?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  type: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  cuisine: string;
}

export interface Food {
  id: string;
  name: string;
  image: string;
  description: string;
  type: 'veg' | 'non-veg';
}

export interface DiaryPost {
  id: string;
  username: string;
  caption: string;
  image: string;
  timestamp: string;
  location: string;
  userId: string;
}

export const trips: Trip[] = [
  // Weekend Trips (2-3 Days)
  {
    id: '1',
    name: '2 Days in Jaipur',
    category: 'weekend',
    duration: '2 Days',
    image: 'https://images.unsplash.com/photo-1706961121783-4ae6c933983a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBoYXdhJTIwbWFoYWx8ZW58MXx8fHwxNzcxNzc5MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Explore the Pink City - Royal palaces, forts, and vibrant bazaars',
    overview: 'Experience the grandeur of Rajasthan with visits to magnificent forts, palaces, and local markets. Jaipur offers a perfect blend of history, culture, and traditional Rajasthani hospitality.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & City Palace',
        activities: [
          'Arrive in Jaipur and check into heritage hotel',
          'Visit City Palace and Jantar Mantar',
          'Explore Hawa Mahal (Palace of Winds)',
          'Evening at Johari Bazaar for shopping',
          'Traditional Rajasthani dinner with folk dance'
        ]
      },
      {
        day: 2,
        title: 'Amber Fort & Departure',
        activities: [
          'Morning visit to Amber Fort with elephant ride',
          'Stop at Jal Mahal for photos',
          'Visit Nahargarh Fort for city views',
          'Lunch at local restaurant',
          'Last minute shopping at Bapu Bazaar',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  },
  {
    id: '2',
    name: 'Weekend in Rishikesh',
    category: 'weekend',
    duration: '2-3 Days',
    image: 'https://images.unsplash.com/photo-1701709488066-8d32fe5871b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXNoaWtlc2glMjB5b2dhJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Yoga capital of the world - Spiritual retreat by the Ganges',
    overview: 'Find peace and adventure in Rishikesh with yoga sessions, river rafting, and spiritual experiences along the holy Ganges.',
    itinerary: [
      {
        day: 1,
        title: 'Spiritual Awakening',
        activities: [
          'Early morning yoga session by the Ganges',
          'Visit Laxman Jhula and Ram Jhula',
          'Explore Beatles Ashram',
          'Attend Ganga Aarti at Triveni Ghat',
          'Dinner at a riverside café'
        ]
      },
      {
        day: 2,
        title: 'Adventure & Meditation',
        activities: [
          'White water rafting in the Ganges',
          'Visit Neer Garh Waterfall',
          'Meditation session at ashram',
          'Explore local markets',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },
  {
    id: '3',
    name: '3 Days in Udaipur',
    category: 'weekend',
    duration: '3 Days',
    image: 'https://images.unsplash.com/photo-1622018135960-249abd263aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwbGFrZSUyMHBhbGFjZXxlbnwxfHx8fDE3NzE4NzI4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'City of Lakes - Romantic palaces and serene waters',
    overview: 'Explore the Venice of the East with its stunning lake palaces, rich history, and royal heritage.',
    itinerary: [
      {
        day: 1,
        title: 'Lake Palace & City Tour',
        activities: [
          'Boat ride on Lake Pichola',
          'Visit Lake Palace and Jag Mandir',
          'City Palace exploration',
          'Sunset at Sajjangarh Fort',
          'Dinner at rooftop restaurant'
        ]
      },
      {
        day: 2,
        title: 'Cultural Experience',
        activities: [
          'Visit Saheliyon Ki Bari gardens',
          'Explore Bagore Ki Haveli Museum',
          'Traditional art and craft shopping',
          'Evening cultural show at Bagore',
          'Lakeside walk'
        ]
      },
      {
        day: 3,
        title: 'Local Exploration',
        activities: [
          'Morning visit to Eklingji Temple',
          'Shilpgram craft village',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  },
  {
    id: '4',
    name: '2 Days in Pondicherry',
    category: 'weekend',
    duration: '2 Days',
    image: 'https://images.unsplash.com/photo-1647193799828-f887e6f49720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb25kaWNoZXJyeSUyMHllbGxvdyUyMGJ1aWxkaW5nJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'French connection - Colonial charm meets Indian culture',
    overview: 'Experience the unique blend of French and Tamil cultures in this charming coastal town.',
    itinerary: [
      {
        day: 1,
        title: 'French Quarter & Beach',
        activities: [
          'Walk through French Quarter',
          'Visit Auroville',
          'Promenade beach walk',
          'French café lunch',
          'Shopping on Rue de la Marine'
        ]
      },
      {
        day: 2,
        title: 'Temples & Departure',
        activities: [
          'Visit Aurobindo Ashram',
          'Matrimandir meditation',
          'Paradise Beach',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },

  // Short Trips (4-5 Days)
  {
    id: '5',
    name: '5 Days in Kerala',
    category: 'short',
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1707893013488-51672ef83425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc3MTgyOTc1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'God\'s Own Country - Backwaters, beaches, and hill stations',
    overview: 'Experience the natural beauty of Kerala with houseboat stays, tea plantations, and Ayurvedic wellness.',
    itinerary: [
      {
        day: 1,
        title: 'Cochin Arrival',
        activities: [
          'Arrive in Cochin',
          'Fort Kochi exploration',
          'Chinese fishing nets',
          'Kathakali dance show',
          'Seafood dinner'
        ]
      },
      {
        day: 2,
        title: 'Munnar Hills',
        activities: [
          'Drive to Munnar',
          'Tea plantation visit',
          'Eravikulam National Park',
          'Echo Point',
          'Stay in hill resort'
        ]
      },
      {
        day: 3,
        title: 'Munnar to Alleppey',
        activities: [
          'Morning tea garden walk',
          'Drive to Alleppey',
          'Check into houseboat',
          'Backwater cruise',
          'Overnight on houseboat'
        ]
      },
      {
        day: 4,
        title: 'Backwaters Experience',
        activities: [
          'Village visits from houseboat',
          'Traditional Kerala lunch',
          'Sunset cruise',
          'Ayurvedic massage',
          'Local cuisine dinner'
        ]
      },
      {
        day: 5,
        title: 'Departure',
        activities: [
          'Morning backwater views',
          'Transfer to Cochin',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },
  {
    id: '6',
    name: '4 Days in Himachal',
    category: 'short',
    duration: '4 Days',
    image: 'https://images.unsplash.com/photo-1692718605027-71424c748e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hY2hhbCUyMHByYWRlc2glMjBtb3VudGFpbnN8ZW58MXx8fHwxNzcxODcyODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Himalayan paradise - Snow peaks, valleys, and adventure',
    overview: 'Discover the scenic beauty of Himachal Pradesh with visits to Manali, Solang Valley, and Rohtang Pass.',
    itinerary: [
      {
        day: 1,
        title: 'Manali Arrival',
        activities: [
          'Arrive in Manali',
          'Check into hotel',
          'Mall Road exploration',
          'Hidimba Devi Temple',
          'Local market shopping'
        ]
      },
      {
        day: 2,
        title: 'Solang Valley Adventure',
        activities: [
          'Visit Solang Valley',
          'Paragliding and zorbing',
          'Cable car ride',
          'Snow activities',
          'Return to Manali'
        ]
      },
      {
        day: 3,
        title: 'Rohtang Pass Excursion',
        activities: [
          'Early morning to Rohtang Pass',
          'Snow activities and photography',
          'Visit Rahala Waterfalls',
          'Hot springs at Vashisht',
          'Evening at Old Manali'
        ]
      },
      {
        day: 4,
        title: 'Local Sightseeing & Departure',
        activities: [
          'Manu Temple visit',
          'Vashisht Village',
          'Shopping for woolens',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  },
  {
    id: '7',
    name: '5 Days in Goa',
    category: 'short',
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGluZGlhfGVufDF8fHx8MTc3MTc2ODgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Beach paradise - Sun, sand, and Portuguese heritage',
    overview: 'Enjoy Goa\'s beaches, Portuguese architecture, water sports, and vibrant nightlife.',
    itinerary: [
      {
        day: 1,
        title: 'North Goa Beaches',
        activities: [
          'Arrive in Goa',
          'Calangute Beach',
          'Baga Beach water sports',
          'Beach shacks dinner',
          'Night market shopping'
        ]
      },
      {
        day: 2,
        title: 'Fort & Churches',
        activities: [
          'Aguada Fort',
          'Basilica of Bom Jesus',
          'Se Cathedral',
          'Old Goa exploration',
          'Panjim heritage walk'
        ]
      },
      {
        day: 3,
        title: 'South Goa Serenity',
        activities: [
          'Colva Beach',
          'Palolem Beach',
          'Cabo de Rama Fort',
          'Sunset at beach',
          'Seafood dinner'
        ]
      },
      {
        day: 4,
        title: 'Island & Spice',
        activities: [
          'Dudhsagar Waterfalls',
          'Spice plantation tour',
          'Traditional Goan lunch',
          'Evening at Anjuna',
          'Flea market'
        ]
      },
      {
        day: 5,
        title: 'Leisure & Departure',
        activities: [
          'Beach relaxation',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: true
  },
  {
    id: '8',
    name: '4 Days in Varanasi & Prayagraj',
    category: 'short',
    duration: '4 Days',
    image: 'https://images.unsplash.com/photo-1653200986939-c1a8e62f96a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXJhbmFzaSUyMGdhbmdlcyUyMHJpdmVyfGVufDF8fHx8MTc3MTg3MjgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Spiritual journey - Ancient ghats and sacred rivers',
    overview: 'Experience the spiritual heart of India with ancient temples, holy Ganges, and timeless traditions.',
    itinerary: [
      {
        day: 1,
        title: 'Varanasi Ghats',
        activities: [
          'Arrive in Varanasi',
          'Evening Ganga Aarti at Dashashwamedh Ghat',
          'Boat ride on Ganges',
          'Walk through old city lanes',
          'Street food tour'
        ]
      },
      {
        day: 2,
        title: 'Temples & Sarnath',
        activities: [
          'Early morning boat ride at sunrise',
          'Kashi Vishwanath Temple',
          'Visit Sarnath (Buddhist site)',
          'Banaras Hindu University',
          'Silk weaving center visit'
        ]
      },
      {
        day: 3,
        title: 'Prayagraj Excursion',
        activities: [
          'Drive to Prayagraj (Allahabad)',
          'Triveni Sangam (confluence of rivers)',
          'Allahabad Fort',
          'Anand Bhawan',
          'Return to Varanasi'
        ]
      },
      {
        day: 4,
        title: 'Local Experience & Departure',
        activities: [
          'Morning yoga by Ganges',
          'Last temple visits',
          'Shopping for Banarasi silk',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },

  // Long Trips (6-7+ Days)
  {
    id: '9',
    name: '7 Days in Rajasthan',
    category: 'long',
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1670687174580-c003b4716959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBjYW1lbHxlbnwxfHx8fDE3NzE3Njg4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Royal heritage tour - Forts, palaces, and desert camps',
    overview: 'Complete Rajasthan circuit covering Jaipur, Jodhpur, Jaisalmer, and Udaipur with royal experiences.',
    itinerary: [
      {
        day: 1,
        title: 'Jaipur - Pink City',
        activities: [
          'Arrive in Jaipur',
          'City Palace and Hawa Mahal',
          'Jantar Mantar',
          'Evening bazaar shopping',
          'Heritage hotel stay'
        ]
      },
      {
        day: 2,
        title: 'Jaipur Forts',
        activities: [
          'Amber Fort with elephant ride',
          'Jal Mahal photo stop',
          'Nahargarh Fort sunset',
          'Chokhi Dhani cultural evening'
        ]
      },
      {
        day: 3,
        title: 'Jodhpur - Blue City',
        activities: [
          'Drive to Jodhpur',
          'Mehrangarh Fort',
          'Jaswant Thada',
          'Clock Tower market',
          'Blue city walk'
        ]
      },
      {
        day: 4,
        title: 'Jaisalmer - Golden City',
        activities: [
          'Drive to Jaisalmer',
          'Jaisalmer Fort exploration',
          'Patwon Ki Haveli',
          'Evening at Gadisar Lake',
          'Heritage hotel check-in'
        ]
      },
      {
        day: 5,
        title: 'Desert Safari',
        activities: [
          'Sam Sand Dunes',
          'Camel safari',
          'Desert camp stay',
          'Cultural program',
          'Stargazing in desert'
        ]
      },
      {
        day: 6,
        title: 'Udaipur - City of Lakes',
        activities: [
          'Drive to Udaipur',
          'Lake Pichola boat ride',
          'City Palace',
          'Jagdish Temple',
          'Sunset at Sajjangarh'
        ]
      },
      {
        day: 7,
        title: 'Udaipur & Departure',
        activities: [
          'Saheliyon Ki Bari',
          'Bagore Ki Haveli',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  },
  {
    id: '10',
    name: '8 Days in Northeast India',
    category: 'long',
    duration: '8 Days',
    image: 'https://images.unsplash.com/photo-1594514335842-8e986a014c98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMG1lZ2hhbGF5YXxlbnwxfHx8fDE3NzE4NzI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Unexplored beauty - Living root bridges and misty mountains',
    overview: 'Discover the hidden gems of Northeast India with Meghalaya\'s natural wonders and tribal culture.',
    itinerary: [
      {
        day: 1,
        title: 'Guwahati Arrival',
        activities: [
          'Arrive in Guwahati',
          'Kamakhya Temple',
          'Brahmaputra river cruise',
          'Assamese dinner',
          'Overnight in Guwahati'
        ]
      },
      {
        day: 2,
        title: 'Shillong - Scotland of East',
        activities: [
          'Drive to Shillong',
          'Elephant Falls',
          'Shillong Peak',
          'Police Bazaar',
          'Check into hotel'
        ]
      },
      {
        day: 3,
        title: 'Cherrapunji',
        activities: [
          'Drive to Cherrapunji',
          'Nohkalikai Falls',
          'Mawsmai Cave',
          'Seven Sisters Falls',
          'Living root bridge trek'
        ]
      },
      {
        day: 4,
        title: 'Double Decker Root Bridge',
        activities: [
          'Trek to Double Decker Living Root Bridge',
          'Natural pool swimming',
          'Village interaction',
          'Return to Cherrapunji'
        ]
      },
      {
        day: 5,
        title: 'Dawki & Mawlynnong',
        activities: [
          'Crystal clear Umngot river at Dawki',
          'Boating experience',
          'Asia\'s cleanest village - Mawlynnong',
          'Sky walk',
          'Return to Shillong'
        ]
      },
      {
        day: 6,
        title: 'Kaziranga National Park',
        activities: [
          'Drive to Kaziranga',
          'Evening safari preparation',
          'Cultural program',
          'Overnight near park'
        ]
      },
      {
        day: 7,
        title: 'Kaziranga Safari',
        activities: [
          'Early morning elephant safari',
          'Jeep safari in central zone',
          'One-horned rhino spotting',
          'Bird watching',
          'Return to Guwahati'
        ]
      },
      {
        day: 8,
        title: 'Departure',
        activities: [
          'Morning leisure',
          'Shopping for tea and handicrafts',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },
  {
    id: '11',
    name: '7 Days in Kashmir',
    category: 'long',
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXNobWlyJTIwZGFsJTIwbGFrZXxlbnwxfHx8fDE3NzE4NzI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Paradise on Earth - Dal Lake, gardens, and snow peaks',
    overview: 'Experience the breathtaking beauty of Kashmir with houseboat stays, Mughal gardens, and alpine meadows.',
    itinerary: [
      {
        day: 1,
        title: 'Srinagar Arrival',
        activities: [
          'Arrive in Srinagar',
          'Check into houseboat on Dal Lake',
          'Shikara ride',
          'Floating market visit',
          'Mughlai dinner on houseboat'
        ]
      },
      {
        day: 2,
        title: 'Mughal Gardens',
        activities: [
          'Nishat Bagh',
          'Shalimar Bagh',
          'Chashme Shahi',
          'Pari Mahal',
          'Shopping at Lal Chowk'
        ]
      },
      {
        day: 3,
        title: 'Gulmarg - Meadow of Flowers',
        activities: [
          'Drive to Gulmarg',
          'Gondola cable car ride (Asia\'s highest)',
          'Snow activities',
          'Alpine meadow walk',
          'Return to Srinagar'
        ]
      },
      {
        day: 4,
        title: 'Pahalgam - Valley of Shepherds',
        activities: [
          'Drive to Pahalgam',
          'Betaab Valley',
          'Aru Valley',
          'Lidder river activities',
          'Overnight in Pahalgam'
        ]
      },
      {
        day: 5,
        title: 'Pahalgam Exploration',
        activities: [
          'Baisaran meadows (Mini Switzerland)',
          'Horse riding',
          'Nature walks',
          'Return to Srinagar',
          'Houseboat dinner'
        ]
      },
      {
        day: 6,
        title: 'Sonamarg Day Trip',
        activities: [
          'Early morning to Sonamarg (Meadow of Gold)',
          'Thajiwas Glacier visit',
          'Sindh River views',
          'Photography',
          'Return to Srinagar'
        ]
      },
      {
        day: 7,
        title: 'Local Crafts & Departure',
        activities: [
          'Visit carpet weaving centers',
          'Pashmina shawl shopping',
          'Kashmiri handicraft markets',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: true
  },
  {
    id: '12',
    name: '10 Days Golden Triangle',
    category: 'long',
    duration: '10 Days',
    image: 'https://images.unsplash.com/photo-1551857704-ba9b620ad444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMHN1bnJpc2UlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Classic India tour - Delhi, Agra, Jaipur with extensions',
    overview: 'The most iconic India circuit covering historical monuments, royal palaces, and cultural experiences.',
    itinerary: [
      {
        day: 1,
        title: 'Delhi Arrival & Old Delhi',
        activities: [
          'Arrive in Delhi',
          'Red Fort',
          'Jama Masjid',
          'Chandni Chowk rickshaw ride',
          'Raj Ghat'
        ]
      },
      {
        day: 2,
        title: 'New Delhi Sightseeing',
        activities: [
          'India Gate',
          'Rashtrapati Bhavan drive',
          'Qutub Minar',
          'Humayun\'s Tomb',
          'Lotus Temple',
          'Evening at Connaught Place'
        ]
      },
      {
        day: 3,
        title: 'Delhi to Agra',
        activities: [
          'Drive to Agra',
          'Agra Fort',
          'Mehtab Bagh sunset view of Taj',
          'Local market',
          'Overnight in Agra'
        ]
      },
      {
        day: 4,
        title: 'Taj Mahal & Fatehpur Sikri',
        activities: [
          'Sunrise at Taj Mahal',
          'Detailed Taj exploration',
          'Itimad-ud-Daulah (Baby Taj)',
          'Drive to Fatehpur Sikri',
          'Explore abandoned Mughal city'
        ]
      },
      {
        day: 5,
        title: 'Agra to Jaipur via Abhaneri',
        activities: [
          'Drive to Jaipur',
          'Stop at Abhaneri Stepwell',
          'Arrive in Jaipur',
          'Evening free for rest',
          'Heritage hotel check-in'
        ]
      },
      {
        day: 6,
        title: 'Jaipur - Amber Fort',
        activities: [
          'Amber Fort with elephant ride',
          'Jal Mahal',
          'Nahargarh Fort',
          'Light & sound show at Amber',
          'Rajasthani dinner'
        ]
      },
      {
        day: 7,
        title: 'Jaipur City Tour',
        activities: [
          'City Palace',
          'Jantar Mantar',
          'Hawa Mahal',
          'Albert Hall Museum',
          'Johari and Bapu Bazaar shopping'
        ]
      },
      {
        day: 8,
        title: 'Pushkar Excursion',
        activities: [
          'Drive to Pushkar',
          'Brahma Temple',
          'Pushkar Lake',
          'Camel fair (if season)',
          'Evening aarti',
          'Return to Jaipur'
        ]
      },
      {
        day: 9,
        title: 'Jaipur to Delhi',
        activities: [
          'Drive back to Delhi',
          'Shopping at Delhi Haat',
          'Dilli Haat cultural complex',
          'Farewell dinner',
          'Hotel check-in'
        ]
      },
      {
        day: 10,
        title: 'Departure',
        activities: [
          'Morning leisure',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  }
];

export const hotels: { [tripId: string]: Hotel[] } = {
  '1': [
    {
      id: 'h1',
      name: 'Rambagh Palace',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur, Rajasthan',
      rating: 4.9,
      type: 'Heritage Palace'
    },
    {
      id: 'h2',
      name: 'Alsisar Haveli',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur, Rajasthan',
      rating: 4.7,
      type: 'Heritage Haveli'
    },
    {
      id: 'h3',
      name: 'Samode Haveli',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur, Rajasthan',
      rating: 4.8,
      type: 'Boutique Heritage'
    }
  ]
};

export const restaurants: { [tripId: string]: Restaurant[] } = {
  '1': [
    {
      id: 'r1',
      name: 'Suvarna Mahal',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTg3MjgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Rambagh Palace, Jaipur',
      rating: 4.9,
      cuisine: 'Royal Rajasthani'
    },
    {
      id: 'r2',
      name: 'Chokhi Dhani',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Tonk Road, Jaipur',
      rating: 4.7,
      cuisine: 'Traditional Thali'
    },
    {
      id: 'r3',
      name: 'Laxmi Mishtan Bhandar',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Johari Bazaar, Jaipur',
      rating: 4.6,
      cuisine: 'Rajasthani Snacks'
    }
  ]
};

export const traditionalFoods: { [tripId: string]: Food[] } = {
  '1': [
    {
      id: 'f1',
      name: 'Dal Baati Churma',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMHRyYWRpdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NzE4NzI4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Rajasthan\'s signature dish - lentil curry with baked wheat balls and sweet churma',
      type: 'veg'
    },
    {
      id: 'f2',
      name: 'Laal Maas',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTg3MjgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Fiery red mutton curry with authentic Rajasthani spices',
      type: 'non-veg'
    },
    {
      id: 'f3',
      name: 'Ghewar',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional Rajasthani sweet made with flour and soaked in sugar syrup',
      type: 'veg'
    },
    {
      id: 'f4',
      name: 'Pyaaz Kachori',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Crispy fried pastry filled with spiced onion filling',
      type: 'veg'
    }
  ],
  '5': [
    {
      id: 'f5',
      name: 'Appam with Stew',
      image: 'https://images.unsplash.com/photo-1665660710687-b44c50751054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMGRvc2F8ZW58MXx8fHwxNzcxODI3MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Soft rice pancakes served with coconut milk-based vegetable stew',
      type: 'veg'
    },
    {
      id: 'f6',
      name: 'Kerala Sadya',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMHRyYWRpdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NzE4NzI4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional vegetarian feast served on banana leaf with 26+ dishes',
      type: 'veg'
    },
    {
      id: 'f7',
      name: 'Karimeen Pollichathu',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTg3MjgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Pearl spot fish marinated and wrapped in banana leaf',
      type: 'non-veg'
    },
    {
      id: 'f8',
      name: 'Payasam',
      image: 'https://images.unsplash.com/photo-1617266983060-5b7c6fc19b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBjaGFpJTIwdGVhJTIwaW5kaWF8ZW58MXx8fHwxNzcxODIxOTE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Sweet milk-based dessert with rice or vermicelli',
      type: 'veg'
    }
  ]
};

export const diaryPosts: DiaryPost[] = [
  {
    id: 'p1',
    username: 'travel_priya',
    caption: 'Mesmerized by the beauty of Taj Mahal at sunrise! 🌅 A symbol of eternal love.',
    image: 'https://images.unsplash.com/photo-1551857704-ba9b620ad444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMHN1bnJpc2UlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '2 hours ago',
    location: 'Agra, Uttar Pradesh',
    userId: 'user1'
  },
  {
    id: 'p2',
    username: 'wanderer_raj',
    caption: 'Pink City vibes! The architecture of Jaipur never fails to amaze 🏰',
    image: 'https://images.unsplash.com/photo-1706961121783-4ae6c933983a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBoYXdhJTIwbWFoYWx8ZW58MXx8fHwxNzcxNzc5MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '5 hours ago',
    location: 'Jaipur, Rajasthan',
    userId: 'user2'
  },
  {
    id: 'p3',
    username: 'foodie_arjun',
    caption: 'Heaven in a plate! Kerala Sadya is pure bliss 🍛',
    image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMHRyYWRpdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NzE4NzI4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '1 day ago',
    location: 'Kerala',
    userId: 'user3'
  },
  {
    id: 'p4',
    username: 'mountain_nik',
    caption: 'The Himalayas are calling and I must go! ⛰️',
    image: 'https://images.unsplash.com/photo-1676718912572-b3ebcff192e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '2 days ago',
    location: 'Himachal Pradesh',
    userId: 'user4'
  },
  {
    id: 'p5',
    username: 'beach_neha',
    caption: 'Goa state of mind! 🏖️ Sun, sand, and endless vibes',
    image: 'https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGluZGlhfGVufDF8fHx8MTc3MTc2ODgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '3 days ago',
    location: 'Goa',
    userId: 'user5'
  },
  {
    id: 'p6',
    username: 'spiritual_amit',
    caption: 'Witnessing the divine Ganga Aarti in Varanasi 🙏✨',
    image: 'https://images.unsplash.com/photo-1653200986939-c1a8e62f96a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXJhbmFzaSUyMGdhbmdlcyUyMHJpdmVyfGVufDF8fHx8MTc3MTg3MjgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '4 days ago',
    location: 'Varanasi, Uttar Pradesh',
    userId: 'user6'
  },
  {
    id: 'p7',
    username: 'desert_karan',
    caption: 'Sunset in the Thar Desert - magical moments! 🐪',
    image: 'https://images.unsplash.com/photo-1670687174580-c003b4716959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBjYW1lbHxlbnwxfHx8fDE3NzE3Njg4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '5 days ago',
    location: 'Jaisalmer, Rajasthan',
    userId: 'user7'
  },
  {
    id: 'p8',
    username: 'backwater_sara',
    caption: 'Houseboat life in Kerala backwaters 🛶 Pure serenity',
    image: 'https://images.unsplash.com/photo-1707893013488-51672ef83425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc3MTgyOTc1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '1 week ago',
    location: 'Alleppey, Kerala',
    userId: 'user8'
  }
];

// Current user for demo purposes
export const currentUser = {
  id: 'user1',
  username: 'travel_priya',
  email: 'priya@example.com'
};
