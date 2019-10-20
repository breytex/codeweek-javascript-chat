const newMessagesCallback = (messages) => {
    console.log("New messags:")
    console.log(messages)
}

// Subscribe to new messages
// The function newMessagesCallback is called everytime a new message arrives at the server
subscribeToNewMessages(newMessagesCallback)

// Use this function to send a new message to the server
//addMessage("Dein Benutzername", "(Deine Message:) Hello World")
