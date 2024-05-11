import React from "react";
import { INotification } from "../../services/notification-service";

import "./notification.scss";

export interface INotificationProps {
  notification: INotification;
}

const Notification = ({ notification }: INotificationProps) => {
  return (
    <div className="notification">
      <div className="header">
        <div className="buttons">
          <div className="button-remove"></div>
        </div>
        <div className="title">{notification.title}</div>
      </div>
      <div className="content">
        <div className="message">{notification.message}</div>
      </div>
      <div className="footer">
        <div className="timestamp">{new Date(notification.creationDate).toDateString()}</div>
      </div>
    </div>
  );
};

export default Notification;
