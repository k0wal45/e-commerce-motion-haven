import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.webp'

function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  

  return (
    

    <footer className="flex flex-col">
      <div className="w-screen min-h-[20rem] bg-neutral-800 flex flex-col gap-4 justify-center items-center text-white">
        <img src={logo} alt="Logo Tasty Courtyard" className='w-16'/>
        <ul className="flex flex-wrap justify-center items-center gap-8 p-4 text-lg">
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/category/all">Browse</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/category/sale">Sale %</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>|</li>
          <li>
            <a href="https://daniel-kowalski.com">Creator</a>
          </li>



          
        </ul>

        <p className="text-neutral-700">The link to the <Link to='/admin' className='underline'>admin page</Link> is typically not visible, but for your convenience here it is, you can also access it by typing '/admin' in the URL</p>
      </div>
      <section className="flex flex-col justify-center items-center p-4 bg-neutral-900 shadow-inner z-70 text-gray-500">
        <div className="items-center grid-flow-col">
          <p>Copyright © {year}</p>
        </div> 
        <div>
          <p>Created by <a target="_blank" href="https://lunarisweb.pl/" className="underline" rel="noreferrer">Lunaris Web</a> - All right reserved</p>
        </div> 
      </section>
    </footer>

  )
}

export default Footer