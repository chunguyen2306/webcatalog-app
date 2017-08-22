import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import connectComponent from '../../helpers/connect-component';

import { close } from '../../state/dialogs/reset/actions';

import {
  STRING_ARE_YOU_SURE,
  STRING_CANCEL,
  STRING_RESET_DIALOG_DESC,
  STRING_RESET,
} from '../../constants/strings';

const DialogReset = (props) => {
  const {
    open,
    onClose,
  } = props;

  return (
    <Dialog open={open} onRequestClose={onClose}>
      <DialogTitle>
        {STRING_ARE_YOU_SURE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {STRING_RESET_DIALOG_DESC}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {STRING_CANCEL}
        </Button>
        <Button onClick={this.handleRequestClose} color="primary">
          {STRING_RESET}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogReset.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

DialogReset.defaultProps = {
  open: false,
};

const mapStateToProps = state => ({
  open: state.dialogs.reset.open,
});

const actionCreators = {
  close,
};

export default connectComponent(
  DialogReset,
  mapStateToProps,
  actionCreators,
);
