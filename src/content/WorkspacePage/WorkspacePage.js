/* eslint-disable */ 
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Course from './Course.js';
import { logoutUser } from '../../actions/authActions';
import './_workspace-page.scss';
import { courseData } from './helpers';
import { listCourses } from './helpers';
import { Dropdown } from 'carbon-components-react';

// const axios = require('axios').default;
// const list_courses_service = require("../../config/keys").list_courses_service;
class Workspace extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      courseName: '',
      courseID: '',
      github: '',
      expireDate: '',
      owner: '',
      courses: '',
      loaded: false,
      options: '',
      value: '',
      selectedItem: '',
      oc_user: '',
      oc_passwd: '',
      oc_instance: '',
      ssh_host: '',
      course_loaded: false,
      errors: {},
    };
    // this.data = function() {
    //   console.log("llego");
    //   return new Promise((resolve, reject) => {
    //     const url = list_courses_service;
    //     axios.get(url).then(response => resolve(response));
    //   });
    // };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onSelect = e => {
    e.preventDefault();
    this.props
      .courseData(this.props.auth.user.name, this.state.selectedItem)
      .then(response => {
        var items = response.data.workspace;
        items.map((row, index) => {
          this.setState({
            oc_user: row.oc_user,
            oc_passwd: row.oc_passwd,
            ssh_user: row.ssh_user,
            ssh_passwd: row.ssh_passwd,
            ssh_host: row.ssh_host,
            value: response,
            github: row.github,
            oc_instance: row.oc_instance,
            courseName: row.courseName,
            user: row.user,
            course_loaded: true,
          });
        });
      });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.name === 'admin@chechu.com') {
        this.props.history.push('/management');
      } else {
        this.props.history.push('/workspace');
      }
    }
    this.props
      .listCourses(this.props.auth.user.name, this.state.selectedItem)
      .then(response => {
        console.log(response);
        this.setState({
          courses: response.data,
          loaded: true,
        });
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = e => {};

  select = function() {
    const loaded = this.state.loaded;
    if (loaded) {
      const response = this.state.courses;
      if (response.success != false) {
        this.state.options = response.map(category => ({
          id: category.courseID,
          text: category.courseName,
        }));
      } else {
        this.state.options = [];
      }
    }
  };

  render() {
    // const { errors } = this.state;
    this.select();
    console.log(this.state);
    const loaded = this.state.loaded;

    if (loaded) {
      return (
        <div className="bx--grid bx--grid--full-width landing-page">
          <div className="bx--header__global">
            {' '}
            Your Logged as {this.props.auth.user.name}
            <div>
              <fieldset>
                <button
                  className="bx--btn bx--btn--primary"
                  onClick={this.onLogoutClick}>
                  LogOut
                </button>
              </fieldset>
            </div>
          </div>
          <div className="bx--row landing-page__banner">
            <div className="bx--col-lg-16">
              <h1 className="landing-page__heading">Cloud Lab</h1>
            </div>
          </div>
          <div className="bx--row landing-page__r2">
            <div className="bx--col bx--no-gutter">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-4 bx--col-lg-7">
                    <h2 className="landing-page__subheading">
                      Cloud Lab WokSpace
                    </h2>

                    <Dropdown
                      // {...props()}
                      id="course"
                      label="Course..."
                      items={this.state.options}
                      itemToString={item => (item ? item.text : '')}
                      onChange={({ selectedItem }) =>
                        setTimeout(() => this.setState({ selectedItem }), 1000)
                      }
                      selectedItem={this.state.selectedItem}
                      className="bx--dropdown--auto-width"
                    />
                    <fieldset>
                      <legend>Select Course ...</legend>
                      <button
                        className="bx--btn bx--btn--primary"
                        onClick={this.onSelect}>
                        Select
                      </button>
                    </fieldset>
                  </div>
                  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
                    <Course data={this.state} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>Loading</div>;
  }
}
Workspace.propTypes = {
  Workspace: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  Workspace,
  logoutUser,
  courseData,
  listCourses,
})(withRouter(Workspace));
