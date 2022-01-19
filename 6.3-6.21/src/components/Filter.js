import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer'

const Filter = props => {

    const handleChange = e => {
        props.setFilter(e.target.value)
    }

    return(
        <div style={{marginBottom: 10}}>
            <input name="filter" onChange={handleChange} />
        </div>
    )
}

export default connect(
    null,
    { setFilter }
)(Filter)