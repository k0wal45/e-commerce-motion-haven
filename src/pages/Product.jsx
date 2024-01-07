import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebaseConfig'
import Loading from './Loading'

const Product = () => {

  const { prodId } = useParams()
  const [listing, setListing] = useState([])
  const [size, setSize] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [imageNow, setImageNow] = useState(0)
  const navigate = useNavigate()


    // await fetch listing
    useEffect(() => {

      const fetchListing = async () => {
        const docRef = doc(db, "products", prodId);
        const docSnap = await getDoc(docRef);

        setListing({
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
  
      fetchListing()
    }, [prodId, navigate])

  if (!loading) {
    console.log(listing);

    const returnRating = (rating) => {
      let stars = []
      for (let i = 1; i < 11; i++) {
        if(rating === i) {
          stars.push(<input disabled type="radio" name="rating-10" className="bg-primary mask mask-star-2 odd:mask-half-1 even:mask-half-2" checked/>)
        } else {
          stars.push(<input disabled type="radio" name="rating-10" className="bg-primary mask mask-star-2 odd:mask-half-1 even:mask-half-2" />)
        }
        
      }

      return stars
    }

    if (quantity <= 0) {
      setQuantity(1)
    }

    

    return (
      <main className='w-screen overflow-x-hidden'>
        <section className="flex flex-col lg:flex-row gap-8 py-12 p-4 lg:p-12 justify-center items-center lg:max-w-[66vw] mx-auto">
          <div className="flex flex-col gap-4 items-end min-w-[50%]">
            <img src={listing.response.images[imageNow]} alt={listing.response.title} className=" rounded-md aspect-square max-h-[60vh] w-min border-2 border-neutral-500" />
            <div className="flex gap-4 overflow-x-scroll">
              {
                listing.response.images.map((img, index) => (
                  <img src={img} alt={listing.response.title} className={`rounded-md aspect-square w-24 border-2 border-neutral-500 ${imageNow === index ? '' : 'opacity-50'}`} onClick={() => {setImageNow(index)}}/>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-8">

            <h4 className="text-3xl font-bold">{listing.response.title}</h4>

            <div className="flex gap-4 justify-center items-center">
              <div className="rating rating-mmd rating-half">
                {returnRating(listing.response.review)}
              </div>
              <p className='text-xl opacity-50'>({listing.response.review * 0.5})</p>
              <div className="badge badge-primary badge-lg text-white">{listing.response.category}</div>
            </div>
            
            <p>{listing.response.description}</p>
            {
              listing.response.discount 
              ? <div className="flex gap-8 items-center justify-center">
                  <p className="text-4xl font-bold text-red-600">{listing.response.discountedPrice}$</p>

                  <div className="relative">
                    <p className="text-3xl text-neutral-400">{listing.response.price}$</p>
                    <div className="absolute top-[2px] left-0 w-full h-[2px] bg-neutral-400 origin-top-left rotate-[20deg]"></div>
                  </div>
              </div>

              : <p className="text-4xl font-bold">{listing.response.price}$</p>
            }
            <p className="text-xl opacity-60">{listing.response.availability}</p>

            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Size</p>
              <ul className="flex gap-4 items-center justify-start">
                {
                  listing.response.sizesAvailable.map((e) => (
                    <li onClick={() => {setSize(e)}} className={`p-[4px] px-[8px] rounded-md cursor-pointer ${size === e ? 'border-2 border-neutral-700' : 'border-[1px] border-neutral-400'}`}>{e}</li>
                  ))
                }
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Quantity</p>

              <div className="join">
                <button onClick={() => {setQuantity(quantity - 1)}} className="join-item btn text-2xl">-</button>
                <button className="join-item btn text-2xl">{quantity}</button>
                <button onClick={() => {setQuantity(quantity + 1)}} className="join-item btn text-2xl">+</button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <button className="p-2 px-8 border-4 border-primary rounded-md text-primary text-2xl font-bold" onClick={() => {console.log('add to cart')}}>Add to Cart</button>
              <button className="p-2 px-8 bg-secondary rounded-md text-white text-2xl font-bold" onClick={() => {console.log('buy now')}}>Buy Now</button>
            </div>
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
