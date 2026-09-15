import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-5 left-0 right-0 mx-auto
        w-[97%] md:w-[83%] px-6 py-3
        flex justify-between items-center
        bg-white/10 backdrop-blur-xl 
      
        rounded-full shadow-xl z-50">

      {/* Logo / Website Name */}
      <NavLink
        to="/"
        className="text-2xl font-bold text-green-600"
      >
        PhytoScan
      </NavLink>

      {/* Hamburger Icon (Mobile) */}
      <button 
        className="md:hidden text-white hover:text-green-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative py-2 font-medium transition-colors duration-200 ${isActive
              ? 'text-green-600 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-green-600'
              : 'text-white hover:text-green-600'
            }`
          }
        >
          Home
        </NavLink>

        {/* Store */}
        <NavLink
          to="/store"
          className={({ isActive }) =>
            `relative py-2 font-medium transition-colors duration-200 ${isActive
              ? 'text-green-600 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-green-600'
              : 'text-white hover:text-green-600'
            }`
          }
        >
          Store
        </NavLink>

        {/* PlantScan */}
        <NavLink
          to="/agent"
          className={({ isActive }) =>
            `relative py-2 font-medium transition-colors duration-200 ${isActive
              ? 'text-green-600 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-green-600'
              : 'text-white hover:text-green-600'
            }`
          }
        >
          PlantScan
        </NavLink>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `font-medium transition-colors duration-200 ${isActive
              ? 'text-green-600'
              : 'text-white hover:text-green-600'
            }`
          }
        >
          Login
        </NavLink>

        {/* Signup */}
        <NavLink
          to="/signup"
          className="px-5 py-2 rounded-3xl bg-[#42d369] text-white font-medium hover:bg-green-700 transition-colors duration-200"
        >
          Signup
        </NavLink>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-[120%] left-0 right-0 md:hidden flex flex-col items-center bg-black/80 backdrop-blur-xl rounded-2xl py-4 gap-4 shadow-xl border border-white/10">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `font-medium transition-colors duration-200 ${isActive ? 'text-green-600' : 'text-white hover:text-green-600'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/store"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `font-medium transition-colors duration-200 ${isActive ? 'text-green-600' : 'text-white hover:text-green-600'}`
            }
          >
            Store
          </NavLink>
          <NavLink
            to="/agent"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `font-medium transition-colors duration-200 ${isActive ? 'text-green-600' : 'text-white hover:text-green-600'}`
            }
          >
            PlantScan
          </NavLink>
          <div className="h-[1px] w-3/4 bg-white/20 my-2"></div>
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `font-medium transition-colors duration-200 ${isActive ? 'text-green-600' : 'text-white hover:text-green-600'}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 rounded-3xl bg-[#42d369] text-white font-medium hover:bg-green-700 transition-colors duration-200"
          >
            Signup
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar