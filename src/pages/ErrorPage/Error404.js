
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Link
} from '@chakra-ui/react';

export default function Error404() {
    return (
        <>


            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}

                    py={{ base: 20, md: 36 }}>
                    <Heading
                        fontWeight={900}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>404
                    </Heading>
                    <Text color={'gray.500'} fontWeight={600} fontSize={'5xl'}>
                       Page not Found
                    </Text>
                   <Text fontWeight={'bold'} fontSize={'1.5rem'}>
                       The Page you are looking for doesn't exist or an other<br/> error occured . Go to <Link color={'##0F0EA7'}>Home Page </Link>
                   </Text>
                </Stack>
            </Container>
        </>
    );
}

