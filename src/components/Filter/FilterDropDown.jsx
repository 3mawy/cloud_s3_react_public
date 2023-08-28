import useDropdown from "../../hooks/UI/useDropdown.jsx";
import DropdownArrow from "../Icons/dropdownArrow.jsx";

const FilterDropDown = ({text, dropDownArr, onItemClick, children, currentFilter}) => {
    const {dropdownOpen, setDropdownOpen, triggerRef, dropdownRef} = useDropdown();

    const onSelect = (item) => {
        onItemClick(item)
        setDropdownOpen(false)
    }
    return (
        <div className="relative -mt-1 text-center ">
            <div
                ref={triggerRef}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 hover:text-white text-boxdark dark:text-whiten"
            >
                <span
                    className={`${dropdownOpen && 'bg-primary text-white dark:bg-primary'} bg-gray-2 dark:bg-meta-4  hover:bg-primary hover:text-white rounded px-2 py-2.5 cursor-pointer flex place-items-center gap-3`}>
                  <span className="block text-sm  font-bold ">
                    {text}
                  </span><DropdownArrow dropdownOpen={dropdownOpen}/>

                </span>
            </div>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdownRef}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-4 flex w-40 flex-col rounded-sm border border-stroke
                 bg-white shadow-default dark:border-strokedark dark:bg-boxdark 
                 ${dropdownOpen === true ? 'block' : 'hidden'}`}
            >

                <ul className="py-2">
                    {dropDownArr?.map((item, index) => (
                        <li key={index}>
                            <button
                                className={`${currentFilter===item&&'bg-black'} block text-left w-full px-6 py-3 text-sm font-medium duration-300 ease-in-out hover:bg-primary hover:text-white`}
                                onClick={() => onSelect(item)}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                    {children}
                </ul>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};

export default FilterDropDown;
