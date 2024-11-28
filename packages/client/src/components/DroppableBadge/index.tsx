import { Badge } from "antd";
import { useDrag } from "react-dnd";

const DroppableBadge = ({ count, item, index, id }: any) => {
  const [{ opacity, borderRadius }, dragRef] = useDrag(() => ({
    type: "question",
    item: () => {
      return { item, index, id };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      borderRadius: 99999,
    }),
  }));

  return (
    <Badge
      ref={dragRef}
      style={
        {
          opacity: opacity,
          cursor: "pointer",
          borderRadius,
        } as any
      }
      count={count}
    />
  );
};

export default DroppableBadge;
