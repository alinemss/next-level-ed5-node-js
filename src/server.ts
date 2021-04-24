import {http} from "./http"
//não entendi pq importou e pra onde usou
import "./websocket/client";

http.listen(3333, () => console.log("Server is Running on 3333"))

