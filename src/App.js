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
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordContent from './components/sign_in/ForgotPasswordContent'
import Landingpage from './pages/Landingpage';
import VideoCall from './components/Global/VideoCall';
function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/learner/signup' element={<Signup></Signup>} >
        </Route>
        <Route path ='/learner/signup/personalize' element={<Signup></Signup>} >
        </Route>
        <Route element={<Signup></Signup>}>
        </Route>
        <Route path='/tutor/signup' element={<TutorSignUp></TutorSignUp>}></Route>
        <Route path='/learner/signin' element={<Signin></Signin>}></Route>
        <Route path='/tutor/signin' element={<Signin></Signin>}></Route>
        <Route path='/users/verify/:token' element={<Verification></Verification>}></Route>
        <Route path='/tutor/signup/personalization' element={<AccountPersonalization></AccountPersonalization>}></Route>
        <Route path='/tutor/profile' element={<TutorProfile></TutorProfile>}></Route>
        <Route path='/tutor/profile/LinguaBuddy' element={<TutorProfile></TutorProfile>}></Route>
        <Route path='/tutor/profile/Courses' element={<TutorProfile></TutorProfile>}></Route>
        <Route path='/tutor/profile/Classrooms' element={<TutorProfile></TutorProfile>}></Route>
        <Route path='/tutor/profile/Settings' element={<TutorProfile></TutorProfile>}></Route>
        <Route path='/tutor/profile/Exams' element={<TutorProfile></TutorProfile>}></Route>
        <Route path='/tutor/profile/Calendar' element={<TutorProfile></TutorProfile>}></Route>
        <Route path= '/learner/profile/Calendar' element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path='/learner/profile' element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path='/learner/profile/Tutors' element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path='/learner/profile/LinguaBuddy' element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path='/learner/profile/Courses' element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path='/learner/profile/Classrooms' element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path="/learner/signin/forgotpassword" element={<ForgotPasswordContent></ForgotPasswordContent>}></Route>
        <Route path="/tutor/signin/forgotpassword" element={<ForgotPasswordContent></ForgotPasswordContent>}></Route>
        <Route path="/users/ForgotPassword/:token" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/learner/profile/Settings" element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path="/landingpage" element={<Landingpage></Landingpage>}></Route>
        <Route path="/tutor/profile/Notifications" element={<TutorProfile></TutorProfile>}></Route>
        <Route path="/learner/profile/Notifications" element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path="/learner/profile/Tutor/:uuid" element={<LearnerProfile></LearnerProfile>}></Route>
        <Route path="/videoCall/:uuid" element={<VideoCall></VideoCall>}></Route>
        <Route index element={<Landingpage></Landingpage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
