import React, { Component } from "react";
import { Audio } from "react-loader-spinner";

export default class Ipinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      isLoading: true,
    };
  }
  async getIp() {
    const response = await fetch("https://api.ipify.org?format=json");
    return (await response.json()).ip;
  }
  async getInfo() {
    const ip = await this.getIp();
    const response = await fetch(`http://ipwho.is/${ip}`);
    return await response.json();
  }
  componentDidMount() {
    this.getInfo().then((data) => {
      this.setState({
        info: data,
        isLoading: false,
      });
    });
  }
  render() {
    console.log(this.state.info);
    return (
      <>
        {this.state.isLoading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        )}
        {!this.state.isLoading && (
          <div className="card-container">
            <span className="info">Info</span>
            <img
              className="round"
              src={this.state.info.flag.img}
              alt={this.state.info.country}
            />
            <h3>{this.state.info.country}</h3>
            <h6>{this.state.info.city}</h6>
            <p>isp: {this.state.info.connection.isp}</p>
            <div className="footer">
              <p>IP: {this.state.info.ip}</p>
              <p>latitude: {this.state.info.latitude}</p>
              <p>longitude: {this.state.info.longitude}</p>
            </div>
          </div>
        )}
      </>
    );
  }
}
