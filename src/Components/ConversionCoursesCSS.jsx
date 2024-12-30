import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding-top: 74px;
`;

export const FilterContainer = styled.div`
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

export const DisplayContainer = styled.div`
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

export const CourseContainer = styled.div`
  display: flex;
  width: 500px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const TypeAheadWrapper = styled.div`
  padding: 0 0 30px 0;
`;

export const FilterWrapper = styled.div`
  padding: 0 0 10px 0;
`;

export const MainTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 5px 0;
  color: #35415d;
  font-family: Inter, sans-serif;
  font-weight: bold;
`;

export const FilterName = styled.h2`
  font-size: 20px;
  margin: 0 0 5px 0;
  color: #e47347;
  font-weight: bold;
  font-family: Inter, sans-serif;
`;

export const CourseName = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #e47347;
  font-weight: bold;
  font-family: Inter, sans-serif;
`;

export const UniName = styled.p`
  font-size: 12px;
  margin: 0 0 5px 0;
  color: #35415d;
  font-weight: light;
  font-family: Inter, sans-serif;
`;

export const LocationName = styled.p`
  font-size: 12px;
  margin: 0 0 5px 0;
  color: rgba(172, 171, 169, 1);
  font-weight: light;
  font-family: Inter, sans-serif;
`;

export const ButtonContainer = styled.div`
  margin-left: auto;
  flex-shrink: 0;
`;

export const CourseInformation = styled.div`
  flex-grow: 1;
`;

export const UniLogo = styled.img`
  height: 50px;
  cursor: pointer;
  margin: 0px 30px 10px 0px;
`;

export const RadioButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0rem;
`;

export const CheckboxLabel = styled.label`
  white-space: nowrap;
  font-size: 12px;
  color: #35415d;
`;
