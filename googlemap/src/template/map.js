import React, { Component } from 'react'
//google maps 加载
function loadJS(src) {
  let ref = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = src
  script.async = true
  script.defer = true
  ref.parentNode.insertBefore(script, ref)
}

class Map extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBEbHiCAD3pznHIe2nzSWIPuZ2prAUQdeE&libraries=places&callback=initMap")
  }

  render () {  
    let map, marker, infowindow, infoUrl
    const { locations } = this.props
    const { loaded } = this.state
    window.initMap = () => {
      this.setState({ loaded: true })
    }
    loaded ? window.renderMap(locations) : console.log('loading')
    window.renderMap = (locations) => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: locations[0].marker.position,
        zoom: 10
      })
      console.log(JSON.stringify(locations)+'map')
      locations.map((location) => (
        fetch(`https://zh.wikipedia.org//w/api.php?action=opensearch&origin=*&format=json&search=${location.marker.title}&utf8=1"`)
          .then(res => res.json())
          .then(infos => infos[3][0])
          .then(url => (
            infowindow = new window.google.maps.InfoWindow({
              content: `${location.info}</br><a href=${url} target="_blank">维基百科</a>`,
              maxWidth: 200
            }),

            marker = new window.google.maps.Marker({
              position: location.marker.position,
              title: location.marker.title,
              map: map,
              animation: window.google.maps.Animation.DROP
            }),

            function (m, i) {
              return m.addListener('click', function () {
                i.open(map, m)
                m.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(function () {
                  m.setAnimation(null)
                }, 1000)
                map.panTo(m.position)
               })
            }(marker, infowindow)
          ))
        ))
      }  
    
    return (
      <div id="map"></div> 
    )
  }
}

export default Map;