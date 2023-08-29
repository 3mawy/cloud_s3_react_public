import DropDown from "./FilterDropDown.jsx";
import {useFilter} from "../../hooks/UseFilter.jsx";
import {useEffect} from "react";

const TableHeadingFilters = ({items, onFilter, heading}) => {

    const permissionsFiltersArr = ["FULL_CONTROL", "WRITE", "WRITE_ACP", "READ", "READ_ACP"];
    const grantsFiltersArr = ["Group", "AmazonCustomer", "CanonicalUser", "Public"];
    const {
        filterByPermission,
        filterByGranteeType,
        filteredItems,
        currentFilter
    } = useFilter({items})
    useEffect(() => {
        onFilter(filteredItems, currentFilter)
    }, [currentFilter])
    return (
        <div className={`flex mb-2 h-auto justify-between pb-3 gap-4 `}>
            <h4 className=" text-xl font-semibold text-black dark:text-white mt-0.5">
                {heading}
            </h4>
            <div className={'flex gap-4'}>
                <DropDown text={`FilterBy Permissions`} dropDownArr={permissionsFiltersArr}
                          onItemClick={filterByPermission} currentFilter={currentFilter}/>
                <DropDown text={`FilterBy Grantee`} dropDownArr={grantsFiltersArr}
                          onItemClick={filterByGranteeType} currentFilter={currentFilter}/>
            </div>
        </div>
    );
};

export default TableHeadingFilters;