import React from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody, 
  CCardHeader,
  CCol,
  CRow,
  CButtonGroup,
  CForm,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CDropdown, 
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { FaPlus } from 'react-icons/fa'
import { BsThreeDotsVertical } from "react-icons/bs"; 

const Order = () => {
  var orderItems =[
    {id:1 ,productName : 'Mobile', SKU: 'HDSFSD' ,amount: 9000},
    {id:2 ,productName : 'Laptop', SKU: 'TRFSFD' ,amount: 15000},
    {id:3 ,productName : 'Desktop', SKU: 'REDSTT' ,amount: 20000},
    {id:4 ,productName : 'Mouse', SKU: 'EEESAE' ,amount: 600},
  ]
  return (
    <div>
      <CRow className="mb-4" xs={{ gutter: 4 }}>
        <CCol xs={6} sm={6} xl={6} xxl={6}>
          <CButtonGroup role="group" aria-label="Basic example">
            <Link to="/orders/create" className="btn btn-primary">
              <FaPlus className="mb-1" /> Add Order
            </Link>
          </CButtonGroup>
        </CCol>
        <CCol className="d-flex justify-content-end" xs={6} sm={6} xl={6} xxl={6}>
          <CForm>
            <div className="mb-3">
              <CFormInput type="search" id="SearchHere" placeholder="Search here.." />
            </div>
          </CForm>
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardHeader>Orders</CCardHeader>
        <CCardBody className="table-responsive">
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">SKU</CTableHeaderCell>
                <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orderItems.map((item,index)=>{
                return <CTableRow key={item.id}>
                <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                <CTableDataCell>{item.productName}</CTableDataCell>
                <CTableDataCell>{item.SKU}</CTableDataCell>
                <CTableDataCell>{item.amount}</CTableDataCell>
                <CTableDataCell>
                  <CDropdown variant="btn-group" direction="dropstart">
                    <CDropdownToggle className='table-actions' color="secondary"><BsThreeDotsVertical /></CDropdownToggle>
                    <CDropdownMenu>
                      <Link className='dropdown-item' to="view">View</Link> 
                      <Link className='dropdown-item' to={`edit/${item.id}`}>Edit</Link> 
                    </CDropdownMenu>
                  </CDropdown>
                </CTableDataCell>
              </CTableRow>
              })} 
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CRow className="mb-4 " xs={{ gutter: 4 }}>
        <CCol className="d-flex justify-content-end" xs={12} sm={12} xl={12} xxl={12}>
          <CPagination aria-label="Page navigation example">
            <CPaginationItem aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem>1</CPaginationItem> 
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCol>
      </CRow>
    </div>
  )
}

export default Order
