import clsx from "clsx";
import { forwardRef } from "react"
import type { ComponentPropsWithoutRef } from 'react';

const H2 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h1'>>(
    ({ className, ...rest }, ref) => {
        const style = clsx('font-bold text-lg', className)
        return <h2 className={style} ref={ref} {...rest} />
    }
);

H2.displayName = 'H2'

export default H2