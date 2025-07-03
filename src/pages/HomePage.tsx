import BookTable from "../components/BookTable.tsx";
import {Button, Flex} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

export default function HomePage() {
    const navigate = useNavigate()
    return (
        <>
            <Flex justify={"end"} className={"pb-4!"}>
                <Button type={"primary"} onClick={() => navigate("/add-book")}>
                    <PlusCircleOutlined/> New Book
                </Button>
            </Flex>
            <BookTable/>
        </>
    )
}