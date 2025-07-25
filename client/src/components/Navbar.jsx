import { Menu, School } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import { Button } from './ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import DarkMode from '@/DarkMode'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { Separator } from './ui/separator'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const logoutHandler = async () => {
    await logoutUser()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logged out.")
      navigate("/login")
    }
  }, [isSuccess])

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 py-4 px-6">
        <div className="flex items-center gap-2">
          <School size={30} />
          <Link to="/"><h1 className="hidden md:block font-extrabold text-2xl">Study-Sync</h1></Link>
        </div>

        <div className="flex items-center gap-8 relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <Avatar
                onClick={() => setDropdownOpen(prev => !prev)}
                className="cursor-pointer"
              >
                <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-[9999]">
                  <div className="px-4 py-2 text-sm font-semibold border-b dark:border-gray-700">
                    My Account
                  </div>
                  <ul className="text-sm py-1">
                    <li>
                      <Link to="/my-learning" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        My Learning
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Log Out
                      </button>
                    </li>
                    <Separator className="my-4" />
                    {user?.role === "instructor" && (
                      <li>
                        <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                          Dashboard
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      <div className="flex md:hidden items-center justify-between px-4 py-4">
        <h1 className="font-extrabold text-2xl">Study_Sync</h1>
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Navbar

const MobileNavbar = () => {
  const { user } = useSelector((store) => store.auth);
  const role = user?.role;
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
    setMenuOpen(false);
    navigate("/");
  };
  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="p-2 rounded-full border dark:border-gray-700 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu />
      </button>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-3/4 h-full bg-white dark:bg-[#020817] shadow-lg z-50 flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold">Study_Sync</h2>
            <DarkMode />
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4 text-sm">
            <Link
              to="/my-learning"
              onClick={() => setMenuOpen(false)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded"
            >
              My Learning
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded"
            >
              Edit Profile
            </Link>
            <button
              onClick={logoutHandler}
              className="text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded"
            >
              Log Out
            </button>
          </nav>

          {/* Divider */}
          <div className="my-4 border-t dark:border-gray-700" />

          {/* Dashboard for instructors */}
          {role === "instructor" && (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/admin/dashboard");
              }}
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Dashboard
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 left-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
