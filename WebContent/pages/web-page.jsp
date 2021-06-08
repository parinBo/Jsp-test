<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        form .error {
            color: #ff0000;
        }

        .r{
            padding: 3px;
            margin-top: 10px;
            text-align: right;
        }
        label{
            white-space: nowrap;
        }
        .nbtn{
            font-size: 13px;
        }
        .t-center{
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="box box-info">
        <div class="box-header with-border" style="display: block;">
            <h3 class="box-title">ผู้ใช้งาน</h3>
            <div class="box-tools pull-right" >
                <button class="btn btn-box-tool" data-widget="collapse">
                    <i class="fa fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="row" style="padding: 3px;text-align: right;">
            <div class="col-xs-11">
                <table id="tbdDemo" class="table table-striped table-bordered table-hover">
                    <thead>
                     <tr>
                        <th>ลำดับ</th>
                        <th>รหัสผู้ใช้งาน</th>
                        <th>ชื่อ-นามสกุล</th>
                        <th>วันเกิด</th>
                        <th>อายุ</th>
                        <th>เพศ</th>
                        <th>วันที่บันทึก</th>
                        <th>บันทึกโดย</th>
                        <th>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addModal">
                                +
                              </button>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">กรุณากรอกข้อมูลผู้ใช้งาน</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body " style="padding: 30px 30px;">
                <div class="form-inline" >
                    <div class="row r" >
                        <div class="col-xs-2">
                            <label class="control-label">ชื่อ</label>
                        </div>
                        <div class="col-xs-3">
                            <input class="form-control " id="fname" style="width:100%">
                        </div>
                        <div class="col-xs-2">
                            <label class="control-label">นามสกุล</label>
                        </div>
                        <div class="col-xs-3">
                            <input class="form-control " id="lname" style="width:100%">
                        </div>
                    </div>
                    <div class="row r" >
                        <div class="col-xs-2">
                            <label class="control-label">วันเกิด</label>
                        </div>
                        <div class="col-xs-3">
                            <input type="date" id="date" class="form-control" onchange="ageCount1()" style="width:100%"  >
                        </div>
                        <div class="col-xs-2">
                            <label class="control-label">อายุ</label>
                        </div>
                        <div class="col-xs-3">
                            <input type="number" class="form-control " id="age"  style="width:100%">

                        </div>
                    </div>
                    <div class="row r" >
                        <div class="col-xs-2">
                            <label class="control-label">เพศ</label>
                        </div>
                        <div class="col-xs-3">
                            <select id="sex" name="sex" class="form-control " style="width:100%"   >
                                <option value="เลือกเพศ" disabled selected hidden >กรุณาเลือกเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                        </div>
                    </div>
                    <div class="row ">
                        <div style="text-align: center;margin-top: 20px;">
                            <button class="btn btn-primary" onclick="addRow()">บันทึก</button>
                            <button class="btn btn-danger " data-dismiss="modal">ยกเลิก</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="editModal" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">กรุณากรอกข้อมูลผู้ใช้งาน</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body " style="padding: 30px 30px;">
                <form class="form-inline" id="editForm">
                    <div class="row r" >
                        <div class="col-xs-2">
                            <label class="control-label">ชื่อ</label>
                        </div>
                        <div class="col-xs-3">
                            <input class="form-control " id="fname2" style="width:100%">
                        </div>
                        <div class="col-xs-2">
                            <label class="control-label">นามสกุล</label>
                        </div>
                        <div class="col-xs-3">
                            <input class="form-control " id="lname2" style="width:100%">
                        </div>
                    </div>
                    <div class="row r" >
                        <div class="col-xs-2">
                            <label class="control-label">วันเกิด</label>
                        </div>
                        <div class="col-xs-3">
                            <input type="date" id="date2" class="form-control" style="width:100%"  onchange="ageCount2()" >
                        </div>
                        <div class="col-xs-2">
                            <label class="control-label">อายุ</label>
                        </div>
                        <div class="col-xs-3">
                            <input type="number" class="form-control " id="age2"  style="width:100%">

                        </div>
                    </div>
                    <div class="row r" >
                        <div class="col-xs-2">
                            <label class="control-label">เพศ</label>
                        </div>
                        <div class="col-xs-3">
                            <select id="sex2" name="sex" class="form-control " style="width:100%"   >
                                <option value="เลือกเพศ" disabled selected hidden >กรุณาเลือกเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                        </div>
                    </div>
                    <div class="row ">
                        <div style="text-align: center;margin-top: 20px;">
                            <button class="btn btn-primary">บันทึก</button>
                            <button class="btn btn-danger " data-dismiss="modal">ยกเลิก</button>
                        </div>
                    </div>
                  </form>
            </div>
          </div>
        </div>
      </div>
</body>
</html>
<script src="<%=request.getContextPath()%>/scripts/index.js"></script>

