import React from 'react';
import PropTypes from 'prop-types';

//STYLE
import { CardWrapper, StepIcon, StepCardWrapper, StepConnecter } from './Stepper.style'

//STEPPER COMPONENT
function Stepper(props) {
  return (
    <CardWrapper>
      {
        props.steps.length > 0 && props.steps.map((step, index) => (
          (index + 1) === 1 ? 
                        <React.Fragment key={step + '_' + (index + 1)}>
                          <StepCardWrapper>
                            <div className="step">
                              <StepIcon active={props.activeStep === (index + 1)  ? true : false}> {index + 1} </StepIcon>
                              <span><div className="label">{step}</div></span>
                            </div>
                          </StepCardWrapper> 
                        </React.Fragment>
                        : 
                        <React.Fragment key={step + '_' + (index + 1)}>
                          <StepCardWrapper>
                            <StepConnecter />
                            <div className="step">
                              <StepIcon active={props.activeStep === (index + 1) ? true : false}> {index + 1} </StepIcon>
                              <span><div className="label">{step}</div></span>
                            </div>
                          </StepCardWrapper>
                        </React.Fragment>

        ))
      }
    </CardWrapper>
  )

}

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
}

Stepper.defaultProps = {
  steps: [],
}

export default Stepper