import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

function AuthGuard() {
  return <Outlet />;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="login" element={<h1>login</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
