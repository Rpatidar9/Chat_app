import { Box, Button, Tooltip, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const SideDrawer = () => {
    const { search, setSearch } = useState("")
    const { searchResult, setSearchResult } = useState([])
    const { loading, setLoading } = useState(false)
    const { loadingChat, setLoadingChat } = useState("")
    return (
        <>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="10px"
                borderWidth="5px"
            >
                <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
                    <Button variant="ghost">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <Text d={{ base: "none", md: "flex" }} px="4">Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Talk-A-Live
                </Text>
            </Box>
        </>
    )
}
export default SideDrawer;