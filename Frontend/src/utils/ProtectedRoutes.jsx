import React, { Children } from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute=({Children})=>{

  const isprotected=document.cookie.includes("accessToken");
  if(!isprotected)
  {
    return <Navigate to="/login" />;
  }
  return Children;
}

export default ProtectedRoute;


// this FUNCtion checks is it 