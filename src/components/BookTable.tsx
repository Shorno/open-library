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
    Row, Col
} from "antd";
import {useState} from "react";
import type {Book} from "../features/library/types.ts";
import {useDeleteBookMutation, useGetBooksQuery} from "../features/library/libraryApiSlice.ts";

const {Text} = Typography

const BookTable = () => {
    const {data: bookList, isLoading, isError} = useGetBooksQuery();
    const [deleteBook, {isLoading: isDeleting}] = useDeleteBookMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const showDeleteModal = (book: Book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!selectedBook) return;
        try {
            const res = await deleteBook(selectedBook._id).unwrap();
            notification.success({message: res.message || "Book deleted successfully"});
            setIsModalOpen(false);
            setSelectedBook(null);
        } catch (error: any) {
            notification.error({message: error?.data?.message || "Failed to delete book"});
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
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
        {
            title: "ISBN",
            dataIndex: "isbn",
            key: "isbn",
        },
        {
            title: "Copies",
            dataIndex: "copies",
            key: "copies",
        },
        {
            title: "Available",
            dataIndex: "available",
            key: "available",
            render: (available: boolean) =>
                available ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (record: Book) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => alert(`Edit book: ${record.title}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => showDeleteModal(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
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

            <Modal
                title="Delete Book"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Delete"
                cancelText="Cancel"
                okType="danger"
                confirmLoading={isDeleting}
            >
                {selectedBook && (
                    <div style={{fontSize: 14}}>
                        <p style={{marginBottom: 16}}>
                            Are you sure you want to delete this book?
                        </p>
                        <div style={{marginBottom: 8}}>
                            <Text strong>Title:</Text>{" "}
                            <Text ellipsis style={{maxWidth: 400, display: "inline-block", verticalAlign: "middle"}}>
                                {selectedBook.title}
                            </Text>
                        </div>
                        <Row gutter={[12, 6]}>
                            <Col span={12}>
                                <Text>
                                    <Text strong>Author:</Text> {selectedBook.author}
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Text>
                                    <Text strong>Genre:</Text> <Tag color="blue">{selectedBook.genre}</Tag>
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Text>
                                    <Text strong>ISBN:</Text> {selectedBook.isbn}
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Text>
                                    <Text strong>Copies:</Text> {selectedBook.copies}
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Text>
                                    <Text strong>Available:</Text>
                                    <Tag color={selectedBook.available ? "green" : "red"} style={{marginLeft: 4}}>
                                        {selectedBook.available ? "Yes" : "No"}
                                    </Tag>
                                </Text>
                            </Col>
                        </Row>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default BookTable;