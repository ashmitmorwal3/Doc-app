import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  //delete notification

  const handleDeleteAllRead = async() => {
     
    try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/user/delete-all-notification",
          {
            userId: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error("somthing went wrong");
      }    


  };
  return (
    <Layout>
      <h4 className="p-3 text-center" style={{ color: 'red' }} >Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab={<h4 className="unread-tab " style={{ color: 'orange', margin: '10px'}} >Unread</h4>} key={0}>
          <div className ="d-flex justify-content-end" >
            <h4 className="p-2 text-primary "style={{ cursor: "pointer",fontSize: "22px", fontFamily: "Arial, sans-serif"  }} onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.notifcation.map((notificationMgs) => (
            <div className="card m-2"  style={{ backgroundColor: 'black', border: '1px solid black' , cursor: "pointer"}} >
              <div
                className="card-text p-2" style={{ color: 'orange', border: '1px solid orange', borderRadius: '5px', cursor: "pointer"}}
                onClick={() => navigate(notificationMgs.onClickPath)}>
              
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane  tab={<h4 className="read-tab" style={{ color: 'orange', margin: '5px' }} >Read</h4>} key={1}>
          <div className="d-flex justify-content-end"  >
            <h4 className="p-2 text-primary"  style={{ cursor: "pointer",fontSize: "22px", fontFamily: "Arial, sans-serif" }} onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
          {user?. seennotification.map((notificationMgs) => (
            <div className="card m-2"  style={{ backgroundColor: 'black', border: '1px solid black' , cursor: "pointer"}} >
              <div
                className="card-text p-2" style={{ color: 'orange', border: '1px solid orange', borderRadius: '5px', cursor: "pointer"}}
                onClick={() => navigate(notificationMgs.onClickPath)}>
              
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;