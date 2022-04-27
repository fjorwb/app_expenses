import React from 'react'
import styled from 'styled-components'

import theme from '../theme'
import formatAmount from '../Functions/FormatToCurrency'

import { useMonthTotal } from '../context/TotalMonthExpensesContext'

const TotalBar = styled.div`
    background: ${theme.green};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .total {
        font-weigth: 700;
        font-size: 1.75rem;
        color: yellow;
    }
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;

const TotalExpensesBar = () => {
    const {total} = useMonthTotal()

    return (
        <TotalBar>
            <p>Total Month Expenses: </p>
            <p className='total'>{formatAmount(total)}</p>

        </TotalBar>
    )
}

export default TotalExpensesBar
