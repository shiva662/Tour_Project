import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, Calendar, Bookmark, Star, MapPin, Utensils } from 'lucide-react';
import { trips, hotels, restaurants, traditionalFoods } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);
  const [isSaved, setIsSaved] = useState(trip?.saved || false);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Trip not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const tripHotels = hotels[id || ''] || [];
  const tripRestaurants = restaurants[id || ''] || [];
  const tripFoods = traditionalFoods[id || ''] || [];

  return (
    <div className="bg-gradient-to-b from-orange-50/20 to-white min-h-screen">
      {/* Header Image Gallery */}
      <div className="relative h-[500px] bg-gray-900">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back button with orange theme */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/95 hover:bg-white rounded-full p-3 shadow-lg transition-colors border border-orange-200"
        >
          <ArrowLeft className="w-5 h-5 text-orange-700" />
        </button>

        {/* Trip Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Badge className="bg-white/95 text-orange-700 mb-4 border border-orange-200">
              <Calendar className="w-3 h-3 mr-1" />
              {trip.duration}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{trip.name}</h1>
            <p className="text-xl text-white/90">{trip.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-8 shadow-md border border-orange-100/50">
              <h2 className="text-2xl font-semibold text-orange-800 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed">{trip.overview}</p>
            </section>

            {/* Day-wise Itinerary */}
            <section className="bg-white rounded-2xl p-8 shadow-md border border-orange-100/50">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-semibold text-orange-800">Day-wise Itinerary</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {trip.itinerary.map((day) => (
                  <AccordionItem key={day.day} value={`day-${day.day}`} className="border-orange-200">
                    <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-orange-700">
                      Day {day.day}: {day.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 ml-4">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-orange-600 mt-1">•</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Nearby Hotels */}
            {tripHotels.length > 0 && (
              <section className="bg-white rounded-2xl p-8 shadow-md border border-orange-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-semibold text-orange-800">Nearby Hotels</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tripHotels.map((hotel) => (
                    <div key={hotel.id} className="border border-orange-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 bg-orange-100 text-orange-700">{hotel.type}</Badge>
                        <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                          <span className="font-medium">{hotel.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Nearby Restaurants */}
            {tripRestaurants.length > 0 && (
              <section className="bg-white rounded-2xl p-8 shadow-md border border-orange-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <Utensils className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-semibold text-orange-800">Nearby Restaurants</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tripRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="border border-orange-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{restaurant.location}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700">{restaurant.cuisine}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                            <span className="font-medium">{restaurant.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Traditional Food - Indian themed */}
            {tripFoods.length > 0 && (
              <section className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-md border border-orange-200">
                <div className="flex items-center gap-3 mb-6">
                  <Utensils className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-semibold text-orange-800">Traditional & Popular Food</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tripFoods.map((food) => (
                    <div key={food.id} className="bg-white border border-orange-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{food.name}</h3>
                          <Badge className={food.type === 'veg' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}>
                            {food.type === 'veg' ? '🥬 Veg' : '🍖 Non-Veg'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{food.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Save Trip */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24 border border-orange-100/50">
              <h3 className="text-xl font-semibold mb-4 text-orange-800">Plan Your Trip</h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-sm text-gray-600 mb-1">Duration</div>
                  <div className="font-semibold text-orange-900">{trip.duration}</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-sm text-gray-600 mb-1">Category</div>
                  <div className="font-semibold text-orange-900 capitalize">{trip.category.replace('-', ' ')}</div>
                </div>
                <Button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-full ${
                    isSaved
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  } shadow-lg`}
                >
                  <Bookmark className={`mr-2 w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save Trip'}
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  {isSaved 
                    ? 'Trip saved to your collection' 
                    : 'Save this trip to access it later'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}