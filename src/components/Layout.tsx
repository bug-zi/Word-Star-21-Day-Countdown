import { Outlet } from 'react-router-dom';
import { useGameStore } from '@/stores/gameStore';
import Navbar from './Navbar';
import { Meteors } from '@/components/ui/meteors';

export default function Layout() {
  const { isAuthenticated } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-star-purple-950 via-star-purple-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Meteors 
          number={30}
          minDelay={0.2}
          maxDelay={1.5}
          minDuration={3}
          maxDuration={12}
          angle={215}
        />
      </div>
      {isAuthenticated && <Navbar />}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
