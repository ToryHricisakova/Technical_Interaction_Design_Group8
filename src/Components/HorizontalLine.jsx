import styled from "styled-components";

const HorizontalLine = ({ width }) => {
  return <Line width={width} />;
};

export default HorizontalLine;

const Line = styled.hr`
  width: width; // adjust the width as needed
  border: 1px solid #e47347;
  margin: 10px 0;
`;
