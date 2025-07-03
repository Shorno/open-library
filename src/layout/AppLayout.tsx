import {Layout, Menu} from 'antd';
import {Outlet, Link, useLocation} from 'react-router';
import {useDeviceType} from "../hooks/useDeviceType.tsx";

const {Header, Content, Footer} = Layout;
const items = [
    {key: '1', label: <Link to="/">All Books</Link>, to: "/",},
    {key: '2', label: <Link to="/add-book">Add Book</Link>, to: "/add-book"},
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
            <Content>
                    <div className={`${isMobile ? "p-2" : "p-6"}`}>
                        <Outlet/>
                    </div>
            </Content>
            <Footer className="text-center">
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default AppLayout;
