import React from 'react';
import { Checkbox, CheckboxProps } from 'antd';

interface AntCheckBoxProps extends CheckboxProps {
  label?: string;
}

const AntCheckBox: React.FC<AntCheckBoxProps> = (props) => {
  return <Checkbox {...props}>{props.label ?? props.children}</Checkbox>;
};

export default AntCheckBox;
