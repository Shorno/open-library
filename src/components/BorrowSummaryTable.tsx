import {Table, Tag, Typography, Empty, Result, Col, Flex} from "antd";
import type {BookSummary} from "../features/library/types.ts";

const {Text} = Typography;


interface BorrowSummaryTableProps {
    data?: BookSummary[]
    isLoading?: boolean;
    isError?: boolean;
}

const BorrowSummaryTable = ({data, isLoading, isError}: BorrowSummaryTableProps) => {
    const columns = [
        {
            title: "Title",
            dataIndex: ["book", "title"],
            key: "title",
            render: (_: any, record: BookSummary) => (
                <div>
                    <Text strong>{record.book.title}</Text>
                    <br/>
                    <Text type="secondary" style={{fontSize: 12}}>
                        ISBN: {record.book.isbn}
                    </Text>
                </div>
            ),
        },
        {
            title: "Total Borrowed",
            dataIndex: "totalQuantity",
            key: "totalQuantity",
            render: (qty: number) => <Tag color="blue">{qty}</Tag>,
        },
    ];

    return (
        <Flex justify="center">
            <Col lg={18}>
                <Table
                    rowKey={record => record.book.isbn}
                    loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    locale={{
                        emptyText: isError ?
                            <Result
                                status="warning"
                                title="Failed to fetch borrow summary, please try again later."
                            />
                            :
                            <Empty description="No borrow summary data found"/>
                    }}
                />
            </Col>
        </Flex>
    );
};

export default BorrowSummaryTable;
