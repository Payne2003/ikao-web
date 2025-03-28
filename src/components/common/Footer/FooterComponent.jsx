import Column from '@/components/common/Column/Column'
import Grid from '@/components/common/Grid/Grid'
import Row from '@/components/common/Row/Row'
import ImgLogo from '@/assets/image/logo.png'
import ImgLeft from '@/assets/image/icon-footer.png'
import ImgBanner from '@/assets/image/banner-products-giao-hang-6-tinh-2.png'
import ImgBirthday from '@/assets/image/qua-tang-sinh-nhat-gotrangtri-2022-4.png'
import ImgRight from '@/assets/image/icon-footer-2.png'

import ImgCoso from '@/assets/image/coso.png'
import ImgXuongSanXuat from '@/assets/image/xuongsanxuat.png'
import ImgNhanvien from '@/assets/image/nhanvien.png'
import ImgDonhang from '@/assets/image/donhang.png'
import { FaAngleDown, FaComment, FaWhatsapp } from 'react-icons/fa'
import { CustomButton } from '@/components/common/Button/CustomButton'
import LocationCard from '@/components/display/Card/LocationCard/LocationCard'
import { Link } from 'react-router-dom'
const FooterComponent = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Cuộn lên đầu trang với hiệu ứng mượt
  }

  return (
    <Grid cols={2} rows={2} className="mt-20 w-full flex flex-wrap flex-col h-auto" gap={0}>
      <Row justify="start" align="center" className="col-span-2 py-20 hidden sm:flex row-span-1">
        {/* Phần mô tả */}
        <Column
          justify="between"
          className=" w-full text-3xl flex flex-row justify-between items-center px-6 container "
        >
          <div className="flex flex-col items-center">
            <img
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              width={30}
              height={30}
              src={ImgCoso}
              alt=""
            />
            <span>Cửa hàng tại HN & HCM</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              width={30}
              height={30}
              src={ImgXuongSanXuat}
              alt=""
            />
            <span>Xưởng sản xuất tại HN & HCM</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              width={58}
              height={58}
              src={ImgNhanvien}
              alt=""
            />
            <span>Nhân viên phục khách hàng</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              width={58}
              height={58}
              src={ImgDonhang}
              alt=""
            />
            <span>Đơn hàng hoàn thành mỗi tháng</span>
          </div>
        </Column>
      </Row>
      <Row
        justify="between"
        align="center"
        gap={0}
        className="col-span-2 container h-auto hidden sm:flex flex-col row-span-1 bg-transparent text-white "
      >
        <div className="w-auto ml-10 h-full justify-center items-center">
          <img
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            src={ImgBirthday}
            width={'100%'}
            height={'100%'}
            alt="banner"
          />
        </div>
        <div id='location' className="w-full flex justify-between py-20">
          <LocationCard className="w-[40%]" Icon="flex" />
          <LocationCard className="w-[40%]" Icon="flex" />
        </div>
      </Row>
      <Row className="col-span-2 hidden sm:flex row-span-1">
        {/* Phần mô tả */}
        <Column className="items-center px-6 container ">
          <Link to={'/#'} onClick={handleScrollToTop}>
            <img
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              src={ImgLogo}
              alt="Logo"
              width={300}
              height={300}
              className='shadow-sm rounded-xl'
            />
          </Link>
          <h2 className="text-6xl leading-40 font-bold ">MAY ĐO NỘI THẤT</h2>
          <p className="max-w-5xl text-2xl py-10 w-full text-center text-text mt-2">
            Chúng tôi khơi nguồn cảm hứng sáng tạo từ những bộ sưu tập nội thất với hơn 7000+ sản
            phẩm đầy đủ màu sắc, sống động. Hiểu rằng mỗi không gian sống cần giải pháp riêng, vì
            vậy chúng tôi mang đến dịch vụ tùy chỉnh kích thước, màu sắc theo yêu cầu để phù hợp với
            mỗi gia đình. Bằng sự linh hoạt trong thiết kế, Ikao trao đến bạn chiếc “chìa khóa vạn
            năng” để mở ra không gian sống, làm việc theo đam mê và sáng tạo của riêng mình.
          </p>
        </Column>
      </Row>
      <Row
        justify="between"
        align="center"
        className="col-span-2 hidden sm:flex row-span-1 bg-primary text-white "
      >
        <div className="ml-5 flex flex-col gap-1 flex-1 h-auto ">
          <p className="text-2xl pt-6 ">
            Kênh <span className="font-bold">ikao.vn</span> thuộc Công ty cổ phần SUNVINA Việt Nam
          </p>
          <p className="text-2xl py-6 ">
            Giấy phép kinh doanh số: 0107728779 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày
            20/02/2017
          </p>
        </div>
        <div className="mr-5 flex flex-row gap-5 h-auto ">
          <img
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            src={ImgLeft}
            alt="Sunvina"
            width={130}
            height={130}
          />
          <img
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            src={ImgRight}
            alt="Sunvina"
            width={130}
            height={130}
          />
        </div>
      </Row>

      <Row
        justify="between"
        align="center"
        gap={0}
        className="col-span-2 h-auto flex flex-col sm:hidden row-span-1 bg-primary text-white "
      >
        <div className="w-full">
          <div className=" flex flex-col h-auto w-full">
            <div className="flex flex-row">
              <div className="active:bg-hover pl-5 w-full h-auto flex justify-center items-center">
                <FaAngleDown size={20} className="text-left text-black rounded-[50%] bg-white" />
                <CustomButton className=" w-full py-6 h-full text-white text-3xl">
                  Hà Nội
                </CustomButton>
              </div>
              <div className="active:bg-hover pl-5 w-full h-full flex justify-center items-center">
                <FaAngleDown size={20} className="text-left text-black rounded-[50%] bg-white" />
                <CustomButton className="w-full py-6 h-auto text-white text-3xl">
                  Hồ chí minh
                </CustomButton>
              </div>
            </div>
            <div className=" px-2 w-full h-full flex justify-center items-center">
              <img
                sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                src={ImgBanner}
                width={"100%"}
                height={"100%"}
                alt="banner"
              />
            </div>
          </div>
        </div>
        <LocationCard className="w-full bg-white" Icon="hidden" />
        <LocationCard className="w-full bg-white" Icon="hidden" />
        <LocationCard className="w-full bg-white" Icon="hidden" />
        <LocationCard className="w-full bg-white" Icon="hidden" />
      </Row>
      <Row
        justify="center"
        align="start"
        className="col-span-2 flex flex-col sm:hidden row-span-1 bg-white text-black "
      >
        <div className="ml-5 flex flex-col gap-1 h-auto ">
          <div className="flex flex-row text-2xl mx-5 pt-6 items-center ">
            <FaComment size={30} />
            <span className=" ml-4 text-6xl">Góp ý, khiếu nại</span>
          </div>
          <p className="mx-5 text-3xl py-8 ">
            Tiếp nhận và trả lời thông tin giao hàng, lịch trả hàng, tiến độ thi công, thái độ phục
            vụ của nhân viên
          </p>
        </div>
        <div className="mx-5 flex flex-row gap-1 items-center ">
          <FaWhatsapp className="ml-5" size={26} />
          <span className="mx-5 text-5xl font-bold text-button">0395757650</span>
        </div>
        <div className="mx-10 my-10 flex flex-row flex-wrap gap-5 h-auto ">
          <CustomButton className="rounded-4xl text-3xl px-8 py-2 h-auto border-1 w-auto border-text">
            Giới thiệu
          </CustomButton>
          <CustomButton className="rounded-4xl text-3xl px-8 py-2 h-auto border-1 w-auto border-text">
            Vinh danh báo chí
          </CustomButton>
          <CustomButton className="rounded-4xl text-3xl px-8 py-2 h-auto border-1 w-auto border-text">
            Tiêu chuẩn chất lượng
          </CustomButton>
          <CustomButton className="rounded-4xl text-3xl px-8 py-2 h-auto border-1 w-auto border-text">
            Quy định giao hàng
          </CustomButton>
          <CustomButton className="rounded-4xl text-3xl px-8 py-2 h-auto border-1 w-auto border-text">
            Câu hỏi thường gặp
          </CustomButton>
          <CustomButton className="rounded-4xl text-3xl px-8 py-2 h-auto border-1 w-auto border-text">
            Hướng dẫn mua hàng
          </CustomButton>
        </div>
      </Row>
      <Row
        justify="between"
        align="center"
        className="col-span-2 sm:hidden row-span-1 bg-primary text-white "
      >
        <div className="flex flex-col items-center w-full gap-1 h-auto ">
          <p className="text-2xl pt-6 ">© 2015~2024 một thương hiệu thuộc</p>
          <p className="text-2xl py-6 ">Công ty cổ phần IKAO Việt Nam</p>
        </div>
      </Row>
    </Grid>
  )
}

export default FooterComponent
