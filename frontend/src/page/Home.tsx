// import React, { useEffect, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import { io, Socket } from "socket.io-client";
// import { useParams } from "react-router-dom";

// const toolbarOptions: any[][] = [
//     ['bold', 'italic', 'underline', 'strike'],
//     ['blockquote', 'code-block'],
//     [{ 'header': 1 }, { 'header': 2 }],
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     [{ 'script': 'sub' }, { 'script': 'super' }],
//     [{ 'indent': '-1' }, { 'indent': '+1' }],
//     [{ 'direction': 'rtl' }],
//     [{ 'size': ['small', false, 'large', 'huge'] }],
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//     [{ 'color': [] }, { 'background': [] }],
//     [{ 'font': [] }],
//     [{ 'align': [] }],
//     ['clean']
// ];

// const Home: React.FC = () => {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [quill, setQuill] = useState<Quill | null>(null);
//     const [inputText, setInputText] = useState<string>("");
//     const [textareaText, setTextareaText] = useState<string>("");
//     const { id } = useParams<{ id: string }>();

//     let newText = '';
//     useEffect(() => {
//         const quillEditor = new Quill("#editor", {
//             theme: "snow",
//             modules: {
//                 toolbar: toolbarOptions
//             }
//         });
//         quillEditor.disable();
//         quillEditor.setText("Loading the document...");
//         setQuill(quillEditor);
//     }, []);

//     useEffect(() => {
//         const socketServer = io("http://localhost:3000");
//         setSocket(socketServer);

//         return () => {
//             socketServer.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         if (socket === null || quill === null) return;

//         const handleChange = (delta: any, oldData: any, source: any) => {
//             if (source !== "user") return;
//             socket.emit("send-changes", delta);
//         };

//         quill?.on("text-change", handleChange);

//         return () => {
//             quill?.off("text-change", handleChange);
//         };
//     }, [quill, socket]);

//     useEffect(() => {
//         if (socket === null || quill === null) return;

//         const handleChange = (delta: any) => {
//             quill?.updateContents(delta);
//         };

//         socket?.on("receive-changes", handleChange);

//         return () => {
//             socket?.off("receive-changes", handleChange);
//         };
//     }, [quill, socket]);

//     useEffect(() => {
//         if (quill === null || socket === null) return;

//         socket.once("load-document", (document: any) => {
//             quill?.setContents(document);
//             quill?.enable();
//         });

//         socket.emit("get-document", id);
//     }, [quill, socket, id]);

//     useEffect(() => {
//         if (socket === null || quill === null) return;

//         const interval = setInterval(() => {
//             socket.emit("save-document", quill?.getContents());
//         }, 2000);

//         return () => {
//             clearInterval(interval);
//         };
//     }, [socket, quill]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInputText(e.target.value);
//         newText = newText + e.target.value + "\n";
//         quill?.setText(newText);
//     };

//     const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setTextareaText(e.target.value);
//         newText = newText + "\n" + e.target.value;
//         quill?.setText(newText);
//     };

//     const downloadPdf = () => {
//         // Convert Quill content to PDF and download
//         // Code to convert Quill content to PDF goes here
//     };

//     return (
//         <div className="flex gap-[5%] mt-[6vh] mx-[5%]">
//             <div className="w-[40%]">
//                 <span>Name :</span>
//                 <input type="text" value={inputText} onChange={handleInputChange} className="border p-2 mb-2 w-full" />
//                 <textarea value={textareaText} onChange={handleTextareaChange} className="border p-2 mb-2 w-full"></textarea>

//             </div>
//             <div>
//                 <div id="editor" style={{ height: "500px", marginTop: "20px" }}></div>
//                 <button onClick={downloadPdf} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Download PDF</button>
//             </div>
//         </div>
//     );
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import { io, Socket } from "socket.io-client";
// import { useParams } from "react-router-dom";

// const toolbarOptions: any[][] = [
//     ['bold', 'italic', 'underline', 'strike'],
//     ['blockquote', 'code-block'],
//     [{ 'header': 1 }, { 'header': 2 }],
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     [{ 'script': 'sub' }, { 'script': 'super' }],
//     [{ 'indent': '-1' }, { 'indent': '+1' }],
//     [{ 'direction': 'rtl' }],
//     [{ 'size': ['small', false, 'large', 'huge'] }],
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//     [{ 'color': [] }, { 'background': [] }],
//     [{ 'font': [] }],
//     [{ 'align': [] }],
//     ['clean']
// ];

// const Home: React.FC = () => {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [inputText, setInputText] = useState<string>("");
//     const [quill, setQuill] = useState<Quill | null>(null);
//     const { id } = useParams<{ id: string }>();

//     useEffect(() => {
//         const socketServer = io("http://localhost:3000");
//         setSocket(socketServer);

//         socketServer.once("connect", () => {
//             socketServer.emit("get-document", id);
//         });

