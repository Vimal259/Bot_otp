import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Login, SignUp, BuyNumber, AddBalance, NumberHistory, Profile } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


const App = () => {
  return (
    <main className="relative min-h-screen bg-background">
      <Router>
      <section>
        <Navbar/>
      </section>
      <section>
      <Routes>
					<Route path='/' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/buy-number' element={<BuyNumber />} />
          <Route path='/add-balance' element={<AddBalance />} />
					<Route path='/number-history' element={<NumberHistory />} />
					<Route path='/profile' element={<Profile />} />
          {/* <Route path='/balance' element={<BalanceComponent />} /> */}
				</Routes>
      </section>
      <section className="absolute z-10 w-full pb-8 bg-blue-600 padding-x padding-t">
        <Footer/>
      </section>
      </Router>
    </main>
  )
}

export default App