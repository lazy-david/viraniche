'use client';

import { Shield, Anchor, Calendar, Instagram, Youtube, Twitter, Facebook } from "lucide-react";
import { SiTiktok } from 'react-icons/si';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import Link from 'next/link';

const heroes = [
  {
    name: "Analytics Overview",
    image: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?q=80&w=300&h=500&fit=crop",
  },
  {
    name: "Trending Analysis",
    image: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?q=80&w=300&h=500&fit=crop",
  },
  {
    name: "Performance Metrics",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=300&h=500&fit=crop",
  },
  {
    name: "Competitor Insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&h=500&fit=crop",
  },
];

const socials = [
  {
    name: "Instagram",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=300&h=500&fit=crop",
    icon: <Instagram className="absolute top-4 right-4 w-8 h-8 text-white" />
  },
  {
    name: "YouTube",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=300&h=500&fit=crop",
    icon: <Youtube className="absolute top-4 right-4 w-8 h-8 text-white" />
  },
  {
    name: "X (Twitter)",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=300&h=500&fit=crop",
    icon: <Twitter className="absolute top-4 right-4 w-8 h-8 text-white" />
  },
  {
    name: "TikTok",
    image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=300&h=500&fit=crop",
    icon: <SiTiktok className="absolute top-4 right-4 w-8 h-8 text-white" />
  },
  {
    name: "Facebook",
    image: "https://images.unsplash.com/photo-1655199798186-23a85b12c4e4?q=80&w=300&h=500&fit=crop",
    icon: <Facebook className="absolute top-4 right-4 w-8 h-8 text-white" />
  }
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-red-950">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              ViralNiche
              <span className="block text-4xl md:text-5xl mt-2 text-blue-500">
                Welcome back, {user?.displayName || 'User'}! 📊
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Here's your content performance overview
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 bg-gradient-to-b from-blue-950 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-white mb-4">Performance Analytics</h3>
              <p className="text-gray-400">Deep insights into your content metrics</p>
            </div>
            <div className="text-center">
              <Anchor className="w-16 h-16 mx-auto mb-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-white mb-4">Trend Analysis</h3>
              <p className="text-gray-400">Stay ahead with real-time trend tracking</p>
            </div>
            <div className="text-center">
              <Calendar className="w-16 h-16 mx-auto mb-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-white mb-4">Historical Data</h3>
              <p className="text-gray-400">Track performance over time</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-blue-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Social Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {socials.map((social, index) => (
              <Link href={`/dashboard/${social.name.toLowerCase()}`} key={social.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group overflow-hidden rounded-lg cursor-pointer"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={social.image}
                      alt={social.name}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                    {social.icon}
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{social.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}