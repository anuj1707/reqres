import React, { Component } from "react";
import { Media } from "reactstrap";

import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  borderRadius: "5px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  color: "#4A4A4A",
  border: "1px solid lightgray",
  margin: "10px",
  // maxHeight:"50vh"
};

const imgStyle = {
  height: "90px",
  width: "90px",
  marginRight: "10px",
};

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
      }, 1000);
      //   setIsLogged(true);
    }
    console.log("res from fetch", result);
    console.log("state after 2nd fetch: ", this.state);
    //   } catch (err) {
    //     alert(err); // TODO: ERROR
  };

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
              <Media key={item.id} style={style}>
                <Media left href="#">
                  <Media object src={item.avatar} style={imgStyle} alt="" />
                </Media>
                <Media body>
                  <Media heading>{item.first_name}</Media>
                  {item.email}
                </Media>
              </Media>
            );
          })}
        </InfiniteScroll>
      </div>
    );
  }
}
