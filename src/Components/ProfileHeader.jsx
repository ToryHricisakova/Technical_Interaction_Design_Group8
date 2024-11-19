import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Parse from "parse";

const ProfileHeader = () => {
  const [user, setUser] = useState(null);

  const [bannerImg, setBannerImg] = useState(
    "src/MediaFiles/BannerDefault.svg"
  );
  const [profileImg, setProfileImg] = useState("src/MediaFiles/Profile2.svg");
  const bannerRef = useRef(null);
  const profileImgRef = useRef(null);

  // function getBannerImg(event) {
  //   setBannerImg(URL.createObjectURL(event.target.files[0]));
  //   setBannerImg(convertToBase64);
  //   console.log(bannerImg);
  // }

  const getBannerImg = async (event) => {
    const image = event.target.files[0];
    const base64image = await convertToBase64(image);
    setBannerImg(base64image);
    updateBannerImg(base64image); // save to DB
  };

  const updateBannerImg = async (base64image) => {
    const currentUser = Parse.User.current();
    const query = new Parse.Query("USERS");
    query.equalTo("user", currentUser);
    const userRecord = await query.first();
    console.log(userRecord);
    userRecord.set("bannerImage", base64image);
    await userRecord.save();
    console.log(currentUser);
    //let bannerImage = new Parse.Object("bannerImage");
    //bannerImage.set(currentUser.objectId, )
  };

  useEffect(() => {
    console.log("bannerImg set to " + bannerImg);
  }, [bannerImg]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function handleBannerEdit(e) {
    e.preventDefault();
    bannerRef.current.click();
  }

  function getProfileImg(event) {
    setProfileImg(URL.createObjectURL(event.target.files[0]));
  }

  function handleProfileEdit(e) {
    e.preventDefault();
    profileImgRef.current.click();
  }

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = Parse.User.current(); // get _User objectId
        const query = new Parse.Query("USERS");
        query.equalTo("user", currentUser);
        const userRecord = await query.first();
        setUser(userRecord);
      } catch (error) {
        console.log("Error fetching user data: " + error.message);
      }
    };
    getCurrentUser();
    console.log(user);
  }, []);

  const getProfileName = async () => {};

  return (
    <HeaderWrapper>
      <Banner bannerImg={bannerImg}>
        <HiddenInput type="file" onChange={getBannerImg} ref={bannerRef} />
        <EditIconWrapper onClick={handleBannerEdit}>
          <EditIcon icon={faEdit} />
        </EditIconWrapper>
      </Banner>
      <ProfileImage profileImg={profileImg}>
        <HiddenInput type="file" onChange={getProfileImg} ref={profileImgRef} />
        <EditIconWrapper onClick={handleProfileEdit}>
          <EditIcon icon={faEdit} />
        </EditIconWrapper>
      </ProfileImage>
      <ProfileBottom>
        <LeftBlock>
          <Button className="secondary-button">Edit Profile</Button>
        </LeftBlock>
        <MiddleBlock>
          <Name>
            {user && user.get("firstName") + " " + user.get("lastName")}
          </Name>
          <Bio>{user && user.get("bio")}</Bio>
        </MiddleBlock>
        <RightBlock>{/* Tags pulled from database */}</RightBlock>
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
`;
const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 100%;
  border-radius: 40px 40px 0 0;
  border: 1px solid #ccc;
  background-image: url(${(props) => props.bannerImg});
  background-size: cover;
  background-position: center;
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
`;
const EditIcon = styled(FontAwesomeIcon)`
  width: 15px;
  height: 15px;
  color: grey;
`;
const HiddenInput = styled.input`
  display: none;
`;
const ProfileImage = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px hidden;
  position: absolute;
  left: 20px;
  top: 100px; // (350px-150px/2)
  background-image: url(${(props) => props.profileImg});
  background-size: cover;
  background-position: center;
  z-index: 2;
`;
const ProfileBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50%;
  border-radius: 0 0 40px 40px;
  //border: solid black 1px;
`;
const LeftBlock = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  //border: blue 1px solid;
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
  //border: purple 1px solid;
`;
const RightBlock = styled.div`
  display: flex;
  height: 100%;
  width: 25%;
  /* border: green 1px solid; */
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
