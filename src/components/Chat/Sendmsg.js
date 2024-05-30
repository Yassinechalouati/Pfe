import React from "react";
export default function Sendmsg(props) {

return (<div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <img
                      className="object-cover h-10 w-10 rounded-full" src={props.img} alt="Myimage"
                    >
                    </img>
                    <div
                      className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>{props.msg.message} </div>
                    </div>
                  </div>
                </div>
)}