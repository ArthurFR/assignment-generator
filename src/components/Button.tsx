import clsx from "clsx";
import { forwardRef } from "react"
import type { ComponentPropsWithoutRef } from 'react';

const Button = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
    ({ children, className, ...rest }, ref) => {
        const style = clsx('rounded-lg py-2 px-3 bg-blue-800 mt-4 hover:bg-blue-900', className)
        return <button className={style} ref={ref} {...rest}>{children}</button>
    }
);

Button.displayName = 'Button'

export default Button