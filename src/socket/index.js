// import client from 'socket.io-client';
import client from 'socket.io-client';

const io = client('https://john-delivery-app.herokuapp.com/');

export default io;
