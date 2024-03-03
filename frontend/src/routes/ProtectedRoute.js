import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    console.log({ token });

    // If there's no token, redirect to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If there's a token, proceed as normal
    return children;
};
export default ProtectedRoute