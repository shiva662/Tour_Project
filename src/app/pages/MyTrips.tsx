import { Link } from 'react-router';
import { Calendar, ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { trips } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function MyTrips() {
  const savedTrips = trips.filter(t => t.saved);
  const completedTrips = trips.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Indian styling */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent mb-4">My Trips</h1>
          <p className="text-gray-600 text-lg">Track your saved and completed Indian journeys</p>
        </div>

        {/* Tabs with Indian theme */}
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-orange-100 border border-orange-200">
            <TabsTrigger 
              value="saved" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
            >
              <Bookmark className="w-4 h-4" />
              Saved Trips ({savedTrips.length})
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
            >
              <CheckCircle2 className="w-4 h-4" />
              Completed ({completedTrips.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            {savedTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} status="saved" />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Bookmark className="w-16 h-16 text-orange-400" />}
                title="No saved trips yet"
                description="Browse our trip catalog and save your favorites to start planning your Indian adventures!"
                actionLabel="Browse Trips"
                actionLink="/"
              />
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} status="completed" />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<CheckCircle2 className="w-16 h-16 text-orange-400" />}
                title="No completed trips yet"
                description="Mark your trips as completed to keep track of all the amazing places you've visited in India!"
                actionLabel="Browse Trips"
                actionLink="/"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface TripCardProps {
  trip: typeof trips[0];
  status: 'saved' | 'completed';
}

function TripCard({ trip, status }: TripCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-orange-100/50">
      <div className="relative h-64 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Indian color overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 left-4">
          <Badge
            className={
              status === 'saved'
                ? 'bg-orange-500 hover:bg-orange-600 shadow-lg'
                : 'bg-green-500 hover:bg-green-600 shadow-lg'
            }
          >
            {status === 'saved' ? (
              <>
                <Bookmark className="w-3 h-3 mr-1 fill-current" />
                Saved
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Completed
              </>
            )}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/95 text-orange-700 hover:bg-white border border-orange-200">
            <Calendar className="w-3 h-3 mr-1" />
            {trip.duration}
          </Badge>
        </div>
        {status === 'completed' && (
          <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center">
            <div className="bg-white/95 rounded-full p-3 shadow-lg border-2 border-green-500">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
            {trip.category.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
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

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  actionLink: string;
}

function EmptyState({ icon, title, description, actionLabel, actionLink }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-orange-100/50">
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      <Link to={actionLink}>
        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
          {actionLabel}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}