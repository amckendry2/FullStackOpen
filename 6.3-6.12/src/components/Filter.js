import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = e => {
        dispatch(setFilter(e.target.value))
    }

    return(
        <div style={{marginBottom: 10}}>
            <input name="filter" onChange={handleChange} />
        </div>
    )
}

export default Filter