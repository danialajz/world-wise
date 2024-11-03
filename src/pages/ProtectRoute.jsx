import React, { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router";

function ProtectRoute({ children }) {
  const { isAuthenticted } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticted) navigate("/");
    },
    [isAuthenticted, navigate]
  );
  return isAuthenticted ? children : null;
}

export default ProtectRoute;
