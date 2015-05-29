'use strict';

angular.module('bookmarks')
  .service('bookmarksStorage', function (localStorageService, guidGenerator) {
    var storage = this;

    storage.list = [];

    storage.getBookmark = function (id) {
      storage.list.forEach(function (bookmark) {
        if (bookmark.id === id) {
          return bookmark;
        }
      });
      return null;
    };

    storage.saveBookmark = function (bookmark) {
      if (!bookmark.id) {
        bookmark.id = guidGenerator.newGuid();

        storage.list.push(bookmark);
      }
      storage.setLastBookmarkId(bookmark.id);

      storage.saveList();
    };
    storage.removeBookmark = function (bookmark) {
      var index = storage.indexOf(bookmark);
      if (index) {
        storage.list.splice(index, 1);
      }
      storage.saveList();
    };
    storage.getList = function () {
      storage.list = angular.fromJson(localStorageService.get('bookmarks')) || [];
    };
    storage.saveList = function () {
      localStorageService.set('bookmarks', JSON.stringify(storage.list));
    };
    storage.getLastBookmarkId = function () {
      localStorageService.get('lastBookmarkId');
    };
    storage.setLastBookmarkId = function (id) {
      localStorageService.set('lastBookmarkId', id);
    };
  })
;
