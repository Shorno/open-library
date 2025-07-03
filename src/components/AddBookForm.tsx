import {Form, Card, Col, Flex, notification} from "antd";
import type {Book} from "../features/library/types.ts";
import {useAddBookMutation} from "../features/library/libraryApiSlice.ts";
import {useNavigate} from "react-router";
import BookForm from "./BookForm.tsx";


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
            notification.error({message: error.data?.message, description: error.data?.error?.message})
        }
    };

    return (
        <Flex justify={"center"}>
            <Col xs={24} sm={20} md={12} lg={12} xl={8} xxl={6}>
                <Card>
                    <BookForm
                        form={form}
                        onFinish={onFinish}
                        loading={isLoading}
                        submitLabel={"Add book"}
                    />
                </Card>
            </Col>
        </Flex>

    );
};

export default AddBookForm;
