import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../context/search'


const Search = () => {

  const [values, setValue] = useSearch()
  console.log(values)
  
  const navigation = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post(`/search-products/${values?.keyword}`);
      setValue({ ...values, results: data })
      navigation("/search");
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <form onSubmit={handleSubmit} className='d-flex'>
      <input placeholder='Search' onChange={(e)=>setValue({...values, keyword : e.target.value})} type="search" style={{ borderRadius: "0px" }} className='form-control' />
      <button className='btn btn-outline-primary' style={{ borderRadius: "0px" }} type="submit">
        Search
      </button>
    </form>
  )
}

export default Search