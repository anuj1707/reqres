import React, { Component } from "react";
import { Media, Button } from "reactstrap";

import InfiniteScroll from "react-infinite-scroll-component";
import "./UsersList.css";

export default class UsersList extends Component {
  state = {
    data: [],
    hasMore: true,
  };

  componentDidMount = async () => {
    // try {
    let response = await fetch("https://reqres.in/api/users?page=1");

    let result = await response.json();

    if (result.error) {
      console.log("error: ", result.error);
      //   setError(result.error);
    } else {
      //   setIsLogged(true);
    }
    console.log("res", result);
    this.setState(() => {
      return { data: result.data };
    });
    console.log(this.state);
    //   } catch (err) {
    //     alert(err); // TODO: ERROR
  };

  fetchMoreData = async () => {
    if (this.state.data.length >= 12) {
      this.setState({ hasMore: false });
      return;
    }
    // try {
    let response = await fetch("https://reqres.in/api/users?page=2");
    let result = await response.json();
    console.log("result from 2nd fetch: ", result);

    if (result.error) {
      console.log("error: ", result.error);
      //   setError(result.error);
    } else {
      // SetTimeout для наглядности загрузки
      setTimeout(() => {
        this.setState((state) => {
          return { data: state.data.concat(result.data) };
        });
        console.log("state after 2nd fetch: ", this.state);
      }, 1000);
      //   setIsLogged(true);
    }
    console.log("res from fetch", result);
    //   } catch (err) {
    //     alert(err); // TODO: ERROR
  };

  async onDeleteUser(id) {
    // try {
    let response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });
    let result = await response;
    if (result.status === 204) {
      let filteredData = this.state.data;
      filteredData.splice(
        filteredData.findIndex((item) => item.id === id),
        1
      );
      this.setState(() => {
        return { data: filteredData };
      });
      console.log("state after delete: ", this.state);
    }
  }

  async onEditUser(id) {
    // try {
    let response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Harold",
        email: 'hidethepain@gmail.com',
        avatar: 'https://yt3.ggpht.com/a/AATXAJwQnoYBaHCCtNgm2GUhFEVcBXJaKy2atIddqA=s900-c-k-c0xffffffff-no-rj-mo'
      }),
    });
    let result = await response.json();
    let filteredData = this.state.data;
    let user = filteredData.find((item) => item.id === id);
    user.first_name = "Harold";
    user.email = 'hidethepain@gmail.com'
    user.avatar = 'https://yt3.ggpht.com/a/AATXAJwQnoYBaHCCtNgm2GUhFEVcBXJaKy2atIddqA=s900-c-k-c0xffffffff-no-rj-mo'
    this.setState(() => {
      return { data: filteredData };
    });
    // if (result.status === 200) {
    //   let filteredData = this.state.data;
    //   filteredData.splice(
    //     filteredData.findIndex((item) => item.id === id),
    //     1
    //   );
    //   this.setState(() => {
    //     return { data: filteredData };
    //   });
    console.log("result after edit: ", result);
    console.log("state after delete: ", this.state);
    // }
  }

  render() {
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.data.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          height={600}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Всё! Данных больше нет</b>
            </p>
          }
        >
          {this.state.data.map((item) => {
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
