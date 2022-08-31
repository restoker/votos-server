import express from 'express';
import http from 'http';
import { Server as ServidorIO } from 'socket.io';
import path from 'path'
import Sockets from './sockets/index.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import csurf from 'csurf';
import { fileURLToPath } from 'url'
import usuariosRouter from './routes/usuario.routes.js'
import conectarDb from './config/db.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.server = http.Server(this.app);
        // instancia la base de datos
        // this.conectarDB();
        // Conectar a DB
        conectarDb();
        this.io = new ServidorIO(this.server, {
            pingInterval: 60000,
            cors: {
                origin: process.env.FRONTEND_URL
                // origin: 'http://localhost:3000',
                // allowedHeaders: ["x-custom-header"],
                // credentials: true,
            }
        });
    }

    middleware() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        this.app.use(express.static(path.resolve(__dirname, '../public')))
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(csurf({ cookie: true }));
        this.app.use(helmet());
        this.app.use(morgan("dev"));

        const whiteList = ['http://localhost:3000', 'http://localhost:3000/registro'];
        const corsOptions = {
            origin: function (origin, callback) {
                if (whiteList.includes(origin)) {
                    // puede consultar la api
                    callback(null, true);
                } else {
                    // no esta permitido
                    callback(new Error('Error de cors'), false)
                    // return res.status(500).json({ok: false, msg: 'Error de cors'})
                }
            }
        }
        this.app.use(cors({ origin: corsOptions.origin, credentials: true, optionSuccessStatus: 200 }));
        // this.app.use(function (req, res, next) {
        //     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        //     res.header('Access-Control-Allow-Credentials', true);
        //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        //     next();
        // });
        // this.app.use(cors());
        this.app.options('*', cors());
        this.app.enable('trust proxy');
        this.app.disable('x-powered-by');

        // rutas del servidor
        this.app.use(`/api/usuarios`, usuariosRouter);
        // this.app.use(`/api/candidatos`, candidatosRouter);

        // definir las rutas del usuario
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    init() {
        // inicializar middlewares
        this.middleware();
        // inicializar socket
        this.configurarSockets();
        // inicializar el server
        this.server.listen(this.port, () => {
            console.log(`servidor trabajando en: http://localhost:${this.port}`.cyan);
        })
    }
}

export default Server;