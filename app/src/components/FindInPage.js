import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleFindInPageDialog, updateFindInPageText } from '../actions/findInPage';

class FindInPage extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    const {
      activeMatch, matches, text,
      onRequestFind, onRequestStopFind, onRequestClose, onRequestUpdateText,
    } = this.props;

    return (
      <div>
        <div>
          {activeMatch} / {matches} matches
        </div>
        <input
          ref={(input) => { this.input = input; }}
          className="pt-input"
          placeholder="Search"
          type="text"
          value={text}
          style={{ marginRight: 5 }}
          onChange={(e) => {
            const val = e.target.value;
            onRequestUpdateText(val);
            if (val.length > 0) {
              onRequestFind(val, true);
            } else {
              onRequestStopFind();
            }
          }}
          onInput={(e) => {
            const val = e.target.value;
            onRequestUpdateText(val);
            if (val.length > 0) {
              onRequestFind(val, true);
            } else {
              onRequestStopFind();
            }
          }}
          onKeyDown={(e) => {
            if ((e.keyCode || e.which) === 13) {
              const val = e.target.value;
              if (val.length > 0) {
                onRequestFind(val, true);
              }
            }
          }}
        />
        <button
          iconName="chevron-up"
          style={{ marginRight: 5 }}
          onClick={() => {
            if (text.length > 0) {
              onRequestFind(text, false);
            }
          }}
        />
        <button
          iconName="chevron-down"
          style={{ marginRight: 5 }}
          onClick={() => {
            if (text.length > 0) {
              onRequestFind(text, true);
            }
          }}
        />
        <button
          iconName="cross"
          style={{ marginRight: 5 }}
          onClick={() => {
            onRequestStopFind();
            onRequestClose();
          }}
        />
      </div>
    );
  }
}

FindInPage.propTypes = {
  text: PropTypes.string.isRequired,
  activeMatch: PropTypes.number.isRequired,
  matches: PropTypes.number.isRequired,
  onRequestFind: PropTypes.func.isRequired,
  onRequestStopFind: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onRequestUpdateText: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeMatch: state.findInPage.activeMatch,
  matches: state.findInPage.matches,
  text: state.findInPage.text,
});

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(toggleFindInPageDialog()),
  onRequestUpdateText: text => dispatch(updateFindInPageText(text)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(FindInPage);
