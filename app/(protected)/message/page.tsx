import Messaging from "@/components/messaging/Messaging";
import MessageBox from "@/components/reusable/MessageBox";

type Props = {};

const Message = (props: Props) => {
  return (
    <div className="h-screen p-0 overflow-hidden">
      <Messaging />
    </div>
  );
};

export default Message;
