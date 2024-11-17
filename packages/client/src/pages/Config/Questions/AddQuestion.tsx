import { Button, Input, message, Select } from "antd";
import { items } from "../../../constants";
import React, { useState } from "react";
import { addQuestionApi } from "../../../api/question";

const AddQuestion: React.FC<any> = ({ onBack, onDone }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    question: "",
    topics: [],
  });

  const options = items.map((item) => ({
    value: item,
    label: item,
  }));

  const onChange = (type: string) => (ev: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (Array.isArray(ev)) {
      newData[type] = ev;
    } else {
      newData[type] = ev.target.value;
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
        setLoading(false);
      });
  };

  return (
    <div className="w-1/2">
      <Input
        className="mb-2"
        placeholder="Question"
        onChange={onChange("question")}
      />
      <Select
        className="mb-2"
        mode="multiple"
        maxCount={2}
        placeholder="Select 2 topics"
        onChange={onChange("topics")}
        style={{ width: "100%" }}
        options={options}
      />
      <div>
        <Button
          loading={loading}
          onClick={onSubmit}
          className="mr-2"
          type="primary"
          color="primary"
        >
          Add Question
        </Button>
        <Button disabled={loading} onClick={() => onBack(false)}>
          Back
        </Button>
      </div>
    </div>
  );
};
export default AddQuestion;
