// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// // Dummy data (replace with API data later)
// const dummyMessages = [
//   {
//     id: '1',
//     text: 'Hello! How are you doing?',
//     sender: 'me',
//     timestamp: '2024-11-21T10:00:00Z', // ISO format timestamp
//   },
//   {
//     id: '2',
//     text: 'I’m good! What about you?',
//     sender: 'user1',
//     timestamp: '2024-11-21T10:01:00Z',
//   },
// ];

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]); // Store messages
//   const [input, setInput] = useState(''); // Message input

//   // Fetch messages (replace this function with your API call)
//   const fetchMessages = async () => {
//     try {
//       // TODO: Replace this with your API endpoint for fetching chat messages
//       // const response = await fetch('YOUR_API_ENDPOINT');
//       // const data = await response.json();
//       const data = dummyMessages; // Use dummy data temporarily
//       setMessages(data); // Update messages
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMessages(); // Fetch messages when component mounts
//   }, []);

//   // Send a new message (replace this function with your API call)
//   const sendMessage = async () => {
//     if (input.trim() === '') return; // Prevent sending empty messages
//     const newMessage = {
//       id: `${messages.length + 1}`, // Generate a new ID (temporary)
//       text: input,
//       sender: 'me',
//       timestamp: new Date().toISOString(), // Add current timestamp
//     };
//     setMessages((prevMessages) => [...prevMessages, newMessage]); // Update messages locally
//     setInput(''); // Clear input

//     try {
//       // TODO: Replace this with your API endpoint for sending messages
//       // await fetch('YOUR_API_ENDPOINT', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(newMessage),
//       // });
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   // Format timestamp into readable time (e.g., "10:01 AM")
//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
//   };

//   return (
//     <View style={styles.container}>
//       {/* Chat messages */}
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.messageContainer,
//               item.sender === 'me' ? styles.myMessage : styles.otherMessage,
//             ]}
//           >
//             <Text style={styles.messageText}>{item.text}</Text>
//             <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.id}
//         inverted // Ensures newest messages are at the bottom
//       />

//       {/* Message input */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type a message"
//           value={input}
//           onChangeText={setInput}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//   },
//   messageContainer: {
//     marginVertical: 5,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: '80%',
//   },
//   myMessage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//   },
//   otherMessage: {
//     backgroundColor: '#E0E0E0',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: 'gray',
//     marginTop: 5,
//     textAlign: 'right',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     height: 40,
//   },
//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: '#20B2AA',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   sendButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });
