import React from "react";
import { useDrop } from "react-dnd";
import SelectedTopic from "../SelectedTopic";

const DropContainer: React.FC<any> = ({
  onAnswer,
  selectedTopics,
  setSelectedTopics,
}) => {
  function addItem(item: any) {
    setSelectedTopics((prevState: any) => [...prevState, item]);
  }

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
            <SelectedTopic {...item} onAnswer={onAnswer} />
          ))}
        </div>
      ) : (
        "Drop topics of the same color here"
      )}
    </div>
  );
};

export default DropContainer;
