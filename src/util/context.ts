import React, { Dispatch, SetStateAction } from 'react';
import { CartProduct } from '../CustomTypes';

export const CartContext = React.createContext<[CartProduct[], Dispatch<SetStateAction<CartProduct[]>>]>([[],()=>{}]);