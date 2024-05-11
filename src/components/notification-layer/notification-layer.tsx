import React from "react";
import { INotification } from "../../services/notification-service";
import Notification from "../notification/notification";
import { ConnectedProps, connect, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { addNotification } from "../../state/slices/NotificationsSlice";

import "./notification-layer.scss";

export interface INotificationLayerProps {
  // notifications: INotification[];
}

type PropsFromRedux = ConnectedProps<typeof connector>;

export const NotificationLayer = ({ notifications, addNotification }: PropsFromRedux) => {
  // const notifications = useSelector((state: RootState) => state.NotificationsReducer.notifications);

  return (
    <div className="notifications-layer">
      <div className="notification-list">
        {notifications.map((notification) => {
          return <Notification key={notification.id} notification={notification} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  notifications: state.NotificationsReducer.notifications,
});

const mapDispatchToProps = {
  addNotification,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NotificationLayer);
