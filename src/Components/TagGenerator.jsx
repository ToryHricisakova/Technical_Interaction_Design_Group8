import Tag from "./Tag";

const TagGenerator = ({ array, tagType }) => {
  const tags = array.map((word, index) => (
    <Tag key={index} word={word} tagType={tagType} closable={false} />
  ));

  return tags;
};

export default TagGenerator;
