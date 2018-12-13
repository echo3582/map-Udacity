import React, { Component } from 'react'

class FilterInput extends Component {
	constructor (props) {
		super(props)
		this.state = {
			query: ''
		}
	}

	handleChange = (query) => {
		this.setState({ query: query })
		const { initLocations, onHandleChange } = this.props
		let filteredLocations = initLocations.filter((location) => (
			location.marker.title.indexOf(query) !== -1))
		let newLocations = filteredLocations[0] ? filteredLocations : initLocations
		onHandleChange(newLocations)
	}

	render () {
		const { query } = this.state
		return (
		  <input 
		  	type="text"
		  	placeholder="Filter"
		  	value={query}
		  	onChange={(event) => this.handleChange(event.target.value)}
		  />
		)
	}
}

export default FilterInput;