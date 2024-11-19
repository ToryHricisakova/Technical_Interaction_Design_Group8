import styled from "styled-components";
import HorizontalLine from "./HorizontalLine";

const ExpandNetworkBox = () => {
  return (
    <Container>
      <TextContainer>
        <Title>Expand your network</Title>
        <p>Based on your field:</p>
      </TextContainer>

      <ProfilesContainer>
        <p>*Profile*</p>
        <HorizontalLine width="100%" />
        <p>*Profile*</p>
        <HorizontalLine width="100%" />
        <p>*Profile*</p>
      </ProfilesContainer>
    </Container>
  );
};

export default ExpandNetworkBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 40px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  height: fit-content;
  min-width: 300px;
  width: 300px;
  gap: 20px;
  padding: 30px;
`;
const Title = styled.h1`
  font-size: 24px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
  margin: 10px 0 0 0;
`;
const ProfilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: left; // Text is aligned left in prototype, but I prefer it centered.
  text-align: left; */
`;
