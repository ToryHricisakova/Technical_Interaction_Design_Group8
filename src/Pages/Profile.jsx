import React from "react";
import Parse from "parse";
import ProfileHeader from "../Components/ProfileHeader";
import ExpandNetworkBox from "../Components/ExpandNetworkBox";
import { Page } from "../SharedCSS";
import styled from "styled-components";
import ProfileBody from "../Components/ProfileBody";

const Profile = () => {
  return (
    <Page>
      <PageContentContainer>
        <ProfileContainer>
          <ProfileHeader />
          <ProfileBody />
        </ProfileContainer>

        <ExpandNetworkBox />
      </PageContentContainer>

      {/* <p>
        Current user:{" "}
        {Parse.User.current()
          ? Parse.User.current().get("username")
          : "No user logged in"}
      </p> */}
    </Page>
  );
};

export default Profile;

const PageContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 150px;
  gap: 30px;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
