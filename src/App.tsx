import React from 'react';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppDrawer from './components/appDrawer/appDrawer';
import StudentPage from './pages/studentPage/studentPage';
import AddStudent from './pages/addStudent/addStudent';
import DiciplinePage from './pages/diciplinePage/diciplinePage';
import FormDicipline from './pages/addDicipline/addDicipline';
import GradesPage from './pages/gradePage/gradePage';
import ProfessorPage from './pages/professorPage/professorPage';
import ProfessorForm from './pages/addProfessor/addProfessor';
import LoginPage from './pages/loginPage/loginPage';
import CalendarPage from './pages/calendarPage/calendarPage';


const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppDrawer />
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/alunos" element={<StudentPage />} />
            <Route path="/lancar-notas" element={<GradesPage />} />
            <Route path="/" element={<StudentPage />} />
            <Route path="/adicionar-aluno" element={<AddStudent />} />
            <Route path="/materias" element={<DiciplinePage />} />
            <Route path="/adicionar-materias" element={<FormDicipline />} />
            <Route path="/professores" element={<ProfessorPage />} />
            <Route path="/adicionar-professor" element={<ProfessorForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/calendario" element={<CalendarPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;