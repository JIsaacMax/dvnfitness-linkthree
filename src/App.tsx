import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import GlobalStyles from './styles/GlobalStyles';
import HomePage from './pages/Home';
import ReservaQuadraPage from './pages/ReservaQuadra';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div className="animated-bg"></div>
      <main className="relative flex flex-col items-center justify-center min-h-screen h-full py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reserva" element={<ReservaQuadraPage />} />
        </Routes>
      </main>
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} DVN Fitness. Todos os direitos reservados.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;