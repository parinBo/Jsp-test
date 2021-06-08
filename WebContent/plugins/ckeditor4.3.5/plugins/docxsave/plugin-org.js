CKEDITOR.plugins.add('docxsave',
    {
        init: function(editor)
        {
            var pluginName = 'docxsave';
            var docxurl = editor.config.docxConfig.url;
            var docxid = editor.config.docxConfig.id;
//alert(param1);
            editor.addCommand( pluginName,
            {
                exec : function( editor )
                {
                
              
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
                	
    
                
                sourceOrg = editor.getData();//alert(editor.getSnapshot());//CKEDITOR.instances['editor1']
               
                
         
         
               
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
                    else if ( child.type == CKEDITOR.NODE_TEXT )
                        textNodes.push( child );
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
       	   var dummyElement = CKEDITOR.dom.element.createFromHtml( '<span>'+newText+'</span>' );
       	  debugger;
      	   dummyElement.insertBefore( node );  
 	//$("#"+ text.getUniqueId()).html('<span>'+newText+'</span>');
      	  //  text.$.html( '<span>'+newText+'</span>' '<span>'+newText+'</span>');
     //	node.getParent().appendTo(dummyElement);
       	   text.$.nodeValue='';
      // editor.updateElement();
       	 
       	   
       	   var breaklines = [];var k = 0;
 	      var prevTop = 99999.9;
 	      
 	  
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
 	  	    
 	  	        prevTop = offset.top;
 	  	    //  console.log(index+'['+this.innerText+']'+offset.left+','+ offset.top);
 	  	    });
 	    //	k=0;
 	    	 
 	    	 var txtlen = '<div style="page-break-after: always"></div>'.length; 

 	
 	    	  
 	    	 $( editor.window.getFrame().$ ).contents().find(".get-position-of-it").parent().remove();
 	    	 $( editor.window.getFrame().$ ).contents().find(".get-position-of-it").remove();
 	    	  
 	    	/* for( var k=0;k<breaklines.length;k++){
 	    	 	str = str.substr(0, breaklines[k]+k*4) + '<br>' + str.substr(breaklines[k]+k*4);
 	    	 }*/
 	    	text.$.nodeValue = str; 
            }
         
            //alert(editor.getSnapshot())  ;   
                
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
             
                 });
                $(spage).find('.double').each(function( index ) {
               	   $(this).find("*").addClass("double");
                   });
                $(spage).find('u').each(function( index ) {
                	 $(this).css("text-decoration","underline");
               	   $(this).find("*").each(function() {
               		 $(this).css("text-decoration","underline");
               	   });
            
              
                  });//alert($(spage).html());
                
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
               

             // alert(htmlpage);
                    $.ajax({
                    	//url:	"../../../../MyPageServlet", 
                    	url:	docxurl,//"/Html2Pdf/HtmlPageServlet", 
                    	type:"POST",
                        data : {pages :htmlpage},
                        success: function(data, textStatus, jqXHR) {
                        	debugger
                        	$.unblockUI();
                        	editor.setData(sourceOrg);
                        	//var blob=new Blob([data]);
                            var link=document.createElement('a');
                            link.href=docxurl;
                           // link.download="Dossier_"+new Date()+".docx";
                            document.body.appendChild(link);
                       //   alert("before>"+  $(location).attr('href'));
                            link.click();
                            link.remove();
                          //  alert("after>"+  $(location).attr('href'));
                            var root = location.protocol + '//' + location.host;
            				
                        	// var jqDocument = $(editor.document.$);
                       	  
                       	  jqDocument.scrollTop(scrollTop); 
                        }

                    } );
                },50); //timeout
                    },
                canUndo : true
            });
            editor.ui.addButton('Docxsave',
            {
                label: 'Save Docx',
                command: pluginName,
                icon: this.path + 'images/icon_docx.png'
            });
        }
    });