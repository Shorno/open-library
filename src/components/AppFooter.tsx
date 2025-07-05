import { Layout, Space, Typography } from "antd";
import { Link } from "react-router";
import { GithubOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const { Text } = Typography;

const GITHUB_URL = "https://github.com/Shorno/open-library";

const AppFooter = () => (
    <Footer style={{ textAlign: "center", background: "#fafafa", padding: "24px 8px 16px 8px" }}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <Space size="middle" wrap>
                <Link to="/" style={{ color: "#357180", fontWeight: 500 }}>All Books</Link>
                <Link to="/add-book" style={{ color: "#357180", fontWeight: 500 }}>Add Book</Link>
                <Link to="/borrow-summary" style={{ color: "#357180", fontWeight: 500 }}>Borrow Summary</Link>
                <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#222", fontWeight: 500, display: "inline-flex", alignItems: "center" }}
                >
                    <GithubOutlined style={{ fontSize: 18, marginRight: 4 }} />
                    <span>GitHub</span>
                </a>
            </Space>
            <Text type="secondary" style={{ fontSize: 13 }}>
                E-Library &copy; {new Date().getFullYear()} &mdash; Made with Ant Design
            </Text>
        </Space>
    </Footer>
);

export default AppFooter;
