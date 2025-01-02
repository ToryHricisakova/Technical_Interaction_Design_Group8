import React, { useState, useEffect } from "react";
import TypeAhead from "../Components/TypeAhead";
import Button from "../Components/Button";
import Parse from "parse";
import HorizontalLine from "../Components/HorizontalLine";
import { fetchFields, fetchCountries } from "../DataforTypeAhead";
import { Page } from "../SharedCSS";
import ExpandNetworkBox from "../Components/ExpandNetworkBox";
import styled from "styled-components";

/**
 * State variables which store the list of respective data (e.g. fields fetches the list of fields) from the backend.
 */
const ConversionCourses = () => {
  const [fields, setFields] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [selectCountry, setSelectedCountry] = useState("");

  /**
   * loadDefaultCourses fetches all the courses in the CONVERSIONM_COURSES
   * class from the backend, sorted by cpId in ascending order.
   *
   * loadFieldsAndCountries fetches fields and countries to populate the TypeAhead components.
   */
  useEffect(() => {
    const loadDefaultCourses = async () => {
      try {
        const parseQuery = new Parse.Query("CONVERSION_PROGRAMMES");
        parseQuery.ascending("cpId");
        const courses = await parseQuery.find();
        setQueryResults(courses);
      } catch (error) {
        console.error(`Error loading courses: ${error.message}`);
      }
    };

    const loadFieldsAndCountries = async () => {
      const fieldsData = await fetchFields();
      const countryData = await fetchCountries();
      setFields(fieldsData);
      setCountries(countryData);
    };

    loadDefaultCourses();
    loadFieldsAndCountries();
  }, []);

  /**
   * Fetching conversion course data to display. The database will be dynamically searched based on the
   * field chosen. At the moment, we only have results for IT and Law, as we have hardcoded those into the database.
   *
   * doQueryByFieldID dynamically fetches courses from the CONVERSION_PROGRAMMES database based on the selected field.
   * It alerts the user if no field is selected and updates queryResults with the fetched courses.
   */
  const [queryResults, setQueryResults] = useState();
  const doQueryByFieldID = async function () {
    if (!selectedField) {
      alert("Please select a field to search for courses.");
      return;
    }
    const parseQuery = new Parse.Query("CONVERSION_PROGRAMMES");
    parseQuery.contains("field", selectedField);

    try {
      let courses = await parseQuery.find();
      setQueryResults(courses);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  /**
   * We are using several containers to make sure we can achieve the correct placement of
   * all the elements on the page.
   *
   * Container --> this is the overarching container that is returned. It's a div with display flex.
   *
   * FilterContainer --> container which has all of the elements to do with the filtering logic. It has
   * display flex, column.
   *
   * FilterWrapper --> adds aditional padding below each filtering segment.
   *
   * FilterName --> the name of the filter.
   *
   * DisplayContainer --> the container which holds all of the filtering results. It is on the same level as FilterContainer.
   *
   * CourseContainer --> the container that holds all the information about individual courses (results). It is on the same level as FilterWrapper.
   * It is a part of the queryResults.map() function which iterates over the search results from the database.
   *
   * Elements that we have reused: MainTitle, TypeAhead, HorizontalLine, RadioButton, CheckboxLabel, Button.
   */
  return (
    <Page>
      <Container>
        <FilterContainer>
          <FilterWrapper>
            <MainTitle>Filter by:</MainTitle>
          </FilterWrapper>
          <HorizontalLine width={200}></HorizontalLine>
          <FilterWrapper>
            <FilterName>Field</FilterName>
            <TypeAhead
              items={fields}
              placeholder="Choose the field here..."
              tagType="field"
              maxNumber={1}
              onSelectionChange={(updatedField) => {
                if (updatedField.length > 0) {
                  setSelectedField(updatedField[0]);
                } else {
                  setSelectedField("");
                }
              }}
            />
          </FilterWrapper>
          <HorizontalLine width={200}></HorizontalLine>
          <FilterWrapper>
            <FilterName>Education Type</FilterName>
            <RadioButton>
              <input
                className="radioButton"
                type="radio"
                id="masters"
                name="educationType"
              />
              <CheckboxLabel className="checkboxLabel" htmlFor="masters">
                Masters
              </CheckboxLabel>
            </RadioButton>
            <RadioButton>
              <input
                className="radioButton"
                type="radio"
                id="apprenticeship"
                name="educationType"
              />
              <CheckboxLabel className="checkboxLabel" htmlFor="apprenticeship">
                Apprenticeship
              </CheckboxLabel>
            </RadioButton>
          </FilterWrapper>
          <HorizontalLine width={200}></HorizontalLine>
          <FilterWrapper>
            <FilterName>Location</FilterName>
            <TypeAhead
              items={countries}
              placeholder="Search countries here..."
              tagType="country"
              maxNumber={1}
              onSelectionChange={(updatedCountry) => {
                if (updatedCountry.length > 0) {
                  setSelectedCountry(updatedCountry[0]);
                } else {
                  setSelectedCountry("");
                }
              }}
            />
          </FilterWrapper>
          <HorizontalLine width={200}></HorizontalLine>
          <Button variant="primary-button" onClick={() => doQueryByFieldID()}>
            Search courses
          </Button>
        </FilterContainer>
        <DisplayContainer>
          {queryResults && queryResults.length === 0 ? (
            <p>
              {
                "No results here! Try typing 'Information Technology' or 'Law' in Field."
              }
            </p>
          ) : (
            queryResults !== undefined &&
            queryResults.map((course) => {
              return (
                <CourseContainer key={course.objectId || course.id}>
                  <UniLogo
                    src={course.get("uniLogoUrl")}
                    alt="University of Birmingham Logo"
                  />
                  <CourseInformation>
                    <CourseName>{course.get("programmeName")}</CourseName>
                    <UniName>{course.get("institution")}</UniName>
                    <LocationName>{course.get("location")}</LocationName>
                  </CourseInformation>
                  <ButtonContainer>
                    <Button
                      variant="secondary-button"
                      href={course.get("webUrl")}
                    >
                      Go to website
                    </Button>
                  </ButtonContainer>
                </CourseContainer>
              );
            })
          )}
        </DisplayContainer>
        <ExpandNetworkBox />
      </Container>
    </Page>
  );
};

export default ConversionCourses;

// Styled components

const Container = styled.div`
  display: flex;
  padding-top: 74px;
`;

const FilterContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const DisplayContainer = styled.div`
  width: 510px;
  height: 550px;
  display: inline-block;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 30px;
  margin: 0px 30px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CourseContainer = styled.div`
  display: flex;
  width: 500px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const FilterWrapper = styled.div`
  padding: 0 0 10px 0;
`;

const MainTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 5px 0;
  color: #35415d;
  font-family: Inter, sans-serif;
  font-weight: bold;
`;

const FilterName = styled.h2`
  font-size: 20px;
  margin: 0 0 5px 0;
  color: #e47347;
  font-weight: bold;
  font-family: Inter, sans-serif;
`;

const CourseName = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #e47347;
  font-weight: bold;
  font-family: Inter, sans-serif;
`;

const UniName = styled.p`
  font-size: 12px;
  margin: 0 0 5px 0;
  color: #35415d;
  font-weight: light;
  font-family: Inter, sans-serif;
`;

const LocationName = styled.p`
  font-size: 12px;
  margin: 0 0 5px 0;
  color: rgba(172, 171, 169, 1);
  font-weight: light;
  font-family: Inter, sans-serif;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  flex-shrink: 0;
`;

const CourseInformation = styled.div`
  flex-grow: 1;
`;

const UniLogo = styled.img`
  height: 50px;
  cursor: pointer;
  margin: 0px 30px 10px 0px;
`;

const RadioButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0rem;
`;

const CheckboxLabel = styled.label`
  white-space: nowrap;
  font-size: 12px;
  color: #35415d;
`;
