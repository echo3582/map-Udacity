import React, { Component } from 'react'
import Filter from './template/filter'
import GoogleMap from './template/map'
import * as _ from 'lodash'

class App extends Component {

	constructor (props) {
		super(props)
		this.state = {
			initLocations: [],
			locations: [],
			mapLocations: []
		}
	}

	updateLocations = _.debounce((newLocations) => {
		this.setState({ 
			locations: newLocations,
			mapLocations: newLocations 
		})
	}, 600)

	pickLocation (location) {
		this.setState({ mapLocations: location })
		console.log(this.state.mapLocations+"App")
	}

 	render() {
		const { locations, initLocations, mapLocations } = this.state
	    return (
	      <div className="container">
	      	<div className="row">
				<Filter
					initLocations={initLocations}
					locations={locations}
					onHandleChange={(newLocations) => this.updateLocations(newLocations)}
					onHandlePick={(location) => this.pickLocation(location)}
				/>
	       	 	<GoogleMap
					locations={locations}
					mapLocations={mapLocations}
				/>
			</div>
	      </div>
	    )
  	}

  	componentDidMount () {
  		fetch('/api/locations.json')
    	.then((res) => res.json())
    	.then((info) => {
	 		this.setState({
				initLocations: info.data.locations,
	  			locations: info.data.locations,
	  			mapLocations: info.data.locations
			})
    	})
  	}
}

export default App
