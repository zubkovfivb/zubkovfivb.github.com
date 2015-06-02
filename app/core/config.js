angular.module('angularPassportApp')
    .constant('config', {
      menu: [{
        "title": "Blogs",
        "link" : "blogs",
        "auth" : false
      },{
        "title": "Create New Blog",
        "link" : "blogs/create",
        "auth" : true
      },{
        "title": "Users list",
        "link" : "users",
        "auth" : true
      }]
    });

