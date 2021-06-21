<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jsp:include page="/templates/scriptAndcss.jsp"/>
</head>
 <style>
        .control-label {
            display: inline-block;
            display: -moz-inline-box;
            padding-top: 0px !important;
            padding-bottom: 0px !important;
            text-align: right;
            vertical-align: baseline;
            padding-right: 5px; /*10px*/
            width: 100px;
            margin-bottom: 2px;
            /* padding-bottom: 0px!important;
             text-align:left!important;
           float:none!important;    */
        }

        .ctrl-radiogroup, .ctrl-checkboxgroup, .ctrl-select {
            /*  display: block!important;  */
        }

        .droppedField > input, select, button, .checkboxgroup, .selectmultiple, .radiogroup {
            /* margin-top: 10px; */
            /*  margin-right: 10px; */
            margin-bottom: 5px;
        }

        .action-bar .droppedField {
            /*  float: left;   */
            display: inline-block;
            display: -moz-inline-box;
            padding-left: 2px;

            vertical-align: top;
        }

        .well {
            background-color: white;
        }

        /* CSS used here will be applied after bootstrap.css */
        .modal-header {
            padding: 2px 16px;
            background-color: #3C8DBC;
            font-size: 28px;
            font-weight: bold;
            color: white;
        }

        .modal-body {
            padding: 2px 16px;
        }

        .modal-footer {
            padding: 2px 16px;
            /* background-color: #5cb85c; */
            color: white;
        }

        .lb-txt-center {
            text-align: center;
        }

        .lb-txt-left {
            text-align: left;
        }

        .lb-txt-right {
            text-align: right;
        }

        .modal-header-success {
            color: #fff;
            padding: 9px 15px;
            border-bottom: 1px solid #eee;
            background-color: #5cb85c;
            -webkit-border-top-left-radius: 5px;
            -webkit-border-top-right-radius: 5px;
            -moz-border-radius-topleft: 5px;
            -moz-border-radius-topright: 5px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .modal-header-warning {
            color: #fff;
            padding: 9px 15px;
            border-bottom: 1px solid #eee;
            background-color: #f0ad4e;
            -webkit-border-top-left-radius: 5px;
            -webkit-border-top-right-radius: 5px;
            -moz-border-radius-topleft: 5px;
            -moz-border-radius-topright: 5px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .modal-header-danger {
            color: #fff;
            padding: 9px 15px;
            border-bottom: 1px solid #eee;
            background-color: #d9534f;
            -webkit-border-top-left-radius: 5px;
            -webkit-border-top-right-radius: 5px;
            -moz-border-radius-topleft: 5px;
            -moz-border-radius-topright: 5px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .modal-header-info {
            color: #fff;
            padding: 9px 15px;
            border-bottom: 1px solid #eee;
            background-color: #5bc0de;
            -webkit-border-top-left-radius: 5px;
            -webkit-border-top-right-radius: 5px;
            -moz-border-radius-topleft: 5px;
            -moz-border-radius-topright: 5px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .modal-header-primary {
            color: #fff;
            padding: 9px 15px;
            border-bottom: 1px solid #eee;
            background-color: #428bca;
            -webkit-border-top-left-radius: 5px;
            -webkit-border-top-right-radius: 5px;
            -moz-border-radius-topleft: 5px;
            -moz-border-radius-topright: 5px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .sidemenu {
            white-space: pre-wrap; /* css-3 */
            white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
            white-space: -pre-wrap; /* Opera 4-6 */
            white-space: -o-pre-wrap; /* Opera 7 */
            word-wrap: break-word; /* Internet Explorer 5.5+ */

        }

        .required label:before {
            content: "*";
            color: red;
            vertical-align: bottom;
        }
        .nav-pills>li>a:hover {
         background-color: #999;
         color: white;
         }
    </style>
<body>
<nav class="navbar navbar-default navbar-fixed-top" style="background:black">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#" style="color: antiquewhite;">เว็บจำลอง</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav nav-pills">
		  <li id="boss"><a href="/test/main/boss.jsp" class="btn" style="color: antiquewhite;">Boss</a></li>
		  <li id="rung"><a href="/test/main/rung.jsp" style="color: antiquewhite;">Rung</a></li>
          <li id="frong"><a href="/test/main/frong.jsp" style="color: antiquewhite;">Frong</a></li>
	</ul>
    </div>
    <div class="collapse navbar-collapse" id="myDIV">
      
    </div>
  </div><!-- /.container-fluid -->
</nav>
<div style="margin-top:10rem;margin-bottom:10rem"></div>
<script>
if($(location).attr('href').indexOf("boss.jsp")!=-1){
	$("#boss").addClass("active")
}

if($(location).attr('href').indexOf("rung.jsp")!=-1){
	$("#rung").addClass("active")
}
if($(location).attr('href').indexOf("frong.jsp")!=-1){
	$("#frong").addClass("active")
}


</script>
</body>
</html>
