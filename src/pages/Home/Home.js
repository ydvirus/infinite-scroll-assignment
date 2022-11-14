import React, {useState} from 'react'
import ResponsiveAppBar from "../../components/AppBar/AppBar"
import DisplayCases from '../../components/Main/DisplayCases/DisplayCases'
import "./Home.css"
import UserTable from '../../components/Main/UserTable/UserTable'

function Home() {

    const [selectedCustomer, setSelectedCustomer] = useState()
  return (
    <div className='container'>
    <ResponsiveAppBar/>
    <UserTable setSelectedCustomer={setSelectedCustomer}/>
    <DisplayCases selectedCustomer={selectedCustomer}/>
    </div>
  )
}

export default Home