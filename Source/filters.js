// Create filters object with searchText and sortBy property
// Create getFilters function with no argument to return filters
// Create setFilters function with updates object in argument to set updates for searchText and sortBy


const filters = {
  searchText: '',
  sortBy: 'byEdited'
}


const getFilters = () => filters


const setFilters = ( updates ) => {
  if ( typeof updates.searchText === 'string' ) {
    filters.searchText = updates.searchText
  }

  if ( typeof updates.sortBy === 'string' ) {
    filters.sortBy = updates.sortBy
  }
}


export { getFilters, setFilters }