import './App.css';
import Signin from './pages/signin';
import Signup from './pages/learnerSignUp/signup'
import TutorSignUp from './pages/tutorSignUp/Signup';
import AccountPersonalization from './pages/tutorSignUp/AccountPersonalization';
import Verification from './pages/EmailVerif'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import React from 'react';

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
        <Route path='/users/verify/:token' element={<Verification></Verification>}></Route>
        <Route path='/tutor/signup/personalization' element={<AccountPersonalization></AccountPersonalization>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
