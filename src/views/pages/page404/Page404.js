import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CCol,
  CContainer, 
  CRow,
} from '@coreui/react'  

const Page404 = () => {
  const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // This will navigate to the previous page
    };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol className="d-flex flex-column justify-content-center" md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-body-secondary float-start">
                The page you are looking for was not found.
              </p> 
            </div> 
            <button  onClick={handleBackClick} className="btn btn-primary col-5 align-self-center me-0 me-lg-5">
                Back
            </button>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
