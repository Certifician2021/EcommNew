import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import auth from "../utils/auth";
import NotFoundPage from "./NotFoundPage";
import SignUp from "./SignUp";

const MainApp = ({ routes }) => {
  useEffect(() => {}, []);

  const [showModal, setShowModal] = useState(true);

  const data = auth.getUserInfo();

  return (
    <div className="app-layout">
        <Routes>
         <Route path="/signup" element={<SignUp />} />
         <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </div>
  );
};

export default MainApp;
