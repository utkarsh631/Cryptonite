import './App.css';
import Header from "../src/components/common/Header";
import Footer from "../src/components/common/Footer";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Landing from './components/landingpage/Landing';
import Dashboard from './pages/Dashboard';
import Coinpage from './pages/Coinpage';
import Compare from './pages/Compare';
import Watchlist from './components/watchlist/Watchlist';
import ShareModal from './components/Dashboard/ShareModal';
function App() {
  return (
    <div className="App font-[poppin] h-[1200px] bg-slate-900">
    <Router>     
      <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/coin/:id" element={<Coinpage/>}/>
          <Route path="/compare" element={<Compare/>}/>
          <Route path="/watchlist" element={<Watchlist/>}/>
          

          

      </Routes>
    </Router>
    </div>
  );
}

export default App;
