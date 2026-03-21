import { Outlet, useLocation } from 'react-router-dom';
import { useGameStore } from '@/stores/gameStore';
import Navbar from './Navbar';
import { MeteorBackground } from '@/components/ui/MeteorBackground';

export default function Layout() {
  const { isAuthenticated } = useGameStore();
  const location = useLocation();

  // 学习相关页面不显示流星效果
  const shouldShowMeteors = !['/study', '/review'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-star-purple-950 via-star-purple-900 to-black relative overflow-hidden">
      {shouldShowMeteors && (
        <div className="absolute inset-0 z-0">
          <MeteorBackground />
        </div>
      )}
      {isAuthenticated && <Navbar />}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
