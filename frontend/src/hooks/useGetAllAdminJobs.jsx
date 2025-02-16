import { useEffect } from 'react'
import { setAllAdminJobs } from '../redux/jobSlice.';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux'
import axios from 'axios';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs