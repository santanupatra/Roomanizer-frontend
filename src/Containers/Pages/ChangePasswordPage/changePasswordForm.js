import React, { useState, useEffect } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Col, Button } from 'reactstrap';
import { CHANGEPASSWORD_URL } from '../../../shared/allApiUrl';
import { crudAction } from '../../../store/actions/common';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputUI from '../../../UI/InputUI';

const ChangePasswordForm = (props) => {
  const initialFields = {
    newPassword: null,
    confirmPassword: null
  }
  
  const [fields, setFields] = useState(initialFields);
  const [userId, setUserId] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const params = props.match.params;
  useEffect(() => {
    setUserId(params.userId)
    const action = props.user.action;
    if (props.user.user && params.userId) {
      setFields({ ...fields, ...props.user.user })
    }
    if (action.isSuccess && action.type === "UPDATE")
      props.history.push(`/viewProfile/${userId}`)

  }, [props.user]);
  
  const onSubmit = (data) => {
    if (userId) data.userId = userId;
    props.crudActionCall(CHANGEPASSWORD_URL + `/${userId}`, data, "UPDATE");
    props.resetAction();
  }
    return (
      <div className="">
        
        <div className="login-form">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup row>
                          <Col sm={12}>
                            <InputUI
                            type="password" 
                            name="newPassword" 
                            id="newPassword" 
                            placeholder="Create Password" 
                            errors={errors}
                            innerRef={register({
                             required: 'This is required field',
                            })}
                            fields={fields}
                            />
                            <InputUI
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="Confirm Password" 
                            errors={errors}
                            innerRef={register({
                             required: 'This is required field',
                            })}
                            fields={fields}
                            />
                            <Button type="submit" size="sm" color="success" className="login-bt mt-5"> Submit</Button>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                    
      </div>
    );
  }
  const mapStateToProps = state => {
    const { user } = state;
    return {
      user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      crudActionCall: (url, data, actionType) => dispatch(crudAction(url, data, actionType, "USER")),
      resetAction: () => dispatch({ type: "RESET_USER_ACTION" }),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePasswordForm));