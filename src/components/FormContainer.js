import React, { useState, useEffect } from "react";
import styled from "styled-components";
import numeral from "numeral";
import logo from "../assets/logo.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem 0;
  max-width: 900px;
  margin: auto;
  img {
    width: 100px;
    height: 100px;
    position: fixed;
    top: 10px;
    right: 20px;
  }
  h1 {
    font-size: 35px;
    font-weight: 500;
    color: #2a6279;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  h3 {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    margin-top: 3rem;
    background: #fff;
    padding: 3rem;
    color: #2a6279;
    box-shadow: 0 0 5px 0 grey;
    border-radius: 1rem;
  }
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 1rem;
    @media only screen and (max-width: 765px) {
      display: block;
    }
  }
`;

const InputSection = styled.div`
  width: 45%;
  min-width: 350px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  label {
    text-transform: uppercase;
    font-weight: 500;
    color: grey;
    margin-bottom: 0.5rem;
  }
  input {
    background: #e8ebed;
    height: 35px;
    border: none;
    border-radius: 10px;
    padding: 0 1rem;
    color: #2a6279;
    font-weight: 500;
    box-shadow: 0 0 5px 0 grey;
    transition: all 0.3s ease-in-out;
    &:hover,
    &:focus {
      box-shadow: 2px 2px 2px 2px grey;
    }
  }
`;

const Error = styled.h4`
  color: red;
  font-size: 13px;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #d8a051;
  color: #fff;
  border: none;
  width: 150px;
  height: 36px;
  font-family: "Oswald", sans-serif;
  font-size: 14px;
  letter-spacing: 0.03em;
  line-height: 36px;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 grey;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    box-shadow: 2px 2px 2px 2px grey;
    font-size: 16px;
  }
`;

const FormContainer = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [loanApr, setLoanApr] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(0.0);

  // useEffect(() => {
  //   calculateValues();
  // }, [purchasePrice, downPayment, loanTerm, loanApr]);

  const submitCalculation = async (e) => {
    e.preventDefault();
    //Validate fields
    const validatedPrice = await validateField(purchasePrice, setPurchasePrice);
    const validatedPayment = await validateField(downPayment, setDownPayment);
    const validatedLoanTerm = await validateField(loanTerm, setLoanTerm);
    const validatedApr = await validateField(loanApr, setLoanApr);

    //CalculateValues
    if (
      validatedPrice &&
      validatedPayment &&
      validatedLoanTerm &&
      validatedApr
    ) {
      console.log("Form is fully validate");
      calculateValues();
    }
  };

  const calculateValues = () => {
    //M=P[i(1+i)^n]/[(1+i)^n-1]
    //P =principal loan amount
    //i=monthly interest rate
    //n=number of months required to repay the loan
    let principal = purchasePrice - downPayment;
    let monthlyInterest = loanApr / 100 / 12;
    let numberOfPayments = loanTerm * 12;
    let monthlyPrice =
      (principal *
        [monthlyInterest * (1 + monthlyInterest) ** numberOfPayments]) /
      [(1 + monthlyInterest) ** (numberOfPayments - 1)];
    setMonthlyPayment(monthlyPrice);
  };

  const validateField = (field, setValue) => {
    let int = parseFloat(field);
    if (field === "" || field === 0) {
      setValue({ ...field.values, error: "Please enter a value" });
      return false;
    } else if (isNaN(int)) {
      setValue({ ...field.values, error: "Please enter a value" });
      return false;
    } else {
      setValue(int);

      return true;
    }
  };

  return (
    <Container>
      <img src={logo} alt="app" />
      <h1>Mortgage calculator</h1>

      <form>
        <InputSection>
          <label>Purchase Price</label>
          <Error>{purchasePrice.error}</Error>
          <input
            type="text"
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </InputSection>
        <InputSection>
          <label>Down Payment</label>
          <Error>{downPayment.error}</Error>
          <input type="text" onChange={(e) => setDownPayment(e.target.value)} />
        </InputSection>
        <InputSection>
          <label>Loan Term(Years)</label>
          <Error>{loanTerm.error}</Error>
          <input type="text" onChange={(e) => setLoanTerm(e.target.value)} />
        </InputSection>
        <InputSection>
          <label>APR(%)</label>
          <Error>{loanApr.error}</Error>
          <input type="text" onChange={(e) => setLoanApr(e.target.value)} />
        </InputSection>
        <SubmitButton onClick={(e) => submitCalculation(e)}>
          Calculate
        </SubmitButton>
      </form>
      <h3>
        Estimated Monthly Payments:{numeral(monthlyPayment).format("$0,0.00")}
      </h3>
    </Container>
  );
};

export default FormContainer;
