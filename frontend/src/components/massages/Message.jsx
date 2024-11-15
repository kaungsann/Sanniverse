import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser.user._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profileImage = fromMe
    ? authUser.user.profileImage
    : selectedConversation?.profileImage;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // eslint-disable-next-line react/prop-types
  const shakeClass = message.shouldShake ? "shake" : "";
  // console.log("message id", message);
  // console.log("fromMe", fromMe);

  // console.log("auth user", authUser);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profileImage} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
