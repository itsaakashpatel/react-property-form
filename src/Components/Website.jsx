import React from "react";
// or less ideally
import { Container, Row } from "react-bootstrap";

//Common
import Stepper from "Components/Common/Stepper";
import { StepContentWrapper } from "Components/Common/Stepper.style";

//STEPS
import StepOne from "Components/Steps/One";
import StepTwo from "Components/Steps/Two";
import StepThree from "Components/Steps/Three";

export default class Website extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1,
      formValues: {
        address: "",
        bedRoom: "",
        bathRoom: "",
        description: "",
      },
    };

    //BINDING
    this.getStepContent = this.getStepContent.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.changeValues = this.changeValues.bind(this);
  }

  getStepContent(activeStep) {
    const { formValues } = this.state;
    switch (activeStep) {
      case 0:
        return <StepOne 
          handleNext={this.handleNext} 
          changeValues={this.changeValues}
        />;
      case 1:
        return (
          <StepTwo
            values={formValues}
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            changeValues={this.changeValues}
          />
        );
      case 2:
        return <StepThree handleBack={this.handleBack} />;
      default:
        return <StepOne />;
    }
  }

  handleNext() {
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
    }));
  }

  handleBack() {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  }

  changeValues(values) {
    this.setState(
      (state) => ({
        formValues: {
          ...state.formValues,
          ...values,
        },
      }),
      () => {
        //GO to Next step
        this.handleNext();
      }
    );
  }

  render() {
    const { activeStep } = this.state;
    console.log("Website -> render -> this.state", this.state);
    return (
      <Container fluid="md" className="container">
        <Row>
          <Stepper
            steps={["Upload Data", "Fill Form", "Upload Images"]}
            activeStep={this.state.activeStep}
          />
        </Row>
        <Row>
          <StepContentWrapper>
            {this.getStepContent(activeStep)}
          </StepContentWrapper>
        </Row>
      </Container>
    );
  }
}
