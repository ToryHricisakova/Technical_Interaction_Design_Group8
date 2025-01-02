import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse";
import ExpandNetworkBox from "../Components/ExpandNetworkBox";
import { Page } from "../Components/SharedCSS";
import ProfileHeader from "../Components/ProfileHeader";
import ProfileBody from "../Components/ProfileBody";
import "../Components/Spinner.css";

/**
 * Page for viewing the profiles of other users.
 * The "_User" objectId is used to link to profiles through the routing.
 */
const ViewProfile = () => {
  const { userObjectId } = useParams();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve relevant "USERS" object:
  useEffect(() => {
    const getUser = async () => {
      try {
        const userObject = Parse.Object.extend("_User");
        const userToRetrieve = new userObject();
        userToRetrieve.id = userObjectId;
        console.log("Querying USERS class for profile to show...");
        const query = new Parse.Query("USERS");
        query.equalTo("user", userToRetrieve);
        const userRecord = await query.first();
        if (userRecord) {
          console.log("Found user in USERS:", userRecord);
        } else {
          console.log(
            "No user profile found in USERS class for userObjectId = " +
              userObjectId
          );
        }
        setUserId(userRecord);
      } catch (error) {
        console.log("Error fetching user data: " + error.message);
      } finally {
        setLoading(false); // Allows page to be shown.
      }
    };
    getUser();
  }, [userObjectId]);

  if (loading) return <span className="loader"></span>;

  // viewMode boolean is passed to remove functionality that is intended only for the loggeed in user's personal profile page (edit options).
  return (
    <Page>
      <PageContentContainer>
        <ProfileContainer>
          <ProfileHeader user={userId} viewMode={true} />
          <ProfileBody user={userId} />
        </ProfileContainer>
        <ExpandNetworkBox />
      </PageContentContainer>
    </Page>
  );
};

export default ViewProfile;

const PageContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 74px; // 150-76
  gap: 30px;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
