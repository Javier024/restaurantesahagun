import { HeroSection } from '../components/home/Hero'
import ProductsSlider from '../components/home/ProductsSlider'
import menuData from '../mockData/mock_data.json'

const Home = () => {
  return (
    <>
      <HeroSection />
      <ProductsSlider productsData={menuData.slice(0, 7)} title='Explora nuestro menú' seeMore />
    </>
  )
}

export default Home
