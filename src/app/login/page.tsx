'use client';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

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
          Your all-in-one content management platform
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-all duration-200 font-medium text-base shadow-lg hover:shadow-xl"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Icon"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
} 