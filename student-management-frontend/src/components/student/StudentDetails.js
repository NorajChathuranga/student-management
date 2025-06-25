import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Alert, Spinner, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaEdit, FaTrash, FaUser, FaEnvelope, FaGraduationCap, FaCalendar } from 'react-icons/fa';
import studentService from '../../services/studentService';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const data = await studentService.getStudentById(id);
      setStudent(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        navigate('/students');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading student details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <h5>Error</h5>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={() => navigate('/students')}>
          <FaArrowLeft className="me-1" />
          Back to List
        </Button>
      </Alert>
    );
  }

  if (!student) {
    return (
      <Alert variant="warning">
        <h5>Student Not Found</h5>
        <p>The requested student could not be found.</p>
        <Button variant="outline-warning" onClick={() => navigate('/students')}>
          <FaArrowLeft className="me-1" />
          Back to List
        </Button>
      </Alert>
    );
  }

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="shadow">
          <Card.Header className="bg-primary text-white">
            <h4 className="mb-0">
              <FaUser className="me-2" />
              Student Details
            </h4>
          </Card.Header>
          
          <Card.Body>
            <div className="text-center mb-4">
              {student.profileImageUrl ? (
                <img
                  src={student.profileImageUrl}
                  alt={student.name}
                  className="rounded-circle mb-3"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '120px', height: '120px' }}
                >
                  <FaUser size={40} />
                </div>
              )}
              <h3 className="mb-1">{student.name}</h3>
              <Badge bg="primary" className="fs-6">{student.course}</Badge>
            </div>

            <Row className="mb-3">
              <Col sm={4} className="text-muted">
                <FaUser className="me-2" />
                <strong>Student ID:</strong>
              </Col>
              <Col sm={8}>
                <code>{student.id}</code>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-muted">
                <FaEnvelope className="me-2" />
                <strong>Email:</strong>
              </Col>
              <Col sm={8}>
                <a href={`mailto:${student.email}`} className="text-decoration-none">
                  {student.email}
                </a>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-muted">
                <FaGraduationCap className="me-2" />
                <strong>Course:</strong>
              </Col>
              <Col sm={8}>
                {student.course}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="text-muted">
                <FaCalendar className="me-2" />
                <strong>Created:</strong>
              </Col>
              <Col sm={8}>
                {formatDate(student.createdAt)}
              </Col>
            </Row>

            <Row className="mb-4">
              <Col sm={4} className="text-muted">
                <FaCalendar className="me-2" />
                <strong>Last Updated:</strong>
              </Col>
              <Col sm={8}>
                {formatDate(student.updatedAt)}
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate('/students')}
              >
                <FaArrowLeft className="me-1" />
                Back to List
              </Button>
              
              <Button
                variant="warning"
                onClick={() => navigate(`/students/edit/${student.id}`)}
                className="flex-fill"
              >
                <FaEdit className="me-1" />
                Edit Student
              </Button>
              
              <Button
                variant="danger"
                onClick={handleDelete}
              >
                <FaTrash className="me-1" />
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StudentDetails;
