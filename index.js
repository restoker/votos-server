import Server from "./server.js";
import { config } from 'dotenv';
import _ from 'colors'

config();

const server = new Server();

server.init();