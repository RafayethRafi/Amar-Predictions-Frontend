'use client';

import { useSession } from 'next-auth/react';
import Navbar from './Navbar';

export default function Layout({ children }) {


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2023 Sports Predictor. All rights reserved.</p>
      </footer>
    </div>
  );
}