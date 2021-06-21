var table = $('#tbdDemo').DataTable();
var counter = 1;
var datas = []; 
$("#birth").attr({  
	"max" : moment().format("YYYY-MM-DD"),  
 });
drawTableBygetAllUser() 
function tbdDemoDataTable(data) {
	var table = $("#tbdDemo").DataTable({
		destroy: true,
		searching: false,
		paging: false,
		bInfo: false,
		sInfo: false,
		bSort: false,
		bProcessing: false,
		autoWidth: false,
		responsive: true,
		data: data,
		columns:[
			{
				title : "ลำดับ",
				data : "id",
				defaultContent : "",
				class : "lb-txt-center", 
			},
			{
				title : "รหัสผู้ใช้งาน",
				data : "code",
				defaultContent : "",
				class : "lb-txt-center",
			},
			{
                title : "ชื่อ-นามสกุล",
				width : "10%",
				data : "name",
				class : "lb-txt-center",
			},
            {
                title : "วันเกิด",
				data : "birthDate",
				defaultContent : "",
				class : "lb-txt-center",
			},
            {
                title : "อายุ",
				data : "age",
				defaultContent : "",
				class : "lb-txt-center",
			},
            {
                title : "เพศ",
				data : "sex",
				defaultContent : "",
				class : "lb-txt-center",
			},
            {
                title : "วันที่บันทึก",
				width : "10%",
				data : "dateAt",
				defaultContent : "",
				class : "lb-txt-center",
				
			},
            {
                title : "บันทึกโดย",
				width : "10%",
				data : "by",
				defaultContent : "",
				class : "lb-txt-center",
				
			},
            {
				width : "10%",
				defaultContent : "",
				class : "lb-txt-center",
                render : function(data, type, row, meta) {
					return `<div class="row">
					<button type="button" class="btn btn-primary" onclick="editRow(${meta.row})" data-toggle="modal" data-target="#addModal" >Edit</button>
					<button type="button" class="btn btn-danger" onclick="deleteRow(${meta.row})" >Delete</button>
					</div>`
				},
            }
			
		]
	});
}

function drawTableBygetAllUser(){
	datas=[]
	let data =  serviceCtrl("getAllUser","","get")
	data.forEach(element => {
		element.name = element.fname+" "+element.lname
		element.dateAt = moment(element.dateAt).format("YYYY-MM-DD HH:mm:ss")
		datas.push(element)
	});
	tbdDemoDataTable(datas)
}


// function addRow(){
// 	var jsonObj = new Object();
// 	counterVal = $("#counter").val()
// 	if(counterVal===""){
// 		jsonObj.counter = counter;
// 		jsonObj.no = "number:"+counter
// 		counter++
// 	}else{
// 		datas = datas.filter(ele=>ele.counter!=counterVal)
// 		jsonObj.counter = counterVal
// 		jsonObj.no = "number:"+counterVal
// 	}
// 	jsonObj.name = $("#fname").val()+" "+$("#lname").val()
// 	jsonObj.birth = $("#birth").val()
// 	jsonObj.age=$("#age").val()
// 	jsonObj.sex = $("#sex").val()
// 	jsonObj.date = moment().format("DD MMM YYYY ")
// 	jsonObj.who = "me"
// 	datas.push(jsonObj)
// 	datas.sort((a,b)=>a.counter-b.counter)
//     tbdDemoDataTable(datas)
// 	$('#form').trigger("reset");

// }

