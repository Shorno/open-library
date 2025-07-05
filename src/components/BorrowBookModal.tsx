import {Modal, Typography, Row, Col, Tag, InputNumber, DatePicker, Form, notification, Flex} from "antd";
import type {Book} from "../features/library/types";
import dayjs from "dayjs";
import {useEffect} from "react";
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
    const [form] = Form.useForm();
    const [borrowBook, {isLoading}] = useBorrowBookMutation();

    useEffect(() => {
        if (open && book) {
            form.resetFields();
        }
    }, [open, book, form]);

    const handleBorrow = async () => {
        try {
            const values = await form.validateFields();
            if (!book) return;
            const response = await borrowBook({
                data: {
                    book: book._id,
                    quantity: values.copies,
                    dueDate: values.dueDate.toISOString()
                }
            }).unwrap();
            notification.success({message: response.message});
            onClose();
        } catch (error: any) {
            if (error?.errorFields) return;
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
                disabled: !book?.available || isLoading,
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

                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            copies: 1,
                            dueDate: null
                        }}
                    >
                        <Flex justify={"space-between"} gap={10}>
                            <Form.Item
                                label="Number of Copies"
                                name="copies"
                                required
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value || value < 1) {
                                                return Promise.reject(new Error("Must borrow at least 1 copy"));
                                            }
                                            if (book && value > book.copies) {
                                                return Promise.reject(new Error("Cannot borrow more than available copies"));
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <InputNumber
                                    min={1}
                                    style={{width: "100%"}}
                                    disabled={!book.available}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Due Date"
                                name="dueDate"
                                required
                                rules={[{ required: true, message: "Please select a due date" }]}
                            >
                                <DatePicker
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
