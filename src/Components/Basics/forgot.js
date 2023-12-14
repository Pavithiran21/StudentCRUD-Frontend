import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import ToastContainer as well
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../Utils/ApiRoute';


export const Forgot = () => {
  const validate = yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
  });

  const Navigate = useNavigate();

  const SubmitHandler = async (data) => {
    try {
      let response = await axios.post(`${API}/api/users/reset`, data);
      console.log(response);
      if (response.data.data) {
        toast.success('Password Reset Link sent successfully. Please check the mail to reset the password');
        console.log(response.data.data);
        Navigate('/');
      } else {
        // Show error message from the 'error' object
        toast.error(response.data.error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please check it.....');
    }
  };

  return (
    <div className='container-fluid main-form '>
      <div className='row justify-content-center'>
        <div className='col-sm-12 text-center'>
          <h1 className='text-white'>Student MarkList</h1>
        </div>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log(values);
            let data = {
              email: values.email,
            };
            SubmitHandler(data);
          }}
        >
          {({ errors, touched }) => (
            <div className='m-5'>
              <Form className='form-group '>
                <h2 className='text-center'>FORGOT PAGE</h2>

                <label className='m-2'>Email</label>
                <Field name='email' type='email' className='input-value ml-4' placeholder='Enter the Email' required />
                {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
                <div className='text-center '>
                  <button type='submit' className='btn btn-danger m-3'>
                    Send Mail
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};
