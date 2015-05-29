'use strict';

angular.module('bookmarksStorageModule', [])
  .service('bookmarksStorage', ['localStorageService', 'guidGenerator', 'tagsFilterFilter', function (localStorageService, guidGenerator, tagsFilterFilter) {
    var storage = this;

    storage.list = [];
    storage.tags = [];

    storage.getBookmark = function (id) {
      for(var i=0; i<storage.list.length;i++) {
        if (storage.list[i].id === id) {
          return storage.list[i];
        }
      }
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
      var index = storage.list.indexOf(bookmark);
      if (index > -1) {
        storage.list.splice(index, 1);
      }
      storage.saveList();
    };
    storage.getList = function () {
      storage.list = angular.fromJson(localStorageService.get('bookmarks')) || [];
      tagsFilterFilter(storage.list, storage.tags);
      return storage.list;
    };
    storage.saveList = function () {
      localStorageService.set('bookmarks', JSON.stringify(storage.list));
      tagsFilterFilter(storage.list, storage.tags);
    };
    storage.getLastBookmarkId = function () {
      return localStorageService.get('lastBookmarkId');
    };
    storage.setLastBookmarkId = function (id) {
      localStorageService.set('lastBookmarkId', id);
    };
  }])
;
