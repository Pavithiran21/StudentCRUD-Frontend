/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Field, Form, Formik } from "formik";
import Button from "react-bootstrap/esm/Button";
import { toast } from 'react-toastify';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import * as yup from "yup";
import axios from "axios";
import { API } from "../../Utils/ApiRoute";
import { useNavigate } from "react-router-dom";


export const UpdateStudent = (props) => {
  const navigate = useNavigate();
  console.log(props);
  
  
  
  const [studentData, setEditData] = useState();
  const handleClose = () => props.setShow(false);


  const isAtLeast14YearsOld = (value) => {
    const currentDate = new Date();
    const birthDate = new Date(value);
    const minDate = new Date().setFullYear(currentDate.getFullYear() - 14);
  
    return birthDate <= minDate;
  };

  const validate = yup.object({
    studentname: yup.string().min(3, "Must be 6 characters or more").required("StudentName is required"),
    dob: yup.date()
      .max(new Date(), 'Date of Birth cannot be in the future')
      .test('is-at-least-14-years-old', 'Must be at least 14 years old', isAtLeast14YearsOld)
      .required('Date of Birth is required'),
    email: yup.string().email("Email is invalid").required("Email is required"),
    phone: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid Phone number").required('Phone Number is required'),
    reg_no: yup.string().matches(/^[0-9]{7}$/, 'Invalid registration number. Only numbers are allowed.').required('Registration number is required'),
    gender: yup.string().required('Gender is required.Please Select one'),
    subject1: yup.number().max(100).min(0).required("Subject 1 mark is required"),
    subject2: yup.number().max(100).min(0).required("Subject 2 mark is required"),
    subject3: yup.number().max(100).min(0).required("Subject 3 mark is required"),
    subject4: yup.number().max(100).min(0).required("Subject 4 mark is required"),
    subject5: yup.number().max(100).min(0).required("Subject 5 mark is required"),
  });

 


  const fetchStudentDetails = async (id) => {
  
    try {
      if(id){
        let response = await axios.get(`${API}/api/student/view-student/${id}`, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        setEditData(response.data);
      }
     
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch student details");
    }
  };

  useEffect(() => {
    fetchStudentDetails(props.Id);
    // return(
    //   props.SetsetId("")
    // )
  }, [props.Id]);
  

 

  const editStudent = async (data) => {
    try {
      const response = await axios.put(`${API}/api/student/update-student/${props.Id}`, data, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      console.log(response);
      console.log(props.Id);
      if (response.data.status) {
        toast.success("Student Details Edited Successfully");
        navigate('/admin-dashboard');
      } else {
        toast.error("Student Details cannot be edited. Please check it...");
        navigate('/all-student');
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please check it!");
      // Perform error handling logic here if needed
    }
  };
  
  return (
    <>
    {/* //show={props.show}  */}
    <Modal show={props.show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Edit Student Details</Modal.Title>
          <Button variant="white" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>

        {studentData && studentData.data && (
        <Formik
          initialValues={{
            studentname: studentData?.data?.studentname,
            dob: studentData?.data?.dob,
            phone: studentData?.data?.phone,
            email: studentData?.data?.email,
            gender: studentData?.data?.gender,
            reg_no: studentData?.data?.reg_no,
            subject1: studentData?.data?.subject1,
            subject2: studentData?.data?.subject2,
            subject3: studentData?.data?.subject3,
            subject4: studentData?.data?.subject4,
            subject5: studentData?.data?.subject5,
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            // Update student data
            let data = {
              studentname: values.studentname,
              dob: values.dob,
              phone: values.phone,
              email: values.email,
              gender: values.gender,
              reg_no: values.reg_no,
              subject1: values.subject1,
              subject2: values.subject2,
              subject3: values.subject3,
              subject4: values.subject4,
              subject5: values.subject5,
            };
            editStudent(data);
          }}
        >
           {({ errors, touched }) => (
               <Form>
               <Row>
                 <Col>
                   <div className="">
                     <label>Student Name</label>
                     <Field
                       name="studentname"
                       className={`form-control ${
                         errors.studentname && touched.studentname ? "is-invalid" : ""
                       }`}
                       type="text"
                       required
                     />
                     {errors.studentname && touched.studentname && (
                       <div className="invalid-feedback">{errors.studentname}</div>
                     )}
                   </div>
                 </Col>
                 <Col>
                   <div>
                     <label>Date of Birth</label>
                     <Field
                       name="dob"
                       className={`form-control ${errors.dob && touched.dob ? "is-invalid" : ""}`}
                       type="date"
                       required
                     />
                     {errors.dob && touched.dob && <div className="invalid-feedback">{errors.dob}</div>}
                   </div>
                 </Col>
                 <Col>
                   <div>
                     <label>Student Registration Number</label>
                     <Field
                       name="reg_no"
                       className={`form-control ${
                         errors.reg_no && touched.reg_no ? "is-invalid" : ""
                       }`}
                       type="text"
                       required
                     />
                     {errors.reg_no && touched.reg_no && (
                       <div className="invalid-feedback">{errors.reg_no}</div>
                     )}
                   </div>
                 </Col>
               </Row>
               <Row>
                 <Col>
                   <div>
                     <label>Email</label>
                     <Field
                       name="email"
                       className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                       type="email"
                       required
                     />
                     {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                   </div>
                 </Col>
                 <Col>
                   <div>
                     <label>Gender</label>
                     <Field
                       name="gender"
                       as="select"
                       className={`form-control  ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                       required
                     >
                       <option value="">Select Gender</option>
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                     </Field>
                     {errors.gender && touched.gender && <div className="invalid-feedback">{errors.gender}</div>}
                   </div>
                 </Col>
               </Row>
               <Row>
                 <Col sm="4">
                   <div className="">
                     <label>Phone Number</label>
                     <Field
                       name="phone"
                       className={`form-control ${
                         errors.phone && touched.phone ? "is-invalid" : ""
                       }`}
                       type="text"
                       required
                     />
                     {errors.phone && touched.phone && (
                       <div className="invalid-feedback">{errors.phone}</div>
                     )}
                   </div>
                 </Col>
                 <Col>
                   <div>
                     <label>Subject 1</label>
                     <Field
                       name="subject1"
                       className={`form-control ${errors.subject1 && touched.subject1 ? "is-invalid" : ""}`}
                       type="text"
                       required
                     />
                     {errors.subject1 && touched.subject1 && <div className="invalid-feedback">{errors.subject1}</div>}
                   </div>
                 </Col>
                 <Col>
                   <div>
                     <label>Subject 2</label>
                     <Field
                       name="subject2"
                       className={`form-control ${errors.subject2 && touched.subject2 ? "is-invalid" : ""}`}
                       type="text"
                       required
                     />
                     {errors.subject2 && touched.subject2 && <div className="invalid-feedback">{errors.subject2}</div>}
                   </div>
                 </Col>
               </Row>
               <Row>
                 <Col>
                   <div className="">
                     <label>Subject 3</label>
                     <Field
                       name="subject3"
                       className={`form-control ${
                         errors.subject3 && touched.subject3 ? "is-invalid" : ""
                       }`}
                       type="text"
                       required
                     />
                     {errors.subject3 && touched.subject3 && (
                       <div className="invalid-feedback">{errors.subject3}</div>
                     )}
                   </div>
                 </Col>
                 <Col sm="4">
                   <div>
                     <label>Subject 4</label>
                     <Field
                       name="subject4"
                       className={`form-control ${errors.subject4 && touched.subject4 ? "is-invalid" : ""}`}
                       type="text"
                       required
                     />
                     {errors.subject4 && touched.subject4 && <div className="invalid-feedback">{errors.subject4}</div>}
                   </div>
                 </Col>
                 <Col sm="4">
                   <div>
                     <label>Subject 5</label>
                     <Field
                       name="subject5"
                       className={`form-control ${errors.subject5 && touched.subject5 ? "is-invalid" : ""}`}
                       type="text"
                       required
                     />
                     {errors.subject5 && touched.subject5 && <div className="invalid-feedback">{errors.subject5}</div>}
                   </div>
                 </Col>
               </Row>

               <Col>
                    <Button type="submit" variant="outline-success"  className="m-2 addstudent">
                      Update
                    </Button>
                    <Button type="reset" variant="outline-danger"  className="m-2 addstudent">
                     Reset
                   </Button>
               </Col>

             </Form>
            )}
          
        </Formik>
      )}
          
        </Modal.Body>
      </Modal>
      
    </>
  );


}



