import { Button, Input, message, Select } from "antd";
import { items, TopicCombos } from "../../../constants";
import React, { useEffect, useState } from "react";
import { addQuestionApi } from "../../../api/question";

const AddQuestion: React.FC<any> = ({ onBack, onDone, editData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    question: "",
    topics: "",
    answers: [],
  });

  useEffect(() => {
    if (editData) {
      setData(editData);
    }
  }, [editData]);

  const options = items.map((item) => ({
    value: item,
    label: item,
  }));

  const topicOptions = TopicCombos.map((item) => ({
    value: item,
    label: item,
  }));

  const onChange = (type: string) => (ev: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (type === "question") {
      newData[type] = ev.target.value;
    } else {
      newData[type] = ev;
    }
    setData(newData);
  };

  const onSubmit = async () => {
    setLoading(true);
    addQuestionApi(data)
      .then(() => {
        message.success("Question added successfully!!");
        onBack(false);
        onDone?.();
      })
      .catch(() => {
        message.error("Something went wrong!!");
      })
      .finally(() => {
        setData({
          question: "",
          topics: "",
          answers: [],
        });
        setLoading(false);
      });
  };

  return (
    <div className="w-1/2">
      <div className="mb-1">
        <span>Question</span>
        <Input
          className="mb-2"
          placeholder="Question"
          value={data?.question}
          onChange={onChange("question")}
        />
      </div>
      <div className="mb-1">
        <span>Topic Combo</span>
        <Select
          className="mb-2"
          placeholder="Select a topic combo"
          value={data?.topics}
          onChange={onChange("topics")}
          style={{ width: "100%" }}
          options={topicOptions}
        />
      </div>
      <div className="mb-1">
        <span>Answers</span>
        <Select
          className="mb-2"
          mode="multiple"
          maxCount={2}
          placeholder="Select 2 topics"
          value={data?.answers}
          onChange={onChange("answers")}
          style={{ width: "100%" }}
          options={options}
        />
      </div>
      <div>
        <Button
          loading={loading}
          onClick={onSubmit}
          className="mr-2"
          type="primary"
          color="primary"
        >
          {!!editData ? "Update Question" : "Add Question"}
        </Button>
        <Button disabled={loading} onClick={() => onBack(false)}>
          Back
        </Button>
      </div>
    </div>
  );
};
export default AddQuestion;
