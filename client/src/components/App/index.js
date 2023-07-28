import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Recommendations from '../Recommendations';
import Review from '../Review';

const App = () => {
  return (
  <Router>
  <div>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Review" element={<Review />} />
      <Route path="/Search" element={<Search />} />
      <Route path="/Recommendations" element={<Recommendations />} />
    </Routes>
  </div>
</Router>


  )
}
export default App;
