CKEDITOR.plugins.add('ajaxsave',
    {
        init: function(editor)
        {
            var pluginName = 'ajaxsave';
            var pdfurl = editor.config.pdfConfig.url;
            var pdfid = editor.config.pdfConfig.id;
//alert(param1);
            editor.addCommand( pluginName,
            {
                exec : function( editor )
                {debugger;
                
              
                var jqDocument = $(editor.document.$);
       	  	    var documentHeight =  jqDocument.height() ;//alert(documentHeight);   
             // Account for left/right scrolling
                var scrollTop = editor.document.$.documentElement.scrollTop;
                var scrollLeft = editor.document.$.documentElement.scrollLeft;
                var noOfPage = $( CKEDITOR.instances['editor1'].window.getFrame().$ ).contents().find(".page-break").length -1 ;
              
              //  alert(noOfPage);
              /*  $.msg({ klass : 'white-on-black' });
                $('.white-on-black').css('z-index', editor.config.baseFloatZIndex-1);*/
                $.blockUI({  message: '<img src="../../../img/ajax-loader.gif" />' , 
					 css: {border: 'none',backgroundColor: 'transparent','z-index': editor.config.baseFloatZIndex-1 },   
      			 overlayCSS: { backgroundColor: '#000', opacity: 0.5,cursor:'default','z-index': editor.config.baseFloatZIndex-1 }
					});
                setTimeout(function() {
                	
      //  alert("start")  ;   

               /* var html = '<span class="variable" data-name="lawyer" data-len="50" >'+'[----]'+'</span>';

                var newElement = CKEDITOR.dom.element.createFromHtml( html, editor.document );
                editor.insertElement( newElement );*/
                
              debugger  
                sourceOrg = editor.getData();//alert(sourceOrg);//CKEDITOR.instances['editor1']
            
                /*
                var body = editor.editable().$;
				var value =125;

				body.style.MozTransformOrigin = "top left";
				body.style.MozTransform = "scale(" + (value/100)  + ")";

				body.style.WebkitTransformOrigin = "top left";
				body.style.WebkitTransform = "scale(" + (value/100)  + ")";

				body.style.OTransformOrigin = "top left";
				body.style.OTransform = "scale(" + (value/100)  + ")";

				body.style.TransformOrigin = "top left";
				body.style.Transform = "scale(" + (value/100)  + ")";
				// IE
				body.style.zoom = value/100;*/

         
               
                selection = editor.getSelection(),
                root = selection.root;
                textNodes = [];
                var ranges = editor.getSelection().getRanges();
                var range, text, index;

            function getTextNodes( element ) {
                var children = element.getChildren(),
                    child;

                for ( var i = children.count(); i--; ) {
             //   for ( var i = 0;i< children.count(); i++ ) {
                    child = children.getItem( i );
                    if ( child.type == CKEDITOR.NODE_ELEMENT ) 
                        getTextNodes( child );
                    else if ( child.type == CKEDITOR.NODE_TEXT ){
                    	/*debugger;alert($(child.$).attr("textContent"));*/
                    	textNodes.push( child );
                    }
                        
                }
            }


            getTextNodes( root );    
            var minTop = 999999.9; 
            var NOTFOUND = true;
            var prevBreak = 0;//1200+(noOfPage*1135);
            var pageSize = 1;
            var firstPage = 0;
            if($.browser.chrome) {
            	firstPage = 1235;
            	pageSize = 1135;
            	prevBreak = firstPage+(noOfPage*pageSize);
            	} else if ($.browser.mozilla) {
            		firstPage = 1175;//1235
            		pageSize = 1135;
            		
            		//prevBreak = 1240+(noOfPage*pageSize); //1200
            		prevBreak = firstPage+(noOfPage*pageSize);
            		
            	} else if ($.browser.msie) {//alert('ie');
            		firstPage = 1195;
            		pageSize = 1085;
            		prevBreak = firstPage+(noOfPage*pageSize) ; //1160
            		//alert(prevBreak);
            	}
        //    var prevBreak = 1155+(9*1085) ;//+ 1050;
            for ( i =0; i<textNodes.length; i++ ) {
        	    text = textNodes[ i ];
        	    var str = text.$.data;
        var newText ="";	   
       
       	      for(j=0;j<text.$.length;j++){
        	       ranges[0].setStart( text, j );
        	       ranges[0].setEnd( text, j+1 ); 
        	    //console.log(text.$.data[j]); 
    	       var node = ranges[0].startContainer; 
  	       
    	       newText += '<span class="get-position-of-it"  >'+text.$.data[j]+'</span>';
       	  /*  var dummyElement = CKEDITOR.dom.element.createFromHtml( '<span class="get-position-of-it"  >'+text.$.data[j]+'</span>' );

       	    dummyElement.insertBefore( node );*/
       	    
      // 	 text.$.data[j]="";
      
       	      }
       	   ranges[0].setStart( text, 0 );
	       ranges[0].setEnd( text, 1 ); 
	    
       var node = ranges[0].startContainer;   
       	   var dummyElement = CKEDITOR.dom.element.createFromHtml( '<span  >'+newText+'</span>' );

      	    dummyElement.insertBefore( node );   
       	   text.$.nodeValue='';
      // editor.updateElement();
       	 
       	   
       	   var breaklines = [];var k = 0;
 	      var prevTop = 99999.9;
 	      
 	// debugger 
 	 var GETPOSITON = false;
	    	 var FOUND = false;
	    	 var pagebreakIndex=0;
 	    //  $( CKEDITOR.instances.editor1.window.getFrame().$ ).contents().find(".get-position-of-it").each(function(index){
 	    	  $(editor.window.getFrame().$ ).contents().find(".get-position-of-it").each(function(index){
 	    		 GETPOSITON=true; 
 	    		// $(this).css("display","");
 	    	    var offset = $(this).offset();
 	  	      //  positions.push([offset.left, offset.top]);
 	  	    //   if($(this).text() == '@') console.log(prevBreak+'-----@------->'+offset.top);
 	  	        if(offset.top > prevTop ) {
 	  	       // 	$("<br>").insertBefore(this);
 	  	        	breaklines.push(index);
 	  	        //	console.log('-----break-------');
 	  	        	str = str.substr(0, index+k*4) + '<br>' + str.substr(index+k*4);
 	  	        	k++;
 	  	        	 
 	  	        }
 	  	    /* if((offset.top > prevBreak )&& !FOUND  ){
	 	  	     
	 	  	      //  FOUND = index;
	 	  	         minTop = offset.top ;
	 	  	        	 
	  	        }else{
	  	        	FOUND = true;
	  	        	pagebreakIndex = index;
	  	        	console.log(prevBreak+'-----@------->'+offset.top);
	  	        	
	  	        }*/
 	  	        prevTop = offset.top;
 	  	    //  console.log(index+'['+this.innerText+']'+offset.left+','+ offset.top);
 	  	    });
 	    //	k=0;
 	    	 
 	    	 var txtlen = '<div style="page-break-after: always"></div>'.length; 
 	    /*	  $(editor.window.getFrame().$ ).contents().find(".get-position-of-it").each(function(index){
 	 	    		// $(this).css("display","");
 	 	    	    var offset = $(this).offset();
 	 	  	      //  positions.push([offset.left, offset.top]);
 	 	  	        
 	 	  	        if((offset.top < prevBreak ) && (offset.top > minTop) && NOTFOUND){debugger
 	 	  	       // $('<div style="page-break-after: always"></div>').insertAfter(this);	
 	 	  	        	//breaklines.push(index);
 	 	  	        //	console.log('-----break-------');
 	 	  	        	
 	 	  	        FOUND = index;
 	 	  	        	k++;
 	 	  	        	//alert(offset.top+" : " +prevBreak);
 	 	  	       $(this).addClass("break");
 	 	  	        	
 	 	  	         minTop = offset.top ;
 	 	  	        	 
 	 	  	        }
 	 	  	       // prevTop = offset.top;
 	 	  	    
 	 	  	    });*/
 	    	/* $(editor.window.getFrame().$ ).contents().find(".break:last").each(function(index){debugger
 	    		
  	    		NOTFOUND = false;
 	    	 });*/
 	    	  /*if(FOUND && GETPOSITON){debugger
 	    		
	  	        	str = str.substr(0, pagebreakIndex+(k*4)+1) + '<div style="page-break-after: always;"></div>' + str.substr(pagebreakIndex+(k*4)+1);
	  	        	NOTFOUND = false;
	  	        	prevBreak = prevBreak-pageSize;
	  	        	prevBreak = (prevBreak < firstPage)?0:prevBreak;
	  	        	;
 	    	  }*/
 	    	/* $(editor.window.getFrame().$ ).contents().find(".page-break").each(function(index){
 	    		// alert(parseInt($(this).css('top')));
 	    	 }); */
 	
 	    	  
 	    	 $( editor.window.getFrame().$ ).contents().find(".get-position-of-it").remove();
 	    	
 	    	
 	    	/* for( var k=0;k<breaklines.length;k++){
 	    	 	str = str.substr(0, breaklines[k]+k*4) + '<br>' + str.substr(breaklines[k]+k*4);
 	    	 }*/
 	    	text.$.nodeValue = str; 
            }
                
          //  alert("stop")  ;   
                
               var spage = $.parseHTML(  '<div>'+editor.getSnapshot()+'</div>');
               
               // var sp = $('[name="'+editor.name+'"]').clone();
                $(spage).find('p').each(function( index ) {

             	   $(this).css("word-wrap", "break-word");
             	   
             	// var result= fitStringToWidth($(this).text(),699,'test');
             	// console.log(result);
                });//alert($(spage).html());
               /* $(spage).find('br').each(function( index ) {
                	alert("br");
                });*/
             //  var htmlpage = editor.getSnapshot().replace(/\s/g, '&nbsp;');
               
                $(spage).find('.dottedline').each(function( index ) {

              	   $(this).find("*").addClass("dottedline");
              	   
              //	 $(this).find("variable").addClass("dottedline");
             
                 });//alert($(spage).html());
                $(spage).find('.double').each(function( index ) {

               	   $(this).find("*").addClass("double");
               
                  });
               var htmlpage = $(spage).html().replace(/\s/g, '&nbsp;');
               htmlpage = htmlpage.replace( /&lt;/g, '<' );
               htmlpage = htmlpage.replace( /&gt;/g, '>' );
                htmlpage = htmlpage.replace(/<([^>]+)>/g, function(m){ return m.replace(/&nbsp;/gi, ' '); });
               // var htmlpage = $(spage).html();
                
                
                
                
              //  htmlpage = htmlpage.replace(/\n/g, '<br />');
             //   htmlpage = htmlpage.replace(new RegExp("\\n", "g"), "<br />")
              //  text.replace(/\n\r?/g, '<br />'); 
               // htmlpage = htmlpage.replace( /\n/g, '<br>' );
                htmlpage = htmlpage.replace( /&lt;br&gt;/g, '<br>' );
              //  htmlpage = htmlpage.replace( /<br>/g, '<br/>' );
                htmlpage = htmlpage.replace(new RegExp("th sarabunpsk", "g"), "TH SarabunPSK");
             //   htmlpage = htmlpage.replace(new RegExp("variable", "g"), "span");
               

            //  alert(htmlpage);
                    $.ajax({
                    	//url:	"../../../../MyPageServlet", 
                    	url:	pdfurl,//"/Html2Pdf/HtmlPageServlet", 
                    	type:"POST",
                        data : {pages :htmlpage},
                        success: function(data, textStatus, jqXHR) {
                          //  var pdfWin= window.open("data:application/pdf;base64, " +  data, '', 'height=650,width=840');
                           // location.href = "data:application/octet-stream;base64," + data;
                           // $('#showpdf').attr('src', 'data:application/pdf;base64,' + data)
                        	var pdfOpen_params = {

                        			//navpanes: 1,
                        			view: "FitH",
                        			//zoom:'50'
                        		//	pagemode: "thumbs"

                        		};

                        	
                        //	var success = new PDFObject({ url: pdfurl+"/../pdf/HTMLasPDFSubmit.pdf",pdfOpenParams: pdfOpen_params }).embed(pdfid);
                        //	alert(editor.config.baseFloatZIndex);
                        	
                        //	$("<div ></div>").
                        //	$('#'+pdfid).css("display","");
                        	
                        	$("<div  ></div>").dialog({
                        		title: "Print Preview",
                        		 modal: true,
                        	//	 zIndex: editor.config.baseFloatZIndex + 1,
                        		width: '900px',
                        		height: 600,
                        		create		: function() {  
                        			if($.browser.chrome)$.unblockUI();
                        			var success = new PDFObject({ url: pdfurl,pdfOpenParams: pdfOpen_params }).embed(this);
                        			//$('#'+pdfid).css("display","");
                        			$(this).css('overflow', 'hidden'); 
                        			$("div.ui-dialog").css( "z-index", editor.config.baseFloatZIndex+1 ); 
                                	//$("div.ui-dialog").css( "width", "600px" ); 
                        			
									},
									close		: function() {  
										$.unblockUI();
									}
                        	});
                        	//text.$.nodeValue = text.$.nodeValue.replace( /&lt;br&gt;/g, '' );  
                        	
                    	//   alert($( editor.window.getFrame().$ ).contents().html()) 	
            				editor.setData(sourceOrg);
                        	// var jqDocument = $(editor.document.$);
         /*  debugger 				 $( editor.window.getFrame().$ ).contents().find('br').prepend("&para;");*/
                       	  jqDocument.scrollTop(scrollTop); 
                        }

                    } );
                },50); //timeout
                    },
                canUndo : true
            });
            editor.ui.addButton('Ajaxsave',
            {
                label: 'Save Ajax',
                command: pluginName,
                icon: this.path + 'images/icon_pdf.gif'
            });
        }
    });