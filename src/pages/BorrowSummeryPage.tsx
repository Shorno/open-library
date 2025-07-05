import {useGetBorrowBookSummeryQuery} from "../features/library/libraryApiSlice";
import BorrowSummaryTable from "../components/BorrowSummaryTable.tsx";
import {Typography} from "antd";

export default function BorrowSummeryPage() {
    const {data: summary, isLoading, isError} = useGetBorrowBookSummeryQuery();

    return (
        <>
            <Typography.Title level={4} className={"text-center"}>Borrowed Books Summary</Typography.Title>
            <BorrowSummaryTable
                data={summary?.data}
                isLoading={isLoading}
                isError={isError}
            />
        </>
    );
}
