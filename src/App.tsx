import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import Layout from '@/components/Layout';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import HomePage from '@/pages/HomePage';
import ProloguePage from '@/pages/story/ProloguePage';
import GamePage from '@/pages/game/GamePage';
import StudyPage from '@/pages/game/StudyPage';
import ReviewPage from '@/pages/game/ReviewPage';
import ProfilePage from '@/pages/ProfilePage';
import ExplorePage from '@/pages/ExplorePage';
import ArticlesPage from '@/pages/explore/ArticlesPage';
import MusicPage from '@/pages/explore/MusicPage';
import MoviesPage from '@/pages/explore/MoviesPage';
import CommunityPage from '@/pages/explore/CommunityPage';

function App() {
  const gameStore = useGameStore();
  const { isAuthenticated, isPrologueCompleted, currentDay, daysProgress, initAuth } = gameStore;

  // 初始化认证状态（检查游客模式）
  useEffect(() => {
    initAuth();
  }, []);

  // 获取当前天的进度
  const currentDayProgress = daysProgress.find(dp => dp.day === currentDay);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" /> : <LoginPage />
      } />
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/" /> : <RegisterPage />
      } />

      {/* Protected routes */}
      <Route element={<Layout />}>
        <Route path="/" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <HomePage />
        } />
        
        <Route path="/prologue" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          isPrologueCompleted ? <Navigate to="/" /> :
          <ProloguePage />
        } />
        
        <Route path="/plot" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <GamePage />
        } />
        
        <Route path="/explore" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <ExplorePage />
        } />
        <Route path="/explore/articles" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <ArticlesPage />
        } />
        <Route path="/explore/music" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <MusicPage />
        } />
        <Route path="/explore/movies" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <MoviesPage />
        } />
        <Route path="/explore/community" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <CommunityPage />
        } />
        
        <Route path="/study" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          !currentDayProgress?.morningDialogueCompleted ? <Navigate to="/plot" /> :
          <StudyPage />
        } />
        
        <Route path="/review" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          !currentDayProgress?.morningDialogueCompleted ? <Navigate to="/plot" /> :
          <ReviewPage />
        } />
        
        <Route path="/profile" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          <ProfilePage />
        } />
      </Route>
    </Routes>
  );
}

export default App;
