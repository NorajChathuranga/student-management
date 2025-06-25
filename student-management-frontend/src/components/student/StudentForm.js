import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaSave, FaArrowLeft, FaUser } from 'react-icons/fa';
import studentService from '../../services/studentService';
import { COURSES, MESSAGES } from '../../utils/constants';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    profileImageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchStudent();
    }
  }, [id, isEditing]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const student = await studentService.getStudentById(id);
      setFormData({
        name: student.name,
        email: student.email,
        course: student.course,
        profileImageUrl: student.profileImageUrl || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.course.trim()) {
      errors.course = 'Course is required';
    }

    if (formData.profileImageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(formData.profileImageUrl)) {
      errors.profileImageUrl = 'Please enter a valid image URL';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      if (isEditing) {
        await studentService.updateStudent(id, formData);
        setSuccess(MESSAGES.SUCCESS.STUDENT_UPDATED);
      } else {
        await studentService.createStudent(formData);
        setSuccess(MESSAGES.SUCCESS.STUDENT_CREATED);
      }
      
      setTimeout(() => {
        navigate('/students');
      }, 1500);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading student data...</p>
      </div>
    );
  }

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="shadow">
          <Card.Header className="bg-primary text-white">
            <h4 className="mb-0">
              <FaUser className="me-2" />
              {isEditing ? 'Edit Student' : 'Add New Student'}
            </h4>
          </Card.Header>
          
          <Card.Body>
            {error && (
              <Alert variant="danger" dismissible onClose={() => setError('')}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert variant="success">
                {success}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.name}
                      placeholder="Enter student's full name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.email}
                      placeholder="Enter email address"
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Course *</Form.Label>
                    <Form.Select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.course}
                    >
                      <option value="">Select a course</option>
                      {COURSES.map(course => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.course}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-4">
                    <Form.Label>Profile Image URL (Optional)</Form.Label>
                    <Form.Control
                      type="url"
                      name="profileImageUrl"
                      value={formData.profileImageUrl}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.profileImageUrl}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.profileImageUrl}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Enter a valid image URL (jpg, jpeg, png, gif)
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/students')}
                  disabled={loading}
                >
                  <FaArrowLeft className="me-1" />
                  Back to List
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="flex-fill"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <FaSave className="me-1" />
                      {isEditing ? 'Update Student' : 'Create Student'}
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StudentForm;
