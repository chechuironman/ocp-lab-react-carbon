/* eslint-disable */ 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import './_login-page.scss';
import { InlineNotification } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';

class Login extends Component {
  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      email: '',
      password: '',
      notifications: [],
      nextId: 1,
      notificationId: '2',
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.name === 'admin@chechu.com') {
        this.props.history.push('/management');
      } else {
        this.props.history.push('/workspace');
      }
    }
  }

  // addNotification() {
  //   this.setState(prevState => {
  //     const notificationId = prevState.nextId;

  //     setTimeout(() => {
  //       this.handleClose(notificationId);
  //     }, 2000);

  //     const newState = {
  //       nextId: notificationId + 1,
  //       notifications: [
  //         ...prevState.notifications,
  //         {
  //           message: "Notification",
  //           detail: Math.random()
  //             .toString(36)
  //             .substring(7),
  //           severity: "warning",
  //           id: prevState.nextId
  //         }
  //       ]
  //     };
  // console.log(newState);
  //       return newState;
  //     });
  //   }

  handleClose(id) {}

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
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (this.props.auth.user.name === 'admin@chechu.com') {
        this.props.history.push('/management');
      } else {
        this.props.history.push('/workspace');
      }
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    // if (this.state.errors.error){
    // }
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
                          id="email"
                          type="email"
                          labelText="E-mail"
                          value={this.state.email}
                          placeholder="Enter E-mail"
                          className="bx--text-input"
                          required
                          error={errors.email}
                          onChange={event =>
                            this.setState({ email: event.target.value })
                          }></TextInput>
                        <span className="red-text">{errors.email} </span>
                        <TextInput
                          id="password"
                          labelText="Password"
                          type="password"
                          placeholder="Password"
                          error={errors.password}
                          className="bx--text-input"
                          required
                          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                          onChange={event =>
                            this.setState({ password: event.target.value })
                          }
                        />
                        <span className="red-text">{errors.password}</span>
                        <fieldset>
                          <button
                            className="bx--btn bx--btn--primary"
                            type="submit">
                            Login
                          </button>
                        </fieldset>
                      </div>
                    </section>
                  </form>
                </div>
                <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
