/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faEye, faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { AddStudent } from './AddStudent';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import axios from 'axios';
import { UpdateStudent } from './EditStudent';
import { Header } from '../Navbar/navbar';
import { API } from '../../Utils/ApiRoute';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export const StudentTable = () => {
  const Navigate = useNavigate();
  const [Id, SetsetId] = useState('');
  const [search, Setsearch] = useState('');
  const [Modal, SetModal] = useState(false);
  const [EditModal, SetEditModal] = useState(false);
  const [AllStud, SetAllStud] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const handleShow = () => SetModal(true);

  const EdithandleShow = (id) => {
    SetsetId(id);
    SetEditModal(true);
  };

  const ViewstudentPage = (id) => {
    Navigate(`/admin/view-student/${id}`);
  };

  const itemsPerPage = 5; 

  const totalPages = Math.ceil(AllStud.length / itemsPerPage);

  
  const getPaginatedData = () => {
    const endIndex = startIndex + itemsPerPage;
    return AllStud.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    const newStartIndex = (pageNumber - 1) * itemsPerPage;
    setStartIndex(newStartIndex);
  };

  const fetchStudents = () => {
    axios
      .get(`${API}/api/student/all-student/`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.data.status) {
          SetAllStud(response.data.data);
          toast.success('Student List Shown Successfully');
        } else {
          toast.error('Student List cannot be shown. Please check it');
          Navigate('/admin-dashboard');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong. Please check it!');
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const displayResult = (result) => {
    return result === 'Pass' ? 'text-success' : 'text-danger';
  };

  const deleteStudent = (id) => {
    axios
      .delete(`${API}/api/student/delete-student/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.data.status) {
          toast.success('Student Mark Deleted successfully');
          // After successful deletion, fetch the updated student list again
          fetchStudents();
        } else {
          toast.error('Failed to delete student. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong. Please try again.');
      });
  };

  const searchStudent = () => {
    if (search.trim() === '') {
      toast.error('Enter the search details');
    } else {
      axios
        .get(`${API}/api/student/search-student`, {
          params: {
            studentname: search,
          },
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.data.status) {
            toast.success('Student Details Search done Successfully');
            SetAllStud(response.data.data);
          } else {
            toast.error('Student Details Search cannot be found. Please check it!!!');
            SetAllStud([]); 
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('Something went wrong. Please check it!');
        });
    }
  };


  const formatDOB = (dobString) => {
    const dob = new Date(dobString);
    const day = dob.getDate().toString().padStart(2, '0');
    const month = (dob.getMonth() + 1).toString().padStart(2, '0');
    const year = dob.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Header />
      <Container fluid>
        <Row className='p-2'>
          <Col>
            {Modal && <AddStudent setShow={SetModal} show={Modal} />}
            {EditModal && <UpdateStudent setShow={SetEditModal} show={EditModal} Id={Id} SetsetId={SetsetId} />}
            <Col sm='12'>
              <div>
                <h1 className='text-center'>STUDENT MARKS TABLE</h1>
              </div>
            </Col>
            <Row className='m-3'>
              <Col>
                <Form className='d-flex'>
                  <Form.Control
                    type='search'
                    placeholder='Search Student'
                    className=''
                    aria-label='Search'
                    value={search}
                    onChange={(e) => Setsearch(e.target.value)}
                  />
                  <Button className='ml-2' variant='outline-danger' onClick={searchStudent}>
                    Search
                  </Button>
                </Form>
              </Col>
            </Row>
            <Button variant='primary' className='m-2 items-nav' onClick={handleShow}>
              Add Student
            </Button>
          </Col>
        </Row>
        {Array.isArray(AllStud) && AllStud.length > 0 ? ( 
          <>
            <Row className='m-auto p-auto'>
              <Col>
                <Table responsive striped bordered hover className='table-adjust'>
                  <thead>
                    <tr className='studentvalues'>
                      <th>S.No</th>
                      <th>Student Name</th>
                      <th>DOB</th>
                      <th>Roll.No</th>
                      <th>Email</th>
                      <th>Total</th>
                      <th>Average</th>
                      <th>Result</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData().map((data, index) => {
                      const serialNumber = startIndex + index + 1;

                      return (
                        <tr key={index}>
                          <td>{serialNumber}</td>
                          <td>{data.studentname}</td>
                          <td>{formatDOB(data.dob)}</td>
                          <td>{data.reg_no}</td>
                          <td>{data.email}</td>
                          <td>{data.Total}</td>
                          <td>{data.Average}</td>
                          <td className={displayResult(data.Result)}>{data.Result}</td>
                          <td>
                            <div className='m-auto p-auto' style={{ cursor: 'pointer' }}>
                              <FontAwesomeIcon icon={faEdit} className='text-success m-2' onClick={() => EdithandleShow(data._id)} />
                              <FontAwesomeIcon icon={faEye} className='text-primary m-2' onClick={() => ViewstudentPage(data._id)} />
                              <FontAwesomeIcon icon={faTrashAlt} className='text-danger m-2' onClick={() => deleteStudent(data._id)} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col className='d-flex justify-content-center'>
                <Pagination>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === (startIndex / itemsPerPage) + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </Col>
            </Row>
          </>
        ) : (
          <Row className='m-auto p-auto'>
            <Col className='text-center'>
              {search.trim() === '' ?<h1> No Student Data Available</h1> : <h1> No Student Data Found</h1>}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};



