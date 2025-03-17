import React from 'react'
import Banner from '../components/Banner'
import NewCollection from '../components/NewCollection'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import Reviews from '../components/Reviews'

const Home = () => {
  return (
    <div>
      <Banner/>
      <NewCollection/>
      <BestSeller/>
      <Policy/>
      <Reviews/>
    </div>
  )
}

export default Home
