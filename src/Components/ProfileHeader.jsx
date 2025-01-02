import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Parse from "parse";
import TagGenerator from "./TagGenerator";
import { ErrorMessage } from "../Components/SharedCSS";
import EditProfile from "../Components/EditProfile";
import Modal from "react-modal";
import ConnectButton from "./ConnectButton";

/**
 * Component used for the profile page along with the ProfileBody and the ExpandNetworkBox.
 * Generates the profile header for the user passed as a prop ("USERS" object).
 *
 * The component's behavior and appearance changes depending on the "viewMode" boolean.
 * viewMode = false: Used for viewing the user's own profile.
 * viewMode = true: Used for viewing another user's profile.
 */
const ProfileHeader = ({ user, viewMode }) => {
  const [bannerImg, setBannerImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [errorMsgBanner, setErrorMsgBanner] = useState("");
  const [errorMsgPhoto, setErrorMsgPhoto] = useState("");
  const bannerRef = useRef(null);
  const profileImgRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState([]);

  // Removes error message (if picture uploads fail) after a 2 second delay.
  useEffect(() => {
    if (errorMsgBanner || errorMsgPhoto) {
      const timer = setTimeout(() => {
        setErrorMsgBanner("");
        setErrorMsgPhoto("");
      }, 2000);
      // Cleanup function - runs before the component unmounts or before the effect is re-executed.
      return () => clearTimeout(timer);
    }
  }, [errorMsgBanner, errorMsgPhoto]);

  // Retrieves profileImage and bannerImage from database (from the user passed as a prop to the component), and saves it in the state.
  useEffect(() => {
    if (user) {
      setBannerImg(user.get("bannerImage").url());
      setProfileImg(user.get("profileImage").url());
    }
  }, [user]);

  // Retrieves the fields for the user, generates styled tags from them, and saves the tags in the state as an array.
  useEffect(() => {
    setFields(user.get("fields") && generateTags());
  }, [user]);

  // Enables the usage of the icon for uploading pictures.
  const handleBannerEdit = (e) => {
    e.preventDefault();
    bannerRef.current.click();
  };

  // Saves bannerImage to database and stores the url for it in the state.
  const saveBannerImg = async (event) => {
    const image = event.target.files[0];
    try {
      const bannerImage = new Parse.File(image.name, image);
      await bannerImage.save();
      console.log("bannerimg url: " + bannerImage.url());
      user.set("bannerImage", bannerImage);
      await user.save();
      setErrorMsgBanner("");
      setBannerImg(bannerImage.url());
      console.log("bannerImage uploaded succesfully");
    } catch (error) {
      setErrorMsgBanner("There was an error saving your banner.");
    }
  };

  // Enables the usage of the icon for uploading pictures.
  const handleProfileImageEdit = (e) => {
    e.preventDefault();
    profileImgRef.current.click();
  };

  // Save profileImage to database and stores the url for it in the state.
  const saveProfileImg = async (event) => {
    const image = event.target.files[0];
    try {
      const profileImage = new Parse.File(image.name, image);
      await profileImage.save();
      console.log("profileImg url: " + profileImage.url());
      user.set("profileImage", profileImage);
      await user.save();
      setErrorMsgPhoto("");
      setProfileImg(profileImage.url());
      console.log("profileImage uploaded succesfully");
    } catch (error) {
      setErrorMsgPhoto("There was an error saving your profile photo.");
    }
  };

  // Retrieve user's tags from database and generate styled tags for display on profile.
  const generateTags = () => {
    if (user.get("fields") !== undefined) {
      return TagGenerator({ array: user.get("fields"), tagType: "field" });
    }
  };

  // For Edit Profile pop-up functionality.
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Renders a component for either a personal profile that can be edited or a profile as it is viewed by others.
  return (
    <HeaderWrapper>
      <BannerWrapper>
        <Banner src={bannerImg} alt="Profile banner image" />
        {!viewMode ? (
          <>
            <HiddenInput type="file" onChange={saveBannerImg} ref={bannerRef} />
            <EditIconWrapper onClick={handleBannerEdit}>
              <EditIcon icon={faEdit} />
            </EditIconWrapper>
          </>
        ) : null}
        {errorMsgBanner && (
          <StyledErrorMessageBanner>{errorMsgBanner}</StyledErrorMessageBanner>
        )}
        {errorMsgPhoto && (
          <StyledErrorMessagePhoto>{errorMsgPhoto}</StyledErrorMessagePhoto>
        )}
      </BannerWrapper>

      <ProfileImageWrapper>
        <ProfileImage src={profileImg} />
        {!viewMode ? (
          <>
            <HiddenInput
              type="file"
              onChange={saveProfileImg}
              ref={profileImgRef}
            />
            <EditIconWrapper onClick={handleProfileImageEdit}>
              <EditIcon icon={faEdit} />
            </EditIconWrapper>
          </>
        ) : null}
      </ProfileImageWrapper>

      <ProfileBottom>
        <LeftBlock>
          {!viewMode ? (
            <Button variant="secondary-button" onClick={handleOpenModal}>
              Edit Profile
            </Button>
          ) : (
            <ConnectButton />
          )}
        </LeftBlock>

        <MiddleBlock>
          <Name>{user.get("firstName") + " " + user.get("lastName")}</Name>
          <Bio>{user.get("profileBio")}</Bio>
        </MiddleBlock>

        <RightBlock>{fields}</RightBlock>
      </ProfileBottom>

      {/* Modal for Onboarding Component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Profile Modal"
        style={{
          content: {
            top: "55%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "600px",
            borderRadius: "20px",
            maxHeight: "70vh",
            overflowY: "auto",
            padding: "50px 25px 50px 25px",
            zIndex: 10,
          },
          overlay: {
            zIndex: 8,
            paddingBottom: "50px",
          },
        }}
      >
        <EditProfile onClose={handleCloseModal} />
      </Modal>
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
  border-radius: 20px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  height: 350px;
  width: 860px;
  min-width: 400px;
`;
const BannerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 100%;
  border-radius: 20px 20px 0 0;
`;
const Banner = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 20px 20px 0 0;
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
  top: 100px; // (350px-150px/2) finding center by subtracting height of image from height of HeaderWrapper and dividing by 2.
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
  width: 22%;
  border-radius: 0 0 0px 20px;
  box-sizing: border-box;
  padding-bottom: 40px;
`;
const MiddleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
  height: 100%;
  width: 53%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 5px 10px;
`;
const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 25%;
  border-radius: 0 0 20px 0px;
  box-sizing: border-box;
  padding-right: 10px;
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
const StyledErrorMessageBanner = styled(ErrorMessage)`
  z-index: 2;
  position: absolute;
  background-color: white;
  right: 55px;
  top: 3px;
  border-radius: 8px;
  padding: 5px 10px;
`;
const StyledErrorMessagePhoto = styled(ErrorMessage)`
  z-index: 3;
  position: absolute;
  background-color: white;
  left: 158px;
  top: 103px;
  border-radius: 8px;
  padding: 5px 10px;
`;
