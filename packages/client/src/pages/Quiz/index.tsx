import { memo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropContainer from "../../components/DropContainer";
import QuizTopic from "../../components/QuizTopic";
import "./style.css";
import DroppableQuestions from "../../components/DroppableQuestions";

const items = [
  "Configuration Management",
  "Estimation",
  "Requirement",
  "Testing",
  "Engineering Management",
  "Process Improvement",
  "Tools",
  "Peer Reviews",
];

const Quiz = () => {
  const [showItems, setShowItems] = useState(true);
  return (
    <div className="w-full h-full relative">
      <DndProvider backend={HTML5Backend}>
        <div className="flex items-center justify-center h-full w-full">
          {!showItems && (
            <div className=" h-full flex flex-col items-center justify-center w-1/4">
              {Array(5)
                .fill(5)
                .map((_, index) => (
                  <DroppableQuestions
                    index={index + 1}
                    key={0}
                    item="Demo Item"
                  />
                ))}
            </div>
          )}
          <div className="dnd_container w-1/2">
            {showItems &&
              items.map((item, index) => (
                <QuizTopic
                  index={index}
                  item={item}
                  style={{
                    "--nth-child": index + 1,
                    borderColor: index % 2 === 0 ? "orange" : "blue",
                    transform: `rotate(calc(360deg / ${items.length} * (var(--nth-child) - 1))) translate(20rem) rotate(calc(-360deg / ${items.length} * (var(--nth-child) - 1)))`,
                  }}
                />
              ))}
            <DropContainer setShowItems={setShowItems} />
          </div>
          {!showItems && (
            <div className=" h-full flex flex-col items-center justify-center w-1/4">
              {Array(5)
                .fill(5)
                .map((_, index) => (
                  <DroppableQuestions
                    index={index + 6}
                    key={0}
                    item="Demo Item"
                  />
                ))}
            </div>
          )}
        </div>
      </DndProvider>
      <div className="quiz_label">Quiz 1</div>
      <div className="quiz_start">START</div>
    </div>
  );
};

export default memo(Quiz);
