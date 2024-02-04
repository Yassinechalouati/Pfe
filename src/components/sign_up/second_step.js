import RadioButton from './radiobutton'

export default function Second() {
    const radio_title = [
        ["None", "I'm still learning English and know only a few words and phrases. Understanding and responding in conversations is a challenge for me."],
        ["Basic", "While I know some basic English, I often need help understanding and responding in conversations. Sometimes, I have to look up words."],
        ["Moderate", "I can discuss familiar topics and share my opinions and plans. Despite making occasional mistakes, I can usually communicate effectively."],
        ["Advanced", "I can express thoughts, feelings, and opinions without much preparation. People generally understand me, and I can correct myself if necessary."],
        ["Fluent", "Comfortable discussing complex topics, I can express myself with subtlety and nuance, fostering meaningful conversations."]
    ]
    return(
        <>
             <span className="font-bold self-start text-lg text-[#000]">
                How would you like to describe your English proficiency?
            </span>
            {
                radio_title.map((informations, index) => {
                    return <RadioButton key={index} index={index} title={informations[0]} infos= {informations[1]}></RadioButton>
                })
            }
        </>
    );
}