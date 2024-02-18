import Phase from './Phase'

function StepBar() {
    return (
        <div className="w-full justify-between h-[10%] flex ">
            <Phase label='Welcome!'></Phase>
            <Phase label='Intro'></Phase>
            <Phase label='Profile'></Phase>
            <Phase label='Connection Test'></Phase>
        </div>
    );
}

export default StepBar;