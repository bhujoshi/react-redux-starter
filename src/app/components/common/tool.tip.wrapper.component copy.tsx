import React from 'react';
import { Tooltip } from '@material-ui/core';

export interface ToolTopWrapperProps {
  content: string;
  maxLength?: number;
}

const ToolTipWrapper = function(props: ToolTopWrapperProps) {
  const { content, maxLength = 40 } = props;
  return content.length < maxLength ? (
    <> {content}</>
  ) : (
    <Tooltip title={content} arrow>
      <span>{content.substr(0, maxLength)}...</span>
    </Tooltip>
  );
};

export default ToolTipWrapper;
