import { useEffect, useState } from "react";
import { db } from "../db";
import { collection, getDocs } from "firebase/firestore"; 

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
      console.log(response)
      
      
    }

    fetchListings()
  }, [])

  return !loading
    ? (
      <div>
        {
          listings.map((doc) => (
            <li>
              {doc.test}
              {
                doc.faq
                  ? doc.faq.map((item) => (
                    <ul className="p-4 ">
                      <li>{item.question}</li>
                      <li>{item.answer}</li>
                    </ul>
                  ))
                  : ''
              }
            </li>
          ))
        }
      </div>
    )
    : (
      <div>
        loading
      </div>
    )
  
}

export default Home;
