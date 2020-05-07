import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import { Button } from 'antd';
import 'app.global.css';

var QRCode = require('qrcode.react');

import { Layout } from 'antd';
const { Footer, Content } = Layout;
import { Row, Col } from 'antd';

var getIPAddresses = function () {
  var os = require("os"),
  interfaces = os.networkInterfaces(),
  ipAddresses = [];

  for (var deviceName in interfaces){
      var addresses = interfaces[deviceName];

      for (var i = 0; i < addresses.length; i++) {
          var addressInfo = addresses[i];

          if (addressInfo.family === "IPv4" && !addressInfo.internal) {
              ipAddresses.push(addressInfo.address);
          }
      }
  }

  return ipAddresses;
};

var ipAddress = "http://"+String(getIPAddresses())+":8084";
console.log(ipAddress)
export default function Counter() {
  function onclick(ipAddres){
    const { BrowserWindow } = require('electron').remote
    let win = new BrowserWindow({ width: 800, height: 455, titleBarStyle: 'hidden'})
    win.loadURL(ipAddress)
  }
  return (
    <div className="App">
    <Layout>
      <Footer>musikkcontroller</Footer>
      <Layout>
        <Content>
           <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            </Col>
            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
            <QRCode value={ipAddress} />
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer><Button onClick={ipAddres => onclick(ipAddres)}>Go</Button></Footer>
    </Layout>
  </div>
  );
}