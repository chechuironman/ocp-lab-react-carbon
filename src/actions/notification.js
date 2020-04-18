import React from 'react';
// import { render } from 'react-dom';
import { InlineNotification } from 'carbon-components-react';

// require("./style.scss");

// const App = () => {
//   return <TestComponent />;
// };

export default class notificationLab extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      notifications: [],
      nextId: 1,
    };
  }

  componentDidMount() {
    // set one notification initially
    this.addNotification();
  }

  addNotification() {
    let notificationId = 2;
    // this.setState(prevState => {
    //   const notificationId = prevState.nextId;

    setTimeout(() => {
      this.handleClose(notificationId);
    }, 2000);

    const newState = {
      nextId: 1,
      notifications: [
        {
          message: 'Notification',
          detail: Math.random()
            .toString(36)
            .substring(7),
          severity: 'warning',
          id: 2,
        },
      ],
    };

    return newState;
  }

  handleClose(id) {
    this.setState(prevState => ({
      notifications: prevState.notifications.filter(n => n.id !== id),
    }));
  }

  renderNotifications() {
    return this.state.notifications.map(notification => {
      return (
        <InlineNotification
          title={notification.message}
          subtitle={notification.detail}
          kind={notification.severity}
          onCloseButtonClick={this.handleClose.bind(this, notification.id)}
          key={notification.id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        {/* <button
          style={{ height: "50px" }}
          onClick={this.addNotification.bind(this)}
        >
          Add Notification
        </button> */}
        {this.state.notifications.length !== 0 && this.renderNotifications()}
        <h1>Current notification state:</h1>
        <br />
        <p>{JSON.stringify(this.state.notifications)}</p>
      </div>
    );
  }
}

// render(<App />, document.getElementById("root"));
