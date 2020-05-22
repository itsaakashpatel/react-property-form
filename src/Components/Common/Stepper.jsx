import React from 'react';

//STYLE
import { CardWrapper, StepIcon, StepCardWrapper, StepConnecter } from './Stepper.style'

//STEPPER COMPONENT
export default function Stepper(props) {
  console.log("Stepper -> props", props)
  return (
    <CardWrapper>
      {
        props.steps.length > 0 && props.steps.map((step, index) => (
          index === 0 ? 
                        <React.Fragment key={step + '_' + index}>
                          <StepCardWrapper>
                            <div className="step">
                              <StepIcon active={props.activeStep === index  ? true : false}> {index + 1} </StepIcon>
                              <span><div className="label">{step}</div></span>
                            </div>
                          </StepCardWrapper> 
                        </React.Fragment>
                        : 
                        <React.Fragment key={step + '_' + index}>
                          <StepCardWrapper>
                            <StepConnecter />
                            <div className="step">
                              <StepIcon active={props.activeStep === index ? true : false}> {index + 1} </StepIcon>
                              <span><div className="label">{step}</div></span>
                            </div>
                          </StepCardWrapper>
                        </React.Fragment>

        ))
      }
    </CardWrapper>
  )

}

/**
 * steps = [{
 *  label : ''
 * }]
 * 
 */