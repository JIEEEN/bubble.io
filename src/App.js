import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './routes/Main';
import Game from './routes/Game';
import React from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/game' element={<Game />}/>
      </Routes>
    </Router>
  );
}

export default App;
