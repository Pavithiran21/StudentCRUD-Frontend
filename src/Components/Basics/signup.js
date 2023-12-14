import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axios from 'axios';
import { API } from '../Utils/ApiRoute';


export const Signup = () => {
  const validate = yup.object({
    username: yup.string().min(6, "Please enter a valid username").required("Username is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
  });

  const Navigate = useNavigate();

  const SubmitHandler = async (data) => {
    try {
      // Replace the empty string with your API endpoint to send the form data
      let response = await axios.post(`${API}/api/users/signup`, data);
      
      if(response.data.status){
        toast.success("User registered successfully. Please Check the mail to activate account");
        console.log(response.data);
        Navigate("/");

      }else if(!response.data.status){
         toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Please check it")
    }
  };


  return (
    <div className='container-fluid main-form'>
      <div className='row justify-content-center'>
        <div className='col-sm-12 text-center'>
          <h1 className='text-white'>Student MarkList</h1>
        </div>
       
          <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={validate}
            onSubmit={(values) => {
              console.log(values);
              let data = {
                username: values.username,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
              };
              SubmitHandler(data);
            }}
          >
            {({ errors, touched }) => (
              <div className='m-2'>
              
                  <Form className='form-group'>
                    <h2 className='text-center'>SIGN UP</h2>

                    <label className='m-2'>Username</label>
                    <Field name="username" className="input-value ml-4" type="name" placeholder="Enter the Username" required /><br />
                    {errors.username && touched.username && <div className='error'>{errors.username}</div>}

                    <label className='m-2'>Email</label>
                    <Field name="email" type="email" className="input-value ml-4" placeholder="Enter the Email" required /><br />
                    {errors.email && touched.email && <div className='error'>{errors.email}</div>}

                    <label className='m-2'>Password</label>
                    <Field name="password" type="password" className="input-value ml-4" placeholder="Enter the Password" /><br />
                    {errors.password && touched.password && <div className='error'>{errors.password}</div>}

                    <label className='m-2'>Confirm Password</label>
                    <Field name="confirmPassword" type="password" className="input-value ml-4" placeholder="Enter the Confirm Password" />
                    {errors.confirmPassword && touched.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}

                    <div className="text-center">
                      <button type="submit" className='btn btn-primary m-2'>Submit</button>
                      <button type="reset" className='btn btn-warning'>Reset</button>
                    </div>
                    <div>
                     <p className='ml-2'>Already Registered? <a href="/" className='success'>Click here to Login</a></p>
                    </div>

                    
                  </Form>

              
              
              </div>
            )}
          </Formik>
       
      </div>
      
    </div>
  );
};


