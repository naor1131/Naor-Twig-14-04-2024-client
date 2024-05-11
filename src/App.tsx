import React, { useEffect, useState } from "react";
import PDFViewer from "./components/pdf-viewer/pdf-viewer";
import FileUploader from "./components/file-uploader/file-uploader";
import NotificationLayer from "./components/notification-layer/notification-layer";
import { NotificationType } from "./services/notification-service";
import { useDispatch, useSelector } from "react-redux";
import { NotificationState, addNotification } from "./state/slices/NotificationsSlice";
import { RootState } from "./state/store";

import "./App.css";

function App() {
  // const [selectedFile, setSelectedFile] = useState<File>();

  const dispatch = useDispatch();
  // const notifications = useSelector((state: RootState) => state.NotificationsSlice.notifications);

  useEffect(() => {
    dispatch(
      addNotification({
        type: NotificationType.INFO,
        title: "Test Notification",
        message: "hey this is a check to see if notifications work.",
      })
    );
  }, []);

  // setTimeout(() => {
  //   dispatch(
  //     addNotification({
  //       type: NotificationType.SUCCESS,
  //       title: "Test Notification",
  //       message: "hey this is a check to see if notifications work.",
  //     })
  //   );
  // }, 2000);

  // setTimeout(() => {
  //   dispatch(
  //     addNotification({
  //       type: NotificationType.WARNING,
  //       title: "Test Notification",
  //       message: "hey this is a check to see if notifications work.",
  //     })
  //   );
  // }, 3000);

  // setTimeout(() => {
  //   dispatch(
  //     addNotification({
    //     type: NotificationType.ERROR,
    //     title: "Test Notification",
    //     message: "hey this is a check to see if notifications work.",
    //   })
    // );
  // }, 4000);

  return (
    <div className="App">
      <NotificationLayer />
    </div>
  );
}

export default App;
