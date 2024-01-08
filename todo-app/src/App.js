
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import Navbar from './component/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthContext, { AuthProvider } from './auth/AuthContext';
import TaskContext, { TaskProvider } from './Context/TaskContext';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  

  return (
    <BrowserRouter>
      
        <AuthProvider>
          <TaskProvider>
        <Navbar />
        <Routes>
          
          <Route path='/' element={<Home />}>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/task-list' element={ <ProtectedRoute> <TaskList /> </ProtectedRoute>}></Route>
          <Route path='/create-task' element={ <ProtectedRoute><CreateTask /> </ProtectedRoute>}></Route>
          <Route path='/profile' element={ <ProtectedRoute><Profile /> </ProtectedRoute>}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
        </TaskProvider>
        </AuthProvider>
       
    </BrowserRouter>
  );
}

export default App;

