import React, { useState } from 'react'
import styled from 'styled-components'
import theme from '../theme'
import categories from '../data/categories'
import CategoryIcon from '../elements/CategoryIcon'

import { ReactComponent as IconDown } from '../images/down.svg'

const SelectContainer = styled.div`
  background: ${theme.lightGrey};
  cursor: pointer;
  border-radius: 0.625rem; /* 10px */
  position: relative;
  height: 5rem; /* 80px */
  width: 40%;
  padding: 0px 1.25rem; /* 20px */
  font-size: 1.5rem; /* 24px */
  text-align: center;
  display: flex;
  align-items: center;
  transition: 0.5s ease all;
  &:hover {
    background: ${theme.lightGrey2};
  }
`

const SelectedOption = styled.div`
  width: 100%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    width: 1.25rem; /* 20px */
    height: auto;
    margin-left: 1.25rem; /* 20px */
  }
`

const Options = styled.div`
  background: ${theme.lightGrey};
  position: absolute;
  top: 5.62rem; /* 90px */
  left: 0;
  width: 100%;
  border-radius: 0.625rem; /* 10px */
  max-height: 18.75rem; /* 300px */
  overflow-y: auto;
`

const Option = styled.div`
  padding: 1.25rem;
  display: flex;
  svg {
    width: 28px;
    height: auto;
    margin-right: 1.25rem;
  }
  &:hover {
    background: ${theme.lightGrey2};
  }
`

const SelectCategories = ({ category, setCategory }) => {
  const [showSelect, setShowSelect] = useState(false)

  const handleClick = (e) => {
    setCategory(e.currentTarget.dataset.value)
  }

  return (
    <SelectContainer onClick={() => setShowSelect(!showSelect)}>
      <SelectedOption>
        {category}
        <IconDown />
      </SelectedOption>
      {showSelect && (
        <Options>
          {categories.map((category) => {
            const { id, text } = category
            return (
              <Option
                key={id}
                data-value={id}
                onClick={handleClick}>
                <CategoryIcon id={id} />
                {text}
              </Option>
            )
          })}
        </Options>
      )}
    </SelectContainer>
  )
}

export default SelectCategories
