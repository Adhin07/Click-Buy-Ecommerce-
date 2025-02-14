import { setUserDetails } from "../store/userSlice";
import SummaryApi from "../common";


export const fetchUserDetails = async ({ dispatch,setCartProductCount  }) => {
    
  
    try {
        

        const dataResponse = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: "include", // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                // Add other headers if necessary
            }
        });


        // Check if the response status is OK (status code 200-299)
        if (!dataResponse.ok) {
            throw new Error(`HTTP error! Status: ${dataResponse.status}`);
        }

        // Parse the response as JSON
        const dataApi = await dataResponse.json();
       
        

        // //Check if the API returned a success flag
        if (dataApi.success) {
            // Dispatch user details to the store
            dispatch(setUserDetails(dataApi?.data));
            
        } else {
            console.error("API response error:", dataApi.message);
        }
    } catch (error) {
        console.error("Fetch user details error:", error);
    }
}


