import React, { Component } from 'react';
import { networkGetCall } from './services/app.service';
import Header from './components/Navbar';
import { CardColumns, Container, Row } from 'react-bootstrap';
import CardProfile from './components/Card';
import moment from 'moment';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: [],
      searchData: '',
      allData: {},
      searchDate: '',
    };
  }

  async componentDidMount() {
    const { data = {} } = await networkGetCall(
      'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
    );
    const responseLength = Object.keys(data).length > 0;
    if (responseLength) {
      this.setState({
        entry: data?.feed?.entry,
        searchData: '',
        allData: data,
      });
    }
  }

  _handleSearch = (searchText) => {
    const { entry, searchDate, allData } = this.state;
    if (searchText) {
      this.filterData = entry.filter((item) =>
        item?.['im:name']?.label?.includes(searchText)
      );

      if (searchDate) {
        this.releaseDate = moment(searchDate).format('LL');
        this.filterData = this.filterData.filter((item) =>
        item?.['im:releaseDate']?.attributes?.label?.includes(this.releaseDate));
      }
    } else {
      this.filterData = allData?.feed?.entry;
    }
    this.setState({
      searchData: searchText,
      entry: this.filterData,
    });
  };

  _handleDateSearch = (date) => {
    const { entry = [], allData = {} } = this.state;
    if (date) {
      this.releaseDate = moment(date).format('LL');
      this.filterData = entry.filter((item) =>
        item?.['im:releaseDate']?.attributes?.label?.includes(this.releaseDate)
      );

      this.setState({
        searchDate: moment(date).format('DD/MM/YYYY'),
        entry: this.filterData
      });
    } else {
      this.setState({
        searchDate: '',
        entry: allData?.feed?.entry
      });
    }
  };

  _handleCategory = (data = {}) => {
    const { entry = [], allData = {} } = this.state;
    
    if (data) {
      const { value } = data;
      if (value) {
        const categoryFilter = entry.filter((item) => item?.category?.attributes?.term ===  value)
        this.setState({
          entry: categoryFilter
        })
      }
    } else {
      this.setState({
        entry: allData?.feed?.entry
      })
    }
  }

  render() {
    const { entry = [], allData = {}, searchDate } = this.state;

    return (
      <>
        <Header
          searchData={this._handleSearch}
          fromDate={searchDate}
          selectDate={this._handleDateSearch}
          data={allData}
          selectCategory={this._handleCategory}
        />
        <Container>
          <Row className='mt-4'>
            <CardColumns>
              {entry.map((item) => {
                return (
                  <CardProfile
                    key={item?.id?.attributes?.['im:id']}
                    {...item}
                  />
                );
              })}
            </CardColumns>
          </Row>
        </Container>
      </>
    );
  }
}
