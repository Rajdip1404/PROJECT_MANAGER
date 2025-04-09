import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/user.context';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Dashboard = () => {
  useUserAuth();

  const {user} = useContext(UserContext)
  return (
    <DashboardLayout activeMenu="dashboard">
      
    </DashboardLayout>
  )
}

export default Dashboard