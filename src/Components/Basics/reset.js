

import React from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../Utils/ApiRoute';

export const Reset = () => {
  const validate = yup.object({
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Confirm password is required"),
  });

  const Navigate = useNavigate();
  const { resetToken } = useParams();

  const submitHandler = async (values) => {
    try {
      const response = await axios.put(`${API}/api/users/reset/${resetToken}`, values);
      console.log(response.data);
      

      if (response.data.status) {
        toast.success("Password reset successfully");
        Navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please check it.");
    }
  };

  return (
    <div className='container-fluid main-form'>
      <div className='row justify-content-center'>
        <div className='col-sm-12 text-center'>
          <h1 className='text-white'>Student MarkList</h1>
        </div>

        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validate}
          onSubmit={submitHandler}
        >
          {({ errors, touched }) => (
            <div className='m-5'>
              <Form className='form-group'>
                <h2 className='text-center'>RESET PAGE</h2>

                <label className='m-2'>Password</label>
                <Field name="password" type="password" className="input-value ml-4" placeholder="Enter the Password" />
                {errors.password && touched.password && <div className='error'>{errors.password}</div>}

                <label className='m-2'>Confirm Password</label>
                <Field name="confirmPassword" className="input-value ml-4" type="password" placeholder="Enter the Confirm Password" />
                {errors.confirmPassword && touched.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}

                <div className='text-center'>
                  <button type="submit" className='btn btn-success m-2'>Submit</button>
                  <button type="reset" className='btn btn-danger'>Reset</button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};


