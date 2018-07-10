var n=0,i,p=[],f,a = document.getElementsByTagName("a");
for (i = 0; i < a.length; i++) {
  if (a[i].href.includes('https://golos.io/') ) {
    f = a[i].href;
	console.log(a[i].href);
	a[i].setAttribute("id", "golosio-"+[n]);n++;
	userpost = f.substring(f.indexOf('@')).substring(1),
	p.push({
	u : userpost.substring(0, userpost.indexOf('/')),
	p : userpost.substring(userpost.indexOf('/')).substring(1)
	});
 }
}
var c=0;
for (i = 0; i < p.length; i++) {
golos.api.getContent(p[i].u, p[i].p,100, function(err, d) {
console.log(d);
var meta = JSON.parse(d.json_metadata),oneimg = meta.image[0];


var kura = d.curator_payout_value,pre="<strong>Вознаграждение за пост ",z='*</strong> <p class="gl-curat">Курс токена сети: *1 GBG = 1 мг Золота.';

if(d.mode == "first_payout"){rw=pre+d.total_pending_payout_value+z+' Награда голосующим <span>~25%</span></p>'}else if(d.author_rewards !== 0){rw=pre+d.total_payout_value+z+' Награда голосующим <span>'+kura+'</span></p>'}else{rw='Автор отказался от награды';}


 document.getElementById("golosio-"+c).innerHTML = ('<div id="gl-embed"> <img id="gl-image" src="'+oneimg+'"/> <div class="gl-desc"> <h3><span id="gl-author"><img src="https://golos.io/images/favicons/favicon.ico"/>'+d.author+'</span> '+d.title+'</h3> <span id="gl-votes"> <img class="gl-upicon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAE9UlEQVRYR82Y21MTVxjAz9mLNAGFECBiwUkQAuUmKAYCvYBTi452nP4F9LEvHdqKqNPnjkqx1mkffCx/QcdWVGpHaDsFEmhVIBRiAhQYaeSWcElM93I6ZyXMAtnsbtho87j59ny//a7n+yD4n/9gvHwnL/eZeQK8k0RRTRACA8+jVIblLPg8miInCQIGEALLYZbtIHjwy71L9ql4dKkGbLzS30xTRDOH0IFsYxqTm21MoSkK0DQFUlN0AkNgLQQYhgUMy4KZucW1uUU/TUL4lGH5G10Xa26oAVUM+N7VviaaJNuNqcl6q/l1fYZhrxo9YG5+GUzO+oKLgfUgw3EtP12wdyg5QBYQuxKSxL29yTpTufVgmlqw7RALy6tgyD3tX10P+RDHn5RzfUzAE23OCgrxv5dac/WHcvcr+WDFMt6Zf8CIeybIQqLufqvtkdSLkoAnLvd9SFHEzbqKwqTdWk1KOXa7c8QbZln+o/uX7N9Fk4sKKFgOov76YyVJkcBXbBqVgjihegZcYRbBmmiW3AEoxBwBXXVHilQngkq2TXHBkkOeIOJRyfaY3AF4qs0xVlqQU6h1zMnBCzH5ZHb8bmt1kVh2CyCOO8O+5OvHq0vS5A5MxP8PHC7/8sr6p+J43AJ4ut05bz9szUhUUuCP2kMC8C8X/fNwCep77F7obLFlRiQ2ARuv9n5iSk/9oraySJ8I6+AzG8wQGPUQ/DDOS0L2PhwL+pYCn3ddqP0av7MJeKbdOXG0JM+SnWlICB+GsxpfqFsMAUlInDCDLq+ns6W6YBNQyFyKGDvbUJWUCDoxHD7fvYhA9xSSVHWrezCMWL4IZ7TwSTg5ck3p39jK81O0BlQLh/U7hzxrM76lj3GyCIDvfzXQfeQNS73W7o0HDvNgN//512TPj58daxAAz1wbfFRTnn9Yy+yNFw7z4GzuH/I8vn2uquIFYLtz4q2qYotWbW03cJgHt7/fBkcnb7fY8gTAxit96IN3bTHDr9AIQZkpdomIlJJItipJCCml3//sBF0X7VARIIarN8uXiN1aTgy7BfD0Nefk20eLzVIuFgNK1TEt4bCLf/1jdKrznM2iOEliQWoJFzVJlJaZaJALQQTw88hPrggrqbM7yoyaQr0dUqxQC7iohXpjMBo7e1xZq4sGqRUcBrz1YDCMOFGrww9xolQV55mVdhMxpJZw2L0DIxPeO+dt+VtuM/Fct8qyIMjQg5iNX0nMiWUkr1uCFdscC/bKQqOWLU8NIG5xvQ/H5++0VmdF3ttx5U/fl3y94RVd+bsdLv9SrCs/pj71pWO8ND/H+kqGJs+s++756kKx1aOOnYCEo29WFulelqtxYjiGPSHAoWLZsVO4wOLBHaD+ettLGtydrjALFA7uEfMKqw+SuFlXmeDVx7A3zHIqVx+bkG3OChLwvWUFB3WHck1qElJW1jvjA8NPpkMcIGrjWh5FNGwMVF379LqsMo3Wb8Puaf9KMPQMsXzjrtZvYjNgl+8hiXajIUVnydmvz85Ut3yYm/cD999zzwMr66sMx7dKbbO2m152gbn9BdxxKIpq5jmUfSArjckxZaTQNAnwGnjLCphlAcNwYNa3sPb0mZ+GEM5yPPttZCCXjYENAdWAYtdzANS/lkQ1IQQNCPCpLMOZ8f8UTU5BQAQgRMvPw2wHCUCPnCulgOMGVGqB3cr9B3Pplkff9wpoAAAAAElFTkSuQmCC" width="40" height="40">'+d.net_votes+'</span> <span id="gl-gbg">'+rw+'</span><div id="gl-foot">Медиа блокчейн golos.io</div></div></div>');
  c++;
  });
}
var css = 'a{text-decoration:none;}#gl-author img,#gl-foot img,img.gl-upicon{vertical-align:middle}#gl-foot,#gl-gbg{text-align:right}#gl-image{max-width:100%;height:auto;width:100%}#gl-author img{height:15pt;width:15pt;margin-right:2pt}#gl-author{color:#266eb7}#gl-embed{background:#fff;box-shadow:0 5px 15px -5px #000;margin:0 auto 20px;border-radius:3px;overflow:hidden;word-wrap:break-word;transition:all .5s ease;position:relative}#gl-embed:hover{box-shadow:0 5px 15px 0 #000;transform:translate3d(0,-5px,0)}.gl-desc{text-decoration:none;color:#212121;font-family:Arial,Helvetica,sans-serif;padding:0 10px}.gl-desc h3{font-family:"Arial Black",Gadget,sans-serif;color:#333;font-size:13pt;margin:13px 0}img.gl-upicon{transition:all 2s ease}#gl-embed:hover img.gl-upicon{transform:rotate3d(1,0,0,360deg)}#gl-foot{font-size:8pt;font-weight:700;margin:15px auto;color:#266eb7;line-height:0;display:inline-block;width:100%}#gl-foot:after{content:"";width:0;display:block;margin-top:17px;transition:1s all ease}#gl-embed:hover #gl-foot:after{content:" - Твоя Сила Голоса на вес золота!";width:100%}#gl-foot img{width:20px;height:20px;margin:0 4px 0 0;line-height:0}#gl-votes{background:#266eb7;color:#fff;padding:4px 8px 5px 2px;font-weight:700;border:2px solid #4788c7;font-size:18px;border-radius:3px;text-shadow:0 0 5px #4788c7}#gl-gbg strong{background:#fff;color:#ff9800;padding:5px 10px;border-radius:3px;font-size:14px;border:2px solid #FF9800}#gl-gbg{color:#333;font-size:12px;overflow:hidden;padding:10px 0}.gl-curat span{background:#169c3a;color:#fff;font-weight:700;padding:6px;border-radius:6px}@media only screen and (max-width:480px){#gl-gbg,#gl-votes{text-align:center}#gl-gbg{font-size:10px}.gl-curat span{display:block;margin:5px}#gl-gbg strong{padding:5px;display:block;font-size:12px}#gl-votes{display:block;padding:0;background:#fff;border:0;color:#81acd4;text-shadow:none;margin:10px auto;float:left;font-size:14px}}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}head.appendChild(style);
