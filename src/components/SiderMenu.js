import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Switch, Route, Redirect, useLocation, useHistory, useParams } from 'react-router-dom';
import { LaptopOutlined , MobileOutlined } from '@ant-design/icons';

import DisplayDevices from './DisplayDevices';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ['laptops', 'mobiles'];

const SiderMenu =props=> {
const [ collapsed, setCollaped ] = React.useState(false);
const [types, setType]=React.useState(["laptops"]);
const [category, setCategory]=React.useState("all");
let history = useHistory();
let location = useLocation();
let { type } = useParams();
const onClick=item=>{
    setCategory(item.key)
    history.push(`/${types}/${item.key}`);
}

const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => types.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setType(keys);
    } else {
        setType(latestOpenKey ? [latestOpenKey] : []);
    }
  };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={collapsed=>setCollaped(collapsed)}>
          <div className="logo" >Devices</div>
          <Menu onOpenChange={onOpenChange} onClick={onClick} theme="dark" openKeys={types} selectedKeys={[category]} mode="inline">
            <SubMenu key="laptops" icon={<LaptopOutlined  />} title="Laptops">
              <Menu.Item key="all">All</Menu.Item>
              <Menu.Item key="dell">Dell</Menu.Item>
              <Menu.Item key="lenovo">Lenevo</Menu.Item>
              <Menu.Item key="others">Others</Menu.Item>
            </SubMenu>
            <SubMenu key="mobiles" icon={<MobileOutlined  />} title="Mobiles">
            <Menu.Item key="All">All</Menu.Item>
              <Menu.Item key="samsung">Samsung</Menu.Item>
              <Menu.Item key="oppo">Oppo</Menu.Item>
              <Menu.Item key="others">Others</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <div className="title" >
                ShopBridge
            </div>
            <div className="title2">
                <span className="mr-15 color-nav">
                    About
                </span>
                <span className="mr-15 color-nav">
                    Login
                </span>
                <span className="color-nav">
                   Logout
                </span>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route exact path="/laptops/:type">
                <DisplayDevices type="LAPTOPS" category={category} key={`laptops_${category}`} />
             </Route>
             <Route path="/mobiles/:type">
              <DisplayDevices type="MOBILES" category={category} key={`mobiles_${category}`} />
             </Route>
             <Redirect to="/laptops/all" />
        </Switch>
          </Content>
        </Layout>
      </Layout>
    );
}
export default SiderMenu;