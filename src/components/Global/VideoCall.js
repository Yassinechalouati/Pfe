import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useLocation } from 'react-router-dom';


export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCall() {
      //getting the uuid from the url
      const param = useParams()
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const name = searchParams.get('name');
      const roomID = "Linguify Tutoring";
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 38617016;
      const serverSecret = "347132c3e7f30ec57ce918f5bdf8b945";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  param.uuid, name);

     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({

        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: [ZegoUIKitPrebuilt.OneONoneCall], // To implement 1-on-1 calls, modify the parameter here to .
        },
      })



  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
    
  );
}