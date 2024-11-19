import styled from "styled-components";

export const Container = styled.div`
  width: 500px;
  position: absolute;
  left: 50px;
  bottom: 50px;
  padding: 30px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export const MainTitle = styled.h1`
  font-size: 64px;
  margin: 0 0 5px 0;
  color: #35415d;
  text-align: left;
  font-family: Inter, sans-serif;
  font-weight: bold;
`;

export const SubTitle = styled.h3`
  font-size: 32px;
  margin: 0 0 20px 0;
  font-family: Inter, sans-serif;
  font-weight: bold;
`;

export const HighlightTextColor = styled.span`
  color: #e47347;
  font-weight: bold;
`;

export const PrimaryTextColor = styled.span`
  color: #35415d;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.5;
  color: #333;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;
