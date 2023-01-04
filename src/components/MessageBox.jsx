import { userLogo, botLogo, loader } from "../assets";

const MessageBox = ({ message }) => {
  return (
    <div className="flex gap-3 mb-5">
      <div className=" min-w-[48px]">
        <img
          src={message.sender === "user" ? userLogo : botLogo}
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="pt-3 overflow-x-hidden">
        {message.sender === "loader" && (
          <img src={loader} className="w-16 mt-[7px]" />
        )}
        <p className="break-words">{message.message}</p>
      </div>
    </div>
  );
};

export default MessageBox;
