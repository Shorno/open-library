import { useState } from "react";
import { Card, Typography, Divider, Tag, Descriptions, Button, Tooltip } from "antd";
import {
    BookOutlined,
    UserOutlined,
    CalendarOutlined,
    BarcodeOutlined,
} from "@ant-design/icons";
import type { Book } from "../features/library/types";
import BorrowBookModal from "./BorrowBookModal";

const { Title, Paragraph } = Typography;

export function BookDetailsCard({ book }: { book: Book }) {
    const [borrowModalOpen, setBorrowModalOpen] = useState(false);

    const handleOpenBorrowModal = () => setBorrowModalOpen(true);
    const handleCloseBorrowModal = () => setBorrowModalOpen(false);

    return (
        <>
            <Card
                className="shadow-lg"
                bordered={false}
                cover={
                    <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-100 h-48">
                        <BookOutlined style={{ fontSize: 64, color: "#5B8DEF" }} />
                    </div>
                }
            >
                <Title level={2} className="mb-2">
                    {book.title}
                </Title>
                <div className="flex items-center mb-4 space-x-4">
                    <Tag color="blue" className="text-base">
                        <UserOutlined /> {book.author}
                    </Tag>
                    <Tag color="geekblue" className="text-base">
                        {book.genre}
                    </Tag>
                    <Tag color={book.available ? "green" : "red"} className="text-base">
                        {book.available ? "Available" : "Not Available"}
                    </Tag>
                </div>
                <Divider />
                <Descriptions
                    column={1}
                    size="middle"
                    labelStyle={{ fontWeight: "bold" }}
                    contentStyle={{ color: "#444" }}
                >
                    <Descriptions.Item label={<span><BarcodeOutlined /> ISBN</span>}>
                        {book.isbn}
                    </Descriptions.Item>
                    <Descriptions.Item label={<span><CalendarOutlined /> Added</span>}>
                        {new Date(book.createdAt).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Copies">
                        <Tag color={book.copies > 0 ? "green" : "red"}>
                            {book.copies}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
                <Divider />
                <Title level={4} className="mt-4">
                    Description
                </Title>
                <Paragraph className="text-gray-700">{book.description}</Paragraph>
                <Divider />

                <div className="flex justify-end">
                    {!book.available || book.copies === 0 ? (
                        <Tooltip placement="topRight" title="This book is currently not available to borrow.">
                            <Button type="primary" size="large" disabled>
                                Borrow Book
                            </Button>
                        </Tooltip>
                    ) : (
                        <Button type="primary" size="large" onClick={handleOpenBorrowModal}>
                            Borrow Book
                        </Button>
                    )}
                </div>
            </Card>

            <BorrowBookModal
                open={borrowModalOpen}
                onClose={handleCloseBorrowModal}
                book={book}
            />
        </>
    );
}
