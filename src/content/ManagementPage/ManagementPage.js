/* eslint-disable */ 
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableCourse from './TableCourse.js';
import { registerCourse, data, listClusters } from './helpers';
import { logoutUser } from '../../actions/authActions';
import './_management-page.scss';
import { Dropdown } from 'carbon-components-react';


import {
  TextInput,
  DatePicker,
  DatePickerInput,
} from 'carbon-components-react';

class RegisterCourse extends Component {
  constructor() {
    super();
    this.state = {
      courseName: '',
      courseID: '',
      github: '',
      expireDate: '',
      owner: '',
      courses: '',
      clusters: '',
      id:'',
      loaded: false,
      loaded_clusters:false,
      selectedItem:'',
      errors: {},
    };

  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      console.log(this.props.auth.isAuthenticated);
      console.log(this.props.auth);
      console.log(this.props.auth.user.name);
      if (this.props.auth.user.name === 'admin@chechu.com') {
        this.props.history.push('/management');
      } else {
        this.props.history.push('/workspace');
      }
    }
    this.props
    .listClusters(this.props.auth.user.name, this.state.selectedItem)
    .then(response => {
      console.log(response);
         this.setState({
      clusters: response.data,
      loaded_clusters: true,
    })   });

    this.props
    .data()
    .then(response =>{
      this.setState({
        courses: response,
        loaded: true,
      })
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  list_clusters = function() {
    const loaded = this.state.loaded;
    if (loaded) {
      const response = this.state.clusters;
      console.log(response);
      if (response.success != false) {
        console.log(response);
        this.state.options = response.map(category => ({
          id: category.id,
          text: category.name,
        }));
      } else {
        this.state.options = [];
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newCourse = {
      courseName: this.state.courseName,
      courseID: this.state.courseID,
      id: this.state.courseID,
      github: this.state.github,
      expireDate: this.state.expireDate,
      owner: this.state.owner,
      selectedItem: this.state.selectedItem
    };
    this.setState({
      loaded: false,
    })
    this.props.registerCourse(newCourse, this.props.history);
    this.props.data().then(response =>
      this.setState({
        courses: response,
        loaded: true,
      })
    );
    console.log(this.state.courses);
  };


  render() {
    this.list_clusters();
    const { errors } = this.state;
    const props = {
      datePicker: () => ({
        id: 'date-picker',
      }),
      datePickerInput: () => ({
        disabled: false,
        invalid: false,
        invalidText: 'A valid value is required',
        iconDescription: 'Icon description',
      }),
    };

    const loaded = this.state.loaded;
    const loaded_clusters = this.state.loaded_clusters;
    if (loaded & loaded_clusters) {
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
                    <form className="form_lab-lab" onSubmit={this.onSubmit}>
                      <section>
                        <div className="bx--form-item">
                          <TextInput
                            id="course_name"
                            labelText="Course Name"
                            value={this.state.courseName}
                            placeholder="Enter Course Name"
                            className="text-input"
                            error={errors.courseName}
                            onChange={event =>
                              this.setState({ courseName: event.target.value })
                            }></TextInput>
                          <span className="red-text">{errors.courseName} </span>
                          <TextInput
                            id="course_id"
                            labelText="Course ID"
                            value={this.state.courseID}
                            placeholder="Enter Course ID"
                            className="text-input"
                            error={errors.courseID}
                            onChange={event =>
                              this.setState({ courseID: event.target.value })
                            }></TextInput>
                          <span className="red-text">{errors.courseID} </span>
                          <TextInput
                            id="github"
                            type="url"
                            labelText="GitHub URL"
                            value={this.state.github}
                            placeholder="Enter GitHub URL"
                            error={errors.github}
                            className="text-input"
                            onChange={event =>
                              this.setState({ github: event.target.value })
                            }
                          />
                          <span className="red-text">{errors.github} </span>

                          <DatePicker
                            {...props.datePicker()}
                            dateFormat={'m/d/Y'}
                            short={false}
                            datePickerType="simple"
                            className="data-picker-input">
                            <DatePickerInput
                              id="expireDate"
                              labelText="Expire Date"
                              value={this.state.expireDate}
                              error={errors.expireDate}
                              onChange={event =>
                                this.setState({
                                  expireDate: event.target.value,
                                })
                              }
                              {...props.datePickerInput()}
                            />
                          </DatePicker>
                          <span className="red-text">{errors.expireDate} </span>
                          <TextInput
                            id="owner"
                            labelText="Owner"
                            value={this.state.owner}
                            placeholder="Enter Owner"
                            error={errors.owner}
                            className="text-input"
                            onChange={event =>
                              this.setState({ owner: event.target.value })
                            }
                          />
                          <span className="red-text">{errors.expireDate} </span>
                          <Dropdown
                            // {...props()}
                            id="cluster"
                            label="Cluster..."
                            items={this.state.options}
                            itemToString={item => (item ? item.text : '')}
                            onChange={({ selectedItem }) =>
                              setTimeout(() => this.setState({ selectedItem }), 1000)
                            }
                            selectedItem={this.state.selectedItem}
                            className="bx--dropdown--auto-width"
                          />
                          <span className="red-text">{errors.owner} </span>
                          <fieldset>
                            <legend>Click Register when you're ready!</legend>
                            <button
                              className="bx--btn bx--btn--primary"
                              type="submit">
                              Register
                            </button>
                          </fieldset>
                        </div>
                      </section>
                    </form>
                  </div>
                  <div className="bx--col-md-4 bx--col-md-4-lab bx--offset-lg-1 bx--col-lg-8">
                    <form
                      className="table_lab-lab"
                      onSubmit={this.onLogoutClick}>
                      <section>
                        <TableCourse
                          className="bx--data-table-container-lab"
                          data={this.state.courses.data}
                        />
                        <div>
                          <fieldset>
                            <button
                              className="bx--btn bx--btn--primary"
                              onClick={this.onLogoutClick}
                              type="submit">
                              LogOut
                            </button>
                          </fieldset>
                        </div>
                      </section>
                    </form>
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
RegisterCourse.propTypes = {
  registerCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerCourse, logoutUser, listClusters, data })(
  withRouter(RegisterCourse)
);
