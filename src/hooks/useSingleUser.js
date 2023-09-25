import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { baseUrl } from "../../config";

function useSingleUser(email) {
    const [singleUser, setSingleUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const token = Cookies.get("accessToken");
        if (!token) {
            return;
        }
        const axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: {
                authorization: `${token}`,
            },
        });

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
