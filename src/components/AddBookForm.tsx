import {Form, Input, InputNumber, Switch, Button, Card, Col, Flex, notification} from "antd";
import type {Book} from "../features/library/types.ts";
import {useAddBookMutation} from "../features/library/libraryApiSlice.ts";
import {useNavigate} from "react-router";


export type BookFormValues = Omit<Book, "_id" | "createdAt" | "updatedAt">


const AddBookForm = () => {
    const [form] = Form.useForm();
    const [addBook, {isLoading}] = useAddBookMutation()
    const navigate = useNavigate()

    const onFinish = async (values: BookFormValues) => {
        try {
            const response = await addBook(values).unwrap()
            notification.success({message: response.message})
            navigate("/")
        } catch (error: any) {
            notification.error({message: error.data?.message, description : error.data?.error?.message})
        }
    };

    return (
        <Flex justify={"center"}>
            <Col xs={24} sm={20} md={12} lg={12} xl={8} xxl={6}>
                <Card>
                    <Form
                        layout={"vertical"}
                        form={form}
                        name="add-book"
                        onFinish={onFinish}
                        initialValues={{available: true, copies: 1}}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{required: true, message: "Please enter the book title"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[{required: true, message: "Please enter the author's name"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Genre"
                            name="genre"
                            rules={[{required: true, message: "Please enter the genre"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="ISBN"
                            name="isbn"
                            rules={[
                                {required: true, message: "Please enter the ISBN"},
                                {pattern: /^[0-9-]+$/, message: "ISBN must be numbers and dashes only"},
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{required: true, message: "Please enter a description"}]}
                        >
                            <Input.TextArea rows={3}/>
                        </Form.Item>
                        <Flex justify={"space-between"}>
                            <Form.Item
                                label="Copies"
                                name="copies"
                                rules={[
                                    {required: true, message: "Please enter the number of copies"},
                                    {type: "number", min: 1, message: "At least 1 copy is required"},
                                ]}
                            >
                                <InputNumber min={1}/>
                            </Form.Item>

                            <Form.Item
                                label="Available"
                                name="available"
                                valuePropName="checked"
                            >
                                <Switch/>
                            </Form.Item>
                        </Flex>

                        <Form.Item className={"flex justify-end"}>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Add Book
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Flex>

    );
};

export default AddBookForm;
