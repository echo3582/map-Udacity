(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,t,n){e.exports=n(190)},113:function(e,t,n){},190:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),i=n(5),r=n.n(i),c=n(194),l=(n(113),n(36)),s=n(37),u=n(41),m=n(38),d=n(42),p=n(192),f=function(e){var t=e.initLocations,n=e.onHandlePick,a=e.locations;return o.a.createElement("ul",null,a.map(function(e){return o.a.createElement(p.a,{key:e.id,className:"filterItem"},o.a.createElement("button",{className:"buttonItem",value:e.marker.title,onClick:function(e){return function(e){var a=t.filter(function(t){return t.marker.title===e}),o=a[0]?a:t;n(o)}(e.target.value)}},e.marker.title))}))},k=n(193),h=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){n.setState({query:e});var t=n.props,a=t.initLocations;(0,t.onHandleChange)(a.filter(function(t){return-1!==t.marker.title.indexOf(e)}))},n.state={query:""},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state.query;return o.a.createElement(k.a,{autoFocus:!0,type:"text",placeholder:"Filter",value:t,onChange:function(t){return e.handleChange(t.target.value)}})}}]),t}(a.Component),v=function(e){var t=e.initLocations,n=e.locations,a=e.onHandleChange,i=e.onHandlePick;return o.a.createElement("div",{className:"filter"},o.a.createElement("h2",null,"Filter Tool"),o.a.createElement(h,{initLocations:t,locations:n,onHandleChange:a}),o.a.createElement(f,{initLocations:t,locations:n,onHandlePick:i}))},g=n(47),w=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={loaded:!1},window.initMap=n.initMap.bind(Object(g.a)(Object(g.a)(n))),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){t.loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap",t.errorHandler)}},{key:"clickListener",value:function(e,n){return e.addListener("click",function(){t.globalInfo&&t.globalInfo.close(),n.open(t.map,e),t.globalInfo=n,e.setAnimation(window.google.maps.Animation.BOUNCE),setTimeout(function(){e.setAnimation(null)},1e3),t.map.panTo(e.position)})}},{key:"renderMap",value:function(e,n){var a=this;t.clearMarkers(),e.map(function(e){return fetch("https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=".concat(e.marker.title,'&utf8=1"')).then(function(e){return e.json()}).then(function(e){return e[3][0]}).then(function(n){t.addMarker(e),t.addInfo(e,n),a.clickListener(t.marker,t.infoWindow),t.map.panTo(e.marker.position)}),null})}},{key:"initMap",value:function(){var e=this.props.mapLocations;t.addMap(e),this.setState({loaded:!0})}},{key:"componentDidUpdate",value:function(){var e=this.props,t=e.mapLocations,n=e.itemIsClicked;this.state.loaded&&this.renderMap(t,n)}},{key:"render",value:function(){return o.a.createElement("div",{id:"map"}," ")}}],[{key:"loadJS",value:function(e,t){var n=window.document.getElementsByTagName("script")[0],a=window.document.createElement("script");a.src=e,a.async=!0,a.defer=!0,a.onerror=t,n.parentNode.insertBefore(a,n)}},{key:"errorHandler",value:function(){document.getElementById("map").insertAdjacentHTML("afterbegin","Oops, the map can't be loaded! Maybe you need a tool to visit google ~")}},{key:"addMap",value:function(e){return t.map=new window.google.maps.Map(document.getElementById("map"),{center:e[0].marker.position,zoom:11}),t.map}},{key:"addMarker",value:function(e){return t.marker=new window.google.maps.Marker({position:e.marker.position,title:e.marker.title,map:t.map,animation:window.google.maps.Animation.DROP}),t.markers.push(t.marker),t.marker}},{key:"setMapOnAll",value:function(e){t.markers.map(function(t){return t.setMap(e),null})}},{key:"clearMarkers",value:function(){t.setMapOnAll(null),t.markers=[]}},{key:"addInfo",value:function(e,n){return t.infoWindow=new window.google.maps.InfoWindow({content:"".concat(e.info,"</br><a href=").concat(n,' target="_blank">\u7ef4\u57fa\u767e\u79d1</a>'),maxWidth:200}),t.infoWindow}}]),t}(a.Component);w.markers=[];var b=w,y=n(104),L=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).updateLocations=y.debounce(function(e){n.setState({locations:e,mapLocations:e})},600),n.state={initLocations:[],locations:[],mapLocations:[],itemIsClicked:!1},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"pickLocation",value:function(e){this.setState({mapLocations:e,itemIsClicked:!0})}},{key:"render",value:function(){var e=this,t=this.state,n=t.locations,a=t.initLocations,i=t.mapLocations,r=t.itemIsClicked;return o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement(v,{initLocations:a,locations:n,onHandleChange:function(t){return e.updateLocations(t)},onHandlePick:function(t){return e.pickLocation(t)}}),o.a.createElement(b,{locations:n,mapLocations:i,itemIsClicked:r})))}},{key:"componentDidMount",value:function(){var e=this;fetch("http://www.qianqianx.com/map-Udacity/api/locations.json").then(function(e){return e.json()}).then(function(t){e.setState({initLocations:t.data.locations,locations:t.data.locations,mapLocations:t.data.locations})})}}]),t}(a.Component);r.a.render(o.a.createElement(c.a,null,o.a.createElement(L,null)),document.getElementById("root"))}},[[108,2,1]]]);
//# sourceMappingURL=main.46e49ef4.chunk.js.map