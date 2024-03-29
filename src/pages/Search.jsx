import React from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import ProductsCard from '../components/cards/ProductsCard'
import { useSearch } from '../context/search'

const Search = () => {

  const [values] = useSearch()

  return (
    <div>
      <Jumbotron title="Search Result" subTitle={values?.results?.length < 1 ? "No products found" : `Found ${values?.results?.length}`} />

      <div className="container">
        <div className="row">
          {values?.results?.map((e,i) => (
            <div key={i} className="col-md-4">
              <ProductsCard p={e} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Search