//         return () => {
//             socketServer.disconnect();
//         };
//     }, [id]);

//     useEffect(() => {
//         if (quill !== null) {
//             const handleChange = (delta: any, oldData: any, source: any) => {
//                 if (source !== "user") return;
//                 socket?.emit("send-changes", delta);
//             };
//             quill.on("text-change", handleChange);
//             return () => {
//                 quill.off("text-change", handleChange);
//             };
//         }
//     }, [quill, socket]);

//     useEffect(() => {
//         if (socket !== null) {
//             const handleChange = (delta: any) => {
//                 quill?.updateContents(delta);
//             };
//             socket.on("receive-changes", handleChange);
//             return () => {
//                 socket.off("receive-changes", handleChange);
//             };
//         }
//     }, [quill, socket]);

//     useEffect(() => {
//         if (quill !== null && socket !== null) {
//             socket.once("load-document", (document: any) => {
//                 quill.setContents(document);
//                 quill.enable();
//             });
//         }
//     }, [quill, socket]);

//     useEffect(() => {
//         const quillEditor = new Quill("#editor", {
//             theme: "snow",
//             modules: {
//                 toolbar: toolbarOptions
//             }
//         });
//         quillEditor.disable();
//         quillEditor.setText("My name is ");
//         setQuill(quillEditor);

//         return () => {
//             quillEditor.off("text-change");
//         };
//     }, []);

//     useEffect(() => {
//         if (quill !== null) {
//             const content = `My name is ${inputText}\n`;
//             const selection: any = quill.getSelection();
//             quill.setText(content);
//             quill.setSelection(selection?.index + content?.length);
//             socket?.emit("send-changes", quill.getContents());

//             // Save the content to the database
//             socket?.emit("save-document", quill.getContents());
//         }
//     }, [inputText, quill, socket]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInputText(e.target.value);
//     };

//     return (
//         <div className="flex gap-[5%] mt-[6vh] mx-[5%]">
//             <div className="w-[40%]">
//                 <span>My name is </span>
//                 <input type="text" value={inputText} onChange={handleInputChange} className="border p-2 mb-2 w-full" />
//             </div>
//             <div>
//                 <div id="editor" style={{ height: "500px", marginTop: "20px" }}></div>
//             </div>
//         </div>
//     );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import { io, Socket } from "socket.io-client";
// import { useParams } from "react-router-dom";

// const toolbarOptions: any[][] = [
//     ['bold', 'italic', 'underline', 'strike'],
//     ['blockquote', 'code-block'],
//     [{ 'header': 1 }, { 'header': 2 }],
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     [{ 'script': 'sub' }, { 'script': 'super' }],
//     [{ 'indent': '-1' }, { 'indent': '+1' }],
//     [{ 'direction': 'rtl' }],
//     [{ 'size': ['small', false, 'large', 'huge'] }],
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//     [{ 'color': [] }, { 'background': [] }],
//     [{ 'font': [] }],
//     [{ 'align': [] }],
//     ['clean']
// ];

// const Home: React.FC = () => {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [name, setName] = useState<string>("");
//     const [college, setCollege] = useState<string>("");
//     const [age, setAge] = useState<string>("");
//     const [address, setAddress] = useState<string>("");
//     const [quill, setQuill] = useState<Quill | null>(null);
//     const { id } = useParams<{ id: string }>();

//     useEffect(() => {
//         const socketServer = io("http://localhost:3000");
//         setSocket(socketServer);

//         socketServer.once("connect", () => {
//             socketServer.emit("get-document", id);
//         });

//         return () => {
//             socketServer.disconnect();
//         };
//     }, [id]);

//     useEffect(() => {
//         if (quill !== null) {
//             const handleChange = (delta: any, oldData: any, source: any) => {
//                 if (source !== "user") return;
//                 socket?.emit("send-changes", delta);
//             };
//             quill.on("text-change", handleChange);
//             return () => {
//                 quill.off("text-change", handleChange);
//             };
//         }
//     }, [quill, socket]);

//     useEffect(() => {
//         if (socket !== null) {
//             const handleChange = (delta: any) => {
//                 quill?.updateContents(delta);
//             };
//             socket.on("receive-changes", handleChange);
//             return () => {
//                 socket.off("receive-changes", handleChange);
//             };
//         }
//     }, [quill, socket]);

//     useEffect(() => {
//         if (quill !== null && socket !== null) {
//             socket.once("load-document", (document: any) => {
//                 quill.setContents(document);
//                 quill.enable();
//             });
//         }
//     }, [quill, socket]);

//     useEffect(() => {
//         const quillEditor = new Quill("#editor", {
//             theme: "snow",
//             modules: {
//                 toolbar: toolbarOptions
//             }
//         });
//         quillEditor.disable();
//         quillEditor.setText("My name is ");
//         setQuill(quillEditor);

