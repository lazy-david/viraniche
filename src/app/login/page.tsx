'use client';

import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[rgba(6,12,26,255)]">
      <div className="text-center">
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="ViralNiche Logo"
            width={180}
            height={180}
            className="mx-auto"
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          ViralNiche
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          Your all-in-one content analyzer platform
        </p>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 disabled:opacity-50 mb-8"
        >
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <div className="grid grid-cols-5 gap-4 mt-8 max-w-2xl mx-auto">
          <Link href="/dashboard/instagram" className="transform hover:scale-110 transition-transform">
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-4 rounded-xl">
              <Image src="/instagram.png" alt="Instagram" width={40} height={40} className="mx-auto" />
              <p className="text-white text-sm mt-2">Instagram</p>
            </div>
          </Link>
          
          <Link href="/dashboard/youtube" className="transform hover:scale-110 transition-transform">
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-xl">
              <Image src="/youtube.png" alt="YouTube" width={40} height={40} className="mx-auto" />
              <p className="text-white text-sm mt-2">YouTube</p>
            </div>
          </Link>
          
          <Link href="/dashboard/twitter" className="transform hover:scale-110 transition-transform">
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded-xl">
              <Image src="/twitter.png" alt="Twitter" width={40} height={40} className="mx-auto" />
              <p className="text-white text-sm mt-2">X (Twitter)</p>
            </div>
          </Link>
          
          <Link href="/dashboard/tiktok" className="transform hover:scale-110 transition-transform">
            <div className="bg-gradient-to-br from-black to-gray-800 p-4 rounded-xl">
              <Image src="/tiktok.png" alt="TikTok" width={40} height={40} className="mx-auto" />
              <p className="text-white text-sm mt-2">TikTok</p>
            </div>
          </Link>
          
          <Link href="/dashboard/facebook" className="transform hover:scale-110 transition-transform">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl">
              <Image src="/facebook.png" alt="Facebook" width={40} height={40} className="mx-auto" />
              <p className="text-white text-sm mt-2">Facebook</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}