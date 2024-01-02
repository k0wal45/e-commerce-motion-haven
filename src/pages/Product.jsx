import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebaseConfig'
import Loading from './Loading'

const Product = () => {

  const { prodId } = useParams()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageNow, setImageNow] = useState(0)
  const navigate = useNavigate()


    // await fetch listings
    useEffect(() => {

      const fetchListings = async () => {
        const docRef = doc(db, "products", prodId);
        const docSnap = await getDoc(docRef);

        setListings({
          id: docSnap.id,
          response: docSnap.data()
        })

        if (docSnap.exists()) {
          
          setLoading(false)
        } else {
          console.log("No such document!");
          navigate('/notfound')
        }

      }
  
      fetchListings()
    }, [prodId])

  if (!loading) {
    console.log(listings);

    return (
      <main className='w-screen overflow-x-hidden'>
        <section className="flex flex-col gap-8 py-12 p-4 lg:p-12 lg:max-w-[50%]">
          <div className="flex flex-col">
            <img src={listings.response.images[imageNow]} alt={listings.response.title} className="aspect-square min-w-1/3 border-2 border-neutral-500" />
          </div>
          <div className="flex gap-4 items-center jutify-start">
            {
              listings.response.images.map((img, index) => (
                <img src={img} alt={listings.response.title} className={`aspect-square w-24 border-2 border-neutral-500 ${imageNow === index ? '' : 'opacity-50'}`} onClick={() => {setImageNow(index)}}/>
              ))
            }
          </div>
        </section>
      </main>
    )
  }

  return  (
    <Loading />
  )
}

export default Product
