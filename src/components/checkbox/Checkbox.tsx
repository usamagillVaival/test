import {
  Box,
  HStack,
  Text,
  useCheckbox,
  UseCheckboxProps,
  useColorModeValue as mode,
  useId,
} from '@chakra-ui/react'
import * as React from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { array } from 'yup/lib/locale'
import { CheckboxBox } from './CheckboxBox'

interface ButtonCheckboxProps extends UseCheckboxProps {
  icon: React.ReactElement
  title: string
  description: string
  price: string
  children: React.ReactNode
}

export const ButtonCheckbox = (props: ButtonCheckboxProps) => {
  const [paymentMethod, setPaymentMethod] = React.useState([]);
  const { icon, title, description, price, ...rest } = props
  const { getCheckboxProps, getInputProps, getLabelProps, state } = useCheckbox(rest)


  // console.log('input', getLabelProps)
  if (state?.isChecked) {

    // console.log(props.value)
    const value: any = props.value

    const arr = []
    arr.push(value)
    // console.log(arr)
    // paymentMethod.push(value)
    //  setPaymentMethod(value) 
    //  setPaymentMethod( props?.value)
  }
  const id = useId()
  // alert(id)



  return (
    <label {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <CheckboxBox {...getCheckboxProps()} id={id} borderRadius={'0px'}
        _checked={{

          border: '2px solid #0C0B86'
        }}>
        <HStack spacing="4">
          <Box
            data-checked={state.isChecked ? '' : undefined}
            fontSize="2xl"
            _checked={{
              color: '#0F0EA7',
            }}
            color={mode('gray.300', 'whiteAlpha.400')}
          >
            {state.isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </Box>
          <Box fontSize="3xl">{icon}</Box>
          <Box flex="1">
            <Text fontWeight="600" fontSize={'16px'} lineHeight={'24px'}>{title}</Text>
            <Text color={'#797979'} fontWeight="400" fontSize={'14px'} lineHeight={'20px'}>{description}</Text>
          </Box>
          <Box fontWeight="600" color='#797979' fontSize={'14px'} lineHeight={'20px'}>
            {price}
          </Box>
        </HStack>
      </CheckboxBox>
    </label>
  )
}
