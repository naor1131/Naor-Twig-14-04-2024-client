import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotification, NotificationType } from "../../services/notification-service";
import { v4 as uuid_v4 } from "uuid";

export interface NotificationState {
  // settings:
  notifications: INotification[];
}

const initialState: NotificationState = {
  notifications: [],
};

export interface INotificationPayload {
  type: NotificationType;
  title: string;
  message: string;
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotificationPayload>) => {
      const newNotificationId = uuid_v4();
      const notification: INotification = {
        id: newNotificationId,
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
        creatorName: "",
        creationDate: new Date().getTime(),
      };

      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter((notification) => notification.id !== newNotificationId);
      }, 10000);

      return state;
    },
  },
  // extraReducers: (builder) => {},
});

export const { addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
