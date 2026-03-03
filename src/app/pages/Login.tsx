import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Palmtree, Mail, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      
      if (isLogin) {
        response = await authAPI.login(email, password);
      } else {
        response = await authAPI.register(
          email.split('@')[0], // use email prefix as name for signup
          email,
          password
        );
        if (response.message && !response.user) {
          setError('Registered! Please log in.');
          setIsLogin(true);
          setLoading(false);
          return;
        }
      }

      if (response.token && response.user) {
        login(response.user, response.token);
        navigate('/');
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch (err: any) {
      setError('Connection error. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1551857704-ba9b620ad444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMHN1bnJpc2UlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080)'
      }}
    >
      {/* Overlay with warm Indian colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-amber-900/75 to-blue-900/70 backdrop-blur-sm"></div>

      {/* Decorative mandala pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1596568888387-eaa5dea7b8c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5kYWxhJTIwcGF0dGVybiUyMGluZGlhbnxlbnwxfHx8fDE3NzE4NzI4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* Login Card with glassmorphism */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-200/20">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl mb-4 shadow-lg">
              <Palmtree className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              Explore India
            </h1>
            <p className="text-gray-600 mt-2 text-center">
              {isLogin ? 'Discover Incredible India' : 'Begin Your Indian Journey'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-orange-300 text-orange-600 focus:ring-orange-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-orange-600 hover:text-orange-700">
                  Forgot password?
                </a>
              </div>
            )}

            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              {isLogin ? "New to Explore India? " : 'Already exploring? '}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Social Login */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="py-2 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
              Google
            </button>
            <button className="py-2 px-4 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}