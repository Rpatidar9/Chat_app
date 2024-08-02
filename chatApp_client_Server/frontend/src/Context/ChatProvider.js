import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { use } from "../../../backend/router/chat.route";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const navigate = useHistory();
    console.log("navigate ::", navigate);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        if (!userInfo) {
            // navigate("/")
        }
    }, [])
    return <ChatContext.Provider value={{ user, setUser }}>{children}</ChatContext.Provider>
}
export const ChatState = () => {
    return useContext(ChatContext);
}
export default ChatProvider;