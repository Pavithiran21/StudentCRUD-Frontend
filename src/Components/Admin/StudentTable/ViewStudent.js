/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API } from '../../Utils/ApiRoute';
import { useNavigate } from 'react-router-dom';

export const ViewStudent = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    fetchStudentData(id);
  }, []);

  const formatDOB = (dobString) => {
    const dob = new Date(dobString);
    const day = dob.getDate().toString().padStart(2, '0');
    const month = (dob.getMonth() + 1).toString().padStart(2, '0');
    const year = dob.getFullYear();

    return `${day}-${month}-${year}`;
};

  const displayresult = (result) => {
    return result === 'Pass' ? 'text-success' : 'text-danger';
  };

  const displaysubject = (marks) => {
    return marks >= 35 ? 'text-success' : 'text-danger';
  };

  const fetchStudentData = async () => {
    axios
      .get(`${API}/api/student/view-student/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          setStudentData(response.data); // Assuming the response contains the student data
          toast.success('Student Result Viewed Successfully');
        } else if (!response.data.status) {
          toast.error('Student Result cannot be viewed. Please try again....');
          Navigate('/all-student');
        } else {
          toast.error('User is not allowed to create a profile');
          Navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong. Please check it!');
      });
  };

  return (
    <>
      {studentData && studentData.data && (
        <Container fluid className="bg-light">
          <Row className="py-3">
            <Col>
              <h1 className="text-center">STUDENT RESULT</h1>
            </Col>
          </Row>

          <Row className="py-3">
            <Col className="text-center">
              <p className="font-weight-bold">
                Student Name: {studentData.data.studentname}
              </p>
            </Col>

            <Col className="text-center">
              <p className="font-weight-bold">
                Student Register Number: {studentData.data.reg_no}
              </p>
            </Col>

            <Col className="text-center">
              <p className="font-weight-bold">
                Student DOB: {formatDOB(studentData.data.dob)}
              </p>
            </Col>
          </Row>

          <Row className="py-3">
            <Col>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Subjects</th>
                    <th>Maximum Marks</th>
                    <th>Marks Obtained</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Subject 1</td>
                    <td>100</td>
                    <td>{studentData.data.subject1}</td>
                    <td className={displaysubject(studentData.data.subject1)}>
                      {studentData.data.subject1 >= 35 ? 'Pass' : 'Fail'}
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Subject 2</td>
                    <td>100</td>
                    <td>{studentData.data.subject2}</td>
                    <td className={displaysubject(studentData.data.subject2)}>
                      {studentData.data.subject2 >= 35 ? 'Pass' : 'Fail'}
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Subject 3</td>
                    <td>100</td>
                    <td>{studentData.data.subject3}</td>
                    <td className={displaysubject(studentData.data.subject3)}>
                      {studentData.data.subject3 >= 35 ? 'Pass' : 'Fail'}
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Subject 4</td>
                    <td>100</td>
                    <td>{studentData.data.subject4}</td>
                    <td className={displaysubject(studentData.data.subject4)}>
                      {studentData.data.subject4 >= 35 ? 'Pass' : 'Fail'}
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Subject 5</td>
                    <td>100</td>
                    <td>{studentData.data.subject5}</td>
                    <td className={displaysubject(studentData.data.subject5)}>
                      {studentData.data.subject5 >= 35 ? 'Pass' : 'Fail'}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="py-3">
            <Col>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>Total</th>
                    <td>{studentData.data.Total}</td>
                  </tr>
                </thead>
              </Table>
            </Col>

            <Col>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>Average</th>
                    <td>{studentData.data.Average}%</td>
                  </tr>
                </thead>
              </Table>
            </Col>
            <Col>
              <Table responsive striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>Result</th>
                    <td
                      className={displayresult(studentData.data.Result)}
                    >
                      {studentData.data.Result}
                    </td>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>

          <Row className="m-2">
            <Col className="text-center ">
              <Button className="" variant="danger">
                <Link to={'/'} style={{ color: 'white' }}>
                  Exit
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};






