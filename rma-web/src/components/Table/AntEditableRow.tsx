import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import type { FormInstance as AntFormInstance } from 'antd';
import dayjs from 'dayjs';
import AntDatePicker from '../Base/DatePicker/AntDatePicker';
import AntInput from '../Base/Form/FormInput/AntInput';

const EditableContext = React.createContext<AntFormInstance<any> | null>(null);

interface EditableRowProps {
  children: React.ReactNode;
}

export const EditableRow: React.FC<EditableRowProps> = ({ children, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props}>{children}</tr>
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps<T> {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof T;
  record: T;
  handleSave: (record: T) => void;
  inputType?: 'text' | 'date';
}

export const EditableCell = <T extends Record<string, any>>({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType = 'text',
  ...restProps
}: EditableCellProps<T>) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: dataIndex === 'warranty_date' ? dayjs(record[dataIndex]) : record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      const processedValues = { ...values };

      if (inputType === 'date' && processedValues[dataIndex]) {
        processedValues[dataIndex] = processedValues[dataIndex].format('YYYY-MM-DD');
      }

      toggleEdit();
      handleSave({ ...record, ...processedValues });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    let inputNode;
    if (inputType === 'date') {
      inputNode = <AntDatePicker onBlur={save} format='YYYY-MM-DD' onChange={save} size='small' />;
    } else {
      inputNode = <AntInput onPressEnter={save} onBlur={save} size='small' type='text' />;
    }

    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex as string}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        {inputNode}
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface EditableTableComponents {
  body: {
    row: typeof EditableRow;
    cell: typeof EditableCell;
  };
}

export const editableTableComponents: EditableTableComponents = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

export const makeEditable = <T extends Record<string, any>>(
  columns: any[],
  handleSave: (record: T) => void
) => {
  return columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: T) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        inputType: col.inputType || 'text',
      }),
    };
  });
};
