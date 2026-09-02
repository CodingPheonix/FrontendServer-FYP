import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-5 left-0 right-0 mx-auto
        w-[97%] md:w-[83%] px-6 py-3
        flex justify-between items-center
       bg-white/10 backdrop-blur-xl border border-white/20
        rounded-full  shadow-xl z-50 ">


      {/* Logo / Website Name */}
      <NavLink
        to="/"
        className="text-2xl font-bold text-green-600"
      >
        PhytoScan
      </NavLink>

      {/* Navigation Links */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">

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

      {/* Right Side */}
      <div className="flex items-center gap-6">

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
          className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-200"
        >
          Signup
        </NavLink>

      </div>

    </nav >
  )
}

export default Navbar