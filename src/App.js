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
import TutorsSearch from './pages/learner/Profile/TutorsSearch';
import LinguaBuddy from './pages/learner/Profile/LinguaBuddy';
import CoursesSearch from './pages/learner/Profile/CoursesSearch';
import ClassroomsSearch from './pages/learner/Profile/ClassroomsSearch';

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
        <Route path='/learner/profile/Tutors' element={<TutorsSearch></TutorsSearch>}></Route>
        <Route path='/learner/profile/LinguaBuddy' element={<LinguaBuddy></LinguaBuddy>}></Route>
        <Route path='/learner/profile/Courses' element={<CoursesSearch></CoursesSearch>}></Route>
        <Route path='/learner/profile/Classrooms' element={<ClassroomsSearch></ClassroomsSearch>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
