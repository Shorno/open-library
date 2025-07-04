import {
    Table,
    Button,
    Tag,
    Space,
    Result,
    Empty,
    Modal,
    notification,
    Typography,
    Row, Col, Flex
} from "antd";
import type {Book} from "../features/library/types.ts";
import {useDeleteBookMutation, useGetBooksQuery} from "../features/library/libraryApiSlice.ts";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import UpdateBookModal from "./UpdateBookModal.tsx";
import {useState} from "react";
import {Link} from "react-router";

const {Text} = Typography

const BookTable = () => {
    const {data: bookList, isLoading, isError} = useGetBooksQuery();
    const [deleteBook] = useDeleteBookMutation();
    const [editingBook, setEditingBook] = useState<Book | null>(null);


    const handleDelete = async (record: Book) => {
        try {
            const res = await deleteBook(record._id).unwrap();
            notification.success({message: res.message || "Book deleted successfully"});
        } catch (error: any) {
            notification.error({message: error?.data?.message || "Failed to delete book"});
        }
    };

    const showDeleteModal = (record: Book) => {
        Modal.confirm({
            title: "Delete Book",
            content: (
                <div style={{fontSize: 14}}>
                    <p style={{marginBottom: 16}}>
                        Are you sure you want to delete this book?
                    </p>
                    <div style={{marginBottom: 8}}>
                        <Text strong>Title:</Text>{" "}
                        <Text ellipsis style={{maxWidth: 400, display: "inline-block", verticalAlign: "middle"}}>
                            {record.title}
                        </Text>
                    </div>
                    <Row gutter={[12, 6]}>
                        <Col span={12}>
                            <Text>
                                <Text strong>Author:</Text> {record.author}
                            </Text>
                        </Col>
                        <Col span={12}>
                            <Text>
                                <Text strong>Genre:</Text> <Tag color="blue">{record.genre}</Tag>
                            </Text>
                        </Col>
                        <Col span={12}>
                            <Text>
                                <Text strong>ISBN:</Text> {record.isbn}
                            </Text>
                        </Col>
                        <Col span={12}>
                            <Text>
                                <Text strong>Copies:</Text> {record.copies}
                            </Text>
                        </Col>
                        <Col span={12}>
                            <Text>
                                <Text strong>Available:</Text>
                                <Tag color={record.available ? "green" : "red"} style={{marginLeft: 4}}>
                                    {record.available ? "Yes" : "No"}
                                </Tag>
                            </Text>
                        </Col>
                    </Row>
                </div>
            ),
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => handleDelete(record),
        });
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (title: string, record: Book) => <Link to={`/book-details/${record._id}`}>{title}</Link>
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Genre",
            dataIndex: "genre",
            key: "genre",
            render: (genre: string) => <Tag color="blue">{genre}</Tag>,
        },
        // {
        //     title: "ISBN",
        //     dataIndex: "isbn",
        //     key: "isbn",
        // },
        // {
        //     title: "Copies",
        //     dataIndex: "copies",
        //     key: "copies",
        // },
        // {
        //     title: "Available",
        //     dataIndex: "available",
        //     key: "available",
        //     render: (available: boolean) =>
        //         available ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
        // },
        {
            title: "Actions",
            key: "actions",
            render: (record: Book) => (
                <Space>
                    <Button
                        onClick={() => setEditingBook(record)}
                    >
                        <EditOutlined/>
                    </Button>
                    <Button
                        danger
                        onClick={() => showDeleteModal(record)}
                    >
                        <DeleteOutlined/>
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>

            <Flex justify={"center"}>
                <Col lg={18}>
                    <Table
                        loading={isLoading}
                        rowKey="_id"
                        caption={""}
                        locale={{
                            emptyText: isError ?
                                <Result
                                    status="warning"
                                    title="Failed to fetch books, please try again later."
                                />
                                :
                                <Empty description={"No books found"}/>
                        }}
                        columns={columns}
                        dataSource={bookList?.data}
                        pagination={{pageSize: 10}}
                        scroll={{x: "max-context"}}
                    />
                </Col>
            </Flex>
            <UpdateBookModal
                open={!!editingBook}
                onClose={() => setEditingBook(null)}
                book={editingBook}
            />
        </>
    );
};

export default BookTable;