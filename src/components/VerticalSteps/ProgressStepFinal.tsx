import { Box, Button, HStack, Stack, Text,Link } from '@chakra-ui/react'
import * as React from 'react'
import { Step } from './Step'
import { StepContent } from './StepContent'
import { Steps } from './Steps'
import { useSteps } from './useSteps'

interface MessageProps {
  status: number  ;
  artistDate: Date ;
  artistApprovalDate: Date
}
export  const ProgressStepFinal = ({ status,artistDate,artistApprovalDate  }: MessageProps) => {
  let { nextStep, prevStep, reset, activeStep } = useSteps({ initialStep: 1 }) 
  
  let date: Date = new Date(artistDate); 
  let date1: Date = new Date(artistApprovalDate);  
  let date2: Date= new Date();

   if(status==3 || status==4) 
    {
      activeStep=2
    }  
  

  return (
    <Box mx="auto" maxW="2xl" py="10" px={{ base: '6', md: '8' }} minH="400px">
      <Steps activeStep={activeStep}>
        <Step title="Draft sent">
  
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text fontWeight={'400'} color={'#8F8F8F'} fontSize={'14px'}>
              You sent the draft to the artist on {date.getMonth()+1} {date.getDate()}, {date.getFullYear()}
              </Text>
              
            </Stack>
          </StepContent>
        </Step>
        <Step title="Awaiting approval">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text fontWeight={'400'} color={'#8F8F8F'} fontSize={'14px'}>
              You sent the draft to the artist on {
            
            artistDate?date?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'}):date2?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}.
                The artist needs to approve the draft.
              </Text>
              
            </Stack>
          </StepContent>
        </Step>
        <Step title="Ready to mint">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text fontWeight={'400'} color={'#8F8F8F'} fontSize={'14px'}>
                The artist approved the draft on  {artistApprovalDate?date1?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'}):date2.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}. You can now mint the NFT.


                

              </Text>
             
            </Stack>
          </StepContent>
        </Step>
      </Steps>
      <HStack display={activeStep === 3 ? 'flex' : 'none'} mt="10" spacing="4" shouldWrapChildren>
        <Text>All steps completed - you&apos;re finished</Text>
        <Button size="sm" onClick={reset} variant="outline" verticalAlign="baseline">
          Reset
        </Button>
      </HStack>
    </Box>
  )
}
