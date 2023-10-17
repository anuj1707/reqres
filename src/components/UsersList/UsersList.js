import React, { useEffect, useState } from "react";
import { Media, Button } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./UsersList.css";
import * as actions from "../../actions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const UsersList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const history = useHistory();

  const handleRedirect = (id) => {
    onDeleteUser(id)
// Use history.push to navigate to the desired page
history.push('/updateUser');
};
  useEffect(() => {
    if (props.data.length === 0) {
      fetchData();
    } else {
      props.addUserSuccess();
    }
  }, []); // Empty dependency array means this effect runs only once, like componentDidMount

  const fetchData = async () => {
    try {
      let response = await fetch("https://reqres.in/api/users?page=1");
      let result = await response.json();
      if (result.error) {
        alert(result.error);
      } else {
        props.fetchData(result.data);
      }
    } catch (err) {
      alert(err);
    }
  };

  const fetchMoreData = async () => {
    if (props.data.length >= 12) {
      props.hasNoMoreData();
      return;
    }
    try {
      let response = await fetch("https://reqres.in/api/users?page=2");
      let result = await response.json();
      setTimeout(() => {
        props.updateUserList(props.data.concat(result.data));
      }, 1000);
    } catch (err) {
      alert(err);
    }
  };

  const onDeleteUser = async (id) => {
    try {
      let response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });
      let result = await response;
      if (result.status === 204) {
        let filteredData = [...props.data];
        filteredData.splice(
          filteredData.findIndex((item) => item.id === id),
          1
        );
        props.updateUserList(filteredData);
      }
    } catch (err) {
      alert(err);
    }
  };

   const onEditUser = async (id) => {
   

   };

  const { data, hasMore, isLogged } = props;
  if (!isLogged) {
    return <Redirect to="/" />;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const canNavigatePrevious = currentPage > 1;
  const canNavigateNext = currentUsers.length === usersPerPage && hasMore;

  return (
    
    <div className="users-list-container">
      <InfiniteScroll
        dataLength={currentUsers.length}
        next={fetchMoreData}
        hasMore={hasMore}
        height={600}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b></b>
          </p>
        }
      >
    
        {currentUsers.map((item) => {
          return (
            <div key={item.id}>
              <Media className="users-list-card">
                <Media body>
                  <Media heading>{item.first_name}</Media>
                  {item.email}
                </Media>
                <div className="userslist-btn-group">
                <Button color="danger"
                    size="sm"
                    onClick={() => handleRedirect(item.id)}>
  Edit
                  </Button>{" "}
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => onDeleteUser(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Media>
            </div>
          );
        })}
      </InfiniteScroll>
      <div className="pagination-buttons">
        {canNavigatePrevious && (
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {canNavigateNext && (
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ data, isLogged, hasMore }) => {
  return {
    data,
    isLogged,
    hasMore,
  };
};

export default connect(mapStateToProps, actions)(UsersList);
