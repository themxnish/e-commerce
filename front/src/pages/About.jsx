import React from 'react'
import Title from '../components/Title'
import Reviews from '../components/Reviews'

const About = () => {
  return (
    <div className='pt-8 border-t border-gray-300'>
      <div className='text-2xl text-center pt-4'>
        <Title text1={"About"} text2={"Us"}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row-reverse gap-12'>
        <img src="https://www.fabricmill.com/media/mageplaza/blog/post/f/a/fabric_types.jpg" className='w-full md:w-2/4 h-[300px] object-cover hover:scale-103 transition' alt="Fabrics"/>
        <div className='flex flex-col gap-6 md:w-3/5 text-gray-700'>
        <p>
          At <b>Fabrics World</b>, we are dedicated to providing high-quality fabrics to designers, businesses, and creative minds. Our carefully curated selection features everything from luxurious silks and soft cottons to durable blends, ensuring the perfect material for any project. Whether you’re designing fashion, decorating interiors, or sourcing bulk fabrics, we prioritize craftsmanship and quality in every piece we offer.</p>
        
        <p>With a seamless shopping experience, secure transactions, and reliable shipping, fabric sourcing has never been easier. Our team is committed to helping you find the right textures, colors, and patterns to bring your creative vision to life. Explore our diverse collection and craft something truly unique with fabrics that inspire.</p>

        <div>
          <h3 className='text-lg font-semibold text-gray-800'>Our Mission</h3>
          <p>To empower designers, creators, and businesses by providing the highest-quality fabrics for their projects. We believe that the right fabric can transform ideas into remarkable creations, and we are committed to delivering the finest materials with unmatched craftsmanship.</p>
        </div>
        </div>
      </div>
      <Reviews/>
    </div>
  )
}

export default About
