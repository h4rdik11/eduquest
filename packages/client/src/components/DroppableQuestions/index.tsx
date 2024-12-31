import { Alert } from "antd";
import React from "react";
import { useDrag } from "react-dnd";

const DroppableQuestions: React.FC<any> = ({
  key,
  index,
  item,
  id,
  disabled,
}) => {
  const [{ opacity, borderRadius }, dragRef] = useDrag(
    () => ({
      type: disabled ? "none" : "question",
      item: () => {
        if (disabled) {
          return null;
        } else {
          return { item, index, id };
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        borderRadius: 99999,
      }),
    }),
    [disabled]
  );

  return (
    <div
      key={key}
      className="mb-3 w-full"
      ref={dragRef}
      style={
        {
          opacity: disabled ? 0.5 : opacity,
          cursor: disabled ? "not-allowed" : "pointer",
          borderRadius,
        } as any
      }
    >
      <Alert showIcon={false} description={`${index}. ${item}`} />
    </div>
  );
};

export default DroppableQuestions;
