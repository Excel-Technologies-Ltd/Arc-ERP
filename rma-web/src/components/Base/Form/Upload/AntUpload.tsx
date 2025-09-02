import { Upload, type UploadProps } from 'antd';
import AntButton from '../../Button/AntButton';
import { UploadOutlined } from '@ant-design/icons';

interface AntUploadProps extends UploadProps {
  text?: string;
  size?: 'large' | 'middle' | 'small';
}

const AntUpload = (props: AntUploadProps) => {
  const { maxCount = 1, text = 'Upload Your File', size = 'middle', ...rest } = props;
  return (
    <div>
      <Upload
        maxCount={maxCount}
        style={{
          width: '100%',
        }}
        {...rest}
      >
        <AntButton
          style={{
            color: 'gray',
            width: '100%',
          }}
          icon={<UploadOutlined />}
          size={size}
        >
          {text}
        </AntButton>
      </Upload>
    </div>
  );
};

export default AntUpload;
