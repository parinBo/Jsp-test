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
            //    var scrollLeft = editor.document.$.documentElement.scrollLeft;
            //    var noOfPage = $( CKEDITOR.instances['editor1'].window.getFrame().$ ).contents().find(".page-break").length -1 ;
              
              //  alert(noOfPage);
              /*  $.msg({ klass : 'white-on-black' });
                $('.white-on-black').css('z-index', editor.config.baseFloatZIndex-1);*/
                $.blockUI({  message: '<img src="'+CKEDITOR.plugins.getPath("ajaxsave") +'images/ajax-loader.gif" />'  , 
					 css: {border: 'none',backgroundColor: 'transparent','z-index': editor.config.baseFloatZIndex-1 },   
      			 overlayCSS: { backgroundColor: '#000', opacity: 0.5,cursor:'default','z-index': editor.config.baseFloatZIndex-1 }
					});
               
                	
    
                
                sourceOrg = editor.getData();//alert(editor.getSnapshot());//CKEDITOR.instances['editor1']
               
                
         
         
               
               
         
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
                        	//editor.setData(sourceOrg);
                        	
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