import React, { useState } from 'react'
import upload from '../assets/upload.png'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [ image1, setImage1 ] = useState(false)
  const [ image2, setImage2 ] = useState(false)
  const [ image3, setImage3 ] = useState(false)
  const [ image4, setImage4 ] = useState(false)

  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ price, setPrice ] = useState("")
  const [ category, setCategory ] = useState("Men")
  const [ subCategory, setSubCategory ] = useState("Top")
  const [ stock, setStock ] = useState("")
  const [ details, setDetails ] = useState("")
  const [ bestseller, setBestseller ] = useState(false)
  const [ sizes, setSizes ] = useState([])

  const [ uploading, setUploading ] = useState(false)
  const formIsValid = name && description && price && stock && details;

  const resetForm = () => {
          setName(""); setDescription(""); setPrice("");
          setCategory("Men"); setSubCategory("Top");
          setStock(""); setDetails(""); setBestseller(false);
          setSizes([]); setImage1(false); setImage2(false);
          setImage3(false); setImage4(false);
        }

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!formIsValid) {
      toast.error("Please fill all the fields");
      return;
    }
    setUploading(true)
    try{
      const formdata = new FormData()

      formdata.append("name", name)
      formdata.append("description", description)
      formdata.append("price", Number(price))
      formdata.append("category", category)
      formdata.append("sub_category", subCategory)
      formdata.append("stock", stock)
      formdata.append("details", details)
      formdata.append("bestseller", bestseller)
      formdata.append("sizes", JSON.stringify(sizes))

      image1 && formdata.append("image1", image1)
      image2 && formdata.append("image2", image2)
      image3 && formdata.append("image3", image3)
      image4 && formdata.append("image4", image4)

      const response = await axios.post(backendUrl + '/api/product/add', formdata, { headers: {token}});
      if(response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {toast.error(response.data.message);}
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='p-4 max-w-4xl mx-auto'>
      <div className='flex flex-col w-full items-start gap-4'>
        <p className='text-2xl font-semibold mb-2'>Add New Product</p>

        {uploading && 
          <p className='text-lg font-medium bg-gray-200 p-10 rounded-sm'>
            Uploading
            <span className='dot bounce'>.</span>
            <span className='dot bounce delay-200'>.</span>
            <span className='dot bounce delay-400'>.</span>
          </p>
        }
        <div>
          <p className='text-lg font-medium mb-2'>Upload Image</p>
          <div className='grid grid-cols-2 gap-2 sm:flex'>
            <label htmlFor="image1" className='cursor-pointer hover:opacity-80'>
              <img src={image1 ? URL.createObjectURL(image1) : upload}  className='w-28 h-28 object-cover border-2 border-dashed border-gray-400' alt="" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2" className='cursor-pointer hover:opacity-80'>
              <img src={image2 ? URL.createObjectURL(image2) : upload} className='w-28 h-28 object-cover border-2 border-dashed border-gray-400' alt="" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3" className='cursor-pointer hover:opacity-80'>
              <img src={image3 ? URL.createObjectURL(image3) : upload} className='w-28 h-28 object-cover border-2 border-dashed border-gray-400' alt="" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4" className='cursor-pointer hover:opacity-80'>
              <img src={image4 ? URL.createObjectURL(image4) : upload} className='w-28 h-28 object-cover border-2 border-dashed border-gray-400' alt="" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='text-lg font-medium'>Product Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-400 rounded-sm w-full px-3 py-2 mt-1 outline-none' type="text" placeholder='Enter product name' required />
        </div>
        <div className='w-full'>
          <p className='text-lg font-medium'>Short Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='border border-gray-400 rounded-sm w-full px-3 py-2 mt-1 outline-none' type="text" placeholder='Write a short description' required />
        </div>

        <div className='flex flex-col sm:flex-row gap-4 w-full'>
          <div className='w-full'>
            <label htmlFor="category" className='text-lg font-medium'>Category</label>
            <select onChange={(e) => setCategory(e.target.value)}  id="category" className='border border-gray-400 rounded-sm w-full px-3 py-2 mt-1 outline-none' required>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className='w-full'>
            <label htmlFor="subcategory" className='text-lg font-medium'>Subcategory</label>
            <select onChange={(e) => setSubCategory(e.target.value)} id="subcategory" className="border border-gray-400 rounded-sm w-full px-3 py-2 mt-1 outline-none" required>
              <optgroup label="Men">
                <option value="Tshirts">T-Shirts</option>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
              </optgroup>
              <optgroup label="Women">
                <option value="Tops">Tops</option>
                <option value="Dresses">Dresses</option>
                <option value="Kurtis">Kurtis</option>
              </optgroup>
              <optgroup label="Kids">
                <option value="Shorts">Shorts</option>
                <option value="Nightwear">Night wear</option>
                <option value="Ethnic">Ethnic Wear</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 w-full'>
          <div className='w-full'>
            <p className='text-lg font-medium'>Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} min={0} className='border border-gray-400 rounded-sm w-full px-3 py-2 mt-1 outline-none' type="number" placeholder='Enter price' required />
          </div>
          <div className='w-full'>
            <p className='text-lg font-medium'>Stock</p>
            <input onChange={(e) => setStock(e.target.value)} value={stock} min={0} max={30} className='border border-gray-400 rounded-sm w-full px-3 py-2 mt-1 outline-none' type="number" placeholder='Available stock' required />
          </div>
        </div>

        <div>
          <p className='text-lg font-medium'>Available Product Sizes</p>
          <div className='flex gap-3'>
            {['S', 'M', 'L', 'XL'].map((size) => (
              <p key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])} className={`px-3 py-1 mt-1 rounded-sm cursor-pointer ${sizes.includes(size) ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}>{size}</p>
            ))}
          </div>
        </div>

        <div className='w-full'>
          <label htmlFor="details" className='text-lg font-medium'>Product Details</label>
          <textarea onChange={(e) => setDetails(e.target.value)} value={details} id="details" className='h-32 border border-gray-400 rounded-sm w-full px-3 py-2 mt-1 outline-none' type="text" placeholder='Provide detailed information about the product' required />
        </div>

        <div className='flex items-center gap-1'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
          <label className='text-sm cursor-pointer' htmlFor="bestseller">Mark as bestseller</label>
        </div>
        
        <button type="submit" disabled={!formIsValid}className={`bg-black text-white px-4 py-2 mt-4 rounded-sm cursor-pointer ${!formIsValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}>Add product</button>
      </div>
    </form>
  )
}

export default Add
