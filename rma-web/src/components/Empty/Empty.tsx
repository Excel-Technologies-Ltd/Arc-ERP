import React from 'react';
import { Empty, type EmptyProps } from 'antd';

// Define the props for the reusable Empty component
interface AntEmptyProps extends EmptyProps {
  image?: 'simple' | 'default';
  description?: React.ReactNode;
}

const AntEmpty: React.FC<AntEmptyProps> = ({
  image = 'default',
  description = 'No Data Found',
  ...rest
}) => {
  let emptyImage: React.ReactNode;

  // Determine which image to show based on the 'image' prop
  switch (image) {
    case 'simple':
      emptyImage = Empty.PRESENTED_IMAGE_SIMPLE;
      break;
    case 'default':
      emptyImage = Empty.PRESENTED_IMAGE_DEFAULT;
      break;
  }

  return <Empty image={emptyImage} description={description} {...rest} />;
};

export default AntEmpty;
