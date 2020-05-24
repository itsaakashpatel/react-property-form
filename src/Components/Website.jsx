import React from "react";
// or less ideally
import { Container, Row } from "react-bootstrap";

//Common
import Stepper from "Components/Common/Stepper";
import ErrorBoundary from "Components/Common/ErrorBoundary"
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
      images : []
    };

    //BINDING
    this.getStepContent = this.getStepContent.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.changeValues = this.changeValues.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.addDataFromScratch = this.addDataFromScratch.bind(this);
  }

  getStepContent(activeStep) {
    const { formValues, images } = this.state;
    switch (activeStep) {
      case 1:
        return <StepOne 
          addDataFromScratch={this.addDataFromScratch} 
          changeValues={this.changeValues}
        />;
      case 2:
        return (
          <StepTwo
            values={formValues}
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            changeValues={this.changeValues}
          />
        );
      case 3:
        return <StepThree 
            handleBack={this.handleBack} 
            submitForm={this.submitForm}
            images={images}
          />;
      default:
        return <StepOne 
          addDataFromScratch={this.addDataFromScratch} 
          changeValues={this.changeValues}
        />;
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

  submitForm(files) {
    //GET IMAGES AND UPDATE TO STATE
    let updatedImages = [...files]
    this.setState({
      images : updatedImages
    }, () => {
      //CONSOLE ALL FORM VALUES
      console.log('ALL VALUES', this.state)
    })
  }

  addDataFromScratch() {
    this.setState(state => ({
      formValues : {
        ...state.formValues,
        address: "",
        bedRoom: "",
        bathRoom: "",
        description: "",
      }
    }), () => {
      //ONCE DATA SET TO EMPTY
      this.handleNext()
    })
  }

  render() {
    const { activeStep } = this.state;
    return (
      <ErrorBoundary>
        <Container fluid="md" className="container">
          <Row>
            <Stepper
              steps={["Upload Data", "Fill Form", "Upload Images"]}
              activeStep={activeStep}
            />
          </Row>
          <Row>
            <StepContentWrapper>
              {this.getStepContent(activeStep)}
            </StepContentWrapper>
          </Row>
        </Container>
      </ErrorBoundary>
    );
  }
}
