import React from 'react'

import {ReactComponent as IconFood} from '../images/cat_food.svg'
import {ReactComponent as IconAccPymnt} from '../images/cat_acc&pymnt.svg'
import {ReactComponent as IconHome} from '../images/cat_home.svg'
import {ReactComponent as IconTransportation} from '../images/cat_transportation.svg'
import {ReactComponent as IconClothes} from '../images/cat_clothes.svg'
import {ReactComponent as IconHlthClean} from '../images/cat_hlth&clean.svg'
import {ReactComponent as IconShop} from '../images/cat_shop.svg'
import {ReactComponent as IconEntertainment} from '../images/cat_entertainment.svg'

const CategoryIcon = ({id}) => {
    switch(id) {
        case 'Food':
            return <IconFood/>
        case 'Acc & Paymts':
            return <IconAccPymnt/>
        case 'Home':
            return <IconHome/>
        case 'Transportation':
            return <IconTransportation/>
        case 'Clothes':
            return <IconClothes/>
        case 'Health & Clean':
            return <IconHlthClean/>
        case 'Shopping':
            return <IconShop/>
        case 'Entertainment':
            return <IconEntertainment/>
        default:
            break
    }
}

export default CategoryIcon