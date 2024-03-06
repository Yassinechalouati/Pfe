import Card from "./Card";
import StartedCardElement from "./StartedCardElement";

function StartedCard(props) {

    const content =[
        <span key="title" className="self-start text-lg font-bold mb-5">
            Let's get you started
        </span>,
        <hr key="line1" className="h-1 w-full"></hr>,
        <StartedCardElement key="icon1" image='talktoteacher.png' title="Talk to a tutor 1 on 1" description="Start learning today in private lessons."></StartedCardElement>,
        <hr key="line2" className="h-1 w-full "></hr>,
        <StartedCardElement key="icon2" image='Subscribe.png' title="Subscribe and start learning" description="Choose a learning plan that works for you"></StartedCardElement>,
        <hr key="line 3" className="h-1 w-full "></hr>,
        <StartedCardElement key="icon3" image='SearchTeacher.png' title="Browse our community of tutors" description="Find a friendly tutor to start practicing your English"></StartedCardElement>,
        <hr key="line 4" className="h-1 w-full "></hr>,
        <StartedCardElement key="6" image='courses.png' title="Explore our courses" description="Discover tailored courses that fit your interests"></StartedCardElement>,
    ]

    return (
        <Card content={content}></Card>
    );
}

export default StartedCard;