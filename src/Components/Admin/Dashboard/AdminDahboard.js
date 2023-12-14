import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Header } from '../Navbar/navbar';
import axios from 'axios';
import { API } from '../../Utils/ApiRoute';
import { toast } from 'react-toastify';

export const AdminDashboard = () => {
  const [username, setUsername] = useState();
  const [totalStudents, setTotalStudents] = useState();
  const [passedStudents, setPassedStudents] = useState();
  const [failedStudents, setFailedStudents] = useState();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const fetchDashboardData = () => {
    axios
      .get(`${API}/api/student/admin-dashboard`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      })
      .then((response) => {
        const { totalStudents, passedStudents, failedStudents } = response.data.data;
        console.log(response.data.data)
        
        
        setTotalStudents(totalStudents);
        setPassedStudents(passedStudents);
        setFailedStudents(failedStudents);
        toast.success("Admin Dashboard shown  Successfully")
      })
      .catch((error) => {
        console.error(error);
        toast.error("Admin Dashboard are not Shown. Please try to connect it.....")
      });
  };

  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      <Header />
      <Container fluid>
        

        <Row>
          <Col sm={12}>
            <h1 className='text-center'>Dashboard</h1>
          </Col>
          <Col sm={12}>
            <h4 className='text-center'>
              Hello <span style={{ color: 'royalblue', textTransform: 'uppercase' }}>{username}</span>, Welcome to the  Dashboard Page
            </h4>
          </Col>

        </Row>
        <Row className='text-center'>
          <Col sm={3} className='m-auto p-3'>
            <Card>
              <Card.Body>
                <Card.Title>
                  <div>
                   <h5>Number of Students Mark Entered</h5>
                  </div>
                </Card.Title>
                <Card.Text>
                 <span style={{fontSize:"45px"}} className='text-warning'><b>{totalStudents}</b></span>
                </Card.Text>
              </Card.Body>
            </Card>
            
          
          </Col>
          <Col sm={3} className='m-auto p-3'>
            <Card>
              <Card.Body>
                <Card.Title>
                  <div>
                   <h5>Number of Students Passed</h5>
                  </div>
                </Card.Title>
                <Card.Text>
                 <span style={{fontSize:"45px"}} className='text-success'><b>{passedStudents}</b></span>
                </Card.Text>
              </Card.Body>
            </Card>
            
          
          </Col>
          <Col sm={3} className='m-auto p-3'>
            <Card>
              <Card.Body>
                <Card.Title>
                  <div>
                   <h5>Number of Students Failed</h5>
                  </div>
                </Card.Title>
                <Card.Text>
                 <span style={{fontSize:"45px"}} className='text-danger'><b>{failedStudents}</b></span>
                </Card.Text>
              </Card.Body>
            </Card>
            
          
          </Col>

        </Row>
      </Container>
    </>
  );
};






