import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { UsersPage } from './pages/usersPage';
import { RoutesPage } from './pages/routesPage';
import { StopsPage } from './pages/stopsPage';
// Importar otras páginas de entidades...
function App() {
 return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/users" element={<UsersPage />} />
 <Route path="/routes" element={<RoutesPage />} />
 <Route path="/stops" element={<StopsPage />} />
 </Routes>
 </BrowserRouter>
 );
}
export default App;
