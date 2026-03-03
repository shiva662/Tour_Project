import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { TripDetails } from './pages/TravelDetails';
import { TravelDiary } from './pages/TravelDiary';
import { MyTrips } from './pages/MyTrips';
import { Places } from './pages/Places';
import { SavedPlaces } from './pages/SavedPlaces';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'places',
        Component: Places,
      },
      {
        path: 'saved',
        Component: SavedPlaces,
      },
      {
        path: 'trip/:id',
        Component: TripDetails,
      },
      {
        path: 'travel-diary',
        Component: TravelDiary,
      },
      {
        path: 'my-trips',
        Component: MyTrips,
      },
    ],
  },
]);
 
