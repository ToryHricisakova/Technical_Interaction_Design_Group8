import styled from "styled-components";
import Parse from "parse";

const ProfileBody = () => {
  return (
    <BodyWrapper>
      <p>*Body*</p>
      <p>
        Current user:{" "}
        {Parse.User.current()
          ? Parse.User.current().get("username")
          : "No user logged in"}
      </p>
    </BodyWrapper>
  );
};

export default ProfileBody;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border-radius: 40px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  min-height: 350px;
  height: fit-content;
`;
