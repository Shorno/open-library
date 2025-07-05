import {Layout, Menu, Drawer, Button} from 'antd';
import {Outlet, Link, useLocation} from 'react-router';
import {useDeviceType} from "../hooks/useDeviceType.tsx";
import {MenuOutlined} from '@ant-design/icons';
import {useState} from 'react';
import AppFooter from "../components/AppFooter.tsx";

const {Header, Content} = Layout;
const items = [
    {key: '1', label: <Link to="/">All Books</Link>, to: "/"},
    {key: '2', label: <Link to="/add-book">Add Book</Link>, to: "/add-book"},
    {key: '3', label: <Link to="/borrow-summary">Borrow Summary</Link>, to: "/borrow-summary"},
];

const AppLayout = () => {
    const location = useLocation();
    const {isMobile} = useDeviceType();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const selectedKey = items.find(item => item.to === location.pathname)?.key || '';

    return (
        <Layout className="min-h-screen!">
            <Header className="sticky top-0 z-10 w-full flex items-center bg-white!">
                <div className={"flex-1 min-w-0 flex container! mx-auto! gap-10  items-center"}>
                    <Link to={"/"} className={"flex justify-center items-center gap-2"}>
                        <img src={"/library.svg"} alt={"logo"} className={"size-12"}/>
                        <span className={"text-lg font-semibold text-[#357180]"}>E-Library</span>
                    </Link>
                    {isMobile ? (
                        <>
                            <Button
                                type="text"
                                icon={<MenuOutlined/>}
                                onClick={() => setDrawerOpen(true)}
                                className="ml-auto"
                            />
                            <Drawer
                                width={200}
                                title="Menu"
                                placement="left"
                                onClose={() => setDrawerOpen(false)}
                                open={drawerOpen}
                                styles={{
                                    body: {
                                        padding: 0
                                    }
                                }}
                                closeIcon={false}
                            >
                                <Menu
                                    mode="inline"
                                    selectedKeys={[selectedKey]}
                                    items={items}
                                    onClick={() => setDrawerOpen(false)}
                                />
                            </Drawer>
                        </>
                    ) : (
                        <Menu
                            className={"flex-1"}
                            mode="horizontal"
                            selectedKeys={[selectedKey]}
                            items={items}
                        />
                    )}
                </div>
            </Header>
            <Content>
                <div className={`${isMobile ? "p-4" : "p-6"}`}>
                    <Outlet/>
                </div>
            </Content>
            <AppFooter/>
        </Layout>
    );
};

export default AppLayout;
