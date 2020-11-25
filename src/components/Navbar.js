import React, { Component } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import Select from 'react-select';
import moment from 'moment';
import _ from 'lodash';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: '',
      category: {}
    };
  }

  _handleSearch = (e) => {
    const { searchData } = this.props;
    const { value = '' } = e.target;
    searchData(value);
  };

  _handleDate = (e) => {
    const { selectDate } = this.props;
    this.setState({
      fromDate: moment(e).format('DD/MM/YYYY'),
    });
    selectDate(e);
  };

  hanldeClick = () => {
    const { selectDate } = this.props;
    this.setState({
      fromDate: '',

    });
    selectDate();
  };

  handleCategory = (e) => {
    const { selectCategory } = this.props;

    this.setState({
      category: e
    });
    selectCategory(e);
  }

  render() {
    const { fromDate, category } = this.state;
    const { data } = this.props;
    const options = data?.feed?.entry.map((item) => {
      if (item?.category?.attributes) {
        return ({ value: item?.category?.attributes?.label, label: item?.category?.attributes?.term })
      }
    })

    const uniqueCategory = _.uniqBy(options, (o) => o.label);
    const categoryOptions = _.orderBy(uniqueCategory, ['label'],['asc']);

    return (
      <>
        <Navbar bg='primary' variant='dark'>
          <Navbar.Brand href='#home'>iTunes Album</Navbar.Brand>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Search'
              className='mr-sm-2'
              onChange={this._handleSearch}
            />
            <DatePicker
              id='example-datepicker'
              placeholderText='Release Date'
              autoComplete='off'
              dateFormat='dd/MM/yyyy'
              value={fromDate || null}
              onChange={(e) => this._handleDate(e)}
            />
            <div className='m-2' style={{ width: '300px' }}>
              <Select
                autosize={true}
                isClearable={true}
                menuPlacement='auto'
                menuPosition='fixed'
                options={categoryOptions}
                onChange={this.handleCategory}
                value={category}
                placeholder='Select Category'
              />
            </div>
            <div className='m-2'>
              <Button size='sm' variant='secondary' onClick={this.hanldeClick}>
                Reset
              </Button>
            </div>
          </Form>
        </Navbar>
      </>
    );
  }
}

Header.propTypes = {
  data: PropTypes.object,
  feed: PropTypes.object,
  entry: PropTypes.object,
  searchData: PropTypes.func,
  _handleSearch: PropTypes.func,
  fromDate: PropTypes.string,
  selectDate: PropTypes.func,
  selectCategory: PropTypes.func
};
