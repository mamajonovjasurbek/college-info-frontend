import { Checkbox } from '@mui/material';
import React, { HTMLProps, memo } from 'react';
// @ts-ignore
export const IndeterminateCheckbox = memo(
    ({
        indeterminate,
        className = '',
        ...rest
    }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
        const ref = React.useRef<HTMLInputElement>(null!);

        React.useEffect(() => {
            if (typeof indeterminate === 'boolean') {
                ref.current.indeterminate = !rest.checked && indeterminate;
            }
        }, [ref, indeterminate, rest.checked]);

        // @ts-ignore
        return (
            <Checkbox
                sx={{
                    width: 'auto',
                }}
                // @ts-ignore
                ref={ref}
                className={className + ' cursor-pointer'}
                {...rest}
            />
        );
    },
);
