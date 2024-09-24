import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CBadge, CSmartTable } from '@coreui/react-pro'
import { CDropdown, CDropdownMenu, CDropdownToggle, CDropdownItem } from '@coreui/react'
import { FaPlus, FaEye } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineEdit, MdDeleteSweep } from 'react-icons/md'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'

const Order = () => {
  const [orders, setOrders] = useState([]) // State to store fetched orders
  const [loading, setLoading] = useState(true) // State to handle loading
  const [selectedItems, setSelectedItems] = useState([]) // State to store selected items

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/api/orders/delete/${id}`)
          if (response.status === 200) {
            //toast.success(response.data.message);
            // Wait for toast to be visible before reloading
            // Show success message after the deletion
            Swal.fire({
              title: 'Deleted!',
              text: 'Your items have been deleted.',
              icon: 'success',
            })
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
        } catch (error) {
          toast.error(error.response.data.extraDetails)
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your items are safe :)',
          icon: 'error',
        })
      }
    })
  }

  const handleDeleteMultiple = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post('/api/orders/delete-multiple', { ids: selectedItems })
          if (response.status === 200) {
            toast.success(response.data.message)
            // Wait for toast to be visible before reloading
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
          // Show success message after the deletion
          Swal.fire({
            title: 'Deleted!',
            text: 'Your items have been deleted.',
            icon: 'success',
          })
        } catch (error) {
          toast.error(error.response.data.extraDetails)
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your items are safe :)',
          icon: 'error',
        })
      }
    })
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders')
        setOrders(response.data.orders) // Assuming the orders are in response.data.orders
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const columns = [
    {
      key: 'product_name',
      _style: { width: '30%' },
    },
    {
      key: 'sku',
      _style: { width: '30%' },
    },
    {
      key: 'amount',
      _style: { width: '30%' },
    },
    {
      key: 'show_details',
      label: 'Action',
      _style: { width: '2%' },
      filter: false,
      sorter: false,
    },
  ]

  return (
    <>
      <div
        className="position-absolute"
        style={{ right: '24px' }}
        role="group"
        aria-label="Basic example"
      >
        {selectedItems.length > 0 && (
          <CDropdown className="me-3">
            <CDropdownToggle color="secondary">Actions</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={handleDeleteMultiple} href="#">
                Delete
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        )}
        <Link to="/orders/create" className="btn btn-primary">
          <FaPlus className="mb-1" /> Add Order
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CSmartTable
          className="pb-2"
          activePage={1}
          cleaner
          clickableRows
          columns={columns}
          columnSorter
          items={orders}
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          onFilteredItemsChange={(items) => {
            // console.log(items)
          }}
          onSelectedItemsChange={(items) => {
            setSelectedItems(items.map((item) => item._id))
          }}
          scopedColumns={{
            product_name: (item) => (
              <td>
                <Link className="d-flex gap-2 text-decoration-none" to={`view/${item._id}`}>
                  {item.product_name}
                </Link>
              </td>
            ),
            status: (item) => (
              <td>
                <CBadge>{item.status}</CBadge>
              </td>
            ),
            show_details: (item) => {
              return (
                <td className="py-2">
                  <CDropdown variant="btn-group" direction="dropstart">
                    <CDropdownToggle className="table-actions" color="secondary">
                      <BsThreeDotsVertical />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <Link className="dropdown-item" to={`view/${item._id}`}>
                        <FaEye /> View
                      </Link>
                      <Link className="dropdown-item" to={`edit/${item._id}`}>
                        <MdOutlineEdit /> Edit
                      </Link>
                      <CDropdownItem onClick={() => handleDelete(item._id)}>
                        <MdDeleteSweep /> Delete
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </td>
              )
            },
          }}
          selectable
          sorterValue={{ column: 'status', state: 'asc' }}
          tableFilter
          tableProps={{
            className: 'add-this-class',
            responsive: true,
            striped: true,
            hover: true,
          }}
          tableBodyProps={{
            className: 'align-middle',
          }}
        />
      )}

      <ToastContainer />
    </>
  )
}

export default Order
