import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../features/user/userSlice";

function RequireAuth({ children }) {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!user) {
    // /login 페이지로 리디렉션하되, 원래 이동하려고 했던 현재 위치를 저장
    // 이를 통해 사용자가 로그인한 후 해당 페이지로 보낼 수 있으며, 
    // 이는 홈페이지(메인페이지)에 내려놓는 것보다 더 좋은 사용자 경험임
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;

// (참고) RequireAuth 컴포넌트 사용법
{/* <Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<PublicPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/protected"
      element={
        <RequireAuth>
          <ProtectedPage />
        </RequireAuth>
      }
    />
  </Route>
</Routes> */}