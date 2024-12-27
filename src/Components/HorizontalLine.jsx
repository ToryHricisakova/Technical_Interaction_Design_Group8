import styled from "styled-components";

// Creates an orange horizontal line with a desired width as input.
const HorizontalLine = ({ width }) => {
  return <Line width={width} />;
};

export default HorizontalLine;

const Line = styled.hr`
  width: width; // adjusting the width as needed.
  border: 1px solid #e47347;
  margin: 10px 0;
`;
