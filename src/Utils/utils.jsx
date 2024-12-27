import Parse from "parse";

// Retrieving _User objectId from USERS objectId.
export function getUser(usersId) {
  const retrieval = async () => {
    try {
      const query = new Parse.Query("USERS");
      query.equalTo("objectId", usersId);
      const userRecord = await query.first();
      const userValue = userRecord.get("user");
      console.log("userValue = " + userValue);
      return userValue.id;
    } catch (error) {
      console.log("Error fetching user data: " + error.message);
    }
    retrieval();
  };
}
