package com.studentmanagement.service;

import com.studentmanagement.dto.StudentRequestDTO;
import com.studentmanagement.dto.StudentResponseDTO;
import com.studentmanagement.model.Student;
import com.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Override
    public StudentResponseDTO createStudent(StudentRequestDTO studentRequestDTO) {
        // Check if email already exists
        if (studentRepository.existsByEmail(studentRequestDTO.getEmail())) {
            throw new RuntimeException("Student with email " + studentRequestDTO.getEmail() + " already exists");
        }
        
        Student student = new Student(
            studentRequestDTO.getName(),
            studentRequestDTO.getEmail(),
            studentRequestDTO.getCourse(),
            studentRequestDTO.getProfileImageUrl()
        );
        
        Student savedStudent = studentRepository.save(student);
        return convertToResponseDTO(savedStudent);
    }
    
    @Override
    public StudentResponseDTO getStudentById(String id) {
        Student student = studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        return convertToResponseDTO(student);
    }
    
    @Override
    public List<StudentResponseDTO> getAllStudents() {
        return studentRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }
    
    @Override
    public StudentResponseDTO updateStudent(String id, StudentRequestDTO studentRequestDTO) {
        Student existingStudent = studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        
        // Check if email is being changed and if new email already exists
        if (!existingStudent.getEmail().equals(studentRequestDTO.getEmail()) && 
            studentRepository.existsByEmail(studentRequestDTO.getEmail())) {
            throw new RuntimeException("Student with email " + studentRequestDTO.getEmail() + " already exists");
        }
        
        existingStudent.setName(studentRequestDTO.getName());
        existingStudent.setEmail(studentRequestDTO.getEmail());
        existingStudent.setCourse(studentRequestDTO.getCourse());
        existingStudent.setProfileImageUrl(studentRequestDTO.getProfileImageUrl());
        
        Student updatedStudent = studentRepository.save(existingStudent);
        return convertToResponseDTO(updatedStudent);
    }
    
    @Override
    public void deleteStudent(String id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }
    
    @Override
    public List<StudentResponseDTO> searchStudents(String searchTerm) {
        return studentRepository.findBySearchTerm(searchTerm)
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<StudentResponseDTO> getStudentsByCourse(String course) {
        return studentRepository.findByCourseIgnoreCase(course)
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }
    
    private StudentResponseDTO convertToResponseDTO(Student student) {
        return new StudentResponseDTO(
            student.getId(),
            student.getName(),
            student.getEmail(),
            student.getCourse(),
            student.getProfileImageUrl(),
            student.getCreatedAt(),
            student.getUpdatedAt()
        );
    }
}
