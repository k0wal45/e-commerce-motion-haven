import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore"; 
import Hero from "../components/navbar/Hero";

function Home() {

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchListings = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));

      let response = []

      querySnapshot.forEach((doc) => {
        return response.push(doc.data())
      })
      
      setListings(response)
      setLoading(false)
      
      
    }

    fetchListings()
  }, [])

  if (!loading) {
    console.log(listings)
  }

  return !loading
    ? (
      <main className='w-screen overflow-x-hidden'>
        <Hero />
      </main>
    )
    : (
      <div>
        loading
      </div>
    )
  
}

export default Home;
