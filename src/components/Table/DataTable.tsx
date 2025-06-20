import { createContext, useCallback, useMemo, useState, type JSX } from "react";
import { Table, Popconfirm, Input, Button, notification } from "antd";
import { useAppDispatch } from "../../store/hooks/hooks";
import {
  addXCoordinates,
  addYCoordinates,
  deleteCoordinates,
} from "../../store/features/Coordinates";
import {
  FIELDS_REQUIRED,
  VALIDATION_ERROR,
} from "../../constants/ErrorConstants";
import {
  DATA_SAVED,
  DATA_SAVED_SUCCESS_MESSAGE,
} from "../../constants/SuccessConstants";

interface DataType {
  key: number;
  XAxis: string;
  YAxis: string;
}

interface ColumnType {
  title: string;
  dataIndex: string;
  render?: (_: any, record: DataType) => JSX.Element | null;
}

const Context = createContext({ name: "Default" });

const DataTable = () => {
  const dispatch = useAppDispatch();

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [count, setCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false); // State to toggle input visibility
  const [newXAxis, setNewXAxis] = useState(""); // State for X-axis input
  const [newYAxis, setNewYAxis] = useState(""); // State for Y-axis input
  const [api, contextHolder] = notification.useNotification();

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const columns: ColumnType[] = [
    {
      title: "X-Axis",
      dataIndex: "XAxis",
    },
    {
      title: "Y-Axis",
      dataIndex: "YAxis",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record: DataType) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    setIsAdding(true); // Show input fields for adding new data
  };

  const handleSave = () => {
    if (!newXAxis.trim() || !newYAxis.trim()) {
      api.error({
        message: VALIDATION_ERROR,
        description: FIELDS_REQUIRED,
        placement: "topRight",
      });
      return;
    }

    const newData: DataType = {
      key: count,
      XAxis: newXAxis,
      YAxis: newYAxis,
    };
    dispatch(addYCoordinates(Number(newYAxis)));
    dispatch(addXCoordinates(newXAxis));
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setIsAdding(false); // Hide input fields after saving
    setNewXAxis(""); // Clear input fields
    setNewYAxis("");
    api.success({
      message: DATA_SAVED,
      description: DATA_SAVED_SUCCESS_MESSAGE,
      placement: "topRight",
    });
  };

  const handleCancel = () => {
    setIsAdding(false); // Hide input fields
    setNewXAxis(""); // Clear input fields
    setNewYAxis("");
  };

  const handleDelete = useCallback(
    (key: number) => {
      dispatch(deleteCoordinates(key));
      setDataSource(dataSource.filter((item) => item.key !== key));
    },
    [dataSource, dispatch]
  );

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}

      <div>
        <Button onClick={handleAdd} type="primary" className="btn-margin">
          Add
        </Button>
        {isAdding && (
          <div>
            <Input
              placeholder="Enter X-Axis value"
              value={newXAxis}
              onChange={(e) => setNewXAxis(e.target.value)}
              className="small-margin input-width"
            />
            <Input
              placeholder="Enter Y-Axis value"
              type="number"
              value={newYAxis}
              onChange={(e) => setNewYAxis(e.target.value)}
              className="small-margin input-width"
            />
            <div className="action-button-wrapper">
              <Button
                onClick={handleSave}
                type="primary"
                className="small-margin"
              >
                Save
              </Button>
              <Button onClick={handleCancel} type="default">
                Cancel
              </Button>
            </div>
          </div>
        )}
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
          pagination={false}
        />
      </div>
    </Context.Provider>
  );
};

export default DataTable;
