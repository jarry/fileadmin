/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/help.act.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */
 
 /**
 * 帮助Action
 * 帮助模板与显示帮助信息
 * @author lichunping/jarry
 * 
 */
HelpAction = (function() {
	var helpClass;
	var HELP_PAGE = {
		index  : ''
	};

	var pageInit = function() {
	    helpClass = new Help();
//    helpClass.helpElement = g('HelpArea');
	}

	var show  = function() {
		if (HELP_PAGE.index.length <= 0) {
			var url = 'help/index.html';
			var xhr = ajax.get(url, parseHelpJSON);
		} else {
			helpClass.setHelpHTML(HELP_PAGE.index);
			toggleMask();
			helpClass.showHelpElement();
		}
	}

	var close = function() {
		helpClass.hideHelpElement();
		toggleMask();
	}

	var parseHelpJSON = function(xhr, responseText) {
		HELP_PAGE.index = responseText;
		helpClass.setHelpHTML(responseText);
		toggleMask();
		helpClass.showHelpElement();
	}

	return {
		pageInit : pageInit,
		show : show,
		close : close
	}
})();
 
HelpAction.pageInit();