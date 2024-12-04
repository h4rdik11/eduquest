import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";
import Center from "../../assets/Center.svg";
import Left from "../../assets/Left.svg";
import Right from "../../assets/Right.svg";
import DroppableBadge from "../DroppableBadge";
import "./style.css";

const SelectedTopic: React.FC<any> = ({
  type,
  item,
  topics,
  onAnswer,
  answers,
  setDroppedOnChild,
}) => {
  const currentAnswers = Object.keys(answers)
    .filter(
      (key) => JSON.stringify(topics) === JSON.stringify(answers[key].topics)
    )
    .map((key) => answers[key]);

  const [_, drop] = useDrop(
    () => ({
      accept: "question",
      drop(item: any) {
        setDroppedOnChild(true);
        const newAnswers: any = {};
        Object.keys(answers)
          .filter((key) => key !== item.id)
          .forEach((key) => {
            newAnswers[key] = answers[key];
          });
        newAnswers[item.id] = { ...item, topics };
        onAnswer?.(newAnswers);
      },
    }),
    [answers, onAnswer]
  );

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
        {currentAnswers?.map((item: any) => {
          return (
            <DroppableBadge
              index={item?.index}
              id={item?.id}
              key={item?.id}
              item={item?.item}
              count={item?.index}
            />
          );
        })}
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
