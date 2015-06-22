angular.module('tagsFilterModule', [])
  .filter('tagsFilter', function () {
    return function (bookmarks, prevTagsArray) {
      var d1 = new Date();
      var tagsObject = {};
      var tagsArray = prevTagsArray || [];
      //tagsArray.splice(0, tagsArray.length);
      tagsArray.length = 0;

      if (bookmarks && bookmarks.length) {
        bookmarks = angular.copy(bookmarks);
        bookmarks.forEach(function (bookmark) {
          var tags = bookmark.tagsArray;
          if (tags && tags.length) {
            tags.forEach(function (tag) {
              if (tagsObject[tag]) {
                tagsObject[tag]++;
              } else {
                tagsObject[tag] = 1;
              }
            });
          }
        });

        for (var prop in tagsObject) {
          tagsArray.push({name: prop, count: tagsObject[prop]});
        }

        tagsArray.sort(function (a, b) {
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
          if (nameA < nameB) //sort string ascending
            return -1;
          if (nameA > nameB)
            return 1;
          return 0;
        });

        //console.log(JSON.stringify(tagsArray));
        console.log('duration', new Date() - d1);
      }

      return tagsArray;
    };
  })
;
