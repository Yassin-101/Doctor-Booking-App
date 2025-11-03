import React, { useState, useRef, useLayoutEffect } from 'react'
import logo from '../assets/logo.png'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const [navHeight, setNavHeight] = useState(0)
  const [token, SetToken] = useState(true)
  const [showMenu, setShowMeu] = useState(false)

  const isHomePage = location.pathname === '/'

  // Measure navbar height for spacing on non-home pages
  useLayoutEffect(() => {
    if (!navRef.current) return
    const measure = () => {
      const h = Math.ceil(navRef.current.getBoundingClientRect().height)
      setNavHeight(h)
      document.documentElement.style.setProperty('--navbar-height', `${h}px`)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [location.pathname])

  return (
    <>
      <header
        ref={navRef}
        className={`absolute top-0 left-0 w-full z-50 transition-all duration-300
          ${isHomePage ? 'bg-transparent border-none text-white' : 'bg-[#18528f] border-b border-b-gray-600 text-white'}
        `}
      >
        <div className="flex items-center justify-between text-sm py-4 px-4 sm:px-[10%]">
          {/* Logo */}
          <img
            className="w-28 cursor-pointer"
            src={logo}
            alt="Logo"
            onClick={() => navigate('/')}
          />

          {/* Menu */}
          <ul className="hidden md:flex items-center gap-6 font-medium text-xl">
            <li><NavLink to="/" className="py-1 font-bold">HOME</NavLink></li>
            <li><NavLink to="/doctors" className="py-1 font-bold">ALL DOCTORS</NavLink></li>
            <li><NavLink to="/about" className="py-1 font-bold">ABOUT</NavLink></li>
            <li><NavLink to="/contact" className="py-1 font-bold">CONTACT</NavLink></li>
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img className="w-12 rounded-full" src={assets.profile_pic} alt="profile" />
                  <img className="w-4" src={assets.dropdown_icon} alt="dropdown" />
                </div>
                <div className="hidden group-hover:block absolute right-0 mt-1 z-60">
                  <div className="min-w-[180px] bg-stone-100 rounded flex flex-col gap-2 p-3 text-gray-800 shadow-lg cursor-pointer">
                    <button onClick={() => navigate('my-profile')} className="text-left cursor-pointer hover:text-black hover:font-semibold">My Profile</button>
                    <button onClick={() => navigate('my-appointments')} className="text-left cursor-pointer hover:text-black hover:font-semibold">My Appointments</button>
                    <button onClick={() => SetToken(false)} className="text-left cursor-pointer hover:text-black hover:font-semibold">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-blue-500 px-6 py-2 cursor-pointer rounded-full text-lg hidden md:inline-block"
              >
                Create Account
              </button>
            )}

            <img onClick={() => setShowMeu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/* mobile menu */}
            <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 bottom-0 top-0 z-20 overflow-hidden bg-white transition-all`}>
              <div className='flex items-center justify-between px-5 py-6'>
                <img onClick={() => navigate('/')} className='w-28' src={logo} />
                <img className='w-7' onClick={() => setShowMeu(false)} src={assets.cross_icon} alt="" />
              </div>
              <ul className='text-black flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                <NavLink  onClick={() => setShowMeu(false)} to={'/'}><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                <NavLink  onClick={() => setShowMeu(false)} to={'/doctors'}><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                <NavLink  onClick={() => setShowMeu(false)} to={'/about'}><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                <NavLink  onClick={() => setShowMeu(false)} to={'/contact'}><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer only on non-home pages */}
      {!isHomePage && <div style={{ height: navHeight }} aria-hidden="true" />}
    </>
  )
}

export default Navbar
