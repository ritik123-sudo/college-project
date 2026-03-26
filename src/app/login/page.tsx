'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send data to our separate backend API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Welcome back, ${data.user}!`);
        // Redirect to dashboard on success
        router.push('/dashboard'); 
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* absolute inset-0 z-50 covers the sidebar so it looks like a standalone page */
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-50 px-4">
      
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
            BizGenius AI
          </h1>
          <p className="text-slate-400 text-sm">Sign in to your intelligent workspace</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Username Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-slate-400" size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900"
                  placeholder="e.g., demo_user"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-slate-400" size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm disabled:bg-blue-400"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
              {!isLoading && <LogIn size={18} />}
            </button>
          </form>

          {/* Dummy Credentials Hint */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-800 font-medium mb-1">Testing Credentials:</p>
            <p className="text-xs text-blue-600">Username: <strong>demo_user</strong></p>
            <p className="text-xs text-blue-600">Password: <strong>demo</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}