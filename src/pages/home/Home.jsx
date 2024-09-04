import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import LoadingComponent from '../LoadingComponent/LoadingComponent'

const Home = () => {
  return (
    <LoadingComponent>
      <Layout>
        <HeroSection/>
        <Filter/>
        <ProductCard/>
        <Track/>
        <Testimonial/>
      </Layout>
    </LoadingComponent>
  )
}

export default Home
