//模块化
var mainModule = angular.module('mainModule', ['ui.router',
				'ngResource', 'ngSanitize']);

//全局配置
mainModule.run(['$rootScope','$state','$http','$stateParams','$location','$timeout','$window',
	function($rootScope, $state, $http, $stateParams, $location,$timeout,$window) {
	$rootScope.menuTitle = "";
	// 路由调整完成后根据state添加标志
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState){
          var toStateUrl = toState.name;
          $('.nav-list li').removeClass('active');
          /**
           * 左边菜单样式控制
           */
          switch(toStateUrl){
            case 'main':
                 $("[data-name=main]").addClass('active');
                 $rootScope.menuTitle = "";
                 break;
            case 'gallery':
                 $("[data-name=gallery]").addClass('active');
                 $rootScope.menuTitle = "图片";
                 break;
             case 'typography':
                 $("[data-name=typography]").addClass('active');
                 $rootScope.menuTitle = "文字排版";
                 break;
            default: break;
          };
	});
}]);

///路由配置
mainModule.config(['$stateProvider','$urlRouterProvider','$compileProvider',
	function($stateProvider,$urlRouterProvider,$compileProvider) {
	$stateProvider.state('main',{
		url : '/main',               
		templateUrl : '/main'
	}).state('gallery',{
    	url : '/gallery',               
    	templateUrl : '/gallery'
    }).state('typography',{
    	url : '/typography',               
    	templateUrl : '/typography'
    });
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
	$urlRouterProvider.otherwise('/main');   //默认home
}]);

