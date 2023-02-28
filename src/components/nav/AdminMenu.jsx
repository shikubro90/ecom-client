import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
      <>
            <div>AdminMenu</div>
            <ul>
                <li>
                    <NavLink className="" to="/dashboard/admin/category">
                        Create Category
                    </NavLink>
                </li>
                <li>
                    <NavLink className="" to="/dashboard/admin/product">
                        Create Products
                    </NavLink>
                </li>

            </ul>
      </>
  )
}

export default AdminMenu