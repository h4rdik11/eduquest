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
import { getConfigApi } from "../../api/config";
import CustomModal from "../../components/CustomModal";

const Quiz = () => {
  const [showItems, setShowItems] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [selectedTopics, setSelectedTopics] = useState<any[]>([]);
  const [originalTimer, setOriginalTimer] = useState(15);
  const [timer, setTimer] = useState(15);
  const [timerInterval, setTimerInterval] = useState<any>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalData, setModalData] = useState<any>({
    isVisible: false,
    icon: "",
    title: "",
    message: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    onPrimaryAction: () => {},
    onSecondaryAction: () => {},
  });

  useEffect(() => {
    getConfigApi().then((response) => {
      setOriginalTimer(response.data.timer);
      setTimer(response.data.timer);
    });
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(timerInterval);
    }
  }, [timer, timerInterval]);

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
    setTimerInterval(
      setInterval(() => {
        setTimer((prevState) => prevState - 1);
      }, 1000)
    );
  };

  const onReset = () => {
    setShowItems(true);
    setQuestions([]);
    setAnswers({});
    setSelectedTopics([]);
    setTimerInterval(null);
    setTimer(originalTimer);
  };

  const onSubmit = () => {
    console.log(answers);
    setTimerInterval(null);
    setTimer(0);
    setSubmitLoading(true);
    setModalData({
      isVisible: true,
      icon: "🏅",
      title: "Congratulations you finished!",
      message: "You scored 80%",
      primaryButtonText: "Retake Quiz",
      onPrimaryAction: onReset,
    });
    setSubmitLoading(false);
  };

  return (
    <>
      <CustomModal {...modalData} />
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
                    disabled={!!answers?.[data?._id] || timer <= 0}
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
              <div className="quiz_start flex items-center">
                <div className="flex items-center flex-col mr-5">
                  <span>Timer</span>
                  <span className="font-light">{timer}</span>
                </div>
                <Button
                  className="w-32"
                  size="large"
                  color="primary"
                  type="primary"
                  onClick={onSubmit}
                  loading={submitLoading}
                >
                  Submit
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default memo(Quiz);
