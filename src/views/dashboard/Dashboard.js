import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast,ToastContainer  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.toastMessage) {
      toast.info(location.state.toastMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }, [location.state])

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <ToastContainer />
    </>
  )
}

export default Dashboard
