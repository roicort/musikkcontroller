import React from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../constants/routes.json';

import 'app.global.css';

import { Input  } from 'antd';
const { Search } = Input;
import { Layout } from 'antd';
const { Footer, Content } = Layout;
import { Row, Col } from 'antd';

export default function Home() {
  const history = useHistory();

  function setport(port: string) {
    if (port != ""){
      const { ipcRenderer } = require('electron')
      console.log(ipcRenderer.sendSync('StartBridge', port))
    history.push(routes.COUNTER);
    }
  }
  return (
      <div className="App">
        <Layout>
          <Footer>OSController</Footer>
          <Layout>
            <Content>
               <Row>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                    <Search
                    placeholder="port"
                    enterButton="Go"
                    size="large"
                    onSearch={value => setport(value)}
                  />
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                </Col>
              </Row>
            </Content>
          </Layout>
          <Footer>MyT ENES Morelia</Footer>
        </Layout>
      </div>
  );
}
