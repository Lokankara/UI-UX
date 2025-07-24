import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BookingCreate from './pages/BookingCreate';
import BookingEdit from './pages/BookingEdit';

const token = localStorage.getItem('token') || '';
const BookingEditWrapper: React.FC = () => <BookingEdit token={token} />;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/booking/create" element={<BookingCreate />} />
      <Route path="/booking/edit/:id" element={<BookingEditWrapper />} />
      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  </BrowserRouter>
);
