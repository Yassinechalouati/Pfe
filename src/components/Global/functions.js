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