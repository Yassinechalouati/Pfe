import Buttn from "./thirdstep_button"

export default function Third() {
    //lsit of goals
    const goals = [
        "Grow your career", 
        "Thrive at university",
        "Just for fun",
        "Travel abroad",
        "Prepare for a test",
        "Other"
    ]

    //list of topics
    const topics =[
        "Music",
        "Sports",
        "Technology",
        "TOEFL",
        "Movies",
        "IELTS", 
        "Food",
        "Grammar",
        "Science",
        "Healthcare",
        "Art",
        "Business"
    ]


    return(
       <>
            <span className="font-bold self-start text-lg text-[#000]">
                What are your learning goals?
            </span>
            <div className="grid grid-cols-4 self-start gap-5">
                {
                    goals.map((goal, index) => {
                        return <Buttn key={index} text={goal}></Buttn>
                    })
                }
            </div>
            <hr className="h-1 w-full"></hr>
            <span className="font-bold self-start text-lg text-[#000]">
                Which topics would you like to focus on?
            </span>
            <div className="grid grid-cols-7 self-start gap-3">
                {
                    topics.map((goal, index) => {
                        return <Buttn key={index} text={goal}></Buttn>
                    })
                }
            </div>

       </> 
    )
}