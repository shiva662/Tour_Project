import { useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, User, MapPin } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { diaryPosts, currentUser } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

export function TravelDiary() {
  const [posts, setPosts] = useState(diaryPosts);
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [location, setLocation] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (caption.trim() && selectedFile) {
      const newPost = {
        id: `p${posts.length + 1}`,
        username: currentUser.username,
        caption: caption.trim(),
        image: selectedFile,
        timestamp: 'Just now',
        location: location || 'India',
        userId: currentUser.id
      };
      setPosts([newPost, ...posts]);
      setCaption('');
      setSelectedFile(null);
      setLocation('');
    }
  };

  const handleDelete = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Indian styling */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent mb-4">Travel Diary</h1>
          <p className="text-gray-600 text-lg">Share your incredible Indian travel experiences</p>
        </div>

        {/* Upload Section with Indian theme */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-12 border border-orange-100/50">
          <h2 className="text-2xl font-semibold text-orange-800 mb-6">Share Your Experience</h2>
          
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label
                htmlFor="file-upload"
                className={`
                  relative block border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
                  transition-all duration-200
                  ${selectedFile 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-orange-300 hover:border-orange-500 hover:bg-orange-50/50'
                  }
                `}
              >
                {selectedFile ? (
                  <div className="space-y-4">
                    <img
                      src={selectedFile}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-orange-600 font-medium">Image selected - Ready to post!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="bg-orange-100 p-4 rounded-full">
                        <Upload className="w-8 h-8 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="text"
                  placeholder="e.g., Jaipur, Rajasthan"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption
              </label>
              <Textarea
                placeholder="Share your story about Incredible India..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="min-h-[100px] resize-none border-orange-200 focus:border-orange-500"
              />
            </div>

            {/* Post Button */}
            <div className="flex gap-4">
              <Button
                onClick={handlePost}
                disabled={!caption.trim() || !selectedFile}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <ImageIcon className="mr-2 w-4 h-4" />
                Post Memory
              </Button>
              {(caption || selectedFile || location) && (
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  onClick={() => {
                    setCaption('');
                    setSelectedFile(null);
                    setLocation('');
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div>
          <h2 className="text-2xl font-semibold text-orange-800 mb-6">Community Posts</h2>
          
          <Masonry columnsCount={3} gutter="24px" className="masonry-grid">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-orange-100/50"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-auto object-cover"
                  />
                  {/* Location tag overlay */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-orange-200">
                      <MapPin className="w-3.5 h-3.5 text-orange-600" />
                      <span className="text-xs font-medium text-orange-700">{post.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{post.username}</p>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    {post.userId === currentUser.id && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700">{post.caption}</p>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 2 !important;
          }
        }
        @media (max-width: 640px) {
          .masonry-grid {
            column-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}