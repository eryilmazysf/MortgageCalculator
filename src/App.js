import React from "react";
import styled from "styled-components";
import backgroundImg from "./assets/background.jpeg";
import FormContainer from "./components/FormContainer";

const Container = styled.div`
  background: url(${backgroundImg});
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
  padding: 2rem 0;
`;

const App = () => {
  return (
    <Container>
      <FormContainer />
    </Container>
  );
};
export default App;
