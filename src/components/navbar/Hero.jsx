import { Link } from 'react-router-dom'
import img from '../../assets/img/img.webp'

const Hero = () => {
  return (
    <section className=" w-screen grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-8 p-8 lg:max-h-screen place-items-center">

      <Link to='/category/top' className='relative flex items-end p-8 w-full h-full min-h-[20rem] lg:col-span-2 lg:row-span-2' >
        <div className="absolute top-0 left-0 rounded-xl w-full h-full -z-10 bg-black bg-opacity-30"></div>
        <img src={img} alt="" className=' w-full h-full object-cover absolute top-0 left-0 -z-20 rounded-xl'/>
        <h4 className="text-8xl font-luckycoin text-white">Tops</h4>
      </Link>

      <Link to='/category/shirt' className='relative flex items-end p-8 w-full h-full min-h-[20rem]' >
        <div className="absolute top-0 left-0 rounded-xl w-full h-full -z-10 bg-black bg-opacity-30"></div>
        <img src={img} alt="" className=' w-full h-full object-cover absolute top-0 left-0 -z-20 rounded-xl'/>
        <h4 className="text-8xl font-luckycoin text-white">T-Shirts</h4>
      </Link>

      <Link to='/category/skirt' className='relative flex items-end p-8 w-full h-full min-h-[20rem]' >
        <div className="absolute top-0 left-0 rounded-xl w-full h-full -z-10 bg-black bg-opacity-30"></div>
        <img src={img} alt="" className=' w-full h-full object-cover absolute top-0 left-0 -z-20 rounded-xl'/>
        <h4 className="text-8xl font-luckycoin text-white">Skirts</h4>
      </Link>

      
    </section>
  )
}

export default Hero
