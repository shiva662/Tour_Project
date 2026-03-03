import { Palmtree, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                <Palmtree className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                Explore India
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Your trusted companion for discovering Incredible India with curated itineraries. 
              Experience the diversity, culture, and heritage of Bharat!
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-orange-600" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-orange-600" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-gray-600 hover:text-orange-600" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-gray-600 hover:text-orange-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/travel-diary" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Travel Diary
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="text-gray-600 hover:text-orange-600 transition-colors">
                  My Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>&copy; 2026 Explore India. All rights reserved. Made with ❤️ for Incredible India</p>
        </div>
      </div>
    </footer>
  );
}