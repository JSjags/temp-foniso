"use client";

// import React from "react";

// type Props = {
//   cid: string;
// };

// const Chat = ({ cid }: Props) => {
//   return <div className="grid min-h-screen bg-red-500 pb-20">
//     <ChatTile />
//   </div>;
// };

// export default Chat;

// import Image from "next/image";
// import React, { useState, useRef, ChangeEvent } from "react"; // Make sure to install and configure @shadcn/ui
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { profileImageplaceholder } from "@/constants";
// // import FullScreenImageModal from './FullScreenImageModal';

// interface Message {
//   id: string;
//   user: string;
//   text: string;
//   time: string;
//   replyTo?: string;
//   images?: string[];
//   video?: string;
//   file?: string;
//   fileType?: string;
// }

// const initialMessages: Message[] = [
//   {
//     id: "1",
//     user: "KateDahn",
//     text: "Hey everyone! Can you believe that last-minute goal by Rashford in yesterday's match?",
//     time: "10:29 PM",
//     images: [],
//   },
//   {
//     id: "2",
//     user: "You",
//     text: "It was absolutely incredible! That man knows ball 💪",
//     time: "10:30 PM",
//     images: [],
//   },
// ];

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>(initialMessages);
//   const [input, setInput] = useState<string>("");
//   const [selectedReply, setSelectedReply] = useState<string | null>(null);
//   const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleSendMessage = () => {
//     if (input.trim() === "") return;

//     const newMessage: Message = {
//       id: new Date().toISOString(),
//       user: "You",
//       text: input,
//       time: new Date().toLocaleTimeString(),
//       replyTo: selectedReply || undefined,
//       images: [],
//     };

//     setMessages([...messages, newMessage]);
//     setInput("");
//     setSelectedReply(null);
//   };

//   const handleReply = (id: string) => {
//     setSelectedReply(id);
//   };

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const fileType = file.type.split("/")[0];
//         const newMessage: Message = {
//           id: new Date().toISOString(),
//           user: "You",
//           text: "",
//           time: new Date().toLocaleTimeString(),
//           replyTo: selectedReply || undefined,
//           images: fileType === "image" ? [reader.result as string] : [],
//           video: fileType === "video" ? (reader.result as string) : undefined,
//           file:
//             fileType !== "image" && fileType !== "video"
//               ? (reader.result as string)
//               : undefined,
//           fileType:
//             fileType !== "image" && fileType !== "video"
//               ? file.type
//               : undefined,
//         };
//         setMessages([...messages, newMessage]);
//         setSelectedReply(null);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-background text-white p-4">
//       {/* <FullScreenImageModal
//         src={fullScreenImage}
//         onClose={() => setFullScreenImage(null)}
//       /> */}
//       <div className="flex-grow overflow-y-auto space-y-4">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex flex-col ${
//               msg.user === "You" ? "items-end" : "items-start"
//             }`}
//           >
//             <div className="flex items-center max-w-[80%]">
//               <div className="relative border border-border size-10 rounded-full overflow-hidden">
//                 <Image
//                   src={
//                     msg.user === "You"
//                       ? profileImageplaceholder
//                       : profileImageplaceholder
//                   }
//                   alt={msg.user}
//                   className="rounded-full"
//                 />
//               </div>
//               <div className="ml-2 ">
//                 <div className="font-bold">{msg.user}</div>
//                 <div className="text-xs text-gray-500">{msg.time}</div>
//               </div>
//             </div>
//             {msg.replyTo && (
//               <div className="bg-gray-800 p-2 rounded my-2">
//                 <div className="text-sm">Replying to:</div>
//                 <div className="italic">
//                   {messages.find((m) => m.id === msg.replyTo)?.text}
//                 </div>
//               </div>
//             )}
//             <div className="bg-gray-900 p-4 rounded-lg mt-2">
//               {msg.text}
//               {msg.images &&
//                 msg.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <Image
//                       key={index}
//                       src={image}
//                       alt="Attached"
//                       width={300}
//                       height={300}
//                       className="mt-2 w-20 h-20 object-cover cursor-pointer"
//                       onClick={() => setFullScreenImage(image)}
//                     />
//                   </div>
//                 ))}
//               {msg.video && (
//                 <video controls className="mt-2 w-40 h-40">
//                   <source src={msg.video} type="video/mp4" />
//                 </video>
//               )}
//               {msg.file && (
//                 <div className="mt-2 flex items-center">
//                   <img
//                     src="profileImageplaceholder"
//                     alt="File"
//                     className="w-10 h-10"
//                   />
//                   <div className="ml-2 text-sm">{msg.fileType}</div>
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={() => handleReply(msg.id)}
//               className="text-xs text-blue-500 mt-2"
//             >
//               Reply
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center mt-4">
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message"
//           className="flex-grow mr-2"
//         />
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           className="hidden"
//         />
//         <Button onClick={() => fileInputRef.current?.click()}>Attach</Button>
//         <Button onClick={handleSendMessage} disabled={!input.trim()}>
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import React, { useState, useRef, ChangeEvent } from "react";
// import TextareaAutosize from "react-textarea-autosize";
// import Viewer from "react-viewer";
// // import "react-viewer/dist/index.css";
// import Image from "next/image";
// import { Button } from "../ui/button";

