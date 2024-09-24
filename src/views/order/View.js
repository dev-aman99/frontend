import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';

const View = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null); // State to store fetched order
  const [loading, setLoading] = useState(true); // State to handle loading
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/view/${id}`); 
        setOrder(response.data.order); // Assuming the order is in response.data.order
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Order Details</strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex gap-2">
              <p className="text-body-secondary">Product Name :</p>
              <span>{order.product_name}</span>
            </div>
            <div className="d-flex gap-2">
              <p className="text-body-secondary">SKU :</p>
              <span>{order.sku}</span>
            </div>
            <div className="d-flex gap-2">
              <p className="text-body-secondary">Amount :</p>
              <span>₹ {order.amount}</span>
            </div> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default View;
