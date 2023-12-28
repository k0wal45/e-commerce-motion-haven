import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebaseConfig';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CategoryItem from '../components/CategoryItem/CategoryItem';

const Category = () => {

  // capitalize first letter
  function capitalizeFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  }

  const { catId } = useParams()
  const categoryName = capitalizeFirstLetter(catId)
  
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // await fetch listings
  useEffect(() => {

    const fetchListings = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      let response = []
      querySnapshot.forEach((doc) => {
        return response.push({
          id: doc.id,
          response: doc.data()
        })
      })
      setListings(response)
      setLoading(false)
    }

    fetchListings()
  }, [])

  // filter categories and dispaly what and how many of each
  function countProductsByCategory(products) {
    const categoryCount = {};
  
    products.forEach((product) => {
      const category = product.response.category;
  
      if (categoryCount[category]) {
        categoryCount[category]++;
      } else {
        categoryCount[category] = 1;
      }
    });
  
    const result = Object.keys(categoryCount).map((category) => ({
      category,
      count: categoryCount[category],
    }));
  
    return result;
  }


// filter results with useParam
  function filterByCategory(products, categoryName) {
    if(categoryName === 'Sale') {
      return products.filter(product => product.response.discount === true);
    }
    if(categoryName === 'All') {
      return products
    }

    return products.filter(product => product.response.category === categoryName);
  }



  

  if (!loading) {

    const filteredProducts = filterByCategory(listings, categoryName);

    console.log(filteredProducts);

    const categoryCounts = countProductsByCategory(listings);

    
    return  (
      <main className='w-screen overflow-x-hidden'>
        <section className="flex flex-col gap-8 py-12 p-4">
          <div className="relative flex justify-between items-center">
            <Link to='/' className='absolute top-0 left-0 whitespace-nowrap'><FontAwesomeIcon icon={faArrowLeft}/>Home</Link>
            <h2 className="w-full text-3xl font-luckycoin text-center">{categoryName}</h2>
          </div>
          <ul className="flex flex-wrap gap-4 mx-auto justify-center items-center">
            <Link to='/category/all'className="p-2 px-4 rounded-full border-2 border-neutral-200 hover:border-neutral-600 duration-200 transition-colors">All</Link>
            {
              categoryCounts.map((item) => (
                <Link to={`/category/${item.category.toLowerCase()}`} className="p-2 px-4 rounded-full border-2 border-neutral-200 hover:border-neutral-600 duration-200 transition-colors">{item.category}</Link>
              ))
            }
            <Link to='/category/sale'className="p-2 px-4 rounded-full border-2 border-red-300 hover:border-red-600 duration-200 transition-colors text-red-600">Sale</Link>

          </ul>
        </section>

        <p className="mx-auto text-center text-neutral-400">{filteredProducts.length} Items listed</p>

        <section className="flex flex-wrap gap-12 p-4 py-12 lg:p-16 mx-auto justify-center items-center">
          {    
            filteredProducts[0]
              ? filteredProducts.map((item) => (
                  <CategoryItem 
                  image={item.response.images[0]}
                  title={item.response.title}
                  price={item.response.price}
                  discount={item.response.discount}
                  discountedPrice={item.response.discountedPrice}
                  id={item.id}
                  />
                ))
              : navigate('/')
          
          }
        </section>
      </main>
    )
  } 

  return  (
      <Loading />
    )
  
}

export default Category