// interface Message {
//   id: string;
//   user: string;
//   text: string;
//   time: string;
//   replyTo?: string;
//   images?: string[];
//   video?: string;
//   file?: string;
//   fileType?: string;
// }

// const initialMessages: Message[] = [
//   {
//     id: "1",
//     user: "KateDahn",
//     text: "Hey everyone! Can you believe that last-minute goal by Rashford in yesterday's match?",
//     time: "10:29 PM",
//     images: [],
//   },
//   {
//     id: "2",
//     user: "You",
//     text: "It was absolutely incredible! That man knows ball 💪",
//     time: "10:30 PM",
//     images: [],
//   },
// ];

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>(initialMessages);
//   const [input, setInput] = useState<string>("");
//   const [selectedReply, setSelectedReply] = useState<string | null>(null);
//   const [filePreviews, setFilePreviews] = useState<
//     { src: string; type: string }[]
//   >([]);
//   const [fullScreenMedia, setFullScreenMedia] = useState<
//     { src: string; type: string }[]
//   >([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleSendMessage = () => {
//     if (input.trim() === "" && filePreviews.length === 0) return;

//     const newMessage: Message = {
//       id: new Date().toISOString(),
//       user: "You",
//       text: input,
//       time: new Date().toLocaleTimeString(),
//       replyTo: selectedReply || undefined,
//       images: filePreviews
//         .filter((fp) => fp.type === "image")
//         .map((fp) => fp.src),
//       video: filePreviews.find((fp) => fp.type === "video")?.src,
//       file: filePreviews.find((fp) => fp.type === "file")?.src,
//       fileType: filePreviews.find((fp) => fp.type === "file")?.type,
//     };

//     setMessages([...messages, newMessage]);
//     setInput("");
//     setFilePreviews([]);
//     setSelectedReply(null);
//   };

