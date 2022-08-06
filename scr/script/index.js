import value from '../data/data.json' assert { type: "json" };

function encomenda() {
    fetch(value)
    .then(response => response.json())
    .catch(error => console.error(error))
}

let form = document.getElementById('formulario')
let campo = document.getElementById('codigo')

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let dados = String(campo.value).toUpperCase()
    const { encomendas } = value
    let result = ''
    for (const item of encomendas) {
        if(item.numero === dados) {            
            result = item
        }       
    }
    if(result !== '') {
        setResult(result)
       
    }else {
        notfound()
    }
})

const text =     
    "<h2>Encomenda não encontrada</h2>" +    
    "<h2>Procure novamente</h2>"  
 

const notfound = () => {        
    document.getElementById("container").innerHTML = text       
    }

const setResult = (encomenda) => {    
    document.getElementById("numero-ordem").innerHTML = encomenda.id;
    document.getElementById("nome-cliente").innerHTML = encomenda.cliente.nome;
    document.getElementById("valor").innerHTML = (encomenda.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    const dataEntrega = new Date(encomenda.data)
    
    const dataFormatada = dataEntrega.toLocaleDateString()    
    document.getElementById("data-pedido").innerHTML = dataFormatada;
    
    const statusEncomenda = (encomenda.entregue === true ? "Entregue" : "Entregar"); 
    document.getElementById("status-entrega").innerHTML = statusEncomenda;
}

encomenda()