import { useState, useEffect } from 'react';
import { placesAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../components/ui/button';
import { MapPin, User } from 'lucide-react';

interface Place {
  _id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  imageUrl?: string;
  createdAt: string;
}

export function SavedPlaces() {
  const { isLoggedIn, user, token, setSaved } = useAuth();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) fetchSaved();
  }, [isLoggedIn]);

  const fetchSaved = async () => {
    setLoading(true);
    setError('');
    try {
      const url = 'http://localhost:5000/api/users/saved';
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      const contentType = res.headers.get('content-type') || '';

      if (!res.ok) {
        // try parse JSON error
        if (contentType.includes('application/json')) {
          const body = await res.json();
          setError(body.message || 'Failed to load saved places');
        } else {
          const text = await res.text();
          console.error('Saved places error (non-json):', text);
          setError(`Server error: ${res.status} ${res.statusText}`);
        }
        setPlaces([]);
        return;
      }

      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setPlaces(data.savedPlaces || []);
        } else {
          setError(data.message || 'Failed to load saved places');
        }
      } else {
        const text = await res.text();
        console.error('Expected JSON but got:', text);
        setError('Unexpected server response');
      }
    } catch (err: any) {
      console.error('fetchSaved error', err);
      setError(err.message || 'Error loading saved places');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (placeId: string, saved: boolean) => {
    if (!token) return;
    if (saved) {
      await placesAPI.unsavePlace(placeId);
      setSaved(placeId, false);
    } else {
      await placesAPI.savePlace(placeId);
      setSaved(placeId, true);
    }
    fetchSaved();
  };

  if (!isLoggedIn) {
    return <p className="p-4">Please log in to view your saved places.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">My Saved Places</h1>

        {error && <div className="mb-4 text-red-600">{error}</div>}
        {loading && <p>Loading...</p>}

        {!loading && places.length === 0 && (
          <p>You haven't saved any places yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map(place => {
            const isSaved = user?.savedPlaces?.includes(place._id);
            return (
              <div key={place._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 h-48 flex items-center justify-center text-white text-4xl">
                  📍
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{place.title}</h3>
                    <button
                      onClick={() => handleToggle(place._id, !!isSaved)}
                      className="text-xl"
                      title={isSaved ? 'Unsave' : 'Save'}
                    >
                      {isSaved ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    {place.city}, {place.state}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{place.description}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                    <User className="w-3 h-3" />
                    {place.createdBy.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
