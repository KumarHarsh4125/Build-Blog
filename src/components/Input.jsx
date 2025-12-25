import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-2 pl-1 text-sm font-semibold text-slate-700'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-4 py-3 rounded-xl bg-white text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary border border-slate-200 w-full transition-all duration-200 shadow-sm placeholder:text-slate-400 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input