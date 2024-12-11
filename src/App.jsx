import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import { DartsList } from './DartsList';
import { DartsSingle } from './DartsSingle';
import { DartsDel } from './DartsDel';
import { DartsMod } from './DartsMod';

export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Darts játékosok</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<DartsList />} />
        <Route path="/darts/:dartsId" element={<DartsSingle />} />
        <Route path="/darts-del/:dartsId" element={<DartsDel />} />
        <Route path="/darts-mod/:dartsId" element={<DartsMod />} />
      </Routes>
    </Router>
  );
}