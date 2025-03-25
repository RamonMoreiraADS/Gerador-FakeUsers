async function generateFakerUsers(){
    var qt = document.querySelector("#quantUsers").value;
    if(qt > 5000){
        qt = 5000
        alert("A quantidade máxima é de 5000!")
    }
    var nat = document.querySelector("#natUsers").value;
    var inputsGender = document.getElementsByTagName("input");
    var gender = "";

    for(let input of inputsGender){
        if(input.checked == true) {
            gender = input.value;
        }
    }

    var reply = await fetch(`https://randomuser.me/api/?results=${qt}&gender=${gender}&nat=${nat}`);//faz uma requisição html

    var data = await reply.json();//await serve para esperar a resposta do servidor

    document.querySelector(".allUsers").innerHTML = "";
     
    for(let user of data.results){//o let receve cada posição do array data.results
        let userDiv = document.createElement("div");//a div é criada
        userDiv.classList.add("user");//adicionou a classe user a div

        userDiv.innerHTML = `<img
          width="100"
          src=${user.picture.medium}>
        <div class="info">
          <span><b>Nome:</b> ${user.name.first + " " + user.name.last}</span>
          <span><b>Email:</b> ${user.email}</span>
          <span><b>Nascimento:</b> ${new Date(user.dob.date).toLocaleDateString()}</span>
          <span><b>País:</b> ${user.location.country}</span>
          <span><b>Estado:</b> ${user.location.state}</span>
          <span><b>Cidade:</b> ${user.location.city}</span>
          <span><b>Telefone:</b> ${user.phone}</span>
          </div>`;//pega as informações do json e coloca no card que está sendo criado
          
          document.querySelector(".allUsers").appendChild(userDiv);
    }
}
