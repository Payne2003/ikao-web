import Grid from '@/components/common/Grid/Grid'
import PostCard from '@/components/display/Card/PostCard/PostCard'
import { useEffect, useState } from 'react'
import ImgPost from '@/assets/image/chuan-768x320.jpg'
import { CustomButton } from '@/components/common/Button/CustomButton'
// eslint-disable-next-line react/prop-types
const PortGridOnBlog = ({ initialLimit = 2, colGrid = 3, layout = '' }) => {
  const [posts, setPosts] = useState([])
  const [visibleCount, setVisibleCount] = useState(initialLimit) // Số lượng sản phẩm hiển thị

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch posts')
        }
        return res.json()
      })
      .then((data) => {
        setPosts(data)
      })
      .catch((err) => {
        console.error('Error fetching posts:', err)
      })
  }, [])
  // Hàm xử lý khi bấm "Hiển thị thêm" hoặc "Thu gọn"
  const toggleProductView = () => {
    if (visibleCount >= posts.length) {
      setVisibleCount(initialLimit) // Thu gọn về số lượng ban đầu
    } else {
      setVisibleCount((prev) => Math.min(prev + 3, posts.length)) // Hiển thị thêm sản phẩm
    }
  }
  return (
    <div className="container h-auto">
      <Grid cols={colGrid} className="pb-20 sm:grid-cols-3 gap-4 sm:gap-10">
        {/* {posts.slice(0, initialLimit).map((post) => (
          <PostCard
            layout={layout}
            heading={post.title}
            date={post.updated_at}
            name={post.blogs.length > 0 ? post.blogs[0].name : 'Blog'}
            description={post.content}
            src={ImgPost}
            key={post.id}
          />
        ))} */}
        {posts.slice(0, visibleCount).map((post) => (
          <PostCard
            key={post.id}
            layout={layout}
            heading={post.title}
            date={post.updated_at}
            name={post.blogs.length > 0 ? post.blogs[0].name : 'Blog'}
            description={post.content}
            src={ImgPost}
          />
        ))}
      </Grid>
      {/* Nút hiển thị thêm / thu gọn */}
      <div className="flex justify-center mt-6">
        <CustomButton
          onClick={toggleProductView}
          className="px-10 py-4 border-2 cursor-pointer text-2xl border-primary bg-transparent text-primary hover:bg-primary hover:text-white rounded-4xl transition-all"
        >
          {visibleCount >= posts.length ? 'Thu gọn' : 'Hiển thị thêm'}
        </CustomButton>
      </div>
    </div>
  )
}

export default PortGridOnBlog
