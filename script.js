function addNewEntry() {
  if (formPreenchido() == false) {
    alert('Por favor preencha os campos!');
  }
  if (formPreenchido() == true) {
    let formData = getFormData();
    console.log(formData);
    createEntry(formData, "http://192.168.15.53:5000/entry", "POST");
  }
}

const getFormData = () => {
  if (document.getElementById('input-output').value === 'input') {
    input_output = 1;
  }
  if (document.getElementById('input-output').value === 'output') {
    input_output = 0;
  }

  return {
    name: document.getElementById('name').value,
    date: document.getElementById('date').value,
    value: document.getElementById('value').value,
    store: document.getElementById('store').value,
    category: document.getElementById('categories').value,
    description: document.getElementById('description').value,
    input_output,
  };
};

const getCategories = () => {
	createEntry('', "http://192.168.15.53:5000/categories", "GET")
}

const createEntry = async (data, url, method) => {
  const body = JSON.stringify(data); // body data type must match "Content-Type" header
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

  await fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const formPreenchido = () => {
  let validity = false;
  document.forms['form'].addEventListener(
    'submit',
    () => {
      validity = document.forms['form'].reportValidity();
    },
    false
  );
  return validity;
};
