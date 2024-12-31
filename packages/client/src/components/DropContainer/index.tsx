import React, { useState } from "react";
import { useDrop } from "react-dnd";
import SelectedTopic from "../SelectedTopic";
import DroppableBadge from "../DroppableBadge";

const DropContainer: React.FC<any> = ({
  answers,
  onAnswer,
  selectedTopics,
  setSelectedTopics,
}) => {
  const [droppedOnChild, setDroppedOnChild] = useState(false);

  const currentAnswers = Object.keys(answers)
    .filter((key) => JSON.stringify([]) === JSON.stringify(answers[key].topics))
    .map((key) => answers[key]);
  function addItem(item: any) {
    setSelectedTopics((prevState: any) => [...prevState, item]);
  }

  const [__, answerDrop] = useDrop(
    () => ({
      accept: "question",
      drop(item: any) {
        if (droppedOnChild) {
          console.log("droppedOnChild: ", droppedOnChild);
          setDroppedOnChild(false);
          return;
        }
        console.log("FROM DROP CONTAINER: ", item);
        const newAnswers: any = {};
        Object.keys(answers)
          .filter((key) => key !== item.id)
          .forEach((key) => {
            newAnswers[key] = answers[key];
          });
        newAnswers[item.id] = { ...item, topics: [] };
        onAnswer?.(newAnswers);
      },
    }),
    [answers, onAnswer, droppedOnChild, setDroppedOnChild]
  );

  const [_, drop] = useDrop(() => ({
    accept: "piece",
    drop(item: any) {
      addItem(item);
    },
  }));

  return (
    <div
      className="h-full w-full rounded-full flex items-center justify-center bg-slate-100"
      ref={drop}
    >
      {!!selectedTopics?.length ? (
        <div className="h-full w-full flex items-center justify-center">
          {selectedTopics?.map((item: any) => (
            <SelectedTopic
              {...item}
              answers={answers}
              onAnswer={onAnswer}
              setDroppedOnChild={setDroppedOnChild}
            />
          ))}
          {selectedTopics?.length === 3 && (
            <div
              ref={answerDrop}
              className="bg-slate-200 z-10 flex flex-col items-center absolute bottom-12 border border-dashed border-black h-32 w-32 rounded-lg"
            >
              <span className="font-bold">No Answer</span>
              <div className="self-center">
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
            </div>
          )}
        </div>
      ) : (
        "Drop topics of the same color here"
      )}
    </div>
  );
};

export default DropContainer;
