import { Link } from 'react-router';
import { ArrowRight, Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { trips } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useRef } from 'react';

export function Home() {
  const weekendTrips = trips.filter(t => t.category === 'weekend');
  const shortTrips = trips.filter(t => t.category === 'short');
  const longTrips = trips.filter(t => t.category === 'long');

  return (
    <div className="bg-gradient-to-b from-orange-50/30 to-white">
      {/* Hero Section - Indian themed */}
      <section 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1551857704-ba9b620ad444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMHN1bnJpc2UlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-amber-900/80 to-blue-900/75"></div>
        
        {/* Subtle mandala pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1596568888387-eaa5dea7b8c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5kYWxhJTIwcGF0dGVybiUyMGluZGlhbnxlbnwxfHx8fDE3NzE4NzI4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Explore the Beauty of India
          </h1>
          <p className="text-xl text-white/95 mb-8 drop-shadow-md">
            Curated travel plans across the diverse landscapes and rich heritage of Incredible India
          </p>
          <a href="#trips">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
              Discover Trips
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Trip Categories */}
      <div id="trips" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Weekend Trips */}
        <TripSection
          icon="🏕"
          title="Weekend Trips"
          description="Perfect quick getaways for 2-3 days"
          trips={weekendTrips}
        />

        {/* Short Trips */}
        <TripSection
          icon="🗺"
          title="Short Trips"
          description="Immersive experiences for 4-5 days"
          trips={shortTrips}
        />

        {/* Long Trips */}
        <TripSection
          icon="🏔"
          title="Long Trips"
          description="Extended adventures for 6-7+ days"
          trips={longTrips}
        />
      </div>
    </div>
  );
}

interface TripSectionProps {
  icon: string;
  title: string;
  description: string;
  trips: typeof trips;
}

function TripSection({ icon, title, description, trips }: TripSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{icon}</span>
        <div>
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      <div className="relative group">
        {/* Scroll buttons with orange theme */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-50 -ml-4 border border-orange-200"
        >
          <ChevronLeft className="w-6 h-6 text-orange-600" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-50 -mr-4 border border-orange-200"
        >
          <ChevronRight className="w-6 h-6 text-orange-600" />
        </button>

        {/* Trip cards container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TripCardProps {
  trip: typeof trips[0];
}

function TripCard({ trip }: TripCardProps) {
  return (
    <div className="min-w-[350px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden snap-start group border border-orange-100/50">
      <div className="relative h-64 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Indian color accent overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/95 text-orange-700 hover:bg-white border border-orange-200">
            <Calendar className="w-3 h-3 mr-1" />
            {trip.duration}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{trip.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{trip.description}</p>

        <Link to={`/trip/${trip.id}`}>
          <Button variant="outline" className="w-full group/btn border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400">
            View Details
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Add this to hide scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);