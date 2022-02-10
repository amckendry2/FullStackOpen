import { useContext } from "react"
import AuthStorageContext from "../utils/contexts/AuthStorageContext"

const useAuthStorage = () => {
	return useContext(AuthStorageContext);
}

export default useAuthStorage