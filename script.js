let jsonData = [];

fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
.then(res=>res.json())
.then(data=>{
    jsonData = data;
}).then(()=>run())


function run(){
    function createRow(id, name, email){
        let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.innerHTML = id;
            let td2 = document.createElement('td');
            td2.innerHTML = name;
            let td3 = document.createElement('td');
            td3.innerHTML = email;
        tr.append(td1, td2, td3);
        return tr;
    }
    
    let root = document.getElementById('root');
    root.className = "my-5 container mx-auto text-center";
    
    let buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'row my-3 border-top border-bottom paginate-button container d-flex justify-content-center';
    root.appendChild(buttonWrapper);

    let table = document.createElement('table');
    table.className = 'table table-dark';
    root.appendChild(table);
        let tableRow = document.createElement('tr');
        table.appendChild(tableRow);
            let idth = document.createElement('th');
            idth.innerHTML = 'ID';
            let nameth = document.createElement('th');
            nameth.innerHTML = 'NAME';
            let emailth = document.createElement('th');
            emailth.innerHTML = 'EMAIL';
        tableRow.append(idth, nameth, emailth);

        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
    


    
    let state = {
        'querySet': jsonData,
        'page': 1,
        'rows': 10,
        'window': 5
    }
    buildTable();
    function paginate(querySet, page, rows) {
        let startRow = (page-1) * rows;
        let endRow = startRow + rows;
        
        return {
            'querySet' : querySet.slice(startRow, endRow),
            'pages' : Math.ceil(querySet.length/rows)
        }
    }
    

    function buildTable(){
        tableBody.innerHTML = '';
        let data = paginate(state.querySet, state.page, state.rows);
        let myList = data.querySet;
        
        for(let i=0; i<myList.length; i++){
            let id = myList[i].id;
            let name = myList[i].name;
            let email = myList[i].email;
            tableBody.appendChild(createRow(id, name, email));
        }

        buildButtons(data.pages);
    }


    function buildButtons(pages){
        buttonWrapper.innerHTML = '';
        let maxLeft = parseInt(state.page) - parseInt(Math.floor(state.window/2));
        let maxRight = parseInt(state.page) + parseInt(Math.floor(state.window/2));
        
        if(maxLeft<=1){
            maxLeft = 1;
            maxRight = state.window;
        }

        if(maxRight > pages){
            maxLeft = pages-state.window+1;
            maxRight = pages;
        }

        if(state.page != 1){
            console.log(state.page);
            let  btn = document.createElement('button');
            btn.className = 'btn btn-sm btn-info';
            btn.setAttribute('id', 'first');
            btn.setAttribute('value', 1);
            btn.innerHTML = '&#171;first';
            buttonWrapper.appendChild(btn);
        }

        for(let i=maxLeft; i<=maxRight; i++){
            let  btn = document.createElement('button');
            btn.className = 'btn btn-sm btn-info';
            btn.setAttribute('id', i);
            btn.setAttribute('value', i);
            btn.innerHTML = i;
            buttonWrapper.appendChild(btn);
        }


        if(state.page != pages){
            let  btn = document.createElement('button');
            btn.className = 'btn btn-sm btn-info';
            btn.setAttribute('id', 'last');
            btn.setAttribute('value', pages);
            btn.innerHTML = 'last&#187;';
            buttonWrapper.appendChild(btn);
        }
    }

    buttonWrapper.addEventListener('click', e=>{
        if(!e.target.closest('button')) return;
        state.page = e.target.value;
        buildTable();
    });
    
}
