import { Box } from "@chakra-ui/react"
import { ChatState } from "../Context/ChatProvider.js"
import SideDrawer from "../components/miscellenous/SideDrawer.js"
import Mychat from "../components/MyChats"
import ChatBox from "../components/ChatBox"

const ChatPage = () => {
    const { user } = ChatState()
    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <Mychat />}
                {user && <ChatBox />}
            </Box>
        </div>
    )
}

export default ChatPage
