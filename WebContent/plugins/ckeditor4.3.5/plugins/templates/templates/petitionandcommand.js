
// Register a templates definition set named "custom".
CKEDITOR.addTemplates( "petitioncommand", {
	// The name of sub folder which hold the shortcut preview images of the tenplates.
	imagesPath: CKEDITOR.getUrl( CKEDITOR.plugins.getPath( 'templates' ) + 'templates/images/' ),

	// The templates definitions.
	templates: [
	{
		title: 'Petition Command Template',
		image: 'petition.gif',
		description: 'Creates a petition form.',
		html: '<html style="background-color: rgb(176, 176, 176);">'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+
		'<title></title>'+
		//'<meta http-equiv="content-type" content="text/javascript; charset=utf-8" />'+
		'<style type="text/css">.dottedline{background: -moz-linear-gradient(left, black, black 50%, transparent 50%);background: -ms-linear-gradient(left, black, black 50%, transparent 50%);background: -o-linear-gradient(left, black, black 50%, transparent 50%);background: -webkit-gradient(linear, 0 0, 100% 0, from(#f00), color-stop(0.5, black), color-stop(0.5, transparent));background: -webkit-linear-gradient(left, black, black 50%, transparent 50%);background: linear-gradient(left, black, black 50%, transparent 50%);background-size: 2px 1px; background-position: 0 85%;background-repeat: repeat-x;}'+
		'.dottedbody{background: -moz-linear-gradient(right, red, red 50%, transparent 50%);background: -ms-linear-gradient(right, red 1%, red 1%, transparent 50%);background: -o-linear-gradient(right, red, red 50%, transparent 50%);background: -webkit-gradient(linear, 0 0, 100% 0, from(#f00), color-stop(0.5, red), color-stop(0.5, transparent));background: -webkit-linear-gradient(right, red, red 50%, transparent 100%);background: linear-gradient(right, red, red 50%, transparent 50%);background-size: 2px 1px; background-position: 18%;background-repeat: repeat-y;}'+
		'.double{border-bottom: 1px solid #000;text-decoration: underline;}'+
		'@media screen {'+
		'.page-break	{ height: 1px; color: white; font-weight: normal; background-color:rgb(176, 176, 176);width: 830px; margin-left:-60px;  }'+
		'.varType {background-color: rgba(0, 255, 0, 0.5);}'+
		'}'+
		'@media print {.page-break { height:0; page-break-before:always; margin:0; border-top:none; }}'+
		'</style>'+
	
		'</head>'+
		'<body class="dottedbody" style="padding: 15mm 15mm 15mm 40mm; transform-origin: left top 0px; width: 155mm; font-family: TH SarabunPSK; font-size: 18px; margin-left: 0mm; min-height: 29.7cm; max-width: 21cm; transform: scale(1); background-color: rgb(255, 255, 255);">'+
		'<table border="0" cellpadding="1" cellspacing="1" style="width: 100%;">'+
		'<tbody>'+
		'<tr>'+
		'<td style="width: 40%; text-align: left; vertical-align: top;"><span style="font-size: 18px;"><span style="font-family: &quot;TH SarabunPSK&quot;;"><strong></span>&#3588;&#3635;&#3619;&#3657;&#3629;&#3591;</strong><br />'+
		'<span style="font-family: &quot;TH SarabunPSK&quot;;"><strong>'+'&#3618;&#3639;&#3656;&#3609;&#3610;&#3633;&#3609;&#3607;&#3638;&#3585;&#3606;&#3657;&#3629;&#3618;&#3588;&#3635;&#3618;&#3639;&#3609;&#3618;&#3633;&#3609;'+'</strong><br />'+
		'<span style="font-family: &quot;TH SarabunPSK&quot;;"><strong>&#3586;&#3657;&#3629;&#3648;&#3607;&#3655;&#3592;&#3592;&#3619;&#3636;&#3591;&#3627;&#3619;&#3639;&#3629;&#3588;&#3623;&#3634;&#3617;&#3648;&#3627;&#3655;&#3609;</strong></span></span></span></span><br />'+
		'&nbsp;</td>'+
		'<td style="width: 20%; text-align: center; vertical-align: middle;"><span style="font-size: 18px;"><img alt="" src="'+CKEDITOR.getUrl( CKEDITOR.plugins.getPath( "templates" ) + "templates/images/icon_samut.jpg" )+'" /></span></td>'+
		'<td style="width: 40%; text-align: right; vertical-align: top;"><span style="font-size: 18px;"><span style="font-family: &quot;TH SarabunPSK&quot;;"><strong>&#3621;.&#3672;<br />'+
		'&#3588;&#3604;&#3637;&#3627;&#3617;&#3634;&#3618;&#3648;&#3621;&#3586;&#3604;&#3635;&#3607;&#3637;&#3656; '+'<span class="dottedline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+'<br />'+
		'&#3588;&#3604;&#3637;&#3627;&#3617;&#3634;&#3618;&#3649;&#3604;&#3591;&#3607;&#3637;&#3656; '+'<span class="dottedline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></strong></span></span></td>'+
		'</tr>'+
		'</tbody>'+
		'</table>'+
		'</body>'+
		'</html>'
		
	},	
	]
});
