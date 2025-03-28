import { useEffect, useState } from 'react'
import Row from '../../Row/Row'
import BlogCard from '../../../display/Card/Blog/BlogCard'

const BlogGrid = () => {
  const [blogs, setBLogs] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/blogs')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch blogs')
        }
        return res.json()
      })
      .then((data) => {
        setBLogs(data)
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err)
      })
  }, [])

  return (
    <div className="max-w-[100%] hidden pb-20 sm:flex h-auto">
      <Row justify="between" className="flex-wrap">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} name={blog.name} />)
        ) : (
          <p>Loading blogs...</p>
        )}
      </Row>
    </div>
  )
}

export default BlogGrid
