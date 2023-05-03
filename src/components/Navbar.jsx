import { Link, useLocation } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";

function Navbar() {
    const location = useLocation();
    
    
  return (
    <>
      {location.pathname !== "/" && (
       
          <Link to="/">
            <Button float="left">Home</Button>
          </Link>
          
        
      )}
      {location.pathname !== "/invoices" && location.pathname !== "/" && (
        <Link to="/invoices">
          <Button float="right">Previous invoices</Button>
        </Link>
      )}
      {location.pathname === "/" && (
        <Link to="/invoices">
          <Button float="right">Previous invoices</Button>
        </Link>
      )}
    </>
  );
}

export default Navbar;
