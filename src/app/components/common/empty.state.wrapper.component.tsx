import React, { ReactElement } from 'react';

export interface LoaderWrapperProps {
  isEmpty: boolean;
  fallback: ReactElement;
  children: any;
}

const EmptyStateWrapper = function(props: LoaderWrapperProps) {
  const { isEmpty, fallback, children } = props;
  return isEmpty ? fallback : children;
};

export default EmptyStateWrapper;
