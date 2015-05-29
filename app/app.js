'use strict';

angular.module('bookmarks', [
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  'GuidModule',
  'bookmarksListModule',
  'bookmarkEditModule',
  'bookmarksStorageModule',
  'tagsFilterModule'
]).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      template: '<main/>'
    })
    .state('edit', {
      url: '/edit/:id?',
      template: '<bookmark-edit/>'
    })
  ;
  $urlRouterProvider.otherwise('/');
}).run(function (bookmarksStorage) {
  bookmarksStorage.getList();
  if (!bookmarksStorage.list.length) {
    bookmarksStorage.list = [{"tags":"Javascript,Angular,Bootstrap","url":"http://stackoverflow.com/questions/16066170/angularjs-directives-change-scope-not-reflected-in-ui","title":"javascript - AngularJS Directives: Change $scope not reflected in UI - Stack Overflow","id":"d8189f52-1caf-5907-32e6-db52b73c601e","tagsArray":["Javascript","Angular","Bootstrap"],"$$hashKey":"object:4"},{"url":"http://stackoverflow.com/questions/15207788/calling-a-function-when-ng-repeat-has-finished","title":"events - Calling a function when ng-repeat has finished - Stack Overflow","tags":"Javascript,Angular,ngRepeat","id":"220a88c0-4bdd-2c95-fae5-78a953a4e9aa","tagsArray":["Javascript","Angular","ngRepeat"],"$$hashKey":"object:5"},{"title":"Filter results 6 through 10 of 100 with ng-repeat in AngularJS - Stack Overflow","url":"http://stackoverflow.com/questions/14796087/filter-results-6-through-10-of-100-with-ng-repeat-in-angularjs","tags":"Javascript,Angular,ngRepeat,limitTo","id":"fa0e864c-c173-b65c-b8c0-14abd64e6f33","tagsArray":["Javascript","Angular","ngRepeat","limitTo"],"$$hashKey":"object:6"}];
    bookmarksStorage.saveList();
  }
  console.log('run');
  console.log('bookmarksStorage.list', bookmarksStorage.list);
})
;
