/* eslint-disable */ 
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';
import './_register-page.scss';
import { InlineNotification } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';

const InvalidPasswordProps = {
  className: 'some-class',
  id: 'test4',
  labelText: 'Re-type Password',
  invalid: false,
  invalidText:
    'Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number.',
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      password: '',
      password2: '',
      notifications: [],
      nextId: 1,
      notificationId: '2',
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
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
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      companyName: this.state.companyName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
    console.log(newUser);
  };
  renderNotifications(message) {
    // alert("llega al");
    // return this.state.notifications.map(notification => {
    this.state.notificationId = this.state.notificationId + 1;
    this.state.nextId = this.state.nextId + 1;
    return (
      <InlineNotification
        title="Error"
        subtitle={message}
        message="Notification"
        detail={message}
        kind="error"
        id={this.state.notificationID}
        severity="error"
        // onCloseButtonClick={this.handleClose.bind(this, this.state.notificationId)}
        key={this.state.notificationId}
      />
    );

    // });
  }

  render() {
    const { errors } = this.state;
    if (this.state.errors.error) {
      console.log('entra en el if');
      console.log(this.state);
    }
    return (
      <div className="bx--grid bx--grid--full-width landing-page">
        <div className="bx--row landing-page__banner">
          {this.state.errors.error &&
            this.renderNotifications(this.state.errors.error)}

          <div className="bx--col-lg-16">
            <h1 className="landing-page__heading">Cloud Lab</h1>
          </div>
        </div>
        <div className="bx--row landing-page__r2">
          <div className="bx--col bx--no-gutter">
            <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
              <div className="bx--row landing-page__tab-content">
                <div className="bx--col-md-4 bx--col-lg-7">
                  <form className="form_lab" onSubmit={this.onSubmit}>
                    <section>
                      <div className="bx--form-item">
                        <TextInput
                          id="first_name"
                          labelText="First Name"
                          value={this.state.firstName}
                          placeholder="Enter First Name"
                          className={classnames('', {
                            invalid: errors.firstName,
                          })}
                          error={errors.firstName}
                          onChange={event =>
                            this.setState({ firstName: event.target.value })
                          }></TextInput>
                        <span className="red-text">{errors.firstName} </span>
                        <TextInput
                          id="last_name"
                          labelText="Last Name"
                          value={this.state.lastName}
                          placeholder="Enter Last Name"
                          className={classnames('', {
                            invalid: errors.lastName,
                          })}
                          error={errors.lastName}
                          onChange={event =>
                            this.setState({ lastName: event.target.value })
                          }></TextInput>
                        <span className="red-text">{errors.lastName} </span>
                        <TextInput
                          id="company_name"
                          labelText="Company Name"
                          value={this.state.companyName}
                          placeholder="Enter Company Name"
                          error={errors.companyName}
                          className={classnames('', {
                            invalid: errors.companyName,
                          })}
                          onChange={event =>
                            this.setState({ companyName: event.target.value })
                          }
                        />
                        <span className="red-text">{errors.companyName} </span>
                        <TextInput
                          id="email"
                          type="email"
                          labelText="E-mail"
                          value={this.state.email}
                          placeholder="Enter E-mail"
                          className={classnames('', { invalid: errors.email })}
                          error={errors.email}
                          onChange={event =>
                            this.setState({ email: event.target.value })
                          }></TextInput>
                        <span className="red-text">{errors.email} </span>
                        <TextInput
                          id="password"
                          labelText="Password"
                          type="password"
                          error={errors.password}
                          required
                          placeholder="Enter Password"
                          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                          onChange={event =>
                            this.setState({ password: event.target.value })
                          }
                        />
                        <span className="red-text">{errors.password}</span>
                        <TextInput
                          id="password2"
                          type="password"
                          error={errors.password2}
                          required
                          placeholder="Re-Type Password"
                          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                          onChange={event =>
                            this.setState({ password2: event.target.value })
                          }
                          {...InvalidPasswordProps}
                        />
                        <span className="red-text">{errors.password2}</span>
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
                <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8 image-centered">
                  <img
                    className="landing-page__illo"
                    src={`${process.env.PUBLIC_URL}/ibm.jpg`}
                    alt="Carbon illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
