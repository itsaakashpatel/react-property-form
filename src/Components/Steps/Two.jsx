import React, {useRef} from "react";
import { Formik } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as yup from "yup";
import PropTypes from 'prop-types';

//Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

function Two(props) {
  var autocomplete;
  const formikRef = useRef();

  //VALIDATION SCHEMA
  const schema = yup.object({
    address: yup.string().required("Address is Required!"),
    bedRoom: yup.string().max(10, 'Max characters limit reached!').required("BedRoom value is required!"),
    bathRoom: yup.string().max(5, 'Max characters limit reached!').required("Bathroom value is required!"),
  });

  const handleScriptLoad = () => {
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete')
    );

    //ALLOWING ONLY FEW FIELDS TO LOAD TO SAVE API CALLS...
    autocomplete.setFields(['address_components', 'formatted_address']);

    // CALL EVENT WHEN ANY LOCATION IS SELECTED
    autocomplete.addListener('place_changed', handlePlaceSelect);
  }


  const handlePlaceSelect = () => {

    const addressObject = autocomplete.getPlace();
    if(formikRef.current) {
      formikRef.current.setFieldValue(
        "address",
        addressObject.formatted_address || addressObject.name
      );
    }
  }


  return (
    <Formik
      innerRef={formikRef}
      validationSchema={schema}
      onSubmit={(values) => {
        props.changeValues(values);
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
        isValid
      }) => (
        <Form noValidate>
          <Form.Group as={Row} className="required-field">
            <Form.Label column sm={2}>
              Address
            </Form.Label>
            <Col sm={10}>
              <Script
                url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`}
                onLoad={handleScriptLoad}
              />
              <Form.Control
                required
                id="autocomplete"
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.address}
                isValid={touched.address && !errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalBedroom" className="required-field">
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
          <Form.Group as={Row} controlId="formHorizontalBathRoom" className="required-field">
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
          <div className="actions">
            <Button variant="secondary" onClick={props.handleBack}>
              Back
            </Button>{" "}
            <Button
              variant="primary"
              disabled={
                !isValid
              }
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

Two.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  values : PropTypes.object.isRequired,
  changeValues : PropTypes.func
}

export default Two