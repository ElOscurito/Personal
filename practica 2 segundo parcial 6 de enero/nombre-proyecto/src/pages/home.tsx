import { Link } from 'react-router-dom';
export const Home = () => {
    return (
        <div className="home">
        <h1>Sistema de Gestión</h1>
        <p>Seleccione un módulo:</p>
        <nav className="nav-grid">
        <Link to="/users" className="nav-button">
        Usuarios
        </Link>
        <Link to="/routes" className="nav-button">
        Rutas
        </Link>
        <Link to="/stops" className="nav-button">
        Paradas
        </Link>
        </nav>
        </div>
    );
};