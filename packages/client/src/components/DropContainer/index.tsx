import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import SelectedTopic from "../SelectedTopic";

const DropContainer: React.FC<any> = ({ setShowItems }) => {
  const [selectedTopics, setSelectedTopics] = useState<any[]>([]);

  useEffect(() => {
    if (selectedTopics?.length == 2) {
      setSelectedTopics([
        selectedTopics[0],
        {
          index: 5,
          item: "Intersection",
        },
        selectedTopics[1],
      ]);
      setShowItems(false);
    }
  }, [selectedTopics]);

  function addItem(item: any) {
    setSelectedTopics((prevState) => [...prevState, item]);
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
          {selectedTopics?.map((item) => (
            <SelectedTopic {...item} />
          ))}
        </div>
      ) : (
        "Drop topic here"
      )}
    </div>
  );
};

export default DropContainer;
