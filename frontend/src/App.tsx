import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Navbar from './components/Navbar';
import Home from './page/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} />} />
        <Route path='/docs/:id' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;