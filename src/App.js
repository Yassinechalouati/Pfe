import './App.css';
import React from 'react';
import Signin from './pages/learner/signin';
import Signup from './pages/learner/signup'
import TutorSignUp from './pages/tutorSignUp/Signup';
import AccountPersonalization from './pages/tutorSignUp/AccountPersonalization';
import Verification from './pages/EmailVerif'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import TutorProfile from './pages/tutorProfile/TutorProfile';
import LearnerProfile from './pages/learner/Profile/learnerProfile';

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
        <Route path='/tutor/signin' element={<Signin></Signin>}></Route>
        <Route path='/users/verify/:token' element={<Verification></Verification>}></Route>
        <Route path='/tutor/signup/personalization' element={<AccountPersonalization></AccountPersonalization>}></Route>
        <Route path='/tutor/profile' element={<TutorProfile></TutorProfile>}></Route>
        <Route path='/learner/profile' element={<LearnerProfile></LearnerProfile>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
