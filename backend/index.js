const express = require('express');
const app = express();

//capturar el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cors
const cors = require('cors');
var corsOptions = {
	origin: '*', // Reemplazar con dominio
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//variables de entorno
require('dotenv').config();


// import routes
const authRoutes = require('./routes/route');
const authSolicitud = require('./routes/solicitud');
const authPost = require('./routes/post');
const authImg = require('./routes/img');
const muscle = require('./routes/musculo');
const authExercise = require('./routes/ejercicio');
const authRoutine = require('./routes/rutina');
const authSuscripcion = require('./routes/suscripcion');
const authChat = require('./routes/chat');
const authBilletera = require('./routes/billetera');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/solicitud', authSolicitud);
app.use('/api/post', authPost);
app.use('/api/img', authImg);
app.use('/api/muscle', muscle);
app.use('/api/exercise', authExercise);
app.use('/api/routine', authRoutine);
app.use('/api/suscripcion', authSuscripcion);
app.use('/api/chat', authChat);
app.use('/api/billetera', authBilletera);

//modo history de vue
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + '/public'));

//socket
const http = require('http').createServer(app);

const socket = require('./config/socket.js');
socket(http);

// http.listen(3501);

//configurando el puerto para heroku
const PORT = process.env.PORT || 3500;
http.listen(PORT, () => {
	console.log(`servidor andando en: ${PORT}`);
});
