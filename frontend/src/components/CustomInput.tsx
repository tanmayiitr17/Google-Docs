
const CustomInput = ({
    fieldName = "",
    value = "",
    onChange,
    type = "text",
    placeholder = "Enter...",
}: {
    fieldName?: string;
    value?: any;
    onChange: any;
    type?: string;
    placeholder?: string;
}) => {

    return (
        
        <div className="text-[#000] w-[100%] text-[12px] font-[400] leading-[22px]">
            {fieldName && (
                <div className="text-[#000] text-[12px] font-[500] leading-[22px]">
                    {fieldName}
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChange}
                className="text-[rgba(0,0,0,0.25)] text-[14px] font-[400] leading-[22px] p-[5px_12px] outline-none rounded-[4px] border-[1px] border-[#D9D9D9] w-full mt-[5px] h-[32px]"
            />
        </div>
    );
};

export default CustomInput;
