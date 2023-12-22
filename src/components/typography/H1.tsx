import clsx from "clsx";
import { forwardRef } from "react"
import type { ComponentPropsWithoutRef } from 'react';

const H1 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h1'>>(
    ({ className, ...rest }, ref) => {
        const style = clsx('font-bold text-2xl', className)
        return <h1 className={style} ref={ref} {...rest} />
    }
);

H1.displayName = 'H1'

export default H1