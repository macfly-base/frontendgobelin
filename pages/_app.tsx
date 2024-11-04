import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import { UmiProvider } from "../utils/UmiProvider";
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ChakraProvider, Box, Link as ChakraLink, Image, Flex, Icon } from '@chakra-ui/react';
import { image, headerText } from 'settings';
import { SolanaTimeProvider } from "@/utils/SolanaTimeContext";
import NextLink from 'next/link';
import { FaTwitter, FaDiscord } from 'react-icons/fa';

export default function App({ Component, pageProps }: AppProps) {
  const network = process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet-beta" || process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet"
    ? WalletAdapterNetwork.Mainnet
    : WalletAdapterNetwork.Devnet;

  const endpoint = process.env.NEXT_PUBLIC_RPC || "https://api.devnet.solana.com";
  const wallets = useMemo(() => [], []);

  const navLinkStyle = {
    color: "white",
    marginRight: "40px",
    padding: "4px 6px",
    borderRadius: '4px',
    transition: "background-color 0.3s, filter 0.3s, box-shadow 0.3s",
    _hover: {
      backgroundColor: "rgba(0,0,0,0.5)",
      filter: "brightness(1.2)",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={headerText} />
        <meta property="og:description" content="RRRRRRRRRRRRRRRRAAAAAAAAAAAVE" />
        <meta name="description" content="RRRRRRRRRRRRRRRRAAAAAAAAAAAVE" />
        <meta property="og:image" content={image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{headerText}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ChakraProvider>
        <WalletProvider wallets={wallets}>
          <UmiProvider endpoint={endpoint}>
            <WalletModalProvider>
              <SolanaTimeProvider>
                <Box as="nav" padding="0.3rem 1rem" display="flex" alignItems="center" justifyContent="space-between" borderBottom="transparent 0.1px solid"
                  _hover={{ bg: "rgba(0, 0, 0, 0.3)", borderBottom: "white 0.1px solid" }}>
                  
                  <ChakraLink as={NextLink} href="/" display="flex" alignItems="center">
                    <Image 
                      src="https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmZRjRJJro8ESkr8GA5rwQ6zFR8VzZZcxau8U1LTHTeMH3/collection.png"
                      alt="Home"
                      width="4vw"
                      height="auto"
                      objectFit="cover"
                      mr="80px"
                    />
                  </ChakraLink>

                  <Box display="flex" fontSize="120%">
                    {['Home', 'Mint', 'Elixir', 'Test', 'Gallery'].map((page) => (
                      <ChakraLink key={page} as={NextLink} href={`/${page.toLowerCase()}`} {...navLinkStyle}>
                        {page}
                      </ChakraLink>
                    ))}
                  </Box>

                  <Box as={WalletMultiButton} bg="transparent"
                    backgroundImage="url('https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmaETkVfYdYo8v1djEstHtA1GNzjsWZhYha5okYRMA8yxv')"
                    backgroundSize="cover"
                    padding="0.5rem 1rem"
                    borderRadius="8px"
                    boxShadow="0px 4px 15px rgba(0, 0, 0, 0.3)"
                    transition="background-image 0.5s, filter 0.5s"
                    _hover={{
                      filter: "brightness(1.2)",
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 1)",
                    }}
                  />
                </Box>
                
                <Component {...pageProps} />
                
                <Box as="footer" width="100%" py={4} borderTop="1px solid rgba(255, 255, 255, 0.6)"
                  bgGradient="linear(to-t, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5))" color="white">
                  <Flex maxW="1200px" mx="auto" px={4} justify="space-between" align="center">
                    <Image
                      src="https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmZRjRJJro8ESkr8GA5rwQ6zFR8VzZZcxau8U1LTHTeMH3/collection.png"
                      alt="Project Logo"
                      boxSize="50px"
                    />
                    <Flex gap={4}>
                      <ChakraLink href="https://x.com/risktaker_eth" isExternal>
                        <Icon as={FaTwitter} boxSize={6} _hover={{ color: "blue.400" }} />
                      </ChakraLink>
                      <ChakraLink href="https://discord.gg/8wMyc76t" isExternal>
                        <Icon as={FaDiscord} boxSize={6} _hover={{ color: "purple.500" }} />
                      </ChakraLink>
                    </Flex>
                  </Flex>
                </Box>
              </SolanaTimeProvider>
            </WalletModalProvider>
          </UmiProvider>
        </WalletProvider>
      </ChakraProvider>
    </>
  );
}
