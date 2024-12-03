import React from "react";
import Parse from "parse";
import ProfileHeader from "../Components/ProfileHeader";
import ExpandNetworkBox from "../Components/ExpandNetworkBox";
import { Page } from "../SharedCSS";
import styled from "styled-components";
import ProfileBody from "../Components/ProfileBody";
import useUserProfile from "../Hooks/useUserProfile";

const Profile = () => {
  const [user, loading] = useUserProfile();

  return (
    <Page>
      <PageContentContainer>
        <ProfileContainer>
          <ProfileHeader user={user} loading={loading} />
          <ProfileBody user={user} loading={loading} />
        </ProfileContainer>

        <ExpandNetworkBox user={user} loading={loading} />
      </PageContentContainer>
    </Page>
  );
};

export default Profile;

const PageContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  top: 150px;
  gap: 30px;
  width: 100vw; // To ensure page is horizontally scrollable (doesn't seem to make a difference at the moment).
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
