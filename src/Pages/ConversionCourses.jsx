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

const ConversionCourses = () => {
  const [fields, setFields] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadFieldsAndCountries = async () => {
      const fieldsData = await fetchFields();
      const countryData = await fetchCountries();
      setFields(fieldsData);
      setCountries(countryData);
    };

    loadFieldsAndCountries();
  }, []);

  // Fetching conversion course data to display, based on the field being IT
  // we should probably change the fields to be the same name as the fields in FIELDS
  // so that it's easier to set up dynamic filtering (if the course name contains the field name, it is displayed)
  const [queryResults, setQueryResults] = useState();
  const doQueryByFieldID = async function () {
    const parseQuery = new Parse.Query("CONVERSION_PROGRAMMES");
    parseQuery.contains("field", "IT");

    try {
      let courses = await parseQuery.find();
      setQueryResults(courses);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <Container>
      <FilterContainer>
        <FilterWrapper>
          <MainTitle>Filter by:</MainTitle>
        </FilterWrapper>
        <HorizontalLine width={150}></HorizontalLine>
        <FilterWrapper>
          <FilterName>Field</FilterName>
          <TypeAhead
            items={fields}
            placeholder="Choose the field here..."
            tagType="field"
          />
        </FilterWrapper>
        <HorizontalLine width={150}></HorizontalLine>
        <FilterWrapper>
          <FilterName>Education Type</FilterName>
          <RadioButton>
            <input className="radioButton" type="radio" />
            <CheckboxLabel className="checkboxLabel" htmlFor="masters">
              Masters
            </CheckboxLabel>
          </RadioButton>
          <RadioButton>
            <input className="radioButton" type="radio" />
            <CheckboxLabel className="checkboxLabel" htmlFor="apprenticeship">
              Apprenticeship
            </CheckboxLabel>
          </RadioButton>
        </FilterWrapper>
        <HorizontalLine width={150}></HorizontalLine>
        <FilterWrapper>
          <FilterName>Location</FilterName>
          <TypeAhead
            items={countries}
            placeholder="Search countries here..."
            tagType="country"
          />
        </FilterWrapper>
        <HorizontalLine width={150}></HorizontalLine>
        <Button className="primary-button" onClick={() => doQueryByFieldID()}>
          Search courses
        </Button>
      </FilterContainer>
      <DisplayContainer>
        {queryResults && queryResults.length === 0 ? (
          <p>{"No results here!"}</p>
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
    </Container>
  );
};

export default ConversionCourses;
