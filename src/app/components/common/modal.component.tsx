import React from 'react';
import Modal from '@material-ui/core/Modal';
import makeStyles from '@material-ui/core/styles/makeStyles';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: any;
}

const useStyles = makeStyles({
  modalBody: {
    background: '#ffffff',
    paddingBottom: '2%',
    padding: '2em',
    maxWidth: '600px',
    display: 'flex',
    maxHeight: 'calc(100% - 64px)',
    flexDirection: 'column',
    width: '100%',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    position: 'relative',
    '&:active': {
      outline: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
  },
});

const ModalComponent = function(props: ModalProps) {
  const { onClose, isOpen } = props;
  const classes = useStyles();

  return (
    <Modal onClose={onClose} aria-labelledby="dialog-title" open={isOpen}>
      <div className={classes.modalBody}>{props.children}</div>
    </Modal>
  );
};

export default ModalComponent;
