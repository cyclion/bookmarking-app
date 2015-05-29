'use strict';

angular.module('bookmarks', [
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  'GuidModule'
]).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      template: "<div main></div>",
      //templateUrl: 'app/components/main/main.html'
    })
    .state('edit', {
      url: '/edit/:id?',
      templateUrl: 'app/components/edit/bookmark-edit.html'
    })
  ;
  $urlRouterProvider.otherwise('/');
}).run(function (bookmarksStorage) {
  bookmarksStorage.list = bookmarksStorage.getList();
  console.log('run');
  console.log('bookmarksStorage.list', bookmarksStorage.list);
})
;
