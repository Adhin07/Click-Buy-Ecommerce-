import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalcardProduct'


const Home = () => {
  return (
    <div>
    <CategoryList/>
    <BannerProduct/>
    <HorizontalCardProduct category={'airpodes'} heading={'Top Airpodes'}/>
    <HorizontalCardProduct category={'watches'} heading={'Popular Watches'}/>
    <VerticalCardProduct category={'mobiles'} heading={'Mobiles'}/>
    <VerticalCardProduct category={'mouse'} heading={'Mouses'}/>
    <VerticalCardProduct category={'televisions'} heading={'Television'}/>
    <VerticalCardProduct category={'camera'} heading={'Camera and photograph'}/> 
    <VerticalCardProduct category={'earphones'} heading={'Earphone'}/>
    <VerticalCardProduct category={'speakers'} heading={' Blurtooth Speaker'}/> 
    <VerticalCardProduct category={'refrigerator'} heading={'Refrigerator'}/>
    <VerticalCardProduct category={'trimmers'} heading={'Trimmers'}/>
    </div>
  )
}

export default Home
