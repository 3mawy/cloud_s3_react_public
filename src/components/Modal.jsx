

const Modal = ({isOpen, onClose, children}) => {

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-999999 h-screen">
                    <div className="fixed inset-0 bg-black bg-opacity-50 h-screen" onClick={() => onClose()}></div>
                    <div
                        className="relative bg-white dark:bg-boxdark px-12 py-9 rounded shadow-lg  z-50 min-h-[20rem] md:min-w-[40rem] place-items-center grid">
                        <span onClick={() => onClose()}
                              className={`bg-danger rounded-lg h-8 w-8 absolute right-5 top-5 grid place-items-center `}>
                            <span className={`text-2xl font-bold`}>X</span>
                        </span>
                        {children}
                    </div>
                </div>
            )}
        </div>);
};

export default Modal;
