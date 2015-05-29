'use strict';

angular.module('bookmarkEditModule', [])
  .directive('bookmarkEdit', function ($state, $stateParams, bookmarksStorage) {
    return {
      templateUrl: 'app/components/edit/bookmark-edit.html',
      link: function (scope, element, attributes) {
        scope.bookmark = {};
        if ($stateParams.id) {
          scope.bookmark = bookmarksStorage.getBookmark($stateParams.id);
        }

        scope.submitted = false;
        scope.save = function () {
          scope.submitted = true;
          if (scope.form.$invalid) {
            return;
          }
          if (scope.bookmark.tags) {
            scope.bookmark.tagsArray = scope.bookmark.tags.split(',');
            if (scope.bookmark.tagsArray && scope.bookmark.tagsArray.length) {
              for (var i = 0; i < scope.bookmark.tagsArray.length; i++) {
                scope.bookmark.tagsArray[i] = scope.bookmark.tagsArray[i].trim();
              }
              scope.bookmark.tagsArray = scope.bookmark.tagsArray.filter(function (tag) {
                if (tag) {
                  return true;
                }
              });
              scope.bookmark.tags = scope.bookmark.tagsArray.join(',');
            }
          }
          console.log(JSON.stringify(scope.bookmark.tagsArray));
          bookmarksStorage.saveBookmark(scope.bookmark);
          $state.go('main');
        };

        scope.cancel = function () {
          $state.go('main');
        };
      }
    };
  })
;
