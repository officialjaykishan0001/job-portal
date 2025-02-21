import  { useEffect } from 'react'
import { setAllJobs } from '../redux/jobSlice.';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                console.log(res.data)
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllJobs();
    }, [dispatch, searchedQuery])
}

export default useGetAllJobs