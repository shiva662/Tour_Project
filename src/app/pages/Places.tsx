import { useState, useEffect } from 'react';
import { placesAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Trash2, Edit2, MapPin, User } from 'lucide-react';

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

interface PlacesResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  totalPlaces: number;
  placesPerPage: number;
  places: Place[];
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export function Places() {
  const { isLoggedIn, user, token, setSaved, refreshSaved } = useAuth();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Filter states
  // `searchInput` and `stateInput` are the UI inputs; `search` and `state` are the applied filters
  const [searchInput, setSearchInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination info
  const [totalPages, setTotalPages] = useState(1);
  const [totalPlaces, setTotalPlaces] = useState(0);

  // Add place form
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: '',
    city: ''
  });

  // Fetch places when applied filters or page change
  useEffect(() => {
    fetchPlaces();
  }, [search, state, currentPage]);

  // ensure saved list is up to date when user is logged in
  useEffect(() => {
    if (isLoggedIn && !user?.savedPlaces) {
      refreshSaved();
    }
  }, [isLoggedIn, user]);

  const fetchPlaces = async () => {
    setLoading(true);
    setError('');
    try {
      const response: PlacesResponse = await placesAPI.getAllPlaces({
        search: search || undefined,
        state: state || undefined,
        page: currentPage
      });

      if (response.success) {
        setPlaces(response.places);
        setTotalPages(response.totalPages);
        setTotalPlaces(response.totalPlaces);
      } else {
        setError('Failed to load places');
      }
    } catch (err: any) {
      setError(err.message || 'Error loading places');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to add a place');
      return;
    }

    if (!formData.title || !formData.description || !formData.state || !formData.city) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await placesAPI.addPlace(
        formData.title,
        formData.description,
        formData.state,
        formData.city
      );

      if (response.place) {
        setMessage('Place added successfully!');
        setFormData({ title: '', description: '', state: '', city: '' });
        setShowAddForm(false);
        setCurrentPage(1);
        fetchPlaces();
      } else {
        setError(response.message || 'Failed to add place');
      }
    } catch (err: any) {
      setError(err.message || 'Error adding place');
    }
  };

  const handleDeletePlace = async (placeId: string) => {
    if (!window.confirm('Are you sure you want to delete this place?')) return;

    try {
      const response = await placesAPI.deletePlace(placeId);
      if (response.message) {
        setMessage('Place deleted successfully!');
        fetchPlaces();
      } else {
        setError('Failed to delete place');
      }
    } catch (err: any) {
      setError(err.message || 'Error deleting place');
    }
  };

  // Apply UI inputs as filters
  const applyFilters = () => {
    setSearch(searchInput.trim());
    setState(stateInput);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Indian Places</h1>
          <p className="text-gray-600">Discover the beauty of India, one place at a time</p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {/* Add Place Button */}
        {isLoggedIn && (
          <div className="mb-6">
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              + Add New Place
            </Button>
          </div>
        )}

        {/* Add Place Form */}
        {showAddForm && isLoggedIn && (
          <div className="mb-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Add a New Place</h2>
            <form onSubmit={handleAddPlace} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Taj Mahal"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Describe the place..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select State</option>
                    {indianStates.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Agra"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Add Place
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🔍 Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by title or city..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="filterState">State</Label>
              <select
                id="filterState"
                value={stateInput}
                onChange={(e) => setStateInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All States</option>
                {indianStates.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={applyFilters}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="mb-4 text-gray-600 text-center">
            Showing {places.length} of {totalPlaces} places
            {currentPage > 1 && ` • Page ${currentPage}/${totalPages}`}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading places...</p>
          </div>
        )}

        {/* Places Grid */}
        {!loading && places.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No places found. Try adjusting your filters!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map(place => {
              const isSaved = user?.savedPlaces?.includes(place._id);
              return (
                <div key={place._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image Placeholder */}
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 h-48 flex items-center justify-center text-white text-4xl">
                    📍
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{place.title}</h3>
                      {isLoggedIn && (
                        <button
                          onClick={async () => {
                            if (!token) return;
                            if (isSaved) {
                              await placesAPI.unsavePlace(place._id);
                              setSaved(place._id, false);
                            } else {
                              await placesAPI.savePlace(place._id);
                              setSaved(place._id, true);
                            }
                          }}
                          className="text-xl"
                          title={isSaved ? 'Unsave place' : 'Save place'}
                        >
                          {isSaved ? '❤️' : '🤍'}
                        </button>
                      )}
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

                  {/* Actions */}
                  {isLoggedIn && user?.id === place.createdBy._id && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => alert('Edit feature coming soon!')}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-sm"
                      >
                        <Edit2 className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        onClick={() => handleDeletePlace(place._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-sm"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2 flex-wrap">
            {currentPage > 1 && (
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-500 hover:bg-gray-600"
              >
                ← Previous
              </Button>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <Button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={pageNum === currentPage
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                }
              >
                {pageNum}
              </Button>
            ))}

            {currentPage < totalPages && (
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Next →
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
