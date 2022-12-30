function addNewEntry(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  
  const formJSON = Object.fromEntries(data.entries());
  
  let result = JSON.stringify(formJSON, null, 2);
  sendRequest(result, "http://192.168.15.53:5000/entry", "POST");
}

function addNewCategory(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  
  const formJSON = Object.fromEntries(data.entries());
  
  let result = JSON.stringify(formJSON, null, 2);
  sendRequest(result, "http://192.168.15.53:5000/categories", "POST");
}

function addNewCategoryType(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  
  const formJSON = Object.fromEntries(data.entries());
  
  let result = JSON.stringify(formJSON, null, 2);
  sendRequest(result, "http://192.168.15.53:5000/category/types", "POST");
}

const entryForm = document.getElementById('entryForm');
if (entryForm){
  entryForm.addEventListener('submit', addNewEntry);
}

const categoryForm = document.getElementById('categoryForm');
if (categoryForm){
  categoryForm.addEventListener('submit', addNewCategory);
}

const categoryTypeForm = document.getElementById('categoryTypeForm');
if (categoryTypeForm){
  categoryTypeForm.addEventListener('submit', addNewCategoryType);
}

const sendRequest = async (body, url, method) => {
	let options = '';

	if (method === 'GET') {

		options = {
			method,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	}
	else{
		// Default options are marked with *
		options = {
			method, // *GET, POST, PUT, DELETE, etc.
			// mode: 'same-origin', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'omit', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body,
		};

	}
  const results = document.getElementById('results');
  await fetch(url, options)
    .then((response) => {
      response.json()
    
      .then((result) => {
        if (response.status < 200 || response.status >= 300) {
          results.innerHTML = 'Erro: ' + result.message;
        }
        else {
          results.innerHTML = 'Sucesso!';
        }
      })
      .catch((error) => {
        results.innerHTML = 'Erro: ' + error;
      });
      
    })
    .catch((error) => {
      results.innerHTML = 'Erro: ' + error;
    });
}

async function getCategories() {

  const apiResponse = await fetch("http://192.168.15.53:5000/categories")
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
  
  const select = document.getElementById('category');
  for(var i=0; i < apiResponse.length; i++){
    if (select) {
      select.options[select.options.length] = new Option(apiResponse[i].name, apiResponse[i].categoryId);
    } else {
      alert("Where did the select go?");
    }
  }
}

async function getCategoryTypes() {

  const apiResponse = await fetch("http://192.168.15.53:5000/category/types")
    .then((response) => response.json())
    .then((result) => {
      return result;
    });

  const select = document.getElementById('categoryTypes');
  for(var i=0; i < apiResponse.length; i++){
    if (select) {
      select.options[select.options.length] = new Option(apiResponse[i].name, apiResponse[i].typeId);
    } else {
      alert("Where did the select go?");
    }
  }
}
async function listCategories() {
    
  const apiResponse = await fetch("http://192.168.15.53:5000/categories")
    .then((response) => response.json())
    .then((result) => {
      return result;
    });

  var tableDiv = document.createElement("table");
  var prDiv = document.getElementById("pr");
  
  prDiv.innerHTML = "";
  
  var trElement =  document.createElement("tr");
  tableDiv.appendChild(trElement);
  
  var tdElement =  document.createElement("td");
  tdElement.innerHTML = "<b>" + "Nome da categoria" + "</b>";
  trElement.appendChild(tdElement);

  var tdElement =  document.createElement("td");
  tdElement.innerHTML = "<b>" + "Tipo da categoria" + "</b>";
  trElement.appendChild(tdElement);

  apiResponse.forEach(function(a_column){
    var trElement =  document.createElement("tr");
    tableDiv.appendChild(trElement);
    
    var tdElement =  document.createElement("td");
    tdElement.innerHTML = "<b>" + a_column.name + "</b>";
    trElement.appendChild(tdElement);

    var tdElement =  document.createElement("td");
    tdElement.innerHTML = "<b>" + a_column.type + "</b>";
    trElement.appendChild(tdElement);

  });
  prDiv.appendChild(tableDiv);
}


async function listCategoryTypes() {

  const apiResponse = await fetch("http://192.168.15.53:5000/category/types")
    .then((response) => response.json())
    .then((result) => {
      return result;
    });

  var tableDiv = document.createElement("table");
  var prDiv = document.getElementById("pr");
  
  prDiv.innerHTML = "";

  apiResponse.forEach(function(a_column){
    var trElement =  document.createElement("tr");
    tableDiv.appendChild(trElement);
    
    var tdElement =  document.createElement("td");
    tdElement.innerHTML = "<b>" + a_column.name + "</b>";
    trElement.appendChild(tdElement);

  });
  prDiv.appendChild(tableDiv);
}


async function getCategoriesBalance(type) {

  const apiResponse = await fetch("http://192.168.15.53:5000/categories?type="+type)
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
  
  var tableDiv = document.createElement("table");
  var prDiv = document.getElementById("pr");
  
  prDiv.innerHTML = "";

  apiResponse.forEach(function(a_column){
    var trElement =  document.createElement("tr");
    tableDiv.appendChild(trElement);
    
    var tdElement =  document.createElement("td");
    tdElement.innerHTML = "<b>" + a_column.name + "</b>";
    trElement.appendChild(tdElement);

    var tdElement = document.createElement("td");
    tdElement.innerHTML = "<b>" + a_column.balance + "</b>";
    trElement.appendChild( tdElement );

  });
  prDiv.appendChild(tableDiv);
}
