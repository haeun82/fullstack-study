import logo from './logo.svg';
import './App.css';
import NewsList from './components/NewsList';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    // <NewsList />
    <Routes>
      {/* ?는 카테고리 값이 선택적! 즉 있을 수도 있고, 없을 수도 있다라는 뜻 */}
      <Route path='/:category?' element={<NewsPage />}/>
    </Routes>
  );
}

export default App;
