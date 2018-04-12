'use strict';
// Для главной страницы
if(indexPage){
var posts=[],relt=[],rep=[],hasimg;
golos.api.getBlog(vblog.login, 0, 3, function(err, result) {
for (var i = 0; i < result.length; i++) {
     var z = result[i].comment,
	 m = JSON.parse(z.json_metadata),
	 tags = m.tags[0],
	 thumb;
	var tag = '';
    for (var t = 0; t < m.tags.length; t++) {tag += '#'+m.tags[t]+' '}
	 if (typeof m.image !== "undefined"){thumb = m.image[0],hasimg=true}else{hasimg=false}
	 	 posts.push({
	  author: z.author,
	   title: z.title,
	   tags: tag,
	   hasimg: hasimg,
	   img: thumb
	 })
	}
   });	


golos.api.getDiscussionsByCreated({"tag":vblog.followTag,"limit":"3"}, function(err, result) {
  for (var i = 0; i < result.length; i++) {
  var r = result[i];
  
   relt.push({
	  author: r.author,
	   title: r.title
	 })
 }
});
golos.api.getContentReplies(vblog.login, vblog.replieLink, function(err, result) {

	
	for(var i = result.length;i--;)	{
    var r = result[i];
	rep.push({
	  author: r.author,
	   body: r.body,
	   title:r.root_title
	 })
	
	 }
});

var related = new Vue({
  el: '#related',
  data: {
    rel:relt
  }
})

var blog = new Vue({
  el: '#featured',
  data: {
    posts: posts,
  load: true
  },
  updated: function() {
      this.load = false
  }
});

var replies = new Vue({
  el: '#replies',
  data: {
  replies: rep}
});
}
// Для страницы блога
if(isBlog){
var postslist=[],comm=[],hasimg,expand=false;
golos.api.getBlog(vblog.login, 0, 100, function(err, result) {
	
for (var i = 0; i < result.length; i++) {
     var z = result[i].comment,
	 m = JSON.parse(z.json_metadata),
	 thumb,bodypost;
	 if(m.format === "markdown"){
		bodypost = micromarkdown.parse(z.body);
	 } else {
		bodypost = z.body;
	 }
	var tag = '',t;
	if (typeof m.tags !=="undefined"){
	var tags = m.tags[0];
	for (t = 0; t < m.tags.length; t++) {tag += '#'+m.tags[t]+' '}}
	if (typeof m.image !== "undefined"){thumb = m.image[0],hasimg=true}else{hasimg=false}
	 postslist.push({
	  showModal: false,
	  author: z.author,
	  plink: z.permlink,
	   title: z.title,
	   comments:z.children,
	   body: bodypost,
	   tags: tag,
	   hasimg: hasimg,
	   expand: false,
	   img: thumb,
	   creward:z.curator_payout_value,
	   reward:z.total_payout_value,
	   votes:z.net_votes,
	   link:'https://golos.io/blog/@'+vblog.login+'/'+z.permlink
	 })
}
});	
var blogpage = new Vue({
  el: '#blogposts',
  data: {
    postslist: postslist,
	loading: true,
	commlink: postslist,
	comments: comm
	
  },
  methods: {
    showComm: function (perm) {
		comm.length = 0;
      golos.api.getContentReplies(vblog.login, perm, function(err, result) {
	for(var y = result.length;y--;)	{
					var r = result[y];
					comm.push({
					  author: r.author,
					   body: r.body
					 })
					}
		});
    }
  },
  updated: function() {
      this.loading = false;
  }
});
}
