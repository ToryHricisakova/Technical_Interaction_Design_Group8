import React, { useState, useEffect } from "react";
import TypeAhead from "../Components/TypeAhead";
import Button from "../Components/Button";
import Parse from "parse";
import HorizontalLine from "../Components/HorizontalLine";
import {
  FilterContainer,
  MainTitle,
  FilterName,
  FilterWrapper,
  DisplayContainer,
  Container,
  CourseContainer,
  CourseName,
  UniName,
  LocationName,
  ButtonContainer,
  CourseInformation,
  UniLogo,
  RadioButton,
  CheckboxLabel,
} from "../ConversionCoursesCSS";
import { fetchFields, fetchCountries } from "../DataforTypeAhead";
import { Page } from "../SharedCSS";
import ExpandNetworkBox from "../Components/ExpandNetworkBox";

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
        <Button className="primary-button" onClick={() => doQueryByFieldID()}>
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
                    className="secondary-button"
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
