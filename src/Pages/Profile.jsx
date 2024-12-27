import React from "react";
import Parse from "parse";
import ProfileHeader from "../Components/ProfileHeader";
import ExpandNetworkBox from "../Components/ExpandNetworkBox";
import { Page } from "../SharedCSS";
import styled from "styled-components";
import ProfileBody from "../Components/ProfileBody";
import useUserProfile from "../Hooks/useUserProfile";
import "../Components/Spinner.css";

const Profile = () => {
  const [user, loading] = useUserProfile();

  if (loading) return <span className="loader"></span>;

  return (
    <Page>
      <PageContentContainer>
        <ProfileContainer>
          <ProfileHeader user={user} />
          <ProfileBody user={user} />
        </ProfileContainer>

        <ExpandNetworkBox />
      </PageContentContainer>
    </Page>
  );
};

export default Profile;

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
