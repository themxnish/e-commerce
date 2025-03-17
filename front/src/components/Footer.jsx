import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='py-10 text-gray-700'>
        <div className='container mx-auto px-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 my-10 mt-20 text-sm'>
                <div>
                    <p className='text-xl font-semibold mb-4'>Fabrics World</p>
                    <p className='text-gray-600'>'Explore a wide range of premium products at unbeatable prices. We are committed to quality, convenience, and customer satisfaction—because you deserve the best shopping experience'</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-4'>Company</p>
                    <ul className='space-y-2 text-gray-600'>
                        <li><Link to="/" className='hover:text-black'>Home</Link></li>
                        <li><Link to="/about" className='hover:text-black'>About Us</Link></li>
                        <li><Link to="/contact" className='hover:text-black'>Contact</Link></li>
                        <li><Link to="/privacy-policy" className='hover:text-black'>Privacy Policy</Link></li>
                        <li><Link to="/terms" className='hover:text-black'>Terms & Conditions</Link></li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-4">Follow us</p>
                    <div className="flex space-x-4">
                    <a href="https://facebook.com" className="hover:text-blue-500"><FaFacebook size={22} /></a>
                    <a href="https://instagram.com" className="hover:text-pink-500"><FaInstagram size={22} /></a>
                    <a href="https://twitter.com" className="hover:text-blue-400"><FaTwitter size={22} /></a>
                    </div>
                </div>

                <div>
                    <p className='text-xl font-medium mb-4'>Contact us</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Address: 123 Main Street, Pune, India</li>
                        <li>Phone: +91 1234567890</li>
                        <li>Email: fabricsworld@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div className='w-full mt-10'> 
                <hr className='border-gray-400' />
                <p className='py-5 text-center text-gray-600 text-sm font-semibold'>© {new Date().getFullYear()} Fabrics World. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
