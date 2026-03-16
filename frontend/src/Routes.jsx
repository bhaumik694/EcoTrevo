import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './components/Home'
import CarbonFootprintCalculator from './components/CarbonFootprintCalculator'
import Signup from './components/Signup'
import Login from './components/login'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/calculator' element={<CarbonFootprintCalculator/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default AllRoutes


