import { Badge } from 'antd'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ProductsCard = ({ p }) => {
    
    const navigate = useNavigate()

    return (
      
      <div className='card mb-3 hoverable'>
            <Badge.Ribbon>
                <Badge.Ribbon>
                    <img className="card-img-top" src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} alt="" />
                </Badge.Ribbon>
          </Badge.Ribbon>
    </div>
  )
}

export default ProductsCard