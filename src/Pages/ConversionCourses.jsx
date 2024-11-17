import React from "react";
import TypeAhead from "../Components/TypeAhead";
import fields from "../../public/MediaFiles/fields";
//we need to import countries for the location typeahead once created
import Button from "../Components/Button";
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

const ConversionCourses = () => {
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
            placeholder="Search career fields here..."
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
            items={fields}
            placeholder="Search career fields here..."
            tagType="field"
          />
        </FilterWrapper>
        <HorizontalLine width={150}></HorizontalLine>
        <Button className="primary-button">Reset filters</Button>
      </FilterContainer>
      <DisplayContainer>
        <CourseContainer>
          <UniLogo
            src="public/MediaFiles/UniBirmingham.png"
            alt="University of Birmingham Logo"
          />
          <CourseInformation>
            <CourseName>Computer Science, MSc</CourseName>
            <UniName>University of Birmingham</UniName>
            <LocationName>Birmingham, United Kingdom</LocationName>
          </CourseInformation>
          <ButtonContainer>
            <Button className="secondary-button">Go to website</Button>
          </ButtonContainer>
        </CourseContainer>
        <CourseContainer>
          <UniLogo
            src="public/MediaFiles/UniBirmingham.png"
            alt="University of Birmingham Logo"
          />
          <CourseInformation>
            <CourseName>Computer Science, MSc</CourseName>
            <UniName>University of Birmingham</UniName>
            <LocationName>Birmingham, United Kingdom</LocationName>
          </CourseInformation>
          <ButtonContainer>
            <Button className="secondary-button">Go to website</Button>
          </ButtonContainer>
        </CourseContainer>
      </DisplayContainer>
    </Container>
  );
};

export default ConversionCourses;
