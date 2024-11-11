import React, { useState } from "react";
import { useDrop } from "react-dnd";
import "./style.css";
import clsx from "clsx";
import { Badge } from "antd";

const SelectedTopic: React.FC<any> = ({ item, className = "", style = {} }) => {
  const [answers, setAnswers] = useState<any[]>([]);
  const [_, drop] = useDrop(() => ({
    accept: "question",
    drop(item: any) {
      setAnswers((prevState) => [...prevState, item]);
    },
  }));

  console.log(answers);

  return (
    <div className="flex items-center flex-col">
      <div
        className={clsx("selected_item relative", className)}
        ref={drop}
        style={
          {
            ...style,
          } as any
        }
      >
        <div className="absolute">
          {answers?.map((item) => (
            <Badge count={item?.index} />
          ))}
        </div>
      </div>
      <div>{item}</div>
    </div>
  );
};

export default SelectedTopic;
