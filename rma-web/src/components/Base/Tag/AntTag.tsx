import { Tag, type TagProps } from 'antd';

const AntTags: React.FC<TagProps> = ({ ...props }) => {
  const { bordered = false, ...rest } = props;
  return <Tag {...rest} bordered={bordered} />;
};

export default AntTags;
