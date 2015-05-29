'use strict';

angular.module('bookmarks')
  .directive('bookmarks-list', function($state, bookmarksStorage) {
    return {
      templateUrl: 'app/components/bookmarks/bookmarks-list.html',
      link: function(scope, element, attributes) {
        scope.addBookmark = function() {
          $state.go('edit');
        }

        scope.lastBookmark = function() {
          var id = bookmarksStorage.getLastBookmarkId();
          $state.go('edit', {id: id});
        }

      }
    };
  })
;
