import React, { Component } from "react";
import { Media, Button } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";
import "./UsersList.css";
import {
  fetchData,
  hasNoMoreData,
  loadMoreData,
  deleteUser,
  addUserSuccess,
} from "../../actions";
// import { dispatch } from "../../index";

class UsersList extends Component {
  componentDidMount = async () => {
    console.log(this.props.data);
    if (this.props.data.length === 0) {
      try {
        let response = await fetch("https://reqres.in/api/users?page=1");
        let result = await response.json();
        // console.log('result', result)
        if (result.error) {
          alert(result.error);
        } else {
          // console.log("res", result);
          this.props.fetchData(result.data);
          console.log("store: ", this.props.data);
        }
      } catch (err) {
        alert(err);
      }
    } else {
      this.props.addUserSuccess();
    }
  };

  fetchMoreData = async () => {
    if (this.props.data.length >= 12) {
      this.props.hasNoMoreData();
      return;
    }
    try {
      let response = await fetch("https://reqres.in/api/users?page=2");
      let result = await response.json();
      // console.log("result from 2nd fetch: ", result);

      if (result.error) {
        // console.log("error: ", result.error);
        //   setError(result.error);
      } else {
        // SetTimeout для наглядности загрузки
        setTimeout(() => {
          this.props.loadMoreData(this.props.data.concat(result.data));
        }, 1000);
      }
      // console.log("res from fetch", result);
    } catch (err) {
      alert(err);
    }
  };

  async onDeleteUser(id) {
    try {
      let response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });
      let result = await response;
      if (result.status === 204) {
        let filteredData = Object.assign([], this.props.data);
        filteredData.splice(
          filteredData.findIndex((item) => item.id === id),
          1
        );
        this.props.deleteUser(filteredData);
      }
    } catch (err) {
      alert(err);
    }
  }

  async onEditUser(id) {
    try {
      let response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Harold",
          email: "hidethepain@gmail.com",
          avatar:
            "https://yt3.ggpht.com/a/AATXAJwQnoYBaHCCtNgm2GUhFEVcBXJaKy2atIddqA=s900-c-k-c0xffffffff-no-rj-mo",
        }),
      });
      let result = await response.json();
      let filteredData = Object.assign([], this.props.data);
      let user = filteredData.find((item) => item.id === id);
      user.first_name = "Harold";
      user.email = "hidethepain@gmail.com";
      user.avatar =
        "https://yt3.ggpht.com/a/AATXAJwQnoYBaHCCtNgm2GUhFEVcBXJaKy2atIddqA=s900-c-k-c0xffffffff-no-rj-mo";

      //TODO: объединить экшны
      this.props.deleteUser(filteredData);

      console.log("result after edit: ", result);
      // }
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const { data, hasMore, isLogged } = this.props;
    if (!isLogged) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          height={600}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Всё! Данных больше нет</b>
            </p>
          }
        >
          {data.map((item) => {
            return (
              <div key={item.id}>
                <Media className="userslist-card">
                  <Media left href="#">
                    <Media
                      object
                      src={item.avatar}
                      className="userslist-img"
                      alt=""
                    />
                  </Media>
                  <Media body>
                    <Media heading>{item.first_name}</Media>
                    {item.email}
                  </Media>
                  <div className="userslist-btn-group">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => this.onEditUser(item.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => this.onDeleteUser(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Media>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => dispatch(fetchData(data)),
    hasNoMoreData: () => dispatch(hasNoMoreData()),
    loadMoreData: (data) => dispatch(loadMoreData(data)),
    deleteUser: (data) => dispatch(deleteUser(data)),
    addUserSuccess: () => dispatch(addUserSuccess()),
  };
};

const mapStateToProps = ({ data, isLogged, hasMore }) => {
  return {
    data,
    isLogged,
    hasMore,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
