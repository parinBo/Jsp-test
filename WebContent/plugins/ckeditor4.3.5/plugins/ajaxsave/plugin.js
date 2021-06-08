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
                
                $( editor.window.getFrame().$ ).contents().find(".breakline").remove();
                var jqDocument = $(editor.document.$);
       	  	    var documentHeight =  jqDocument.height() ;//alert(documentHeight);   
             // Account for left/right scrolling
                var scrollTop = editor.document.$.documentElement.scrollTop;
           //     var scrollLeft = editor.document.$.documentElement.scrollLeft;
            //    var noOfPage = $( CKEDITOR.instances['editor1'].window.getFrame().$ ).contents().find(".page-break").length -1 ;
              
          
                $.blockUI({  message: '<img src="'+CKEDITOR.plugins.getPath("ajaxsave") +'images/ajax-loader.gif" />' , 
					 css: {border: 'none',backgroundColor: 'transparent','z-index': editor.config.baseFloatZIndex-1 },   
      			 overlayCSS: { backgroundColor: '#000', opacity: 0.5,cursor:'default','z-index': editor.config.baseFloatZIndex-1 }
					});
              
     
              debugger  
                sourceOrg = editor.getData();//alert(sourceOrg);//CKEDITOR.instances['editor1']
              
             

              
              
                 
               var spage = $.parseHTML(  '<div>'+editor.getSnapshot()+'</div>');
               
               // var sp = $('[name="'+editor.name+'"]').clone();
                $(spage).find('p').each(function( index ) {

             	   $(this).css("word-wrap", "break-word");
               });
              
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
                        	
            				//editor.setData(sourceOrg);
                   
                       	  jqDocument.scrollTop(scrollTop); 
                        }

                    } );
               
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