import Grid from '../Grid/Grid'
import Row from '../Row/Row'
import Column from '../Column/Column'
import banner1 from '@/assets/image/banner1.png'
import banner2 from '@/assets/image/banner2.png'
import banner3 from '@/assets/image/banner3.png'
import ImgYoutube from '../../../assets/image/youtube-removebg-preview.png'
import { CustomButton } from '@/components/common/Button/CustomButton'
import SliderComponent from '@/components/common/Slider/SliderComponent'
import { Link } from 'react-router-dom'
import PostApi from '@/api/PostApi'
import { useEffect, useState } from 'react'
const CustomBanner = () => {
  const [randomPosts, setRandomPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await PostApi.getRandomPosts()
      setRandomPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <Grid
      gap={4}
      className="h-auto grid-cols-1 auto-rows-auto
             sm:grid-cols-2 sm:auto-rows-auto
             md:grid-cols-3 md:auto-rows-auto"
    >
      {/* Left Section */}
      <Grid
        gap={4}
        className="grid-cols-1 auto-rows-auto col-span-1 sm:m-0  row-span-1 h-full md:col-span-2 md:row-span-3
             sm:col-span-2 sm:row-span-3
             xs:col-span-1 xs:row-span-auto"
      >
        <div className="sm:col-span-3 sm:row-span-2 h-full shadow-sm rounded-2xl col-span-1 w-full flex">
          <SliderComponent
            slidesPerView={1}
            classImg={'w-full h-auto sm:h-full cursor-pointer'}
            arr={[banner1, banner2, banner3]}
          />
        </div>
        <Row className="rounded-2xl sm:col-span-3 py-0 sm:py-4 h-full shadow-sm bg-white sm:row-span-1 flex text-center">
          <CustomButton className="cursor-poiter ml-4 h-20 flex items-center border-l-0 border-t-0 border-b-0 bg-transparent flex-1 border-1 border-r-text">
            <div className="text-2xl text-black font-bold items-center  h-auto">
              <p className="pr-4">Giảm 30% Cho Bàn Trà - Khi Mua Kèm Sofa</p>
            </div>
          </CustomButton>
          <CustomButton className="cursor-poiter py-4 h-auto flex items-center border-l-0 border-t-0 border-b-0 bg-transparent flex-1 border-1 border-r-text">
            <div className="text-2xl text-text items-center h-auto">
              <p className="pr-4">Giảm Tới 20% Khi Mua 2 Chiếc Tủ Để Đồ Cho Bé</p>
            </div>
          </CustomButton>
          <CustomButton className="cursor-poiter py-4 h-auto flex items-center bg-transparent flex-1 mr-4">
            <div className="text-2xl text-text items-center  h-auto">
              <p className="pr-4">Giảm 13% bàn trà Giảm thêm 30% cho thảm</p>
            </div>
          </CustomButton>
        </Row>
      </Grid>

      {/* Middle Section */}
      <Column className=" md:mt-0 scroll-mx-10 sm:row-span-3 col-span-1 md:row-span-2 h-auto hidden sm:flex md:flex">
        <div className="w-full rounded-2xl shadow-sm bg-white flex-[1] flex items-center justify-center">
          <Link to={'/blogs'} className="text-left cursor-pointer h-full font-bold text-2xl flex justify-start ml-4 items-center w-full text-primary">
            Chia sẻ hôm nay
          </Link>
        </div>
        <div className="w-full shadow-sm rounded-2xl min-h-[140px] bg-white flex-2 flex flex-col">
          {randomPosts.map((post) => (
            <CustomButton key={post.id} className="h-[50%] flex p-4 text-left">
              <img
                sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                src={post.image} // Giả sử API trả về ảnh cho bài viết
                width={120}
                height={120}
                alt={post.title}
              />
              <span className="px-2 md:text-sm lg:text-2xl text-black">{post.title}</span>
            </CustomButton>
          ))}
        </div>
        <div className="w-full shadow-sm rounded-2xl bg-white flex-[1] flex items-center justify-center">
          <Link
            to={'/products'}
            className="cursor-pointer w-full h-full flex justify-center items-center text-2xl font-bold text-primary"
          >
            Xem thêm
          </Link>
        </div>
      </Column>

      {/* Right Section */}
      <Row className="rounded-2xl shadow-sm bg-white h-auto col-span-1 w-full hidden md:flex">
        <a className="flex cursor-pointer" href="#">
          <div className="flex-[1.5] flex items-center justify-center">
            <span className="md:text-xl md:ml-2 lg:m-0 lg:text-3xl text-center text-black font-bold">
              Hình ảnh hoạt động offline
            </span>
          </div>
          <div className="flex-[1] flex items-center justify-center">
            <img
              src={ImgYoutube}
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              width={120}
              height={120}
              alt=""
              className="bg-white"
            />
          </div>
        </a>
      </Row>
    </Grid>
  )
}

export default CustomBanner
