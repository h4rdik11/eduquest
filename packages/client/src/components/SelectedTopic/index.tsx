import React, { useState } from "react";
import { useDrop } from "react-dnd";
import "./style.css";
import clsx from "clsx";
import { Badge } from "antd";
import Left from "../../assets/Left.svg";
import Center from "../../assets/Center.svg";
import Right from "../../assets/Right.svg";

const SelectedTopic: React.FC<any> = ({ type, item }) => {
  const [answers, setAnswers] = useState<any[]>([]);
  const [_, drop] = useDrop(() => ({
    accept: "question",
    drop(item: any) {
      setAnswers((prevState) => [...prevState, item]);
    },
  }));

  const VennPart = () => {
    switch (type) {
      case "left":
        return Left;
      case "right":
        return Right;
      default:
        return Center;
    }
  };

  console.log(answers);

  const getStyles = () => {
    switch (type) {
      case "left":
        return { width: "480px", left: 112 };
      case "right":
        return { width: "480px", right: 112 };
      default:
        return { width: "137px", zIndex: 40 };
    }
  };

  return (
    <div
      ref={drop}
      className="relative h-3/4 w-3/4 flex items-center justify-center flex-col"
    >
      <img
        style={getStyles()}
        className="absolute"
        src={VennPart()}
        alt="venn_part"
      />
      <div
        className={clsx("absolute z-50", {
          "left-36": type === "left",
          "right-36": type === "right",
        })}
      >
        {answers?.map((item) => (
          <Badge count={item?.index} />
        ))}
      </div>
      {type !== "center" && (
        <div
          className={clsx("absolute bottom-16 w-24 text-center font-bold", {
            "left-32": type === "left",
            "right-32": type === "right",
          })}
        >
          {item}
        </div>
      )}
    </div>
  );
};

export default SelectedTopic;
