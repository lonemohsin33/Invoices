import React, { useState } from "react";
import { FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const InvoiceForm = ({ onAddInvoice }) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

const handleQtyChange = (e) => {
  const newQty = e.target.value === "" ? "" : parseFloat(e.target.value);
  setQty(newQty);
   setTotalPrice(newQty * (newPrice - discount) * (1 + taxPercent / 100));
};



  const handlePriceChange = (e) => {
    const newPrice = e.target.value === "" ? "" : parseFloat(e.target.value);
    setPrice(newPrice);
    setNewPrice(newPrice);
     setTotalPrice(qty * (newPrice - discount) * (1 + taxPercent / 100));
  };

  const handleDiscountPercentChange = (e) => {
    const newDiscountPercent =
      e.target.value === "" ? "" : parseFloat(e.target.value);
    setDiscountPercent(newDiscountPercent);
    const discountAmount = (newPrice * newDiscountPercent) / 100;
    setDiscount(discountAmount);
    setTotalPrice(qty * (newPrice - discountAmount) * (1 + taxPercent / 100));
  };

  const handleDiscountChange = (e) => {
    const newDiscount = e.target.value === "" ? "" : parseFloat(e.target.value);
    setDiscount(newDiscount);
    const discountPercent = (newDiscount / newPrice) * 100;
    setDiscountPercent(discountPercent);
    setTotalPrice(qty * (newPrice - newDiscount) * (1 + taxPercent / 100));
  };

  const handleTaxPercentChange = (e) => {
    const newTaxPercent =
      e.target.value === "" ? "" : parseFloat(e.target.value);
    setTaxPercent(newTaxPercent);
    const taxMultiplier = 1 + newTaxPercent / 100;
    // console.log(taxMultiplier);
    setTax((newPrice * newTaxPercent) / 100);
    setTotalPrice(qty * (price - discount) * taxMultiplier);
  };



  const handleTaxChange = (e) => {
    const newTax = e.target.value === "" ? "" : parseFloat(e.target.value);
    setTax(newTax);
    const taxPercent = (newTax / price) * 100;
    setTaxPercent(taxPercent);
    setTotalPrice(qty * (price - discount) * (1 + taxPercent / 100));
  };

  const handleTotalPriceChange = () => {
    setTotalPrice(qty * (newPrice - discount) * (1 + taxPercent / 100));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    const invoice = {
      id: Math.floor(Math.random() * 1000),
      qty,
      price: newPrice,
      discountPercent,
      discount,
      taxPercent,
      tax,
      totalPrice,
    };
    onAddInvoice(invoice);
    if (localStorage.getItem('invoice')) {
      const array = JSON.parse(localStorage.getItem('invoice'))
      array.push(invoice)
      localStorage.setItem("invoice", JSON.stringify(array));
    } else {
      
      localStorage.setItem('invoice',JSON.stringify([invoice]) )
    }
     
    setQty(0);
    setPrice(0);
    setNewPrice(0);
    setDiscountPercent(0);
    setDiscount(0);
    setTaxPercent(0);
    setTax(0);
    setTotalPrice(0);
  };


       

  return (
    <form onSubmit={handleSubmit} >
      <Stack spacing={2} >
        <FormControl id="qty">
          <FormLabel fontSize={"15px"}>Qty</FormLabel>
          <Input
            type="number"
            value={qty}
            padding={"6"}
            borderRadius={"1vmax"}
            height={["10%", "20px"]}
            width={["100%", "400px"]}
            onChange={handleQtyChange}
          />
        </FormControl>
        <FormControl id="price">
          <FormLabel fontSize={"15px"}>Price</FormLabel>
          <Input
            type="number"
            value={price}
            padding={"6"}
            borderRadius={"1vmax"}
            height={["10%", "20px"]}
            width={["100%", "400px"]}
            onChange={handlePriceChange}
          />
        </FormControl>
        <FormControl id="discountPercent">
          <FormLabel fontSize={"15px"}>Discount %</FormLabel>
          <Input
            type="number"
            value={discountPercent}
            padding={"6"}
            borderRadius={"1vmax"}
            height={["10%", "20px"]}
            width={["100%", "400px"]}
            onChange={handleDiscountPercentChange}
          />
        </FormControl>
        <FormControl id="discount">
          <FormLabel fontSize={"15px"}>Discount</FormLabel>
          <Input
            type="number"
            value={discount}
            padding={"6"}
            borderRadius={"1vmax"}
            height={["10%", "20px"]}
            width={["100%", "400px"]}
            onChange={handleDiscountChange}
          />
        </FormControl>
        <FormControl id="taxPercent">
          <FormLabel fontSize={"15px"}>Tax %</FormLabel>
          <Input
            type="number"
            value={taxPercent}
            padding={"6"}
            borderRadius={"1vmax"}
            height={["10%", "20px"]}
            width={["100%", "400px"]}
            onChange={handleTaxPercentChange}
          />
        </FormControl>
        <FormControl id="tax">
          <FormLabel fontSize={"15px"}>Tax</FormLabel>
          <Input
            type="number"
            padding={"6"}
            borderRadius={"1vmax"}
            height={["10%", "20px"]}
            width={["100%", "400px"]}
            value={tax}
            onChange={handleTaxChange}
          />
        </FormControl>
        <FormControl id="totalPrice">
          <FormLabel fontSize={"15px"}>Total Price</FormLabel>
          <Input
            type="number"
            padding={"6"}
            borderRadius={"1vmax"}
           
            height={["10%", "20px"]}
            width={["100%", "400px"]}
            value={totalPrice}
            readOnly
          />
        </FormControl>
        <Button type="submit">Add Invoice</Button>
      </Stack>
    </form>
  );
}
export default InvoiceForm;
