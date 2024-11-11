import React from "react";
import { useDrag } from "react-dnd";
import "./style.css";

const QuizTopic: React.FC<any> = ({ item, index, style = {} }) => {
  const [{ opacity, borderRadius }, dragRef] = useDrag(
    () => ({
      type: "piece",
      item: { item, index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        borderRadius: 99999,
      }),
    }),
    []
  );

  return (
    <div
      key={index}
      className="quiz_item"
      ref={dragRef}
      style={
        {
          opacity,
          borderRadius,
          ...style,
        } as any
      }
    >
      {item}
    </div>
  );
};

export default QuizTopic;
