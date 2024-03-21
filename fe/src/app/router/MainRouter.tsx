import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<h1>login</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
