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

    // 🔍 Debug (remove later if you want)
    console.log("LOGIN INPUT:", username, password);

    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (response.ok) {
        toast.success(`Welcome back, ${data.user}!`);
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
            BizGenius AI
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to your intelligent workspace
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  className="w-full pl-10 p-3 bg-slate-50 border rounded-lg"
                  placeholder="demo_user"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                  className="w-full pl-10 p-3 bg-slate-50 border rounded-lg"
                  placeholder="demo"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
              {!isLoading && <LogIn size={18} />}
            </button>
          </form>

          {/* Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 font-medium">Use:</p>
            <p className="text-xs text-blue-600">demo_user / demo</p>
          </div>
        </div>
      </div>
    </div>
  );
}