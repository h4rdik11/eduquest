import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { deleteQuestionApi, getAllQuestionsApi } from "../../../api/question";
import AddQuestion from "./AddQuestion";
import { quizMap } from "../../../constants";

const QuestionsTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [addQuestionToggle, setAddQuestionToggle] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState<any>(null);

  const getAllQuestions = useCallback(() => {
    getAllQuestionsApi().then((response) => {
      setData(response.data?.questions || []);
    });
  }, []);

  useEffect(() => {
    getAllQuestions();
  }, [getAllQuestions]);

  const onDeleteConfirm = (id: string) => () => {
    deleteQuestionApi(id)
      .then((response) => {
        message.success(response.data.message);
        getAllQuestions();
      })
      .catch(() => {
        message.error("Something went wrong!!");
      });
  };

  const onEdit = (item: any) => () => {
    setAddQuestionToggle(true);
    setEditQuestionData(item);
  };

  const handleBack = (toggle: boolean) => {
    setEditQuestionData(null);
    setAddQuestionToggle(toggle);
  };

  const columns: any[] = [
    {
      title: () => (
        <span className="flex items-center">
          Question
          <Button
            type="primary"
            color="primary"
            className="ml-2"
            size="small"
            onClick={() => setAddQuestionToggle((prevState) => !prevState)}
          >
            <PlusOutlined />
          </Button>
        </span>
      ),
      dataIndex: "question",
      key: "question",
      width: "60%",
    },
    {
      title: "Topics",
      key: "topics",
      dataIndex: "topics",
      width: "30%",
      render: (_: any, item: any) => {
        return (
          <Tag color={quizMap[item?.topics.split(" & ")[0]].color}>
            {item?.topics}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, item: any) => (
        <Space size="middle">
          <Button type="primary" size="small" onClick={onEdit(item)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete Question"
            description="Are you sure to delete this question?"
            onConfirm={onDeleteConfirm(item._id)}
            okText="Yes"
            cancelText="No"
            placement="bottomLeft"
          >
            <Button size="small">
              <DeleteOutlined color="danger" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {!addQuestionToggle && (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: "100%", y: 110 * 5 }}
        />
      )}
      {addQuestionToggle && (
        <AddQuestion
          editData={editQuestionData}
          onBack={handleBack}
          onDone={getAllQuestions}
        />
      )}
    </>
  );
};

export default QuestionsTable;
