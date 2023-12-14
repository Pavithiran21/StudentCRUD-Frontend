import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../../Utils/ApiRoute';


export const StudentDashboard = () => {

  const [studentname, setStudentname] = useState();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setStudentname(storedUsername);
    }
  }, []);

  const isAtLeast14YearsOld = (value) => {
    const currentDate = new Date();
    const birthDate = new Date(value);
    const minDate = new Date().setFullYear(currentDate.getFullYear() - 14);
  
    return birthDate <= minDate;
  };

  const validate =yup.object({
    dob: yup.date()
      .max(new Date(), 'Date of Birth cannot be in the future')
      .test('is-at-least-14-years-old', 'Must be at least 14 years old', isAtLeast14YearsOld)
      .required('Date of Birth is required'),
    reg_no: yup.string().matches(/^[0-9]{7}$/, 'Invalid registration number. Only numbers are allowed.').required('Registration number is required'),
  });

  const Navigate = useNavigate();



  const StudentResult = async(data) =>{
    axios.post(`${API}/api/student/student-dashboard`, data, {
      headers: {
        authorization:window.localStorage.getItem('token'),
      },
    })
    .then((response) => {
      console.log(response.data);
      if(response.data.status){
        toast.success("Student Result Found Successfully");
        Navigate(`/view-student/${response.data.data._id}`)
      }
      else{
        toast.error("Student Result cannot found. Please try again....");
      }
      
    })
    .catch((error) => {
      console.error(error);
      toast.error("Something went wrong. Please check it!");
      // Perform error handling logic here if needed
    });
    
    
    
  }
  return (
    <>
      <Container fluid className='main-form'>

        <Row className='justify-content-center'>
          
          <div className='col-sm-12 text-center'>
           <h1 className='text-white'>Student MarkList</h1>
         </div>

         <div className='col-sm-12 text-center'>

          <h2 className='text-white'>Welcome <span style={{ color: 'red', textTransform: 'uppercase' }}>{studentname}</span>,<br/>Please enter the below details to get the results.</h2>

         </div>
          <Formik 
            initialValues={{reg_no:'',dob:''}}
            validationSchema = {validate}
            onSubmit = {values =>{
            console.log(values);
            let data = {
              reg_no:values.reg_no,
              studentname:values.studentname,
              dob:values.dob
            };
            StudentResult(data);
            }}
          >
            {({ errors, touched  }) => (
              <div className='m-3'>
                <Form className='form-group'>
                  <h2 className='text-center'>STUDENT PROFILE</h2>
                  
                  <label className='m-2'>Date of Birth </label>
                  <Field name="dob" type="date" className="input-value  ml-4" placeholder="Select DOB" required />
                  {errors.dob && touched.dob ? (<div className='error'>{errors.dob}</div>) : null}

                  <label className='m-2'>Student Registration Number</label>
                  <Field name="reg_no" type="text" className="input-value  ml-4" placeholder="Enter the Register Number " required />
                  {errors.reg_no && touched.reg_no ? (<div className='error'>{errors.reg_no}</div>) : null}


                  <div className='text-center m-3'>
                    <button type="submit" className='btn btn-success'>View Result</button>
                  </div>


        

                  <div className='student-details text-center m-1 bg-success'>
                    <p>Student Details For Demo</p>
                    <p><b>D.O.B:</b>17-10-1997</p>
                    <p><b>Reg.No:</b>1516001</p>
                  </div>
                  
                </Form>
                
             </div>      
            )} 
          </Formik>
          
      
        
        </Row>

      </Container>
    </>



  )  
}





