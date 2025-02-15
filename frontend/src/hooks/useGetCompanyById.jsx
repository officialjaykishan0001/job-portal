import  { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { setSingleCompany } from '../redux/companySlice';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch])
}

export default useGetCompanyById