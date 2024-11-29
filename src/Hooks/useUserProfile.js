import {useEffect, useState} from "react";
import Parse from "parse";


export default function useUserProfile() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const currentUser = Parse.User.current(); // get _User objectId
                const query = new Parse.Query("USERS");
                query.equalTo("user", currentUser);
                const userRecord = await query.first();
                console.log("setting the user ...");
                setUser(userRecord);
            } catch (error) {
                console.log("Error fetching user data: " + error.message);
            } finally {
                setLoading(false); // Allows page to be shown.
            }
        };
        getCurrentUser();
    }, [])
    return [user, loading];
}