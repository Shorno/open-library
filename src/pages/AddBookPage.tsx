import AddBookForm from "../components/AddBookForm.tsx";
import {Flex, Typography} from "antd";

const AddBook = () => (
    <>
        <Flex justify={"center"}>
            <Typography.Title level={2}>
                Create New Book
            </Typography.Title>
        </Flex>
        <AddBookForm/>
    </>
);

export default AddBook;
