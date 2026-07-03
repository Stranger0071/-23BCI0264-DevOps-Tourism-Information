import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NoticeBar from './components/NoticeBar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import AttractionDetail from './pages/AttractionDetail';
import Hotels from './pages/Hotels';
import Guides from './pages/Guides';
import Maps from './pages/Maps';
import Booking from './pages/Booking';

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <NoticeBar />
      <Header />
      <main key={location.pathname} className="page-transition">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/attractions/:id" element={<AttractionDetail />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
