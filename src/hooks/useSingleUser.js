import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function useSingleUser(email) {
    const [singleUser, setSingleUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(singleUser)

    useEffect(() => {
        setLoading(true);
        const token = Cookies.get("accessToken"); // Replace "accessToken" with your actual cookie name

        if (!token) {
            // Handle the case when there's no access token in cookies
            return;
        }

        // Create an Axios instance with the access token in the header
        const axiosInstance = axios.create({
            baseURL: `http://localhost:5000/api/v1`,
            headers: {
                Authorization: `${token}`,
            },
        });

        // Make the GET request using the Axios instance
        axiosInstance
            .get(`/user/${email}`)
            .then((response) => {
                setSingleUser(response?.data?.data);
                setLoading(false);
            })
            .catch((error) => {
                // Handle errors here
                console.error("Error fetching user:", error);
                setLoading(false);
            });
    }, [email]);

    return { singleUser, loading };
}

export default useSingleUser;
