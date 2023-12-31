import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebaseConfig'
import Loading from './Loading'
import { useDispatch } from 'react-redux'
import { addToCart, getCartItems } from '../cartSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {

  const dispatch = useDispatch()

  const { prodId } = useParams()
  const [listing, setListing] = useState([])
  const [size, setSize] = useState(false)
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
    
    const returnRating = (rating) => {
      let stars = []
      for (let i = 1; i < 11; i++) {
        if(rating === i) {
          stars.push(<input key={i} disabled type="radio" name="rating-10" className="bg-primary mask mask-star-2 odd:mask-half-1 even:mask-half-2" checked/>)
        } else {
          stars.push(<input key={i} disabled type="radio" name="rating-10" className="bg-primary mask mask-star-2 odd:mask-half-1 even:mask-half-2" />)
        }
        
      }

      return stars

    }

    if (quantity <= 0) {
      setQuantity(1)
    }

    const notify = () => {

      toast.error('Oops! Please ensure that the size is set correctly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });}

    

    return (
      <main className='w-screen overflow-x-hidden'>
        <section className="flex flex-col lg:flex-row gap-8 py-12 p-4 lg:p-12 justify-center items-center lg:max-w-[66vw] mx-auto">
          <div className="flex flex-col gap-4 items-end min-w-[50%]">
            <img src={listing.response.images[imageNow]} alt={listing.response.title} className=" rounded-md aspect-square max-h-[60vh] w-min border-2 border-neutral-500" />
            <div className="flex gap-4 overflow-x-scroll">
              {
                listing.response.images.map((img, index) => (
                  <img key={index} src={img} alt={listing.response.title} className={`rounded-md aspect-square w-24 border-2 border-neutral-500 ${imageNow === index ? '' : 'opacity-50'}`} onClick={() => {setImageNow(index)}}/>
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
                    <li key={e} onClick={() => {setSize(e)}} className={`p-[4px] px-[8px] rounded-md cursor-pointer ${size === e ? 'border-2 border-neutral-700' : 'border-[1px] border-neutral-400'}`}>{e}</li>
                  ))
                }
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Quantity</p>

              <div className="join">
                <button onClick={() => {setQuantity(quantity - 1)}} className="join-item btn text-2xl">-</button>
                <p className="join-item btn text-2xl">{quantity}</p>
                <button onClick={() => {setQuantity(quantity + 1)}} className="join-item btn text-2xl">+</button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <button className="p-2 px-8 border-4 border-primary rounded-md text-primary text-2xl font-bold" 
                onClick={() => {
                  
                  size ? dispatch(addToCart({
                    id: listing.id,
                    response: listing.response,
                    quantity: quantity,
                    size: size,}))
                  : notify()

                  dispatch(getCartItems())

              }}
              >Add to Cart</button>
              <button className="p-2 px-8 bg-secondary rounded-md text-white text-2xl font-bold" 
                onClick={() => {navigate('/cart')}}
              >Buy Now</button>
              
            </div>
          </div>

        </section>

        <ToastContainer/>

      </main>
    )
  }

  return  (
    <Loading />
  )
}

export default Product
