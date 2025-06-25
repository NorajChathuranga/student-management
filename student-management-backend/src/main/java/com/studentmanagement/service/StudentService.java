package com.studentmanagement.service;

import com.studentmanagement.dto.StudentRequestDTO;
import com.studentmanagement.dto.StudentResponseDTO;

import java.util.List;

public interface StudentService {
    StudentResponseDTO createStudent(StudentRequestDTO studentRequestDTO);
    StudentResponseDTO getStudentById(String id);
    List<StudentResponseDTO> getAllStudents();
    StudentResponseDTO updateStudent(String id, StudentRequestDTO studentRequestDTO);
    void deleteStudent(String id);
    List<StudentResponseDTO> searchStudents(String searchTerm);
    List<StudentResponseDTO> getStudentsByCourse(String course);
}
