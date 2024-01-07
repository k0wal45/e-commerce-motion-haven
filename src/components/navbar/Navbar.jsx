import logo from '../../assets/img/logo.webp'
import './hamburger.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'


const Navbar = () => {

  const [cart, setCart] = useState([])
  const cartItems = useSelector((state) => state.cart.value)

  useEffect(() => {
    setCart(cartItems.length)
  }, [cartItems])
  

  const [visible, setVisible] = useState(false)

  return (
    <nav className='z-50 flex justify-between lg:justify-around items-center p-4 lg:px-8 py-4 w-screen max-w-screen top-0 border-b-2 border-neutral bg-base-100'>
      <div className="flex gap-8 items-center justify-center">
        <Link to="/">
          <img src={logo} alt="Logo Motion Haven" className='w-16 z-40'/>
        </Link>
      </div>

      {/* lg menu */}
      <ul className="hidden lg:flex gap-12 justify-center items-center text-xl ">
        <Link to="/" className='border-white hover:border-b-2'>
          <li>
            Home
          </li>
        </Link>
        <Link to="/category/all" className='border-white hover:border-b-2'>
          <li>
            Browse
          </li>
        </Link>
        <Link to="/category/sale" className='border-white hover:border-b-2 text-red-500'>
          <li>
            Sale %
          </li>
        </Link>
        
      </ul>

        <Link to="/cart" className='relative hidden lg:flex gap-4 items-center justify-center border-black hover:border-b-2 py-2'>
          <div className="absolute top-[-15px] right-[-15px] badge badge-secondary">{cart}</div>
          <FontAwesomeIcon icon={faCartShopping} className='text-black text-2xl'/>
        </Link>


      


        {/* mobile menu */}

        <label className='flex lg:hidden z-50'>
          <input type="checkbox" id="check" onClick={(e) => {e.target.checked ? setVisible(true) : setVisible(false)}}/> 
          <span></span>
          <span></span>
          <span></span>
        </label>

        <div className={`absolute top-0 right-0 h-screen bg-primary z-30 origin-right transition-all duration-350 flex flex-col pt-24 p-8 gap-12
        ${
          visible
          ? 'scale-x-1'
          : 'scale-x-0'
        }
      `}>
        <h2 className="text-5xl text-center font-luckycoin">Motion<br/>Haven</h2>

      <ul className='gap-12 p-4 text-center flex flex-col text-2xl font-bold'>
        <Link to="/" className='border-white hover:border-b-2'>
          <li>
            Home
          </li>
        </Link>
        <Link to="/category/all" className='border-white hover:border-b-2'>
          <li>
            Browse
          </li>
        </Link>
        <Link to="/category/sale" className='border-white hover:border-b-2 text-red-500'>
          <li>
            Sale %
          </li>
        </Link>
        
        <Link to="/cart" className='w-min relative gap-4 items-center justify-center border-black hover:border-b-2 py-2 mx-auto'>
          <li>
            <div className="absolute top-[-15px] right-[-15px] badge badge-secondary">{cart}</div>
            <FontAwesomeIcon icon={faCartShopping} className='text-black text-2xl'/>
          </li>
        </Link>

        

        
        <li>
          <ul className="flex justify-center items-center gap-8">

          </ul>
        </li>
      </ul>
    </div>

    </nav>
  )
}

export default Navbar
