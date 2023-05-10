import './App.css';
import {Route, Routes} from "react-router-dom"
import DetailPage from './pages/detailPage';
import MainPage from './pages/mainPage';
import Layout from './components/Layout';
import SearchPage from './pages/searchPage';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage/>}/>
          <Route path="search" element={<SearchPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