//   const handleReply = (id: string) => {
//     setSelectedReply(id);
//   };

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const newFilePreviews = Array.from(files)
//         .slice(0, 4 - filePreviews.length)
//         .map((file) => {
//           if (file.size > 10 * 1024 * 1024) {
//             alert("File size should not exceed 10MB");
//             return null;
//           }
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           return new Promise<{ src: string; type: string } | null>(
//             (resolve) => {
//               reader.onload = () => {
//                 const fileType = file.type.split("/")[0];
//                 resolve({ src: reader.result as string, type: fileType });
//               };
//             }
//           );
//         });

//       Promise.all(newFilePreviews).then((previews) => {
//         setFilePreviews([
//           ...filePreviews,
//           ...(previews.filter(Boolean) as { src: string; type: string }[]),
//         ]);
//       });
//     }
//   };

//   const handleFileRemove = (index: number) => {
//     setFilePreviews(filePreviews.filter((_, i) => i !== index));
//   };

//   const handleMediaClick = (src: string, type: string) => {
//     setFullScreenMedia([{ src, type }]);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-black text-white p-4">
//       <Viewer
//         visible={fullScreenMedia.length > 0}
//         onClose={() => setFullScreenMedia([])}
//         images={fullScreenMedia.map((media) => ({
//           src: media.src,
//           alt: media.type,
//         }))}
//         noImgDetails={true}
//       />
//       <div className="flex-grow overflow-y-auto space-y-4">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex flex-col ${
//               msg.user === "You" ? "items-end" : "items-start"
//             }`}
//           >
//             <div className="flex items-center">
//               <Image
//                 src={
//                   msg.user === "You"
//                     ? "https://via.placeholder.com/40"
//                     : "https://via.placeholder.com/40"
//                 }
//                 alt={msg.user}
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//               <div className="ml-2">
//                 <div className="font-bold">{msg.user}</div>
//                 <div className="text-xs text-gray-500">{msg.time}</div>
//               </div>
//             </div>
//             {msg.replyTo && (
//               <div className="bg-gray-800 p-2 rounded my-2">
//                 <div className="text-sm">Replying to:</div>
//                 <div className="italic">
//                   {messages.find((m) => m.id === msg.replyTo)?.text}
//                 </div>
//               </div>
//             )}
//             <div className="bg-gray-900 p-4 rounded-lg mt-2">
//               {msg.text}
//               {msg.images &&
//                 msg.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt="Attached"
//                     className="mt-2 w-20 h-20 object-cover cursor-pointer"
//                     onClick={() => handleMediaClick(image, "image")}
//                   />
//                 ))}
//               {msg.video && (
//                 <video controls className="mt-2 w-40 h-40">
//                   <source src={msg.video} type="video/mp4" />
//                 </video>
//               )}
//               {msg.file && (
//                 <div
//                   className="mt-2 flex items-center cursor-pointer"
//                   onClick={() => handleMediaClick(msg.file!, msg.fileType!)}
//                 >
//                   <img
//                     src="https://via.placeholder.com/40"
//                     alt="File"
//                     className="w-10 h-10"
//                   />
//                   <div className="ml-2 text-sm">{msg.fileType}</div>
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={() => handleReply(msg.id)}
//               className="text-xs text-blue-500 mt-2"
//             >
//               Reply
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col mt-4">
//         {filePreviews.length > 0 && (
//           <div className="flex flex-wrap mb-2">
//             {filePreviews.map((file, index) => (
//               <div key={index} className="relative mr-2 mb-2">
//                 {file.type === "image" && (
//                   <img
//                     src={file.src}
//                     alt="Preview"
//                     className="w-20 h-20 object-cover"
//                   />
//                 )}
//                 {file.type === "video" && (
//                   <video className="w-20 h-20 object-cover">
//                     <source src={file.src} type="video/mp4" />
//                   </video>
//                 )}
//                 {file.type === "file" && (
//                   <div className="flex items-center">
//                     <img
//                       src="https://via.placeholder.com/40"
//                       alt="File"
//                       className="w-10 h-10"
//                     />
//                     <div className="ml-2 text-sm">File</div>
//                   </div>
//                 )}
//                 <button
//                   className="absolute top-0 right-0 text-red-500"
//                   onClick={() => handleFileRemove(index)}
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="flex items-center">
//           <TextareaAutosize
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message"
//             className="flex-grow mr-2 p-2 bg-gray-800 text-white rounded"
//             minRows={1}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             multiple
//           />
//           <Button onClick={() => fileInputRef.current?.click()}>Attach</Button>
//           <Button
//             onClick={handleSendMessage}
//             disabled={!input.trim() && filePreviews.length === 0}
//           >
//             Send
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// "use client";

// import React, { useState, useRef, ChangeEvent } from "react";
// import TextareaAutosize from "react-textarea-autosize";
// import Viewer from "react-viewer";
// import FileViewer from "react-file-viewer";
// // import "react-viewer/dist/index.css";
// import Image from "next/image";
// import { Button } from "../ui/button";
// // import { Button } from "@shadcn/ui";

// interface Message {
//   id: string;
//   user: string;
//   text: string;
//   time: string;
//   replyTo?: string;
//   images?: string[];
//   video?: string;
//   file?: string;
//   fileType?: string;
// }

// const initialMessages: Message[] = [
//   {
//     id: "1",
//     user: "KateDahn",
//     text: "Hey everyone! Can you believe that last-minute goal by Rashford in yesterday's match?",
//     time: "10:29 PM",
//     images: [],
//   },
//   {
//     id: "2",
//     user: "You",
//     text: "It was absolutely incredible! That man knows ball 💪",
//     time: "10:30 PM",
//     images: [],
//   },
// ];

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>(initialMessages);
//   const [input, setInput] = useState<string>("");
//   const [selectedReply, setSelectedReply] = useState<string | null>(null);
//   const [filePreviews, setFilePreviews] = useState<
//     { src: string; type: string; name: string }[]
//   >([]);
//   const [fullScreenMedia, setFullScreenMedia] = useState<
//     { src: string; type: string }[]
//   >([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleSendMessage = () => {
//     if (input.trim() === "" && filePreviews.length === 0) return;

//     const newMessage: Message = {
//       id: new Date().toISOString(),
//       user: "You",
//       text: input,
//       time: new Date().toLocaleTimeString(),
//       replyTo: selectedReply || undefined,
//       images: filePreviews
//         .filter((fp) => fp.type === "image")
//         .map((fp) => fp.src),
//       video: filePreviews.find((fp) => fp.type === "video")?.src,
//       file: filePreviews.find((fp) => fp.type === "file")?.src,
//       fileType: filePreviews.find((fp) => fp.type === "file")?.type,
//     };

//     setMessages([...messages, newMessage]);
//     setInput("");
//     setFilePreviews([]);
//     setSelectedReply(null);
//   };

//   const handleReply = (id: string) => {
//     setSelectedReply(id);
//   };

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const newFilePreviews = Array.from(files)
//         .slice(0, 4 - filePreviews.length)
//         .map((file) => {
//           if (file.size > 10 * 1024 * 1024) {
//             alert("File size should not exceed 10MB");
//             return null;
//           }
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           return new Promise<{
//             src: string;
//             type: string;
//             name: string;
//           } | null>((resolve) => {
//             reader.onload = () => {
//               const fileType = file.type.split("/")[0];
//               resolve({
//                 src: reader.result as string,
//                 type: fileType,
//                 name: file.name,
//               });
//             };
//           });
//         });

//       Promise.all(newFilePreviews).then((previews) => {
//         setFilePreviews([
//           ...filePreviews,
//           ...(previews.filter(Boolean) as {
//             src: string;
//             type: string;
//             name: string;
//           }[]),
//         ]);
//       });
//     }
//   };

//   const handleFileRemove = (index: number) => {
//     setFilePreviews(filePreviews.filter((_, i) => i !== index));
//   };

//   const handleMediaClick = (src: string, type: string) => {
//     setFullScreenMedia([{ src, type }]);
//   };

//   const renderFilePreview = (file: {
//     src: string;
//     type: string;
//     name: string;
//   }) => {
//     if (file.type === "image") {
//       return (
//         <img src={file.src} alt="Preview" className="w-20 h-20 object-cover" />
//       );
//     } else if (file.type === "video") {
//       return (
//         <video className="w-20 h-20 object-cover">
//           <source src={file.src} type="video/mp4" />
//         </video>
//       );
//     } else if (file.type === "file") {
//       return (
//         <div className="flex flex-col items-center">
//           <FileViewer
//             fileType={file.name.split(".").pop() || ""}
//             filePath={file.src}
//           />
//           <div className="text-xs mt-1">{file.name}</div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="flex flex-col items-center">
//           <div className="w-10 h-10 bg-gray-400 flex items-center justify-center rounded">
//             <span>{file.name.split(".").pop()}</span>
//           </div>
//           <div className="text-xs mt-1">{file.name}</div>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-black text-white p-4">
//       <Viewer
//         visible={fullScreenMedia.length > 0}
//         onClose={() => setFullScreenMedia([])}
//         images={fullScreenMedia.map((media) => ({
//           src: media.src,
//           alt: media.type,
//         }))}
//         noImgDetails={true}
//       />
//       <div className="flex-grow overflow-y-auto space-y-4">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex flex-col ${
//               msg.user === "You" ? "items-end" : "items-start"
//             }`}
//           >
//             <div className="flex items-center">
//               <Image
//                 src={
//                   msg.user === "You"
//                     ? "https://via.placeholder.com/40"
//                     : "https://via.placeholder.com/40"
//                 }
//                 alt={msg.user}
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//               <div className="ml-2">
//                 <div className="font-bold">{msg.user}</div>
//                 <div className="text-xs text-gray-500">{msg.time}</div>
//               </div>
//             </div>
//             {msg.replyTo && (
//               <div className="bg-gray-800 p-2 rounded my-2">
//                 <div className="text-sm">Replying to:</div>
//                 <div className="italic">
//                   {messages.find((m) => m.id === msg.replyTo)?.text}
//                 </div>
//               </div>
//             )}
//             <div className="bg-gray-900 p-4 rounded-lg mt-2">
//               {msg.text}
//               {msg.images &&
//                 msg.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt="Attached"
//                     className="mt-2 w-20 h-20 object-cover cursor-pointer"
//                     onClick={() => handleMediaClick(image, "image")}
//                   />
//                 ))}
//               {msg.video && (
//                 <video controls className="mt-2 w-40 h-40">
//                   <source src={msg.video} type="video/mp4" />
//                 </video>
//               )}
//               {msg.file && (
//                 <div
//                   className="mt-2 flex items-center cursor-pointer"
//                   onClick={() => handleMediaClick(msg.file!, msg.fileType!)}
//                 >
//                   <FileViewer fileType={msg.fileType} filePath={msg.file} />
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={() => handleReply(msg.id)}
//               className="text-xs text-blue-500 mt-2"
//             >
//               Reply
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col mt-4">
//         {filePreviews.length > 0 && (
//           <div className="flex flex-wrap mb-2">
//             {filePreviews.map((file, index) => (
//               <div key={index} className="relative mr-2 mb-2">
//                 {renderFilePreview(file)}
//                 <button
//                   className="absolute top-0 right-0 text-red-500"
//                   onClick={() => handleFileRemove(index)}
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="flex items-center">
//           <TextareaAutosize
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message"
//             className="flex-grow mr-2 p-2 bg-gray-800 text-white rounded"
//             minRows={1}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             multiple
//           />
//           <Button onClick={() => fileInputRef.current?.click()}>Attach</Button>
//           <Button
//             onClick={handleSendMessage}
//             disabled={!input.trim() && filePreviews.length === 0}
//           >
//             Send
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, Send, X } from "lucide-react";

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
  replyTo?: string;
  files?: { src: string; type: string }[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    user: "John Doe",
    text: "Hey everyone! Can you believe that last-minute goal by Rashford in yesterday's match?",
    time: "10:29 PM",
    files: [],
  },
  {
    id: "2",
    user: "You",
    text: "It was absolutely incredible! That man knows ball 💪",
    time: "10:30 PM",
    files: [],
  },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  const [filePreviews, setFilePreviews] = useState<
    { src: string; type: string; name: string }[]
  >([]);
  const [fullScreenMedia, setFullScreenMedia] = useState<
    { src: string; type: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "" && filePreviews.length === 0) return;

    const newMessage: Message = {
      id: new Date().toISOString(),
      user: "You",
      text: input,
      time: new Date().toLocaleTimeString(),
      replyTo: selectedReply || undefined,
      files: filePreviews,
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setFilePreviews([]);
    setSelectedReply(null);
  };

  const handleReply = (id: string) => {
    setSelectedReply(id);
  };

  const renderFilePreview = (file: {
    src: string;
    type: string;
    name: string;
  }) => {
    if (file.type === "image") {
      return (
        <img src={file.src} alt="Preview" className="w-20 h-20 object-cover" />
      );
    } else if (file.type === "video") {
      return (
        <video className="w-20 h-20 object-cover">
          <source src={file.src} type="video/mp4" />
        </video>
      );
    } else if (file.type === "file") {
      return (
        <div className="flex flex-col items-center">
          {/* <FileViewer
            fileType={file.name.split(".").pop() || ""}
            filePath={file.src}
          /> */}
          <div className="text-xs mt-1">{file.name}</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-400 flex items-center justify-center rounded">
            <span>{file.name.split(".").pop()}</span>
          </div>
          <div className="text-xs mt-1">{file.name}</div>
        </div>
      );
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const allowedFileTypes = ["image", "video"];
      const newFilePreviews = Array.from(files)
        .slice(0, 4 - filePreviews.length)
        .map((file) => {
          if (file.size > 10 * 1024 * 1024) {
            alert("File size should not exceed 10MB");
            return null;
          }
          const fileType = file.type.split("/")[0];
          if (!allowedFileTypes.includes(fileType)) {
            alert("Only images and videos are allowed");
            return null;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);
          return new Promise<{
            src: string;
            type: string;
            name: string;
          } | null>((resolve) => {
            reader.onload = () => {
              resolve({
                src: reader.result as string,
                type: fileType,
                name: file.name,
              });
            };
          });
        });

      Promise.all(newFilePreviews).then((previews) => {
        setFilePreviews([
          ...filePreviews,
          ...(previews.filter(Boolean) as {
            src: string;
            type: string;
            name: string;
          }[]),
        ]);
      });
    }
  };

  const handleFileRemove = (index: number) => {
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  };

  const handleMediaClick = (src: string, type: string) => {
    setFullScreenMedia([{ src, type }]);
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-background text-white p-4">
      <div
        className="flex-grow overflow-y-auto space-y-6"
        ref={chatContainerRef}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-x-1 ${
              msg.user === "You"
                ? "justify-start flex-row-reverse"
                : "justify-start"
            }`}
          >
            {msg.user !== "You" && (
              <div className={cn("flex items-start")}>
                <Image
                  src={
                    msg.user === "You"
                      ? "https://via.placeholder.com/40"
                      : "https://via.placeholder.com/40"
                  }
                  alt={msg.user}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            <div
              className={`flex flex-col px-4 max-w-[80%] ${
                msg.user === "You"
                  ? "bg-gradient-to-br from-[hsla(137,29%,39%,1)] via-[hsla(137,35%,24%,1)] to-[hsla(137,47%,21%,1)] rounded-xl rounded-tr-none"
                  : "bg-foreground/20 rounded-xl rounded-tl-none"
              }`}
            >
              {msg.replyTo && (
                <div className="bg-background p-2 my-2 rounded-lg">
                  <div className="text-sm">Replying to:</div>
                  <div className="italic">
                    {messages.find((m) => m.id === msg.replyTo)?.text}
                  </div>
                </div>
              )}
              <div
                className={cn(
                  "p-4 pb-2 pt-0 px-0 rounded-lg mt-2 text-foreground/80",
                  msg.user === "You" && "text-foreground"
                )}
              >
                {msg.user !== "You" && (
                  <div className="mb-2 text-foreground">
                    <div className="font-bold">{msg.user}</div>
                  </div>
                )}
                {msg.text}
                {msg.files && msg.files.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {msg.files.map((file, index) => (
                      <div
                        key={index}
                        className={`${
                          index === 0 ? "col-span-2" : ""
                        } relative`}
                      >
                        {file.type === "image" ? (
                          <img
                            src={file.src}
                            alt="File"
                            className="w-full h-32 object-cover"
                          />
                        ) : file.type === "video" ? (
                          <video className="w-full h-32 object-cover">
                            <source src={file.src} type="video/mp4" />
                          </video>
                        ) : (
                          <div className="w-full h-32 bg-gray-400 flex items-center justify-center rounded">
                            <span>{file.type}</span>
                          </div>
                        )}
                        {/* <button
                          className="absolute top-0 right-0 text-red-500"
                          onClick={() => handleFileRemove(index)}
                        >
                          &times;
                        </button> */}
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={cn(
                    "text-xs mt-1",
                    msg.user === "You"
                      ? "flex justify-end text-foreground translate-x-2"
                      : "flex justify-start text-foreground/80 -translate-x-2"
                  )}
                >
                  {msg.time}
                </div>
              </div>
              {/* <button
                onClick={() => handleReply(msg.id)}
                className="text-xs text-blue-500 mt-2"
              >
                Reply
              </button> */}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-4 bg-black rounded-3xl">
        {filePreviews.length > 0 && (
          <div className="flex flex-wrap mb-2 p-2">
            {filePreviews.map((file, index) => (
              <div
                key={index}
                className="relative mr-2 mb-2 rounded-2xl overflow-hidden"
              >
                {renderFilePreview(file)}
                <button
                  className="absolute top-2 right-2 text-red-500 text-xs"
                  onClick={() => handleFileRemove(index)}
                >
                  <X className="size-[16px]" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-end">
          <Button
            variant={"ghost"}
            className="hover:bg-transparent"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="text-foreground/70" />
          </Button>
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-grow mr-2 p-2 bg-transparent text-white rounded resize-none focus:outline-none caret-colorPrimary"
            minRows={1}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <Button
            className="rounded-full bg-colorPrimary"
            onClick={handleSendMessage}
            disabled={!input.trim() && filePreviews.length === 0}
          >
            <Send className="text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

// import React, { useState, useRef, ChangeEvent, useEffect } from "react";
// import TextareaAutosize from "react-textarea-autosize";
// import Viewer from "react-viewer";
// // import "react-viewer/dist/index.css";
// import Image from "next/image";
// import { Button } from "../ui/button";
// // import { Button } from '@shadcn/ui';

// interface Message {
//   id: string;
//   user: string;
//   text: string;
//   time: string;
//   replyTo?: string;
//   images?: string[];
//   video?: string;
// }

// const initialMessages: Message[] = [
//   {
//     id: "1",
//     user: "KateDahn",
//     text: "Hey everyone! Can you believe that last-minute goal by Rashford in yesterday's match?",
//     time: "10:29 PM",
//   },
//   {
//     id: "2",
//     user: "You",
//     text: "It was absolutely incredible! That man knows ball 💪",
//     time: "10:30 PM",
//   },
// ];

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>(initialMessages);
//   const [input, setInput] = useState<string>("");
//   const [selectedReply, setSelectedReply] = useState<string | null>(null);
//   const [filePreviews, setFilePreviews] = useState<
//     { src: string; type: string }[]
//   >([]);
//   const [fullScreenMedia, setFullScreenMedia] = useState<
//     { src: string; type: string }[]
//   >([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const chatContainerRef = useRef<HTMLDivElement | null>(null);

//   const handleSendMessage = () => {
//     if (input.trim() === "" && filePreviews.length === 0) return;

//     const newMessage: Message = {
//       id: new Date().toISOString(),
//       user: "You",
//       text: input,
//       time: new Date().toLocaleTimeString(),
//       replyTo: selectedReply || undefined,
//       images: filePreviews
//         .filter((fp) => fp.type === "image")
//         .map((fp) => fp.src),
//       video: filePreviews.find((fp) => fp.type === "video")?.src,
//     };

//     setMessages([...messages, newMessage]);
//     setInput("");
//     setFilePreviews([]);
//     setSelectedReply(null);
//   };

//   const handleReply = (id: string) => {
//     setSelectedReply(id);
//   };

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const newFilePreviews = Array.from(files)
//         .slice(0, 4 - filePreviews.length)
//         .map((file) => {
//           if (
//             file.type.startsWith("image/") ||
//             file.type.startsWith("video/")
//           ) {
//             if (file.size > 10 * 1024 * 1024) {
//               alert("File size should not exceed 10MB");
//               return null;
//             }
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             return new Promise<{ src: string; type: string } | null>(
//               (resolve) => {
//                 reader.onload = () => {
//                   resolve({ src: reader.result as string, type: file.type });
//                 };
//               }
//             );
//           } else {
//             alert("Only images and videos are allowed");
//             return null;
//           }
//         });

//       Promise.all(newFilePreviews).then((previews) => {
//         setFilePreviews([
//           ...filePreviews,
//           ...(previews.filter(Boolean) as { src: string; type: string }[]),
//         ]);
//       });
//     }
//   };

//   const handleFileRemove = (index: number) => {
//     setFilePreviews(filePreviews.filter((_, i) => i !== index));
//   };

//   const handleMediaClick = (src: string, type: string) => {
//     setFullScreenMedia([{ src, type }]);
//   };

//   //   useEffect(() => {
//   //     if (chatContainerRef.current) {
//   //       chatContainerRef.current.scrollTop =
//   //         chatContainerRef.current.scrollHeight;
//   //     }
//   //   }, [messages]);
//   useEffect(() => {
//     console.log("Messages changed. Scrolling to bottom.");
//     console.log("Scroll Height:", chatContainerRef.current?.scrollHeight);
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="h-full flex flex-col flex-1 bg-transparent text-white p-4">
//       <Viewer
//         visible={fullScreenMedia.length > 0}
//         onClose={() => setFullScreenMedia([])}
//         images={fullScreenMedia.map((media) => ({
//           src: media.src,
//           alt: media.type,
//         }))}
//         noImgDetails={true}
//       />
//       <div
//         ref={chatContainerRef}
//         className="flex-grow flex-1 overflow-y-auto space-y-4"
//       >
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex flex-col ${
//               msg.user === "You" ? "items-end" : "items-start"
//             }`}
//           >
//             <div className="flex items-center">
//               <Image
//                 src={
//                   msg.user === "You"
//                     ? "https://via.placeholder.com/40"
//                     : "https://via.placeholder.com/40"
//                 }
//                 alt={msg.user}
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//               <div className="ml-2">
//                 <div className="font-bold">{msg.user}</div>
//                 <div className="text-xs text-gray-500">{msg.time}</div>
//               </div>
//             </div>
//             {msg.replyTo && (
//               <div className="bg-gray-800 p-2 rounded my-2">
//                 <div className="text-sm">Replying to:</div>
//                 <div className="italic">
//                   {messages.find((m) => m.id === msg.replyTo)?.text}
//                 </div>
//               </div>
//             )}
//             <div className="bg-gray-900 p-4 rounded-lg mt-2 max-w-[80%]">
//               {msg.text}
//               {msg.images &&
//                 msg.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt="Attached"
//                     className="mt-2 w-20 h-20 object-cover cursor-pointer"
//                     onClick={() => handleMediaClick(image, "image")}
//                   />
//                 ))}
//               {msg.video && (
//                 <video controls className="mt-2 w-40 h-40">
//                   <source src={msg.video} type="video/mp4" />
//                 </video>
//               )}
//             </div>
//             <button
//               onClick={() => handleReply(msg.id)}
//               className="text-xs text-blue-500 mt-2"
//             >
//               Reply
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col mt-4 sticky bottom-2">
//         {filePreviews.length > 0 && (
//           <div className="flex flex-wrap mb-2">
//             {filePreviews.map((file, index) => (
//               <div key={index} className="relative mr-2 mb-2">
//                 <div className="absolute top-0 right-0">
//                   <button
//                     onClick={() => handleFileRemove(index)}
//                     className="text-red-500 hover:text-red-700 text-xs"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 {file.type.startsWith("image/") ? (
//                   <img
//                     src={file.src}
//                     alt="Preview"
//                     className="w-20 h-20 object-cover"
//                   />
//                 ) : (
//                   <video className="w-20 h-20 object-cover">
//                     <source src={file.src} type={file.type} />
//                   </video>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="flex items-center">
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={handleFileChange}
//             accept="image/*,video/*"
//             multiple
//           />
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
//           >
//             Attach File
//           </button>
//           <TextareaAutosize
//             className="bg-gray-800 text-white rounded px-4 py-2 flex-grow resize-none"
//             placeholder="Type your message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <Button onClick={handleSendMessage} className="ml-2">
//             Send
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
