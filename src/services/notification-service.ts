import { v4 as uuid_v4 } from "uuid";

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

interface INotificationServiceSettings {
  // Timeout duration for auto-dismissing notifications (in milliseconds)
  dismissTimeoutMS: number;

  // Maximum number of notifications to display at once
  maxDisplayedNotifications: number;

  // Default notification type
  defaultNotificationType: NotificationType;
}

const DEFAULT_SETTINGS: INotificationServiceSettings = {
  dismissTimeoutMS: 5000,
  maxDisplayedNotifications: 5,
  defaultNotificationType: NotificationType.INFO,
};

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  creatorName: string;
  creationDate: number;
}

export class NotificationService {
  private _settings: INotificationServiceSettings;
  private _notifications: Map<String, INotification>;
  private _activeNotificationsIds: Set<string>;

  constructor(settings: INotificationServiceSettings = DEFAULT_SETTINGS) {
    this._settings = settings;
    this._notifications = new Map();
    this._activeNotificationsIds = new Set();
  }

  get activeNotifications(): INotification[] {
    return Array.from(this._notifications.values()).filter((notification) => this._activeNotificationsIds.has(notification.id));
  }

  addNotification(type: NotificationType, title: string, message: string): string {
    const newNotificationId = uuid_v4();
    const notification: INotification = {
      id: newNotificationId,
      title,
      message,
      type,
      creatorName: "",
      creationDate: new Date().getTime(),
    };

    this._notifications.set(newNotificationId, notification);

    this.activateNotificationWithDismiss(newNotificationId);

    return newNotificationId;
  }

  private activateNotificationWithDismiss(notificationId: string) {
    this._activeNotificationsIds.add(notificationId);
    setTimeout(() => {
      this._activeNotificationsIds.delete(notificationId);
    }, this._settings.dismissTimeoutMS);
  }

  removeNotification(notificationId: string): boolean {
    return this._notifications.delete(notificationId);
  }

  clearNotifications() {
    this._notifications = new Map();
  }
}
