import Navbar from "../components/Landingpage/Navbar"
import Welcome from "../components/Landingpage/Welcome"
import Tutors from "../components/Landingpage/Tutors"
import Courses from "../components/Landingpage/Courses"
import Subscription from "../components/Landingpage/Subscription"
import Suite from "../components/Landingpage/Suite"
import Features from "../components/Landingpage/Features"

export default function Landingpage() {
  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-backg">
            <Navbar></Navbar>
            <Welcome></Welcome>
            <Tutors></Tutors>
            <Courses></Courses>
            <Features></Features>
            <Subscription></Subscription>
            <Suite></Suite>
    </div>
  )
}
