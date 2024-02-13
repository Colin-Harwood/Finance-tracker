import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    

<footer className="footerAll shadow">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/logo-no-background.png" className="h-8" alt="Noctuque Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Noctuque</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="https://github.com/Colin-Harwood" className="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/colin-harwood-1b8704274/" className="hover:underline me-4 md:me-6">LinkedIn</a>
                </li>
                <li>
                    <a href="tel:27631274468" className="hover:underline me-4 md:me-6">+27 63 127 4468</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/#" className="hover:underline">Noctuque</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer