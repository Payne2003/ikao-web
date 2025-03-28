import { CustomButton } from '@/components/common/Button/CustomButton'
import clsx from 'clsx'
import { FaLocationDot } from 'react-icons/fa6'
import { FcShipped, FcSms } from 'react-icons/fc'
// eslint-disable-next-line react/prop-types
const LocationCard = ({ Icon = 'hidden', className = ' ' }) =>
  // {phone, name, location, openHours }
  {
    return (
      <div
        className={clsx(
          `${className} text-black cursor-pointer h-auto  flex flex-row justify-between`
        )}
      >
        <div className={clsx('ml-5 py-4 h-full flex-1 flex flex-col justify-between items-start')}>
          <h1 className="text-3xl mb-4 flex sm:text-4xl gap-2 md:text-4xl font-bold">
            <div className={Icon}>
              <FaLocationDot size={20} />
            </div>
            Cửa Hàng HN
            {/* {name} */}
          </h1>
          <div className='sm:flex flex-col hidden'>
            <p className="font-medium text-2xl"><span className='font-bold'>Cửa hàng: </span>137 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
            <p className="text-2xl "><span className='font-bold'>Xưởng sản xuất: </span>KCN Phú Minh, Bắc Từ Liêm, Hà Nội </p>
          </div>
          <div className='flex flex-col sm:hidden'>
            <p className="font-medium text-2xl">137 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
            <p className="text-2xl">Điện thoại: 089-9189-455</p>
            <p className="text-2xl"> Mở cửa: 8h đến 19h từ thứ 2 - CN</p>
          </div>
        </div>
        <div
          className={clsx(
            'py-4 h-full flex-1 sm:hidden flex flex-col justify-between items-end mr-5 gap-10'
          )}
        >
          <div className="flex flex-row w-auto h-auto gap-4">
            <CustomButton className="text-white bg-primary text-3xl h-auto py-2 rounded-4xl w-auto px-4">
              Gọi điện
            </CustomButton>
            <CustomButton className="text-white bg-primary text-3xl h-auto py-2 rounded-4xl w-auto px-4">
              Chỉ đường
            </CustomButton>
          </div>
          <div className="flex flex-1 flex-row w-auto h-7">
            <FcShipped className="" size={30} />
            <FcSms className="" size={30} />
          </div>
        </div>
      </div>
    )
  }

export default LocationCard
