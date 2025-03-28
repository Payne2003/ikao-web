import clsx from "clsx";

// eslint-disable-next-line react/prop-types
const Row = ({ children, gap = 4, align = "center", justify = "center", className = "" }) => {
  const alignOptions = { start: "items-start", center: "items-center", end: "items-end" };
  const justifyOptions = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  return (
    <div
      className={clsx(
        "flex",
        gap && `gap-${Math.min(gap, 10)}`,
        alignOptions[align] || "items-center",
        justifyOptions[justify] || "justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Row;
