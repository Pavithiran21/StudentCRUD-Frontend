import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../Utils/ApiRoute';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';

export const Activate = () => {
  const { activetoken } = useParams();
  const navigate = useNavigate();
  const [activationStatus, setActivationStatus] = useState(null);

  const submitHandler = async () => {
    try {
      if (!activetoken) {
        toast.error('Activation token missing. Please check your activation link.');
        return;
      }

      const response = await axios.get(`${API}/api/users/activate/${activetoken}`);
      console.log(response);

      if (response.data.status) {
        setActivationStatus(true);
        toast.success('Account activated successfully');
        navigate("/");
      } else {
        setActivationStatus(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setActivationStatus(false);
      toast.error('Cannot activate account. Please check with a valid email address');
    }
  };

  return (
    <div className='container-fluid main-form'>
      <div className='row justify-content-center'>
        <div className='col-sm-12 text-center'>
          <h1 className='text-white'>Student MarkList</h1>
        </div>
        <div className='m-5'>
          {activationStatus === true ? (
            <div className='text-center'>
              <p>Your account has been successfully activated.</p>
              <p>You can now log in using your credentials.</p>
            </div>
          ) : (
            <Formik
              initialValues={{}}
              onSubmit={submitHandler}
            >
             
              <Form className='form-group'>
                <div>
                  <h2 className='text-center'>ACTIVATE ACCOUNT</h2>
                  <p className='text-center'>Please activate your email</p>
                </div>

                <div className='text-center'>
                  <Button
                    type='submit'
                    className='btn btn-primary m-3'
          
                  >
                    Click to Activate Account
                  </Button>
                </div>
              </Form>
             
            </Formik>
          )}

          {activationStatus === false && (
            <div className='text-center'>
              <p>Activation failed. Please check your activation link or try again later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
