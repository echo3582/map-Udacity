(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(t,e,n){t.exports=n(27)},19:function(t,e,n){},27:function(t,e,n){"use strict";n.r(e);var a,o,i,c=n(0),r=n.n(c),s=n(12),l=n.n(s),u=n(29),d=(n(19),n(2)),p=n(3),m=n(6),f=n(4),h=n(7),k=function(t){var e=t.initLocations,n=t.onHandlePick,a=t.locations;return r.a.createElement("ul",null,a.map(function(t){return r.a.createElement("li",{key:t.id,className:"filterItem"},r.a.createElement("button",{className:"buttonItem",value:t.marker.title,onClick:function(t){return function(t){var a=e.filter(function(e){return e.marker.title===t}),o=a[0]?a:e;n(o)}(t.target.value)}},t.marker.title))}))},v=function(t){function e(t){var n;return Object(d.a)(this,e),(n=Object(m.a)(this,Object(f.a)(e).call(this,t))).handleChange=function(t){n.setState({query:t});var e=n.props,a=e.initLocations,o=e.onHandleChange,i=a.filter(function(e){return-1!==e.marker.title.indexOf(t)});o(i[0]?i:a)},n.state={query:""},n}return Object(h.a)(e,t),Object(p.a)(e,[{key:"render",value:function(){var t=this,e=this.state.query;return r.a.createElement("input",{autoFocus:!0,type:"text",placeholder:"Filter",value:e,onChange:function(e){return t.handleChange(e.target.value)}})}}]),e}(c.Component),g=function(t){var e=t.initLocations,n=t.locations,a=t.onHandleChange,o=t.onHandlePick;return r.a.createElement("div",{className:"filter"},r.a.createElement("h2",null,"Filter Tool"),r.a.createElement(v,{initLocations:e,locations:n,onHandleChange:a}),r.a.createElement(k,{initLocations:e,locations:n,onHandlePick:o}))};function b(){document.getElementById("map").insertAdjacentHTML("afterbegin","Oops, the map can't be loaded!"),console.log("Oops, the map can't be loaded!")}var w=function(t){function e(t){var n;return Object(d.a)(this,e),(n=Object(m.a)(this,Object(f.a)(e).call(this,t))).state={loaded:!1},n}return Object(h.a)(e,t),Object(p.a)(e,[{key:"componentDidMount",value:function(){!function(t,e){var n=window.document.getElementsByTagName("script")[0],a=window.document.createElement("script");a.src=t,a.async=!0,a.defer=!0,a.onerror=e(),n.parentNode.insertBefore(a,n)}("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap",b)}},{key:"addMap",value:function(t){return a=new window.google.maps.Map(document.getElementById("map"),{center:t[0].marker.position,zoom:11})}},{key:"addMarker",value:function(t){return o=new window.google.maps.Marker({position:t.marker.position,title:t.marker.title,map:a,animation:window.google.maps.Animation.DROP})}},{key:"addInfo",value:function(t,e){return i=new window.google.maps.InfoWindow({content:"".concat(t.info,"</br><a href=").concat(e,' target="_blank">\u7ef4\u57fa\u767e\u79d1</a>'),maxWidth:200})}},{key:"clickListener",value:function(t,e){return t.addListener("click",function(){e.open(a,t),t.setAnimation(window.google.maps.Animation.BOUNCE),setTimeout(function(){t.setAnimation(null)},1e3),a.panTo(t.position)})}},{key:"renderMap",value:function(t){var e=this;this.addMap(t),t.map(function(t){fetch("https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=".concat(t.marker.title,'&utf8=1"')).then(function(t){return t.json()}).then(function(t){return t[3][0]}).then(function(n){e.addMarker(t),e.addInfo(t,n),e.clickListener(o,i)})})}},{key:"initMap",value:function(){var t=this.props.mapLocations;this.addMap(t),this.setState({loaded:!0})}},{key:"render",value:function(){var t=this.props.mapLocations,e=this.state.loaded;return window.initMap=this.initMap.bind(this),e?this.renderMap(t):console.log("loading"),r.a.createElement("div",{id:"map"}," ")}}]),e}(c.Component),L=n(13),y=function(t){function e(t){var n;return Object(d.a)(this,e),(n=Object(m.a)(this,Object(f.a)(e).call(this,t))).updateLocations=L.debounce(function(t){n.setState({locations:t,mapLocations:t})},600),n.state={initLocations:[],locations:[],mapLocations:[]},n}return Object(h.a)(e,t),Object(p.a)(e,[{key:"pickLocation",value:function(t){this.setState({mapLocations:t}),console.log(this.state.mapLocations+"App")}},{key:"render",value:function(){var t=this,e=this.state,n=e.locations,a=e.initLocations,o=e.mapLocations;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(g,{initLocations:a,locations:n,onHandleChange:function(e){return t.updateLocations(e)},onHandlePick:function(e){return t.pickLocation(e)}}),r.a.createElement(w,{locations:n,mapLocations:o})))}},{key:"componentDidMount",value:function(){var t=this;fetch("/api/locations.json").then(function(t){return t.json()}).then(function(e){t.setState({initLocations:e.data.locations,locations:e.data.locations,mapLocations:e.data.locations})})}}]),e}(c.Component);l.a.render(r.a.createElement(u.a,null,r.a.createElement(y,null)),document.getElementById("root"))}},[[14,2,1]]]);
//# sourceMappingURL=main.861a5f8b.chunk.js.map