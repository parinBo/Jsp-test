var table = $('#tbdDemo').DataTable();
var counter = 1;
$(document).ready(function() {
    var oldcounter =0;
    var oldno=0;
    var realA =0;
    dataTable=[]
    // $("#addForm").submit(function() {
    //     var fname = $("#fname").val()
    //     var lname = $("#lname").val()
    //     var birth = $("#date").val()
    //     var sex = $("#sex").val() 
    //     var age = $("#age").val()
    //     table.row.add( [counter,"10"+counter,fname+"   "+lname,birth,age,sex,moment().format("DD MMM YYYY "),"me",
    //     `<div class="row" ><button class="btn btn-primary nbtn edit" id="${counter}" >Edit</button>`+
    //     `<button class="btn btn-danger nbtn btnDelete" id="del" >Del</button></div>`
    //     ] ).draw( false );
    //     counter++;
    //     $('#addModal').modal('hide');
    //     return false; 
    // });

    // $("#editForm").submit(function() {
    //     var fname = $("#fname2").val()
    //     var lname = $("#lname2").val()
    //     var birth = $("#date2").val()
    //     var age = $("#age2").val()
    //     var sex = $("#sex2").val() 
    //     table.row(oldcounter-1).remove().draw(false)
    //     table.row.add( [oldcounter,oldno,fname+"   "+lname,birth,age,sex,moment().format("DD MMM YYYY "),"me",
    //     `<div class="row" ><button class="btn btn-primary nbtn edit" id="${counter}" >Edit</button>`+
    //     `<button class="btn btn-danger nbtn btnDelete" id="del" >Del</button></div>`
    //     ] ).draw( false );
    //     $('#editModal').modal('hide');
    //     return false; 
    // });

    //delete row
    $('#tbdDemo tbody').on( 'click', '#del', function () {
        table.row( $(this).parents('tr')).remove().draw();
    } );

    
    $('#tbdDemo').on( 'click', '.edit', function () {
        $('#editModal').modal('toggle');
        index = ($(this).context.id)-1
        data = table.row(index).data()
        nname = data[2].split("   ")
        oldcounter = data[0]
        oldno = data[1]
        $("#fname2").val(nname[0])
        $("#lname2").val(nname[1])
        $("#date2").val(data[3])
        $("#age2").val(data[4])
        $("#sex2").val(data[5]) 
    } );

   
});
function ageCount1() {
    var now =new Date();                           
    var currentY= now.getFullYear();                
    var currentM= now.getMonth();                   

    var user =document.getElementById("date").value; 
    var dob= new Date(user);                             
    var prevY= dob.getFullYear();                         
    var prevM= dob.getMonth();                            
    var ageY =currentY - prevY;
    $("#age").val(ageY)
}  

function ageCount2() {
    var now =new Date();                           
    var currentY= now.getFullYear();                
    var currentM= now.getMonth();                   

    var user =document.getElementById("date2").value; 
    var dob= new Date(user);                             
    var prevY= dob.getFullYear();                         
    var prevM= dob.getMonth();                            
      
    var ageY =currentY - prevY;
    $("#age2").val(ageY)
}  

function tbdDemoDataTable(data) {
	var table = $("#tbdDemo").DataTable({
		destroy: true,
		searching: false,
		paging: false,
		bInfo: false,
		sInfo: false,
		bSort: false,
		bProcessing: true,
		autoWidth: false,
		responsive: true,
		data: data,
		columns:[
			{
				title : "ลำดับ",
				data : "counter",
				defaultContent : "",
				class : "lb-txt-center", 
			},
			{
				title : "รหัสผู้ใช้งาน",
				data : "no",
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
				data : "birth",
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
				data : "date",
				defaultContent : "",
				class : "lb-txt-center",
				
			},
            {
                title : "บันทึกโดย",
				width : "10%",
				data : "who",
				defaultContent : "",
				class : "lb-txt-center",
				
			},
            {
				width : "10%",
				defaultContent : "",
				class : "lb-txt-center",
                render : function(data, type, row, meta) {
					return `<div class="row">
					<button type="button" class="btn btn-primary" onclick="editRow(${meta.row})">Edit</button>
					<button type="button" class="btn btn-danger" onclick="deleteRow(${meta.row})" >Delete</button>
					</div>`
				},
            }
			
		]
	});
}

//
function getDataTable(){
	var datas = [];
	table.rows().eq(0).each( function ( index ) {
	    var row = table.row( index );
	    var data = row.data();
	    datas.push(data);
	} );
	console.log("Datas>>",datas);
}
var datas = [];
function addRow(){
	//NEW ROW
	var jsonObj = new Object();
	jsonObj.counter = counter;
    jsonObj.no = "aa"+counter
	jsonObj.name = $("#fname").val()+" "+$("#lname").val()
	jsonObj.birth = $("#date").val()
	jsonObj.sex = $("#sex").val()
	jsonObj.date = moment().format("DD MMM YYYY ")
	jsonObj.who = "me"
    datas.push(jsonObj)
	counter++
    tbdDemoDataTable(datas)
	//LOOOP GET EXISTING DATATABLE
    
	// var table = $('#tbdDemo').DataTable();
	// table.rows().eq(0).each( function ( index ) {
	//     var row = table.row( index );
	//     var data = row.data();

	//     datas.push(data);
	// } );
	
	//Push new row
	// if(datas.length > 0){
	// 	table.row.add(jsonObj).draw( false );
	// }else{
	// 	datas.push(jsonObj);
	// 	tbdDemoDataTable(datas);
	// }
}

function editRow(index){
	var table = $('#tbdDemo').DataTable();	
	var rowData = table.row( index ).data();
	console.log("editRow>>",rowData);
	
	$("#inCode").val(rowData.rcode);
	$("#inName").val(rowData.rname);
	$("#inDesc").val(rowData.rdesc);
	$("#inFlg").val(rowData.rflg);
}

function deleteRow(index){
	var table = $('#tbdDemo').DataTable();	
	var rowData = table.row( index ).data();
	table.row(index).remove().draw();
	//tbdDemoDataTable(table.rows().data());
}

//