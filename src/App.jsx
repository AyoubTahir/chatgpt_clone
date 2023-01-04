import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import MessageBox from "./components/MessageBox";
function App() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const openai = new OpenAIApi(configuration);

  const handleSendingMessage = async (e) => {
    setMessages([
      ...messages,
      {
        sender: "user",
        message,
      },
    ]);
    setMessage("");
    setTimeout(() => {
      setMessageSent(true);
    }, 200);
  };

  useEffect(() => {
    if (messageSent) {
      setMessages([
        ...messages,
        {
          sender: "loader",
          message: "",
        },
      ]);

      const fetchRes = async () => {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: messages[messages.length - 1].message,
          temperature: 0.7,
          max_tokens: 64,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        setMessages([
          ...messages,
          {
            sender: "bot",
            message: response.data.choices[0].text,
          },
        ]);
        setMessageSent(false);
        document.querySelector(".scrollable").scrollTop += 15000;
      };
      fetchRes();
    }
  }, [messageSent]);
  return (
    <div className="h-screen">
      <div className="text-white font-bold text-2xl text-center p-3">
        Tahir Ayoub <span className="tex text-red-600">ChatGPT Clone</span>
      </div>
      <div className="flex flex-col justify-between max-w-5xl p-5 m-auto h-[93vh] text-white">
        <div className="overflow-y-auto scrollable">
          {messages.map((message, index) => (
            <MessageBox key={index} message={message} />
          ))}
        </div>
        <div className="relative">
          <textarea
            className="w-full rounded p-2 px-3 text-black"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendingMessage(e);
              }
            }}
            disabled={messageSent}
          ></textarea>
          <div className="absolute top-[16px] right-[10px]">
            <HiOutlinePaperAirplane
              className="h-8 w-8 text-gray-400"
              onClick={handleSendingMessage}
              onk
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
