import Step from './step'


export default function Progress() {
    return(
        <div className="flex items-center w-[70%] justify-between"> 
            <Step num="1" title="Sign up"></Step>
            <div className="h-1 rounded-full w-[14%] bg-lightg"></div>
            <Step num="2" title="Personalize"></Step>
            <div className="h-1 w-[14%] rounded-full bg-lightg"></div>
            <Step num="3" title="Start learning"></Step>
        </div>
    )
}