import { CustomButton } from '@/components/common/Button/CustomButton'
import InputComponent from '@/components/common/Input/InputComponent'
import Pagination from '@/components/common/Panigation/Pagination'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { MdAddCircleOutline } from 'react-icons/md'

const ListDirectory = () => {
  const [loadingSearch, setLoadingSearch] = useState(false)
  const handleLoadingSearchClick = () => {
    setLoadingSearch(true)
    setTimeout(() => setLoadingSearch(false), 2000)
  }
  return (
    <div className="w-full h-full flex justify-between flex-col items-center">
      <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 auto-rows-auto">
        <div className="col-span-1 p-4 sm:col-span-2 flex items-center justify-between">
          <div className="text-4xl font-bold ">Danh sách ngành hàng</div>
          <Tooltip title="Thêm mới ngành hàng" color={'hover'} key={'white'}>
            <div className="bg-gray-100 w-20 h-20 hover:bg-hover hover:text-white rounded-2xl flex justify-center items-center">
              <MdAddCircleOutline />
            </div>
          </Tooltip>
        </div>
        <div className="col-span-1 p-4 sm:col-span-2 flex flex-col items-start justify-between gap-4">
          <div className="w-auto hidden sm:flex relative rounded-full shadow-2xl items-start">
            <InputComponent
              classInput={
                'text-text shadow-sm h-full sm:w-180 w-[100%] pr-[18%] flex justify-start rounded-full pl-6 pb-4.5 p-4 border-1 border-gray-300 outline-none'
              }
              type="search"
              placeholder={'Tìm kiếm'}
              validate={''}
            />
            <CustomButton
              type="submit"
              className="bg-[#001529] px-10 cursor-pointer absolute text-white rounded-l-0 right-0 h-full flex  rounded-tr-full rounded-br-full  items-center"
              isLoading={loadingSearch}
              onClick={handleLoadingSearchClick}
              leftIcon={<CiSearch size={20} />}
            ></CustomButton>
          </div>
        </div>
        <div className="col-span-1 p-4 sm:col-span-2 h-auto flex flex-col items-start justify-between gap-4">
          <div className="overflow-auto w-full rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-20 p-6 text-2xl font-semibold tracking-wide text-left">No.</th>
                  <th className="p-6 text-2xl font-semibold tracking-wide text-left">Details</th>
                  <th className="w-24 p-6 text-2xl font-semibold tracking-wide text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-white">
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-bold text-blue-500 hover:underline">
                      10001
                    </a>
                  </td>
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    Kring New Fit office chair, mesh + PU, black
                  </td>
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-bold text-blue-500 hover:underline">
                      10002
                    </a>
                  </td>
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    Kring New Fit office chair, mesh + PU, black
                  </td>
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                      Shipped
                    </span>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    <a href="#" className="font-bold text-blue-500 hover:underline">
                      10002
                    </a>
                  </td>
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    Kring New Fit office chair, mesh + PU, black
                  </td>
                  <td className="p-6 text-xl text-gray-700 whitespace-nowrap">
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
                      Cancelled
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid  w-full grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            <div className="bg-white space-y-3 w-full p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2 text-xl">
                <div>
                  <a href="#" className="text-blue-500 font-bold hover:underline">
                    #1000
                  </a>
                </div>
                <div>
                  <span className="p-1.5 text-sm font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    Delivered
                  </span>
                </div>
              </div>
              <div className="text-xl text-gray-700">
                Kring New Fit office chair, mesh + PU, black
              </div>
            </div>
            <div className="bg-white w-full space-y-3 p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2 text-xl">
                <div>
                  <a href="#" className="text-blue-500 font-bold hover:underline">
                    #1001
                  </a>
                </div>
                <div>
                  <span className="p-1.5 text-sm font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                    Shipped
                  </span>
                </div>
              </div>
              <div className="text-xl text-gray-700">
                Kring New Fit office chair, mesh + PU, black
              </div>
            </div>
            <div className="bg-white  w-full space-y-3 p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2 text-xl">
                <div>
                  <a href="#" className="text-blue-500 font-bold hover:underline">
                    #1002
                  </a>
                </div>
                <div>
                  <span className="p-1.5 text-sm font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
                    Canceled
                  </span>
                </div>
              </div>
              <div className="text-xl text-gray-700">
                Kring New Fit office chair, mesh + PU, black
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination totalPages={6} onPageChange={3} />
    </div>
  )
}

export default ListDirectory
