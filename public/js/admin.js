//Mission Complete
const socket = io();
let connectionsUsers = [];
let connectionsInSupport = [];

socket.on("admin_list_all_users", (connections) =>{
  connectionsUsers = connections;
  document.getElementById("list_users").innerHTML = "";

  let template = document.getElementById("template").innerHTML;

  connections.forEach((connections) =>{

    const rendered = Mustache.render(template, {
    email: connections.user.email,
    id: connections.socket_id,
  });

  document.getElementById("list_users").innerHTML += rendered;

  });

});

//abrir chat do cliente para responder connections
//não entendi muito bem o parametro id nessa função ele é o id de que tabela?
function call(id) {
  
  const connection = connectionsUsers.find(
    (connection) => connection.socket_id === id);

    connectionsInSupport.push(connection);

  const template = document.getElementById("admin_template").innerHTML;

  const rendered = Mustache.render(template,{
    email: connection.user.email,
    id: connection.user_id,
  });
//é bom tentar entender melhor essa questão do mustache e de como ele renderiza os elementos
//visto que primeiro se usa o template e depois temos uma chamada de supports assim como na lista superior
//qual a sequencia logica e o que entra dentro de que
document.getElementById("supports").innerHTML += rendered;

  const params = {
    user_id: connection.user_id,
  }

  socket.emit("admin_user_in_support", params);

  socket.emit("admin_list_messages_by_user", params, messages => {
    const divMesages = document.getElementById(`allMessages${connection.user_id}`);

    messages.forEach(message => {
      const createDiv = document.createElement("div");

      if(message.admin_id ==  null){
        createDiv.className = "admin_message_client"

        createDiv.innerHTML = `<span>${connection.user.email}</span>`;
        createDiv.innerHTML += `<span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM?YYYY HH:mm:ss")} </span>`
      }else{
        createDiv.className = "admin_message_admin"

        createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM?YYYY HH:mm:ss")} </span>`
      };
    
      //para add no html a div criada
      divMesages.appendChild(createDiv);
    });


  });

  };

function sendMessage(id){
  const text = document.getElementById(`send_message_${id}`);

  const params = {
    text: text.value,
    user_id: id
  }

  socket.emit("admin_send_message", params);

  const divMesages = document.getElementById(`allMessages${id}`);
  const createDiv = document.createElement("div");

  createDiv.className = "admin_message_admin"
  createDiv.innerHTML = `Atendente<span>${params.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs()
    .format("DD/MM?YYYY HH:mm:ss")} </span>`

    divMesages.appendChild(createDiv);

    text.value = "";
}
//Tentar entender melhor a parte 
socket.on("admin_receive_message", (data)=>{
    const connection = connectionsInSupport.find(connection=> 
    connection.socket_id = data.socket_id);
    console.log(data)  
    
    const divMesages = document.getElementById(
      `allMessages${connection.user_id}`
    );
      
  const createDiv = document.createElement("div");
  createDiv.className = "admin_message_client"

    createDiv.innerHTML = `<span>${connection.user.email}</span>`;
    createDiv.innerHTML += `<span>${data.message.text}</span>`;
    createDiv.innerHTML += `<span class="admin_date">${dayjs(
     
      data.message.created_at
    ).format("DD/MM?YYYY HH:mm:ss")} </span>`;

    divMesages.appendChild(createDiv);
});