//         return () => {
//             quillEditor.off("text-change");
//         };
//     }, []);

//     useEffect(() => {
//         if (quill !== null) {
//             const content = `My name is ${name}\nCollege: ${college}\nAge: ${age}\nAddress: ${address}\n`;
//             const selection: any = quill.getSelection();
//             quill.setText(content);
//             quill.setSelection(selection?.index + content?.length);
//             socket?.emit("send-changes", quill.getContents());

//             // Save the content to the database
//             socket?.emit("save-document", quill.getContents());
//         }
//     }, [name, college, age, address, quill, socket]);

//     const handleNameChange = (e: any) => {
//         setName(e.target.value);
//     };

//     const handleCollegeChange = (e: any) => {
//         setCollege(e.target.value);
//     };

//     const handleAgeChange = (e: any) => {
//         setAge(e.target.value);
//     };

//     const handleAddressChange = (e: any) => {
//         setAddress(e.target.value);
//     };

//     return (
//         <div className="flex gap-[5%] mt-[6vh] mx-[5%]">
//             <div className="w-[40%]">
//                 <span>My name is </span>
//                 <input type="text" value={name} onChange={handleNameChange} className="border p-2 mb-2 w-full" />
//                 <span>My college name is </span>
//                 <input type="text" value={college} onChange={handleCollegeChange} className="border p-2 mb-2 w-full" />
//                 <span>My age is </span>
//                 <input type="text" value={age} onChange={handleAgeChange} className="border p-2 mb-2 w-full" />
//                 <span>My address is </span>
//                 <input type="text" value={address} onChange={handleAddressChange} className="border p-2 mb-2 w-full" />
//             </div>
//             <div>
//                 <div id="editor" style={{ height: "500px", marginTop: "20px" }}></div>
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

const toolbarOptions: any[][] = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
];

const Home: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [name, setName] = useState<string>("");
    const [college, setCollege] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [quill, setQuill] = useState<Quill | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const socketServer = io("http://localhost:3000");
        setSocket(socketServer);

        socketServer.once("connect", () => {
            socketServer.emit("get-document", id);
        });

        return () => {
            socketServer.disconnect();
        };
    }, [id]);

    useEffect(() => {
        if (quill !== null) {
            const handleChange = (delta: any, oldData: any, source: any) => {
                if (source !== "user") return;
                socket?.emit("send-changes", delta);
            };
            quill.on("text-change", handleChange);
            return () => {
                quill.off("text-change", handleChange);
            };
        }
    }, [quill, socket]);

    useEffect(() => {
        if (socket !== null) {
            const handleChange = (delta: any) => {
                quill?.updateContents(delta);
            };
            socket.on("receive-changes", handleChange);
            return () => {
                socket.off("receive-changes", handleChange);
            };
        }
    }, [quill, socket]);

    useEffect(() => {
        if (quill !== null && socket !== null) {
            socket.once("load-document", (document: any) => {
                quill.setContents(document);
                quill.enable();
            });
        }
    }, [quill, socket]);

    useEffect(() => {
        const quillEditor = new Quill("#editor", {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions
            }
        });
        quillEditor.disable();
        quillEditor.setText("My name is ");
        setQuill(quillEditor);

        return () => {
            quillEditor.off("text-change");
        };
    }, []);

    useEffect(() => {
        if (quill !== null) {
            const content = `My name is ${name}\nCollege: ${college}\nAge: ${age}\nAddress: ${address}\n`;
            const selection: any = quill.getSelection();
            quill.setText(content);
            quill.setSelection(selection?.index + content?.length);
            socket?.emit("send-changes", quill.getContents());

            // Save the content to the database
            socket?.emit("save-document", quill.getContents());
        }
    }, [name, college, age, address, quill, socket]);

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleCollegeChange = (e: any) => {
        setCollege(e.target.value);
    };

    const handleAgeChange = (e: any) => {
        setAge(e.target.value);
    };

    const handleAddressChange = (e: any) => {
        setAddress(e.target.value);
    };

    return (
        <div className="flex gap-[1vw] mt-[6vh] mx-[1vw]">
            <form>
                <div className="w-[30%]">
                    <span>My name is </span>
                    <input type="text" value={name} onChange={handleNameChange} className="border p-2 mb-2 w-full" />
                    <span>My college name is </span>
                    <input type="text" value={college} onChange={handleCollegeChange} className="border p-2 mb-2 w-full" />
                    <span>My age is </span>
                    <input type="text" value={age} onChange={handleAgeChange} className="border p-2 mb-2 w-full" />
                    <span>My address is </span>
                    <input type="text" value={address} onChange={handleAddressChange} className="border p-2 mb-2 w-full" />
                </div>
            </form>
            <div className="w-[80%]">
                <div id="editor" style={{ height: "72vh", marginTop: "1vh" }}></div>
            </div>
        </div>
    );
};

export default Home;



