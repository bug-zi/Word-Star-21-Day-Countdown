import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const { isAuthenticated, isPrologueCompleted } = useGameStore();

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
        
        <Route path="/game" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <GamePage />
        } />
        
        <Route path="/study" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
          <StudyPage />
        } />
        
        <Route path="/review" element={
          !isAuthenticated ? <Navigate to="/login" /> :
          !isPrologueCompleted ? <Navigate to="/prologue" /> :
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