function addRow(){
	id = datas.length
	var jsonObj = new Object();
	counterVal = $("#counter").val()
	jsonObj.id = (counterVal==="")?++id:counterVal
	jsonObj.code = "number:"+jsonObj.id
	jsonObj.fname = $("#fname").val()
	jsonObj.lname = $("#lname").val()
	jsonObj.birthDate = $("#birth").val()
	jsonObj.age=$("#age").val()
	jsonObj.sex = $("#sex").val()
	if($("#sex").val()=="ชาย"){
		jsonObj.sex="male"
	}
	else if($("#sex").val()=="หญิง"){
		jsonObj.sex="female"
	}else{
		jsonObj.sex="other"
	}
	jsonObj.dateAt = moment().toDate()
	jsonObj.by = "me"
	let data = serviceCtrl("addOrUpdateUser",jsonObj,"post")
	if(data===""){
		drawTableBygetAllUser()
		alert("Success!!")
		$('#form').trigger("reset");
	}else{
		alert("cannot save data")
	}
}

function editRow(index){
	var table = $('#tbdDemo').DataTable();	
	var row =  table.row( index )
	var rowData = row.data();
	dataName = rowData.name.split(" ")
	$("#counter").val(rowData.id)
	$("#fname").val(dataName[0])
	$("#lname").val(dataName[1])
	$("#birth").val(rowData.birth)
	$("#age").val(rowData.age)
	$("#sex").val(rowData.sex)
}

// function deleteRow(index){
// 	var data = $('#tbdDemo').DataTable().row(index).data()
// 	datas = datas.filter(e=>e.counter != data.counter)
// 	tbdDemoDataTable(datas)
// }

function deleteRow(index){
	let dataTable = $('#tbdDemo').DataTable().row(index).data()
	let data = serviceCtrl("deleteUserById",dataTable.id,"post")
	console.log(data)
	if(data===""){
		drawTableBygetAllUser()
		alert("Delete success!!")
	}else{
		alert("Delete Fail!!")
	}
}

function ageCount() {
    var now =new Date();                           
    var currentY= now.getFullYear();                
    var currentM= now.getMonth();  
	var currentD= now.getDate()            
    var date =new Date(document.getElementById("birth").value) 
	var bY = date.getFullYear()
	var bM = date.getMonth()
	var bD = date.getDate()
	yDiff=currentY-bY
	mDiff=currentM-bM
	dDiff=bD-currentD
	if(mDiff<0||(mDiff==0&&dDiff>0)){
		yDiff--
	}
    $("#age").val(yDiff)
}  

function search(){
	type=$("#search_option").val()
	data=$("#search_text").val()

	if(type=="ลำดับที่"){
		datas = datas.filter(e=>e.counter==data)
	}
	if(type=="รหัส"){
		datas = datas.filter(e=>e.no==data)
	}
	if(type=="อายุ"){
		datas = datas.filter(e=>e.age==data)
	}	
	if(type=="เพศ"){
		datas = datas.filter(e=>e.sex==data)
	}
	tbdDemoDataTable(datas)
}

function searchData() {

	input = $("#search_text").val().toLowerCase();
	type=$('#search_option').val()
	dataTable = $("tbody tr")
	dataTable.each(function(){
		row = $(this).find("td")
		if(type=="ลำดับที่") td=row[0]
		if(type=="รหัส") td=row[1]
		if(type=="อายุ") td=row[4]
		if(type=="เพศ") td=row[5]

		found = $(td).text().toLowerCase().indexOf(input) > -1
		$(this).toggle(found)
	})                                                                                          
}

function globalSearch(){
	var value = $("#search_textGlobal").val().toLowerCase();
	dataTable=$("tbody tr")
	dataTable.each(function(){
		found = $(this).text().toLowerCase().indexOf(value) > -1
		$(this).toggle(found)
	})
}


function serviceCtrl(fn, json, type){
	uri = "http://localhost:8778/bossCtrl/" + fn;
	var result;
	$.ajax({
	    url: uri,
	    type: type,
	    contentType: "application/json;charset=utf-8",
	    // headers: {
	    //     "authorization": "Bearer " + getAccessToken()
	    // },
	    data: JSON.stringify(json),
	    async: false,
	    success: function (data) {
            result = data;
	    },
	    error: function (data) {
	        result = data;
	    }
	});
	return result
}