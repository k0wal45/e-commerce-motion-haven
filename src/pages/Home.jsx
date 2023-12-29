import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore"; 
import Hero from "../components/Hero";
import Loading from "./Loading";
import Latest from "../components/Latest";
import Decoration from "../components/Decoration";

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

  function getLatestItems(array) {
    // Sort the array by date in descending order
    const sortedArray = array.sort((a, b) => b.response.timeAdded - a.response.timeAdded);
  
    // Take the first 8 items (latest items)
    const latestItems = sortedArray.slice(0, 8);
  
    return latestItems;
  }


  if (!loading) {

    console.log(listings)
    
    return  (
      <main className='w-screen overflow-x-hidden'>
        <Hero />
        <Latest 
          products={getLatestItems(listings)}
        />
        <Decoration />
      </main>
    )
  } 

  return  (
      <Loading />
    )
  
}

export default Home;
