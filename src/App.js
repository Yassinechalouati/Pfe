import './App.css';
import Signup from './pages/signup'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/signup' element={<Signup></Signup>} >
        </Route>
        <Route index element={<Signup></Signup>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
