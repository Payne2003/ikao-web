import { useEffect, useState } from "react"
import PostCard from "../../../display/Card/PostCard/PostCard"
import Grid from "../Grid"
import ImgPost from '../../../../assets/image/chuan-768x320.jpg'
// eslint-disable-next-line react/prop-types
const PostGrid = ({ initialLimit = 2, colGrid = 3, layout=""}) => {
    const [posts, setPosts] = useState([])

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
    return (
      <div className="container h-auto">
        <Grid cols={colGrid} rows={2} className='h-full gap-4'>
          {posts.slice(0, initialLimit).map((post) => (
            <PostCard
            layout={layout}
            heading={post.title}
            date={post.updated_at}
            name={post.blogs.length > 0 ? post.blogs[0].name : "Blog"}
            description={post.content}
            src={ImgPost}
            key={post.id}
          />
          ))}
        </Grid>
      </div>
    )
}

export default PostGrid