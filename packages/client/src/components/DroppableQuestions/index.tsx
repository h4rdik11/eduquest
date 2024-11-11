import { Alert } from "antd";
import React from "react";
import { useDrag } from "react-dnd";

const DroppableQuestions: React.FC<any> = ({ key, index, item }) => {
  const [{ opacity, borderRadius }, dragRef] = useDrag(
    () => ({
      type: "question",
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
      key={key}
      className="mb-3"
      ref={dragRef}
      style={
        {
          opacity,
          borderRadius,
        } as any
      }
    >
      <Alert showIcon={false} description={`${index}. ${item}`} />
    </div>
  );
};

export default DroppableQuestions;
