import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import studentService from '../../services/studentService';
import StudentCard from './StudentCard';
import { COURSES, MESSAGES } from '../../utils/constants';
import { FaUsers } from 'react-icons/fa';


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, selectedCourse]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAllStudents();
      setStudents(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCourse) {
      filtered = filtered.filter(student =>
        student.course.toLowerCase() === selectedCourse.toLowerCase()
      );
    }

    setFilteredStudents(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        setSuccess(MESSAGES.SUCCESS.STUDENT_DELETED);
        fetchStudents();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/students/details/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading students...</p>
      </div>
    );
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <FaUsers className="me-2" />
                Student Management
              </h4>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                  {success}
                </Alert>
              )}

              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <Form.Select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">All Courses</option>
                    {COURSES.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={() => navigate('/students/add')}
                  >
                    <FaPlus className="me-1" />
                    Add Student
                  </Button>
                </Col>
              </Row>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Total Students: {filteredStudents.length}
                </h5>
                {(searchTerm || selectedCourse) && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCourse('');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {filteredStudents.length === 0 ? (
        <Row>
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <h5>No students found</h5>
                <p className="text-muted">
                  {students.length === 0
                    ? "Start by adding your first student!"
                    : "Try adjusting your search criteria."}
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/students/add')}
                >
                  <FaPlus className="me-1" />
                  Add First Student
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          {filteredStudents.map(student => (
            <Col key={student.id} md={6} lg={4} className="mb-4">
              <StudentCard
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default StudentList;
