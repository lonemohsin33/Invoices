import React, { useState } from "react";
import { FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const InvoiceGrid = ({ invoices, onEdit, onDelete }) => {
  return (
    <Table variant="striped" colorScheme="teal" gap={10}>
      <Thead>
        <Tr>
          <Th>Qty</Th>
          <Th>Price</Th>
          <Th>Discount %</Th>
          <Th>Discount</Th>
          <Th>Tax %</Th>
          <Th>Tax</Th>
          <Th>Total Price</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {invoices.map((invoice) => (
          <Tr key={invoice.id}>
            <Td>
              <Input
                value={invoice.qty}
                onChange={(e) => onEdit(invoice.id, "qty", e.target.value)}
              />
            </Td>
            <Td>
              <Input
                value={invoice.price}
                onChange={(e) => onEdit(invoice.id, "price", e.target.value)}
              />
            </Td>
            <Td>
              <Input
                value={invoice.discountPercent}
                onChange={(e) =>
                  onEdit(invoice.id, "discountPercent", e.target.value)
                }
              />
            </Td>
            <Td>
              <Input
                value={invoice.discount}
                onChange={(e) => onEdit(invoice.id, "discount", e.target.value)}
              />
            </Td>
            <Td>
              <Input
                value={invoice.taxPercent}
                onChange={(e) =>
                  onEdit(invoice.id, "taxPercent", e.target.value)
                }
              />
            </Td>
            <Td>
              <Input
                value={invoice.tax}
                onChange={(e) => onEdit(invoice.id, "tax", e.target.value)}
              />
            </Td>
            <Td>{invoice.totalPrice}</Td>
            <Td>
              <Button  onClick={() => onDelete(invoice.id)}>Delete</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
export default InvoiceGrid;
