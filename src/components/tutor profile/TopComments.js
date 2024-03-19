import Comment from "../Global/Comment";
import Card from "../learner profile/Card";

function TopComments(props) {

    const content = [
        <span key="title" className="self-start text-lg font-bold mb-5">
            Comments on your profile
        </span>,
        <hr key="line" className="w-full h-1"></hr>,
        <Comment key="comment1"></Comment>,
        <hr key="line1" className="w-full h-1"></hr>,
        <Comment key="comment2"></Comment>,
        <hr key="line2" className="w-full h-1"></hr>,
        <Comment key="comment3"></Comment>


    ]
    return (
        <Card content={content}></Card>
    );
}

export default TopComments;