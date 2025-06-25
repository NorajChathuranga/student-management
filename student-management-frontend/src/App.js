import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StudentList from './components/student/StudentList';
import StudentForm from './components/student/StudentForm';
import StudentDetails from './components/student/StudentDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Container className="py-4">
            <Routes>
              <Route path="/" element={<StudentList />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/students/add" element={<StudentForm />} />
              <Route path="/students/edit/:id" element={<StudentForm />} />
              <Route path="/students/details/:id" element={<StudentDetails />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
