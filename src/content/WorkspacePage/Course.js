import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Course extends React.Component {
  constructor() {
    super();

    this.state = {
      course: '',
      course_loaded: false,
    };
  }

  render() {
    const loaded = this.props.data.course_loaded;
    console.log(this.props.data);
    // console.log(this.props.data);
    if (loaded) {
      return (
        <div>
          <div className="bx--grid bx--grid--full-width bx--grid--no-gutter repo-page">
            <div className="bx--row repo-page__r1">
              <div className="landing-page__p user-banner">
                {' '}
                <p className="productive-heading-02">
                  Course: {this.props.data.courseName}
                </p>
                <p>OC user: {this.props.data.oc_user}</p>
                <p>OC Password: {this.props.data.oc_passwd}</p>
                <p>SSH user: {this.props.data.ssh_user}</p>
                <p>SSH Password: {this.props.data.ssh_passwd}</p>
                <p>SSH Host: {this.props.data.ssh_host}</p>
                <p>GitHub: </p>
                <a
                  href={this.props.data.github}
                  target="_blank"
                  className="bx--link"
                  rel="noopener noreferrer"
                  >
                  {' '}
                  {this.props.data.github}{' '}
                </a>
                <p>Openshift Instance: </p>
                <a
                  href={this.props.data.oc_instance}
                  target="_blank"
                  className="bx--link"
                  rel="noopener noreferrer"
                  >
                  {' '}
                  {this.props.data.oc_instance}{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div data-loading className="bx--loading">
        <svg className="bx--loading__svg" viewBox="-75 -75 150 150">
          <title>Loading</title>
          <circle className="bx--loading__stroke" cx="0" cy="0" r="37.5" />
        </svg>
      </div>
    );
  }
}
Course.propTypes = {
  //   logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { Course })(Course);
