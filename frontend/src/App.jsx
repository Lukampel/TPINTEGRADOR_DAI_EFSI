import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import GameDetail from './pages/GameDetail'
import Library from './pages/Library'
import Collections from './pages/Collections'
import CollectionDetail from './pages/CollectionDetail'
import Profile from './pages/Profile'
import Stats from './pages/Stats'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

// Mapa de rutas (ver docs/ai/ARCHITECTURE.md).
// Las privadas van dentro de <Layout>; la protección con login la suma T08.
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/game/:rawgId" element={<GameDetail />} />
        <Route path="/library" element={<Library />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:id" element={<CollectionDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/stats" element={<Stats />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
