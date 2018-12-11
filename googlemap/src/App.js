import React, { Component } from 'react'
import Filter from './template/filter'
import GoogleMap from './template/map'

class App extends Component {

	constructor (props) {
		super(props)
		this.state = {
			locations: []
		}
	}
 	
 	render() {
 		const { locations } = this.state
	    return (
	      <div className="container">
	      	<div className="row">
				<Filter locations={locations}/>
	       	 	<GoogleMap locations={locations}/>      		
	      	</div>
	      </div>
	    );
  	}

  	componentDidMount () {
  		fetch('/api/locations.json')
    	.then((res) => res.json())
    	.then((info) => {
      		this.setState({ locations: info.data.locations })
    	})
  	}
}

export default App
