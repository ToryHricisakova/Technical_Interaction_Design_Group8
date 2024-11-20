import styled from "styled-components";
import Tag from "./Tag";

const TagGenerator = ({ array, tagType }) => {
  const tags = array.map((word, index) => (
    <StyledTag key={index} word={word} tagType={tagType} removeable={false} />
  ));

  return tags;
};

export default TagGenerator;

const StyledTag = styled(Tag)`
  pointer-events: none;
`;
