
import IntroductionVideo from './introductionVideo';
import Image from './Image';
import Description from './Description';


function ProfilePictureUploader() {
    return (
        <div className="w-full h-[80%] space-y-2 py-3 overflow-y-auto"> 
            <Image></Image>
            <IntroductionVideo></IntroductionVideo>
            <Description></Description>
        </div>
    );
}

export default ProfilePictureUploader;
