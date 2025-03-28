/* eslint-disable react/prop-types */
import { useState } from "react";
import InputComponent from "../Input/InputComponent";
import { toast } from "react-toastify";

const CommentForm = ({
  handleSubmit,
  submitLabel = "Gửi nhận xét",
  hasCancelButton = true,
  handleCancel,
  initialText = "",
  isMainComment = true, // Nếu false => Đây là reply
  parentId = null, // ID của comment cha nếu là reply
}) => {
  const [comment, setComment] = useState(initialText);
  const [rating, setRating] = useState(0);

  const isTextareaDisabled = comment.trim().length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isTextareaDisabled) {
      if (isMainComment && rating === 0) {
        toast.info("Vui lòng đánh giá sản phẩm trước khi nhận xét! ❤️");
        return;
      }

      handleSubmit(comment, parentId, isMainComment ? rating : null);
      setComment("");
      setRating(0);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full h-auto flex bg-white rounded-2xl shadow-md p-4 flex-col gap-8 text-2xl">
      {/* Đánh giá sao (chỉ hiển thị khi là comment chính) */}
      {isMainComment && (
        <div>
          <p className="text-xl font-semibold">Đánh giá sản phẩm:</p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setRating(rating === index + 1 ? 0 : index + 1)}
                className={`text-4xl transition ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                } hover:text-yellow-400`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ô nhập nhận xét */}
      <InputComponent
        label={isMainComment ? "Nhận xét sản phẩm:" : "Trả lời bình luận:"}
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        classInput="w-full border p-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
        placeholder={isMainComment ? "Nhập nhận xét của bạn..." : "Nhập phản hồi..."}
      />

      {/* Nút gửi & Hủy */}
      <div className="flex justify-end gap-4">
        {hasCancelButton && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-400 hover:bg-hover text-white rounded-lg transition"
          >
            Hủy
          </button>
        )}
        <button
          type="submit"
          disabled={isTextareaDisabled}
          className={`px-4 py-2 font-medium rounded-lg transition ${
            isTextareaDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary hover:bg-hover text-white"
          }`}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
