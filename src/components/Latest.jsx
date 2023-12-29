import React from 'react'
import CategoryItem from './CategoryItem/CategoryItem'

const Latest = ({products}) => {
  return (
    <section className="flex flex-col gap-8 p-4 py-12 justify-center items-center">
      <h4 className="text-4xl font-luckycoin">Latest Product</h4>
      <ul className="flex flex-wrap gap-12 p-4 py-12 lg:p-16 mx-auto justify-center items-center">
      {    
            products.map((item) => (
                  <CategoryItem
                  image={item.response.images[0]}
                  title={item.response.title}
                  price={item.response.price}
                  discount={item.response.discount}
                  discountedPrice={item.response.discountedPrice}
                  id={item.id}
                  />
                ))

          }
      </ul>
    </section>
  )
}

export default Latest
