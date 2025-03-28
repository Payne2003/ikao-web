import { CustomButton } from "@/components/common/Button/CustomButton"
import { DirectoryComponent } from "@/components/common/Directory/DirectoryComponent"
import CategoryByDirectory from "@/components/common/Grid/CategoryByDirectoryGrid/CategoryByDirectory"
import { FaAngleDown } from "react-icons/fa"

const DirectoryMobile = () => {
  return (
    <div className="mt-53 mx-5 bg-white h-full flex flex-row">
        <DirectoryComponent className="w-[780px]" />
        <div className="flex flex-col">
            <CustomButton className="flex ml-8 py-8 text-3xl justify-between items-center" rightIcon={<FaAngleDown  size={20} />}  >
                May đo theo yêu cầu
            </CustomButton>
            <CategoryByDirectory sizeImg={"w-22 mt-10"}  />
        </div>
    </div>
  )
}

export default DirectoryMobile