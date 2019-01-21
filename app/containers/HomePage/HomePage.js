/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import SegsList from 'components/SegsList';
import Button from 'react-bootstrap/Button';
import { QULITY_OPTIONS } from './constants';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
  }
  state = {
    start_dateTm: "2019-01-30T12:15:23",
    end_dateTm: "2019-01-30T12:17:23",
    quality: "HD"
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    this.props.onChangeSegInfo(this.state);
    this.props.onGetSeglist()
  }

  render() {
    const { loading, error, segs } = this.props;
    const { start_dateTm, quality, end_dateTm } = this.state;
    const segsListProps = {
      loading,
      error,
      segs,
    };
    const list = QULITY_OPTIONS.map(info => (<option key={info.value} value={info.value} >{info.label}</option>));
    return (
      <article>
        <Helmet>
          <title>Video player</title>
          <meta name="description" content="Video player" />
        </Helmet>
        <div className="home-page">
          <section>
            <div className="vpControl">
              <label htmlFor="start_dateTm">
              Start Time :
                <input
                  type="datetime-local"
                  value={start_dateTm}
                  step="1"
                  onChange={this.handleChange}
                  name="start_dateTm"
                  id="start_dateTm"
                />
              </label>
              <label htmlFor="end_dateTm">
              End Time :
                <input
                  type="datetime-local"
                  value={end_dateTm}
                  step="1"
                  onChange={this.handleChange}
                  name="end_dateTm"
                  id="end_dateTm"
                />
              </label>
              <select
                onChange={this.handleChange}
                value={quality}
                name="quality"
              >
                {list}
              </select>
              <Button className="float-right" variant="primary" onClick={this.handleSubmit} >Start</Button>
            </div>
            <SegsList {...segsListProps} />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  segs: PropTypes.any,
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  onChangeSegInfo: PropTypes.func,
  onGetSeglist: PropTypes.func,
};
