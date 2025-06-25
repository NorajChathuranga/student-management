import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaEnvelope, FaUser } from 'react-icons/fa';

const StudentCard = ({ student, onEdit, onDelete, onView }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <Card.Header className="bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <Badge bg="primary">{student.course}</Badge>
          <small className="text-muted">
            {formatDate(student.createdAt)}
          </small>
        </div>
      </Card.Header>
      
      <Card.Body className="d-flex flex-column">
        <div className="text-center mb-3">
          {student.profileImageUrl ? (
            <img
              src={student.profileImageUrl}
              alt={student.name}
              className="rounded-circle mb-2"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
          ) : (
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-2"
              style={{ width: '80px', height: '80px' }}
            >
              <FaUser size={30} />
            </div>
          )}
        </div>
        
        <h5 className="card-title text-center mb-2">{student.name}</h5>
        
        <div className="mb-2">
          <small className="text-muted">
            <FaEnvelope className="me-1" />
            {student.email}
          </small>
        </div>
        
        <div className="mt-auto">
          <div className="d-grid gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onView(student.id)}
            >
              <FaEye className="me-1" />
              View Details
            </Button>
            
            <div className="d-flex gap-2">
              <Button
                variant="outline-warning"
                size="sm"
                className="flex-fill"
                onClick={() => onEdit(student.id)}
              >
                <FaEdit className="me-1" />
                Edit
              </Button>
              
              <Button
                variant="outline-danger"
                size="sm"
                className="flex-fill"
                onClick={() => onDelete(student.id)}
              >
                <FaTrash className="me-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
