import React, { Component } from 'react';

import { Icon, Input, Button } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = Input.Group;

class SearchInput extends Component {
  state = {
    value: '',
    focus: false,
  };
  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  handleFocusBlur = e => {
    this.setState({
      focus: e.target === document.activeElement,
    });
  };
  handleSearch = () => {
    if (this.props.onSearch) {
      this.props.onSearch({ first_name: this.state.value });
    }
  };
  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': Boolean(this.state.value.trim()),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <InputGroup className={searchCls} style={this.props.style}>
        <Input
          placeholder={this.props.placeholder || ''}
          style={{ ...this.props.style }}
          value={this.state.value}
          onChange={this.handleInputChange}
          onFocus={this.handleFocusBlur}
          onBlur={this.handleFocusBlur}
        />
        <div className="ant-input-group-wrap">
          <Button className={btnCls} onClick={this.handleSearch}>
            <Icon type="search" />
          </Button>
        </div>
      </InputGroup>
    );
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.string,
};

export default SearchInput;
