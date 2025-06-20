import { createContext, useCallback, useState, type JSX } from "react";
import { Table, Popconfirm, Input, Button, notification } from "antd";
import { useAppDispatch } from "../../store/hooks/hooks";
import {
  addXYCoordinates,
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
import { uid } from "uid";

interface DataType {
  key: string;
  XAxis: string;
  YAxis: string;
}

interface ColumnType {
  title: string;
  dataIndex: string;
  render?: (_: any, record: DataType) => JSX.Element | null;
}

export const Context = createContext({ name: "Default" });

const DataTable = () => {
  const dispatch = useAppDispatch();

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [inputRows, setInputRows] = useState<DataType[]>([]);
  const [api, contextHolder] = notification.useNotification();

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

  // Add empty input row
  const handleAdd = () => {
    const newRow: DataType = {
      key: uid(),
      XAxis: "",
      YAxis: "",
    };
    setInputRows([...inputRows, newRow]);
  };

  // Add data to redux from the input
  const handleInputChange = (
    key: string,
    field: keyof DataType,
    value: string
  ) => {
    setInputRows((prev) =>
      prev.map((row) => (row.key === key ? { ...row, [field]: value } : row))
    );
  };

  const handleSaveAll = () => {
    // returns false if the function returns false for all of the array elements.
    const hasEmpty = inputRows.some(
      (row) => !row.XAxis.trim() || !row.YAxis.trim()
    );

    if (hasEmpty) {
      api.error({
        message: VALIDATION_ERROR,
        description: FIELDS_REQUIRED,
        placement: "topRight",
      });
      return;
    }

    const payload = inputRows.map((row) => ({
      id: row.key,
      XCoordinateValue: row.XAxis,
      YCoordinateValue: row.YAxis,
    }));

    dispatch(addXYCoordinates(payload));
    setDataSource((prevDataSource) => [...prevDataSource, ...inputRows]);
    setInputRows([]);

    api.success({
      message: DATA_SAVED,
      description: DATA_SAVED_SUCCESS_MESSAGE,
      placement: "topRight",
    });
  };

  // remove all the input rows
  const handleCancel = () => {
    setInputRows([]);
  };

  // delete specific row
  const handleDelete = useCallback(
    (key: string) => {
      dispatch(deleteCoordinates(key));
      setDataSource(dataSource.filter((item) => item.key !== key));
    },
    [dataSource, dispatch]
  );

  return (
    <>
      {contextHolder}
      <div>
        <Button onClick={handleAdd} type="primary" className="btn-margin">
          Add
        </Button>
        {inputRows.length > 0 && (
          <div>
            {inputRows.map((row) => (
              <div key={row.key} className="input-row">
                <Input
                  placeholder="Enter X-Axis value"
                  value={row.XAxis}
                  onChange={(e) =>
                    handleInputChange(row.key, "XAxis", e.target.value)
                  }
                  className="small-margin input-width"
                />
                <Input
                  placeholder="Enter Y-Axis value"
                  type="number"
                  value={row.YAxis}
                  onChange={(e) =>
                    handleInputChange(row.key, "YAxis", e.target.value)
                  }
                  className="small-margin input-width"
                />
              </div>
            ))}
            <div className="action-button-wrapper">
              <Button
                onClick={handleSaveAll}
                type="primary"
                className="small-margin"
              >
                Save All
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
    </>
  );
};

export default DataTable;
