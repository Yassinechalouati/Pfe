import { NavLink } from "react-router-dom";

function Title(props) {
    return (
        <div className="flex-col flex ">
            <div className="flex items-center space-x-2">
                <NavLink
                 to={`/${props.role}/profile/Settings`}
                 className="font-bold hover:underline cursor-pointer text-black">
                    Account settings 
                </NavLink>
                <span className="text-black">
                    /
                </span>
                <span className="text-black">
                    {props.title}
                </span>

            </div>
        </div>
    );
}

export default Title;