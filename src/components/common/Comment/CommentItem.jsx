/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Dùng để điều hướng
import CommentForm from './CommentForm'

const CommentItem = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false) // Thêm state kiểm soát hover
  const navigate = useNavigate() // Hook điều hướng

  const isOwnComment = currentUserId === comment.user_id

  return (
    <div 
      className="py-4 flex flex-col gap-2 text-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <img src="/user-icon.png" alt="User" className="w-16 h-16 object-cover rounded-full" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold capitalize text-gray-800">{comment.user_name}</p>
            <span className="text-xl text-gray-500">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>

          {comment.parent_id === null && comment.rating > 0 && (
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-2xl ${
                    index < comment.rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="mt-2">{comment.comment}</p>

      {/* Chỉ hiển thị khi hover */}
      {isHovered && (
        <div className="mt-3 flex gap-4 text-xl text-gray-600">
          <button onClick={() => setActiveComment(comment.id)}  className="hover:underline">
            Trả lời
          </button>

          {isOwnComment && (
            <>
              <button onClick={() => setIsEditing(true)} className="hover:underline text-blue-500">
                Sửa
              </button>
              <button
                onClick={() => deleteComment(comment.id)}
                className="hover:underline text-red-500"
              >
                Xóa
              </button>
            </>
          )}
        </div>
      )}

      {isEditing && (
        <CommentForm
          initialText={comment.comment}
          handleSubmit={(updatedText) => {
            updateComment(comment.id, updatedText)
            setIsEditing(false)
          }}
          hasCancelButton
          handleCancel={() => setIsEditing(false)}
          submitLabel="Cập nhật"
          isMainComment={false}
        />
      )}

      {activeComment === comment.id && (
        <CommentForm
          handleSubmit={addComment}
          parentId={comment.id}
          hasCancelButton
          handleCancel={() => setActiveComment(null)}
          isMainComment={false}
          submitLabel="Trả lời"
        />
      )}

      {replies?.length > 0 && (
        <div className="mt-4 space-y-2 pl-6 border-l-2 border-gray-200">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={reply.replies}
              setActiveComment={setActiveComment}
              activeComment={activeComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              addComment={addComment}
              parentId={comment.id}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentItem
