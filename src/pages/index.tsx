import { withUrqlClient } from "next-urql"
import React from "react"
import { Navbar } from "../components/Navbar"
import { createUrqlClient } from "../utils/createUrqlClient"

const Index = () => (
  <>
    <Navbar />
    <div> Hello World </div>
  </>
)

// Set up URQL Provider around Index 
// Set server side rendering
export default withUrqlClient(createUrqlClient) (Index);
