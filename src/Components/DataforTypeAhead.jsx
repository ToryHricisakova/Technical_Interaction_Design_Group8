import Parse from "parse";

export const fetchFields = async () => {
  try {
    const Fields = Parse.Object.extend("FIELDS");
    const query = new Parse.Query(Fields);
    const results = await query.find();

    //Extracting the names from the results
    return results.map((field) => field.get("name"));
  } catch (error) {
    console.error("Error fetching fields:", error);
    return [];
  }
};

export const fetchSkills = async () => {
  try {
    const Skills = Parse.Object.extend("SKILLS");
    const query = new Parse.Query(Skills);
    const results = await query.find();

    //Extracting the names from the results
    return results.map((skill) => skill.get("name"));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};

export const fetchCountries = async () => {
  try {
    const Countries = Parse.Object.extend("COUNTRIES");
    const query = new Parse.Query(Countries);
    const results = await query.find();

    //Extracting the names from the results
    return results.map((country) => country.get("name"));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
