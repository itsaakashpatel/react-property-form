import React, {useState} from "react";
import { Formik } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as yup from "yup";
import { StepTwoWrapper } from './Steps.style'


export default function Two(props) {
console.log("Two -> props", props)
  const [isFormFilled, setFormToFilled] = useState(true)

  const validate = values => {
  console.log("Two -> values", values)
    const errors = {};
    if (!values.address) {
      errors.address = 'Required';
    }
  
    if (!values.bedRoom) {
      errors.bedRoom = 'Required';
    } else if (values.bedRoom.length > 10) {
      errors.bedRoom = 'Must be 20 characters or less'; 
    }
  
    if (!values.bathRoom) {
      errors.bathRoom = 'Required';
    } else if (values.bathRoom.length > 5) {
      errors.bathRoom = 'Must be 5 characters or less';
    }
  
    return errors;
  };
  
  const schema = yup.object({
    address: yup.string().required("Address is Required!"),
    bedRoom: yup.string().max(10, 'Max characters limit reached!').required("BedRoom value is required!"),
    bathRoom: yup.string().max(5, 'Max characters limit reached!').required("Bathroom value is required!"),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        setFormToFilled(false);
        props.changeValues(values)
      }}
      initialValues={{
        ...props.values
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate>
          {console.log("ERRORs", { values }, { errors })}
          <Form.Group as={Row} controlId="formHorizontalAddress">
            <Form.Label column sm={2}>
              Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange('address')}
                onBlur={handleBlur}
                isInvalid={errors.address}
                isValid={touched.address && !errors.address}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.address}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalBedroom">
            <Form.Label column sm={2}>
              BedRoom
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type="number"
                name="bedRoom"
                value={values.bedRoom}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.bedRoom}
                isValid={touched.bedRoom && !errors.bedRoom}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.bedRoom}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalBathRoom">
            <Form.Label column sm={2}>
              BathRoom
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type="number"
                name="bathRoom"
                value={values.bathRoom}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.bathRoom}
                isValid={touched.bathRoom && !errors.bathRoom}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.bathRoom}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalDescription">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
            <Form.Control
                as="textarea" 
                rows="3" 
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          {console.log('ERRR LENGTH', Object.entries(errors).length,  Object.entries(values).length)}
          <Button variant="secondary" onClick={props.handleBack}>Back</Button>{' '}
          <Button variant="primary" disabled={Object.entries(values).length > 0 && Object.entries(errors).length === 0 ? true : false} onClick={handleSubmit}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
}
