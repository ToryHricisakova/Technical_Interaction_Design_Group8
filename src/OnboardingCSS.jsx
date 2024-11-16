import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  padding: 80px 0 10px 0; //  measure exact padding needed - top and bottom should be identical
`
export const Form = styled.form`
  background-color: rgba(245, 245, 245, 1);
  border-radius: 20px;
  padding: 45px;
  width: 550px;
  position: relative;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`
export const MainTitle = styled.h1`
  font-size: 32px;
  margin: 0 0 10px 0;
  color: #35415D;
  font-family: Inter, sans-serif;
  font-weight: bold;
`
export const Paragraph = styled.div`
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.5;
  color: #333;
`
export const Boldparagraph = styled.div`
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.5;
  color: #333;
  font-weight: bold;
`
export const Section = styled.div`
margin: 20px 0 10px 0;
`