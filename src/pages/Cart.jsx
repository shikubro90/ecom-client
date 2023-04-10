import React, { useState } from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'

const Cart = () => {

    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()

  return (
      <div>
        <Jumbotron title={`Hello ${auth?.token && auth?.user?.name}`} subTitle={cart?.length ? `You have ${cart.length} items in cart. ${auth?.token? "" : "Please login to checkout"}` : `Cart is empty` } />
    </div>
  )
}

export default Cart