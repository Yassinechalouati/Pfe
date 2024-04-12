import axiosInstance from "../../interceptors/axiosInterceptor"

//getting flag image with name of country
export const fetchCountryData = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching country data:', error);
      return null;
    }
  };

//getting files from backend
export const fetchFile = async (pfp, fileType, role, id, )=> {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`http://localhost:5000/api/uploads/${pfp}`, {
            params: {
                role: role,
                fileType: fileType,
                id: id
            },
            responseType: 'blob'
        })
        .then(response => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(response.data);
        })
        .catch(error => {
            reject(error);
        });
    });
};

export const LogOut = () => {
    localStorage.clear()
}

export const timeFormatter = (start_time) => {
    const startDate = new Date(start_time);
    const formattedStartTime = startDate.toLocaleTimeString('en-US', { hour12: false });
    const [startHour, startMinute] = formattedStartTime.split(':');

    const formattedStartHourMinute = `${startHour}:${startMinute}`;
    

    return formattedStartHourMinute

}

export const handleLessonDifficultyColor = (test, type) => {
    if(type === 'Schedule') {
        switch (test) {
            case 'Beginner':
            return "text-elements"
            case 'Intermediate':
            return "text-yellow-500" 
            case 'Advanced':
            return "text-button"  
            case 'Expert':
            return "text-errortext" 
            default:
            return "text-active"
        }
    }else {
        switch (test) {
            case 'Beginner':
            return "text-elements border-elements bg-lightGreen"
            case 'Intermediate':
            return "text-yellow-500 bg-lightYellow border-yellow-500" 
            case 'Advanced':
            return "text-button border-button bg-lightbutton"  
            case 'Expert':
            return "bg-lightRed border-textRed text-textRed" 
            default:
            return "text-active"
        }
    }

}

export const convertTime = (scheduledTime) => {
     //converting the selected time to normal one 
            // Split the time string into hours, minutes, and AM/PM
            const [time, period] = scheduledTime.split(' ');
            const [hours, minutes] = time.split(':');

            // Convert hours to 24-hour format
            let hours24 = parseInt(hours, 10);
            if (period === 'PM' && hours24 < 12) {
                hours24 += 12;
            } else if (period === 'AM' && hours24 === 12) {
                hours24 = 0;
            }

            // Format the hours and minutes
            const formattedHours = hours24.toString().padStart(2, '0')
            const formattedMinutes = minutes.padStart(2, '0')


            return {formattedHours, formattedMinutes}
}

export const dateExistenceTester = (list, hour, minute, busyDate) => {
    const formatHours = String(hour).padStart(2, '0')
    const formatMinutes = String(minute).padStart(2, '0')
    const usedTime= `${busyDate} ${formatHours}:${formatMinutes}`

    let test = false
    //we check if the time is used or not 
    if(list.length > 0 ){
        for(let i =0; i < list.length; i++){
            const item = list[i].interval_time_formatted
            if(item === usedTime) {
                test = true
                break
            }
        }
    }
    const hour12 = hour % 12 || 12;
    const hourStr = hour12.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');
    const amPm = hour < 12 ? 'AM' : 'PM'
    const result= `${hourStr}:${minuteStr} ${amPm}`
    

    return {
        test, result
    }
}

//testing if the picture is from google or not
export function isGoogleProfilePicture(pfpPath) {
    // Define a regular expression pattern to match Google profile picture URLs
    const googlePattern = /lh3\.googleusercontent\.com.*=s\d+-c-no/;
    // Test if the pathname matches the Google pattern
    return googlePattern.test(pfpPath);
}
