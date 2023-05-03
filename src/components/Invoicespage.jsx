import React,{useEffect, useState} from 'react'

import { Button, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Invoicespage = ({onDelete}) => {
    const invoices = JSON.parse(localStorage.getItem('invoice'))
    

    return (
      <>
       
        <Table
          variant="striped"
          colorScheme="teal"
          gap={2}
          width={"100vw"}
          height={"100vh"}
        >
          <Thead>
            <Tr>
              <Th>Index</Th>
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
            {invoices.map((invoice, index) => (
              <Tr key={invoice.id}>
                <Td>{index}</Td>

                <Td>
                  <Input value={invoice.qty} readOnly />
                </Td>
                <Td>
                  <Input value={invoice.price} readOnly />
                </Td>
                <Td>
                  <Input value={invoice.discountPercent} readOnly />
                </Td>
                <Td>
                  <Input value={invoice.discount} readOnly />
                </Td>
                <Td>
                  <Input value={invoice.taxPercent} readOnly />
                </Td>
                <Td>
                  <Input value={invoice.tax} readOnly />
                </Td>
                <Td>{invoice.totalPrice}</Td>
                <Td>
                  <Button onClick={() => onDelete(invoice.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    );
}

export default Invoicespage
