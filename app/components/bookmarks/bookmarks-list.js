'use strict';

angular.module('bookmarksListModule', [])
  .directive('bookmarksList', function($state, bookmarksStorage) {
    return {
      templateUrl: 'app/components/bookmarks/bookmarks-list.html',
      link: function(scope, element, attributes) {
        scope.bookmarks = bookmarksStorage.list;
        scope.tags = bookmarksStorage.tags;

        scope.addBookmark = function() {
          $state.go('edit');
        };

        scope.removeBookmark = function(bookmark) {
          bookmarksStorage.removeBookmark(bookmark);
        };

        scope.lastBookmark = function() {
          var id = bookmarksStorage.getLastBookmarkId();
          $state.go('edit', {id: id});
        };

        scope.editBookmark = function(id) {
          $state.go('edit', {id: id});
        };

        scope.selectTag = function(tagName) {
          scope.selectedTag = tagName;
        };

        scope.clearFilter = function() {
          scope.selectedTag = undefined;
        }
      }
    };
  })
;
