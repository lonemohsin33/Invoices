import React, { useState, useEffect} from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceGrid from "./components/InvoiceGrid";
import { Box, Button, Heading } from "@chakra-ui/react";
import {BrowserRouter as Router, Route, Routes, Link, useLocation} from 'react-router-dom'
import Invoicespage from "./components/Invoicespage";
import Navbar from "./components/Navbar";

const App = () => {
  const [invoices, setInvoices] = useState([]);

  const handleAddInvoice = (invoice) => {
    setInvoices([...invoices, invoice]);
  };
    const handleTotalPriceChange = () => {
      if (
        typeof qty === "number" &&
        typeof price === "number" &&
        typeof discount === "number" &&
        typeof tax === "number"
      ) {
        setTotalPrice(qty * (price - discount) * (1 + tax / 100));
      } else {
        setTotalPrice("");
      }
    };

const handleEditInvoice = (id, field, value) => {
  setInvoices(
    invoices.map((invoice) => {
      if (invoice.id === id) {
        const newInvoice = { ...invoice, [field]: parseFloat(value) };
        if (isNaN(newInvoice[field])) {
          newInvoice[field] = 0;
        }
        if (field === "price" || field === "discount") {
          newInvoice.discountPercent =
            newInvoice.price > 0
              ? (newInvoice.discount / newInvoice.price) * 100
              : 0;
        }
        if (field === "price" || field === "tax") {
          newInvoice.taxPercent =
            newInvoice.price > 0
              ? (newInvoice.tax / newInvoice.price) * 100
              : 0;
        }
        if (field === "discountPercent") {
          newInvoice.discount =
            newInvoice.price > 0
              ? (newInvoice.price * newInvoice.discountPercent) / 100
              : 0;
        }
        if (field === "taxPercent") {
          newInvoice.tax =
            newInvoice.price > 0
              ? (newInvoice.price * newInvoice.taxPercent) / 100
              : 0;
        }
        newInvoice.totalPrice =
          newInvoice.qty *
          (newInvoice.price - newInvoice.discount) *
          (1 + newInvoice.taxPercent / 100);
        return newInvoice;
      }
      return invoice;
    })
  );
};






  const handleDeleteInvoice = (id) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };


 
  

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route
          path="/"
          element={
            <Box
              width={"90vw"}
              height={"90vh"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Heading as="h3" size="lg" mb={2}>
                Invoicing Web App
              </Heading>
              <InvoiceForm onAddInvoice={handleAddInvoice} />
              {invoices.length > 0 && (
                <InvoiceGrid
                  invoices={invoices}
                  onEdit={handleEditInvoice}
                  onDelete={handleDeleteInvoice}
                />
              )}
            </Box>
          }
        />
        <Route
          path="/invoices"
          element={<Invoicespage onDelete={handleDeleteInvoice} />}
        />
      </Routes>
    </Router>
  );
};

export default App