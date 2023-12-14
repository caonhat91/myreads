import "./App.css";
import { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";

const SearchBooks = lazy(() => import('./components/SearchBooks'));
const ListBooks = lazy(() => import('./components/ListBooks'));

function App() {
  const [shareBook, setShareBook] = useState([]);

  return (
    <Routes>
      <Route exact path="/" element={
        <Suspense fallback={<>...</>}>
          <ListBooks onShareBook={setShareBook} />
        </Suspense>
      } ></Route>
      <Route path="/search" element={
        <Suspense fallback={<>...</>}>
          <SearchBooks shareBook={shareBook} />
        </Suspense>
      }></Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
