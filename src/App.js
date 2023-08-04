import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Room from './components/stuff/Room';
import React from 'react';
import Login from './components/Login';
import CreateRoom from './components/stuff/CreateRoom';
import Board from './components/Board';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/room/list' element={<Room />}/>
        <Route path='/room/create' element={<CreateRoom />}/>
        <Route path='/game' element={<Board/>}/>
      </Routes>
    </Router>
  );
}

export default App;
