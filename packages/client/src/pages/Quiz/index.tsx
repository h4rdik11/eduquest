import { memo, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropContainer from "../../components/DropContainer";
import QuizTopic from "../../components/QuizTopic";
import "./style.css";
import DroppableQuestions from "../../components/DroppableQuestions";
import { getQuestionsFromTopicsApi } from "../../api/question";
import { Button } from "antd";
import clsx from "clsx";
import { items, quizMap } from "../../constants";

const Quiz = () => {
  const [showItems, setShowItems] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [selectedTopics, setSelectedTopics] = useState<any[]>([]);

  useEffect(() => {
    if (selectedTopics?.length == 2) {
      setSelectedTopics([
        {
          ...selectedTopics[0],
          type: "left",
          topics: [selectedTopics[0]?.item],
        },
        {
          index: 5,
          type: "center",
          item: "Intersection",
          topics: selectedTopics?.map((data: any) => data.item),
        },
        {
          ...selectedTopics[1],
          type: "right",
          topics: [selectedTopics[1]?.item],
        },
      ]);
      setShowItems(false);
    }
  }, [selectedTopics]);

  const onAnswer = (answer: any) => {
    setAnswers((prevState: any) => ({ ...prevState, ...answer }));
  };

  const onStart = async () => {
    const response = await getQuestionsFromTopicsApi(
      selectedTopics.map((item) => item.item)
    );
    setQuestions(response.data.questions);
  };

  const onReset = () => {
    setShowItems(true);
    setQuestions([]);
    setAnswers({});
    setSelectedTopics([]);
  };

  return (
    <div className="w-full h-full relative">
      <DndProvider backend={HTML5Backend}>
        <div
          className={clsx("flex items-center h-full w-full", {
            "justify-evenly": !!questions?.length,
            "justify-center": !questions?.length,
          })}
        >
          {!!questions?.length && !showItems && (
            <div className=" h-full flex flex-col items-center justify-center w-1/4">
              {questions?.map((data, index) => (
                <DroppableQuestions
                  disabled={!!answers?.[data?._id]}
                  index={index + 1}
                  id={data?._id}
                  key={data?._id}
                  item={data?.question}
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
                    borderColor: quizMap[item].border,
                    background: quizMap[item].color,
                    transform: `rotate(calc(360deg / ${items.length} * (var(--nth-child) - 1))) translate(20rem) rotate(calc(-360deg / ${items.length} * (var(--nth-child) - 1)))`,
                  }}
                />
              ))}
            <DropContainer
              setShowItems={setShowItems}
              onAnswer={onAnswer}
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
            />
          </div>
        </div>
      </DndProvider>
      {!showItems && (
        <>
          {!questions?.length ? (
            <div className="quiz_start">
              <Button
                className="mr-1"
                size="large"
                type="primary"
                onClick={onStart}
              >
                Start Quiz
              </Button>
              <Button size="large" color="danger" onClick={onReset}>
                Reset
              </Button>
            </div>
          ) : (
            <div className="quiz_start">Timer</div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Quiz);
