import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  return (
    <>
      {!loading && (
        <Route
          {...rest}
          element={
            isAuthenticated ? <Element /> : <Navigate to="/login" replace />
          }
        />
      )}
    </>
  );
};

export default ProtectedRoute;
