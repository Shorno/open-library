import {Modal, Typography, Row, Col, Tag, InputNumber, DatePicker, Form, notification, Flex} from "antd";
import type {Book} from "../features/library/types";
import dayjs, {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import {useBorrowBookMutation} from "../features/library/libraryApiSlice";

const {Text, Title} = Typography;

interface BorrowBookModalProps {
    open: boolean;
    onClose: () => void;
    book: Book | null;
}

export default function BorrowBookModal({
                                            open,
                                            onClose,
                                            book,
                                        }: BorrowBookModalProps) {
    const [copies, setCopies] = useState(1);
    const [dueDate, setDueDate] = useState<Dayjs | null>(null);
    const [borrowBook, {isLoading}] = useBorrowBookMutation();

    useEffect(() => {
        if (open && book) {
            setCopies(1);
            setDueDate(null);
        }
    }, [open, book]);

    const handleBorrow = async () => {
        if (!book || !dueDate) return;
        try {
            const response = await borrowBook({
                data: {
                    book: book._id,
                    quantity: copies,
                    dueDate: dueDate.toISOString()
                }
            }).unwrap();
            notification.success({message: response.message});
            onClose();
        } catch (error: any) {
            notification.error({
                message: error?.data?.message || "Failed to borrow book.",
                description: error?.data?.error?.errorResponse?.errmsg
            });
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={handleBorrow}
            okText="Borrow"
            okButtonProps={{
                disabled: !book?.available || !copies || !dueDate || copies < 1 || (book && copies > book.copies),
                loading: isLoading,
            }}
            cancelButtonProps={{disabled: isLoading}}
            title="Borrow Book"
            destroyOnClose
        >
            {!book ? (
                <Text type="secondary">No book selected.</Text>
            ) : (
                <div>
                    <Row gutter={[8, 8]} className="mb-4">
                        <Col span={24}>
                            <Title level={5} style={{marginBottom: 0}}>{book.title}</Title>
                        </Col>
                        <Col span={12}>
                            <Text>
                                <Text strong>Author:</Text> {book.author}
                            </Text>
                        </Col>
                        <Col span={12}>
                            <Text>
                                <Text strong>Genre:</Text> <Tag color="blue">{book.genre}</Tag>
                            </Text>
                        </Col>
                        <Col span={12}>
                            <Text>
                                <Text strong>Available:</Text>
                                <Tag color={book.available ? "green" : "red"} style={{marginLeft: 4}}>
                                    {book.available ? "Yes" : "No"}
                                </Tag>
                            </Text>
                        </Col>
                        <Col span={12}>
                            <Text>
                                <Text strong>Copies:</Text> {book.copies}
                            </Text>
                        </Col>
                    </Row>

                    <Form layout="vertical">
                        <Flex justify={"space-between"} gap={10}>
                            <Form.Item label="Number of Copies" required>
                                <InputNumber
                                    min={1}
                                    max={book.copies}
                                    value={copies}
                                    onChange={value => setCopies(value || 1)}
                                    style={{width: "100%"}}
                                    disabled={!book.available}
                                />
                                {copies > book.copies && (
                                    <Text type="danger" className="block mt-1">
                                        Cannot borrow more than available copies.
                                    </Text>
                                )}
                            </Form.Item>
                            <Form.Item label="Due Date" required>
                                <DatePicker
                                    value={dueDate}
                                    onChange={setDueDate}
                                    style={{width: "100%"}}
                                    disabledDate={current => current && current < dayjs().startOf('day')}
                                    disabled={!book.available}
                                />
                            </Form.Item>
                        </Flex>
                    </Form>
                </div>
            )}
        </Modal>
    );
}
