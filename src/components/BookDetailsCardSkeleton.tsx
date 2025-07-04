import { Card, Skeleton, Divider } from "antd";

export function BookDetailsCardSkeleton() {
    return (
        <Card
            className="shadow-lg"
            bordered={false}
            cover={
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-100 h-48">
                    <Skeleton.Avatar active size={64} shape="circle" />
                </div>
            }
        >
            <Skeleton.Input active size="large" style={{ width: 220, marginBottom: 8 }} />

            <div className="flex items-center mb-4 space-x-4">
                <Skeleton.Button active size="small" style={{ width: 100 }} />
                <Skeleton.Button active size="small" style={{ width: 80 }} />
                <Skeleton.Button active size="small" style={{ width: 120 }} />
            </div>

            <Divider />

            <div className="space-y-3 mb-2 flex flex-col">
                <Skeleton.Input active size="small" style={{ width: 160 }} />
                <Skeleton.Input active size="small" style={{ width: 140 }} />
                <Skeleton.Button active size="small" style={{ width: 70 }} />
            </div>

            <Divider />

            <Skeleton.Input active size="default" style={{ width: 120, marginBottom: 8 }} />

            <Skeleton active paragraph={{ rows: 2 }} title={false} />

            <Divider />

            <div className="flex justify-end">
                <Skeleton.Button active size="large" style={{ width: 140, height: 40 }} />
            </div>
        </Card>
    );
}

