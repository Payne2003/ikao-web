import BlogGrid from "@/components/common/Grid/BlogGrid/BlogGrid"
import PortGridOnBlog from "@/components/common/Grid/PostGrid/PortGridOnBlog"
const BlogsPage = () => {
  return (
    <section className="grid grid-rows-[auto_auto] w-full bg-gray-100">
        <BlogGrid />
        <PortGridOnBlog colGrid={2} initialLimit={3} layout="col" />
    </section>
  )
}

export default BlogsPage