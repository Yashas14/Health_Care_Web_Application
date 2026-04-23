import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home';
import HeartAttack from '@/pages/HeartAttack';
import BreastCancer from '@/pages/BreastCancer';
import Playground from '@/pages/Playground';
import About from '@/pages/About';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/heart-attack" element={<HeartAttack />} />
            <Route path="/breast-cancer" element={<BreastCancer />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
