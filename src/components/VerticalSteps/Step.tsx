import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Circle,
  Collapse,
  Heading,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { useStep } from './useStep'

interface StepProps extends BoxProps {
  title?: string
}

export const Step = (props: StepProps) => {
  const { title, children, ...boxProps } = props
  const { isActive, isCompleted, step } = useStep()

  const accentColor = useColorModeValue('blue.500', 'blue.300')
  const mutedColor = useColorModeValue('gray.600', 'whiteAlpha.800')
  const activeColor = useColorModeValue('white', 'black')

  return (
    <Box {...boxProps}>
      <HStack spacing="4">
        <Circle
          size="8"
          fontWeight="bold"
          color={isActive ? activeColor : isCompleted ? accentColor : mutedColor}
          bg={isActive ? '#0F0EA7' : 'transparent'}
          borderColor={isCompleted ? '#0F0EA7' : 'inherit'}
          borderWidth={isActive ? '0px' : '1px'}
        >
          {isCompleted ? <Icon as={CheckIcon} color={'#0F0EA7'} /> : step}
        </Circle>
        <Heading
            color={'#4D4C4C'}
          fontSize="18px"
          fontWeight="600"
        >
          {title}
        </Heading>
      </HStack>
      <Collapse in={isActive}>{children}</Collapse>
    </Box>
  )
}
