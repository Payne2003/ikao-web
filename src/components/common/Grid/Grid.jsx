import clsx from 'clsx'

// eslint-disable-next-line react/prop-types
const Grid = ({ children, cols = 3, rows = 3, gap = 4, className = '' }) => {
  return (
    <div
      className={clsx(
        'grid',

        cols && `sm:grid-cols-${Math.min(cols, 12)}`, // Tailwind chỉ hỗ trợ từ 1 đến 12
        rows && `sm:grid-rows-${Math.min(rows, 6)}`, // Tailwind hỗ trợ giới hạn số hàng
        gap && `gap-${Math.min(gap, 10)}`, // Giới hạn gap tối đa là 10

        className
      )}
    >
      {children}
    </div>
  )
}

export default Grid
