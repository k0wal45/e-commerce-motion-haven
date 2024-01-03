import { Link } from 'react-router-dom'
import './CategoryItem.css'

const CategoryItem = ({image, title, price, discount, discountedPrice, id, inStock}) => {
  return (
    <Link to={`/product/${id}`} className={`${inStock ? '' : 'opacity-70'} relative w-72 h-[31rem] rounded-xl border-2 border-neutral-200 hover:border-neutral-200 flex flex-col overflow-hidden`}>
      {
        discount ? <span className="discount font-luckycoin bg-red-600">Discount</span> : ''
      }
      <img src={image} alt={`Motion Haven ${title}`} className='aspect-square w-full rounded-xl'/>
      <div className="flex flex-col p-4 justify-center items-start gap-4 h-full">
        <h4 className="text-2xl">{title}</h4>
        {
          discount 
          ? <div className="flex gap-8">
              <p className="text-3xl font-bold text-red-600">{discountedPrice}$</p>

              <div className="relative">
                <p className="text-2xl text-neutral-400">{price}$</p>
                <div className="absolute top-[3px] left-0 w-full h-[2px] bg-neutral-400 origin-top-left rotate-[20deg]"></div>
              </div>
          </div>

          : <p className="text-3xl font-bold">{price}$</p>
        }
      </div>
    </Link>
  )
}

export default CategoryItem
