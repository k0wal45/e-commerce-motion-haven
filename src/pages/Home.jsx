import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore"; 
import Hero from "../components/Hero";
import Loading from "./Loading";

function Home() {

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (!loading) {
    // console.log(listings)
    const categoryCounts = countProductsByCategory(listings);
    // console.log(categoryCounts);

    return  (
      <main className='w-screen overflow-x-hidden'>
        <Hero />
        <ul>
          {categoryCounts.map((item) => (
            <li>{item.category} {item.count}</li>
          ))}
        </ul>
      </main>
    )
  } 

  return  (
      <Loading />
    )
  
}

export default Home;
