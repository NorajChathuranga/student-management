package com.studentmanagement.repository;

import com.studentmanagement.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    
    Optional<Student> findByEmail(String email);
    
    @Query("{'$or': [" +
           "{'name': {'$regex': ?0, '$options': 'i'}}, " +
           "{'email': {'$regex': ?0, '$options': 'i'}}, " +
           "{'course': {'$regex': ?0, '$options': 'i'}}" +
           "]}")
    List<Student> findBySearchTerm(String searchTerm);
    
    List<Student> findByCourseIgnoreCase(String course);
    
    boolean existsByEmail(String email);
}
