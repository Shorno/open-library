import {Layout, Menu} from 'antd';
import {Outlet, Link, useLocation} from 'react-router';
import Breadcrumbs from "../components/Breadcrumbs.tsx";
import {useDeviceType} from "../hooks/useDeviceType.tsx";

const {Header, Content, Footer} = Layout;
const items = [
    {key: '1', label: <Link to="/">Home</Link>, to: "/",},
    {key: '2', label: <Link to="/list">List</Link>, to: "/list"},
];

const AppLayout = () => {
    const location = useLocation();
    const {isMobile} = useDeviceType()


    return (
        <Layout className={"min-h-screen!"}>
            <Header className="sticky top-0 z-10 w-full flex items-center bg-gray-900">
                <div className="demo-logo mr-4"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[
                        items.find(item => item.to === location.pathname)?.key || '1'
                    ]}
                    items={items}
                    className="flex-1 min-w-0"
                />
            </Header>
            <Content className={`${isMobile ? "px-4" : "px-12"}`}>
                <div className="py-6">
                    <Breadcrumbs/>
                    <div className={`bg-white rounded-lg shadow ${isMobile ? "p-2" : "p-6"}`}>
                        <Outlet/>
                    </div>
                </div>
            </Content>
            <Footer className="text-center">
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default AppLayout;
