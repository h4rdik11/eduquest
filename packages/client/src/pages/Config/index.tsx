import { Menu } from "antd";
import { useState } from "react";
import Timer from "./Timer";
import QuestionsTable from "./Questions";

const items: any[] = [
  {
    label: "Timer",
    key: "timer",
  },
  {
    label: "Questions",
    key: "question",
  },
];

const Config = () => {
  const [current, setCurrent] = useState("timer");

  const onClick: any = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div className="w-full mt-5">
        {current === "timer" && <Timer />}
        {current === "question" && <QuestionsTable />}
      </div>
    </div>
  );
};

export default Config;
