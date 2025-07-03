import { Button, Modal } from "antd";

const TestModal = () => {
    const showModal = () => {
        Modal.confirm({
            title: "Confirm",
            content: "Are you sure?",
        });
    };
    return <Button onClick={showModal}>Open Modal</Button>;
};

export default TestModal;
