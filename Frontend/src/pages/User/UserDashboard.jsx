import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { UserContext } from '../../context/user.context';

const UserDashboard = () => {
  useUserAuth();
  const {user} = useContext(UserContext);
  return (
    <DashboardLayout activeMenu="dashboard"> 
      UserdashBoard
    </DashboardLayout>
  )
}

export default UserDashboard