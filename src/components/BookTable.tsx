import {Table, Button, Tag} from "antd";
import type {Book} from "../features/library/types.ts";
import {useGetBooksQuery} from "../features/library/libraryApiSlice.ts";

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
            <Button type="primary" onClick={() => alert(`Action for ${record.title}`)}>
                Action
            </Button>
        ),
    },
];


const BookTable = () => {
    const {data: bookList, isLoading} = useGetBooksQuery()

    return (
        <Table
            loading={isLoading}
            rowKey="_id"
            columns={columns}
            dataSource={bookList?.data}
            pagination={{pageSize: 10}}
            scroll={{x: "max-context"}}
        />
    )
}


export default BookTable;
