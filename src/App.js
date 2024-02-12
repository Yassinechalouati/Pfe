import './App.css';
import Signin from './pages/signin';
import Signup from './pages/signup'
import TutorSignUp from './pages/tutorSignUp';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/learner/signup' element={<Signup></Signup>} >
        </Route>
        <Route index element={<Signup></Signup>}>
        </Route>
        <Route path='/tutor/signup' element={<TutorSignUp></TutorSignUp>}></Route>
        <Route path='/learner/signin' element={<Signin></Signin>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
