/* eslint-disable react/prop-types */
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import RatingApi from '@/api/RatingApi'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
// Hàm tạo cây bình luận
const buildCommentTree = (comments) => {
  let map = {};
  let tree = [];

  // Tạo một bản đồ của các bình luận
  comments.forEach((comment) => {
    if (!comment || !comment.id) return; // Kiểm tra nếu comment không hợp lệ
    map[comment.id] = { ...comment, replies: [] };
  });

  // Gán replies vào comment cha
  comments.forEach((comment) => {
    if (!comment || !comment.id) return; // Kiểm tra dữ liệu hợp lệ
    if (comment.parent_id !== null && map[comment.parent_id]) {
      map[comment.parent_id].replies.push(map[comment.id]);
    } else {
      tree.push(map[comment.id]);
    }
  });

  return tree;
};


const CommentListItem = ({ productId, user }) => {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const userId = user?.id;
  console.log('userId', userId);
  // Lấy danh sách bình luận
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await RatingApi.getComments(productId);
        setComments(res);
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    };
    fetchComments();
  }, [productId]);

  // Thêm bình luận mới
  const addComment = async (comment, parentId = null, rating) => {
    if (!user) {
      toast.warn('Bạn cần đăng nhập để bình luận!');
      return;
    }

    try {
      const newComment = await RatingApi.createComment({
        user,
        productId,
        comment,
        rating,
        parentId
      })

      setComments([...comments, newComment])
      setActiveComment(null)
    } catch (error) {
      console.error('Lỗi khi thêm bình luận:', error)
    }
  }
  const updateComment = async (commentId, updatedText) => {
    try {
      // Tìm comment cũ theo ID
      const oldComment = comments.find((comment) => comment.id === commentId)
      if (!oldComment) {
        console.error('Không tìm thấy bình luận để cập nhật.')
        return
      }

      // Dữ liệu gửi lên API (giữ nguyên các trường khác)
      const updatedCommentData = {
        ...oldComment,
        comment: updatedText,
        updated_at: new Date().toISOString() // Cập nhật thời gian
      }

      // Gọi API cập nhật
      await RatingApi.updateComment(commentId, updatedCommentData)

      // Cập nhật danh sách comments trong state
      setComments((prevComments) =>
        prevComments.map((comment) => (comment.id === commentId ? updatedCommentData : comment))
      )

      setActiveComment(null)
    } catch (error) {
      console.error('Lỗi khi cập nhật bình luận:', error)
    }
  }

  // Xóa bình luận và replies liên quan
  const deleteComment = async (commentId) => {
    try {
      const response = await RatingApi.deleteComment(commentId)

      if (response.success) {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId && comment.parent_id !== commentId)
        )
      } else {
        console.error('Lỗi: Không thể xóa bình luận.')
      }
    } catch (error) {
      console.error('Lỗi khi xóa bình luận:', error)
    }
  }
  // Tạo cây bình luận
  const commentTree = buildCommentTree(comments);

  return (
    <div className='flex flex-col gap-4'>
      <CommentForm
        hasCancelButton={false}
        submitLabel="Viết bình luận"
        handleSubmit={addComment}
      />
      <div className="flex flex-col bg-white rounded-2xl shadow-md p-4 gap-4 space-y-4">
        {commentTree.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={comment.replies}
            setActiveComment={setActiveComment}
            activeComment={activeComment}
            updateComment={updateComment}
            deleteComment={deleteComment}
            addComment={addComment}
            parentId={comment.parent_id}
            currentUserId={user?.id}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentListItem
