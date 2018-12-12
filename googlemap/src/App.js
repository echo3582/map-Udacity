import React, { Component } from 'react'
import Filter from './template/filter'
import GoogleMap from './template/map'

class App extends Component {

	constructor (props) {
		super(props)
		this.state = {
			initLocations: [],
			locations: []
		}
	}
 	
	updateLocations (newLocations) {
		this.setState({ locations: newLocations })
	}

 	render() {
		const { locations, initLocations } = this.state
	    return (
	      <div className="container">
	      	<div className="row">
				<Filter
					initLocations={initLocations}
					locations={locations}
					onHandleChange={(newLocations) => this.updateLocations(newLocations)}
				/>
	       	 	<GoogleMap
					locations={locations}
				/>
			</div>
	      </div>
	    );
  	}

  	componentDidMount () {
		const { locations } = this.state
  		fetch('/api/locations.json')
    	.then((res) => res.json())
    	.then((info) => {
	 		this.setState({
				initLocations: info.data.locations,
	  			locations: info.data.locations
			})
    	})
  	}
}

export default App
