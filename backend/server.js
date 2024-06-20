import { getDocument, updateDocument } from './controller/document-controller.js'
import { Server } from 'socket.io';
import mongoose from 'mongoose';

mongoose
    .connect("mongodb+srv://tanmayiitroorkee17:7380372574@cluster0.eg5hxff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("DB Connected successfully!");
    })
    .catch((err) => {
        console.log(err);
    });


const PORT = process.env.PORT || 3000;

const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);
        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta); 
        })
        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        })
    })
});