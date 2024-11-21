import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Parse from "parse";
import TagGenerator from "./TagGenerator";

const ProfileHeader = () => {
  // user/setUser state needs to passed down from further up to avoid duplicate code. Is on our to-do list.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bannerImg, setBannerImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  const bannerRef = useRef(null);
  const profileImgRef = useRef(null);

  // Retrieve "USERS" database object from the logged in "_User" objectId.
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = Parse.User.current(); // get _User objectId
        const query = new Parse.Query("USERS");
        query.equalTo("user", currentUser);
        const userRecord = await query.first();
        setUser(userRecord);
        setBannerImg(userRecord.get("bannerImage").url());
        setProfileImg(userRecord.get("profileImage").url());
      } catch (error) {
        console.log("Error fetching user data: " + error.message);
      } finally {
        setLoading(false); // Allows page to be shown.
      }
    };
    getCurrentUser();
  }, []);

  const handleBannerEdit = (e) => {
    e.preventDefault();
    bannerRef.current.click();
  };

  const saveBannerImg = async (event) => {
    const image = event.target.files[0];
    try {
      const bannerImage = new Parse.File(image.name, image);
      await bannerImage.save();
      console.log("bannerimg url: " + bannerImage.url());
      user.set("bannerImage", bannerImage);
      await user.save();

      setBannerImg(bannerImage.url());
      console.log("bannerImage uploaded succesfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProfileImageEdit = (e) => {
    e.preventDefault();
    profileImgRef.current.click();
  };

  const saveProfileImg = async (event) => {
    const image = event.target.files[0];
    try {
      const profileImage = new Parse.File(image.name, image);
      await profileImage.save();
      console.log("profileImg url: " + profileImage.url());
      user.set("profileImage", profileImage);
      await user.save();

      setProfileImg(profileImage.url());
      console.log("profileImage uploaded succesfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return <p>Loading</p>; // Ensures that the page is not rendered before the users-data is fetched from the database.

  return (
    <HeaderWrapper>
      <BannerWrapper>
        <Banner src={bannerImg} />
        <HiddenInput type="file" onChange={saveBannerImg} ref={bannerRef} />
        <EditIconWrapper onClick={handleBannerEdit}>
          <EditIcon icon={faEdit} />
        </EditIconWrapper>
      </BannerWrapper>
      <ProfileImageWrapper>
        <ProfileImage src={profileImg} />
        <HiddenInput
          type="file"
          onChange={saveProfileImg}
          ref={profileImgRef}
        />
        <EditIconWrapper onClick={handleProfileImageEdit}>
          <EditIcon icon={faEdit} />
        </EditIconWrapper>
      </ProfileImageWrapper>
      <ProfileBottom>
        <LeftBlock>
          <Button className="secondary-button">Edit Profile</Button>
        </LeftBlock>
        <MiddleBlock>
          <Name>{user.get("firstName") + " " + user.get("lastName")}</Name>
          <Bio>{user.get("profileBio")}</Bio>
        </MiddleBlock>
        <RightBlock>
          {user &&
            TagGenerator({ array: user.get("fields"), tagType: "field" })}
        </RightBlock>
      </ProfileBottom>
    </HeaderWrapper>
  );
};

export default ProfileHeader;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border-radius: 40px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  height: 350px;
  width: 800px;
  min-width: 400px;
`;
const BannerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 100%;
  border-radius: 40px 40px 0 0;
  border: 1px solid #ccc;
`;
const Banner = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 40px 40px 0 0;
  border: 1px solid #ccc;
  object-fit: cover;
`;
const EditIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 3;
`;
const EditIcon = styled(FontAwesomeIcon)`
  width: 15px;
  height: 15px;
  color: grey;
`;
const HiddenInput = styled.input`
  display: none;
`;
const ProfileImageWrapper = styled.div`
  display: flex;
  position: relative;
  width: 150px;
  height: 150px;
  position: absolute;
  left: 20px;
  top: 100px; // (350px-150px/2)
`;
const ProfileImage = styled.img`
  display: flex;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px hidden;
  position: absolute;
  z-index: 2;
`;
const ProfileBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50%;
  border-radius: 0 0 40px 40px;
`;
const LeftBlock = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 100%;
  width: 24%;
  border-radius: 0 0 0px 40px;
  margin-bottom: 80px;
`;
const MiddleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
  height: 100%;
  width: 51%;
  overflow: hidden;
`;
const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 25%;
  border-radius: 0 0 40px 0px;
`;
const Name = styled.h1`
  font-size: 24px;
  margin-bottom: 0px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
`;
const Bio = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
  color: #3a3a3a;
  font-family: Inter, sans-serif;
  line-height: 1.5;
`;
