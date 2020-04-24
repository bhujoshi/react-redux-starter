import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ReactElement } from 'react';
import { styled as styledMaterial, withStyles } from '@material-ui/core/styles';
import { Center } from '..';

const StyledCenter = styledMaterial(Center)({
  padding: '200px 0px',
});

const ColorCircularProgress = withStyles({
  root: {
    color: '#1d7dea',
  },
})(CircularProgress);

export interface LoaderWrapperProps {
  isLoading: boolean;
  fallback?: ReactElement;
  children: any;
}

const LoaderWrapper = function(props: LoaderWrapperProps) {
  const {
    isLoading,
    fallback = (
      <StyledCenter>
        <ColorCircularProgress />
      </StyledCenter>
    ),
    children,
  } = props;
  return isLoading ? fallback : children;
};

export default LoaderWrapper;
