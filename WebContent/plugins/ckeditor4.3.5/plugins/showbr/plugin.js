CKEDITOR.plugins.add( 'showbr', {
   // requires: 'toolbar',
    icons: CKEDITOR.plugins.getPath('showbr') + 'icons/keyboard_return_48px.png',
    hidpi: true, 
    init: function( editor ) {

    	/*$( editor.window.getFrame().$ ).contents().find("br").each(function(){
		 $( "<span style='border: 1px solid lime;'></span>" ).insertBefore( this ); 
	 }); */
    	
    	// This "addButtonCommand" function isn't needed, but
        // would be useful if you want to add multiple buttons
        var addButtonCommand = function( buttonName, buttonLabel, commandName, styleDefiniton )
        {
        	
        
        	var style=new CKEDITOR.style(styleDefiniton);
           
          editor.attachStyleStateChange( style, function( state )
            {//alert(state)
        	  if(state==1){
        		  $( editor.window.getFrame().$ ).contents().find("br").each(function(){
         			 $( "<span class='breakline' style='border: 1px solid lime;margin-left:-1px;'></span>" ).insertBefore( this ); 
         		 })
        	  }else{
        		  $( editor.window.getFrame().$ ).contents().find(".breakline").remove();
        	  }
        	 
             editor.getCommand( commandName ).setState( state );
            });

          editor.addCommand( commandName, new CKEDITOR.styleCommand( style ) );
        
          
          editor.ui.addButton( buttonName,
            {
              label : buttonLabel,
              command : commandName,
              icon: CKEDITOR.plugins.getPath('showbr') + 'icons/keyboard_return_48px.png'
            });
        };
                var config = editor.config,
          lang = editor.lang;

        // This version uses the language functionality, as used in "basicstyles"
        // you'll need to add the label to each language definition file
        addButtonCommand( 'Showbr'   , 'Show Enter'   , 'showbr'   , config.coreStyles_red );

        // This version hard codes the label for the button by replacing `lang.red` with 'Red'
      //  addButtonCommand( 'Showbr'   , 'Showbr'   , 'showbr'   , config.coreStyles_red );
    }
});
//The basic configuration that you requested
CKEDITOR.config.coreStyles_red = { element : 'span', attributes : {'class': 'red'} };

