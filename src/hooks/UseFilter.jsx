import {useState} from "react";
import {filterPublic} from "../utils/filterHelpers.js";


export const useFilter = ({items}) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentFilter, setCurrentFilter] = useState(null);

    function filterByPermission(desiredPermission) {
        const filtered = items.filter(item =>
            item.grants.some(grant => grant.Permission === desiredPermission)
        );
        setCurrentFilter(desiredPermission)
        setFilteredItems(filtered);
    }

    function filterByGranteeType(desiredGranteeType) {
        let filtered
        if (desiredGranteeType === 'Public') {
            filtered = filterPublic(items)
        } else {
            filtered = items.filter(item =>
                item.grants.some(grant => grant.Grantee.Type === desiredGranteeType)
            );
        }
        setCurrentFilter(desiredGranteeType)
        setFilteredItems(filtered);
    }

    return {
        filterByPermission,
        filterByGranteeType,
        filteredItems,
        currentFilter
    };
};