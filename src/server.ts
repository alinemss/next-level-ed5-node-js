import {http} from "./http"
//não entendi pq importou e pra onde usou
import "./websocket/client";
import "./websocket/admin";

http.listen(3333, () => console.log("Server is Running on 3333"))

