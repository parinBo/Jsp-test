/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	//config.extraPlugins = 'pagebreak';
	config.height = '600px';//'842px';
    config.width = '1000px';
	config.extraPlugins = 'font';

	//config.shiftEnterMode = CKEDITOR.ENTER_BR,
	config.font_names ='TH SarabunPSK/"TH SarabunPSK";' + config.font_names;
	config.font_style =
	{
	element : 'span',
	styles : { 'font-family' : '#(family)' },
	overrides : [ { element : 'font', attributes : { 'face' : null } } ]
	};
	
	config.templates_files = [ 
	                        	'./plugins/ckeditor4.3.5/plugins/templates/templates/default.js',
	                        	'./plugins/ckeditor4.3.5/plugins/templates/templates/mytemplates.js',
	                        	'./plugins/ckeditor4.3.5/plugins/templates/templates/petitionandcommand.js' 
	                        	];
	                        config.templates = 'custom,petitioncommand,default';
    	                        
	
};


CKEDITOR.dtd.$removeEmpty.span = 0;


