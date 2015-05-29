'use strict';

angular.module('bookmarks')
  .directive('bookmarkEdit', function ($state, $stateParams, bookmarksStorage) {
    return {
      link: function (scope, element, attributes) {
        scope.bookmark = {};
        if ($stateParams.id) {
          scope.bookmark = bookmarksStorage.getBookmark($stateParams.id);
        }

        scope.save = function () {
          if (scope.form.$invalid) {
            return;
          }

          bookmarksStorage.saveBookmark(scope.bookmark);
        };

        scope.cancel = function () {
          $state.go('main');
        };
      }
    };
  })
;
