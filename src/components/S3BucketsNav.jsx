import { NavLink } from 'react-router-dom';
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import {useEffect} from "react";

const S3BucketsNav = () => {
    const {buckets } = useGlobalState()
    useEffect(() => {
        console.log(buckets)

    }, [buckets]);
    return (
        buckets.length>0 && <ul>
            {buckets?.map((bucket) => (
                <li key={bucket.bucket_name}>
                    <NavLink
                        to={`buckets/${bucket.bucket_name}`} // Update this according to your routing logic
                        className={({ isActive }) =>
                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                            (isActive && '!text-white')
                        }
                    >
                        {bucket.bucket_name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default S3BucketsNav;
