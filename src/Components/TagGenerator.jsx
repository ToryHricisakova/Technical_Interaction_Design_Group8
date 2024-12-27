import Tag from "./Tag";

// Generate a collection of skill-tags or field-tags based on the tagType passed as a prop.
// Default-value of "array" is an empty array to ease error handling.
const TagGenerator = ({ array = [], tagType }) => {
  if (array.length === 0) {
    return null;
  }

  return (
    <>
      {/* Since there are no duplicate skills or fields, "tag" can be used as a unique key */}
      {array.map((tag) => (
        <Tag key={tag} word={tag} tagType={tagType} closable={false} />
      ))}
    </>
  );
};

export default TagGenerator;
