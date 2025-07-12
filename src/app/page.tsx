"use client"

import TerminalOverlay from '@/components/TerminalOverlay'
import { Button } from '@/components/ui/button'
import UserPrograms from '@/components/UserPrograms'
import { ArrowDownCircleIcon, ArrowRightIcon, Loader2, MessageCircle, Send, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {motion, AnimatePresence} from "framer-motion"
import { init } from 'next/dist/compiled/webpack/webpack'
import { initialize } from 'next/dist/server/lib/render-server'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {useChat} from "@ai-sdk/react"
import { Input } from '@/components/ui/input'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);

  const {
    messages, 
    input, 
    handleInputChange, 
    handleSubmit,
    isLoading, 
    stop, 
    reload, 
    error,
  } = useChat({
    api: "/aiapi/gemini"
  });

  const scrollRef= useRef<HTMLDivElement>(null);

   useEffect(() => {
      const originalError = console.error;
      // override console.error to ignore "Meeting has ended" errors
      console.error = function (msg, ...args) {
        if (
          msg &&
          (msg.includes("Do not pass children as props.") ||
            (args[0] && args[0].toString().includes("Do not pass children as props.")))
        ) {
          console.log("Ignoring known error: Meeting has ended");
          return; // don't pass to original handler
        }
  
        // pass all other errors to the original handler
        return originalError.call(console, msg, ...args);
      };
  
      // restore original handler on unmount
      return () => {
        console.error = originalError;
      };
    }, []);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 200){
        setShowChatIcon(true);
      } else{
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);

    
  };

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behavior: "smooth"});
    }

  },[messages]);


  return (
    <div>
       <div className='flex flex-col min-h-screen text-foreground overflow-hidden'>
        <section className="relative z-10 py-24 flex-grow">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              {/* corner decoration */}
              <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />
              {/* left side */}
              <div className="lg:col-span-7 space-y-8 relative">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <div>
                  <span className="text-foreground">Transform</span>
                </div>
                <div>
                  <span className="text-primary">Your Body</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">With Advanced</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">AI</span>
                  <span className="text-primary"> Technology</span>
                </div>
              </h1>
              {/* seperator line */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>
              <p className="text-xl text-muted-foreground w-2/3">
                Talk to our AI assistant and get personalized diet plans and workout routines
                designed just for you
              </p>

              {/* stats */}
              <div className="flex items-center gap-10 py-6 font-mono">
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">500+</div>
                  <div className="text-xs uppercase tracking-wider">ACTIVE USERS</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">3min</div>
                  <div className="text-xs uppercase tracking-wider">GENERATION</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">100%</div>
                  <div className="text-xs uppercase tracking-wider">PERSONALIZED</div>
                </div>
              </div>

              {/* button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
                >
                  <Link href={"/generate-program"} className="flex items-center font-mono">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
              </div>
              </div>

               {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative">
              {/* CORNER PIECES */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-border" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-border" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-border" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-border" />
              </div>
              {/* IMAGE CONTANINER */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg bg-cyber-black">
                  <img
                    src="/hero-ai3.png"
                    alt="AI Fitness Coach"
                    className="size-full object-cover object-center"
                  />
                   {/* SCAN LINE */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--cyber-glow-primary)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />
                   {/* DECORATIONS ON TOP THE IMAGE */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/40 rounded-full" />
                    {/* Targeting lines */}
                    <div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/50" />
                    <div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/50" />

                  </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                </div>
                {/* TERMINAL OVERLAY */}
                <TerminalOverlay />
              </div>
            </div>
            </div>
          </div>
        </section>

        <UserPrograms/>
        {/* CHAT ICON */}
        <AnimatePresence>
          {showChatIcon && (
            <motion.div
              initial ={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2 }}
              className='fixed bottom-4 right-4 z-50'

            >
              <Button ref={chatIconRef} onClick={toggleChat} size="icon" className='rounded-full size-14 p-2 shadow-large' >
                {!isChatOpen ? (
                  <MessageCircle className='size-6' />
                ): (
                  <ArrowDownCircleIcon className='size-6'/>
                )}

              </Button>

            </motion.div>
          )};

        </AnimatePresence>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
            initial={{ opacity: 0, scale: 0.8}}
            animate={{ opacity: 1, scale: 1}}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className='fixed bottom-20 right-4 z-50 w-[35%] md:w-[500px'

            >
              <Card className='border-2'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
                  <CardTitle className='text-xl font-bold'>
                    Chat with FitAura AI
                  </CardTitle>
                  <Button
                    onClick={toggleChat}
                    size="sm"
                    variant = "ghost"
                    className='px-2 py-0'

                  >
                    <X className='size-5' />
                    <span className='sr-only'>Close chat</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className='h-[300px] pr-4'>
                    {messages?.length === 0 &&  !error &&(
                      <div className='w-full mt-27 text-gray-500 text-lg items-center justify-center flex gap-3'>
                        No messages yet.
                      </div>
                    )}
                    {messages?.length > 0 && !error && messages?.map((message,index) => (
                      <div
                        key={index}
                        className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                      >
                        <div className={`inline-block p-4 rounded-lg  ${message.role === 'user' ? 'bg-primary text-primary-foreground': 'bg-muted'}`}>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({node, className, children, ...props}) {
                                // @ts-expect-error: 'inline' is not in the type but is provided by react-markdown
                                const isInline = props.inline;
                                return isInline ? (
                                  <code {...props} className='bg-gray-200 px-1 rounded'>{children}</code>
                                ): (
                                  <pre {...{...props, ref: undefined}} className='bg-gray-200 p-2 rounded'>
                                    <code>{children}</code>
                                  </pre>
                                );
                              },
                              ul: ({children}) => (
                                <ul className='list-disc ml-4'>{children}</ul>
                              ),
                              ol: ({children}) => (
                                <li className=' list-decimal ml-4'>{children}</li>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        
                      </div>
                    ))}

                    {isLoading && (
                      <div className='w-full items-center flex justify-center gap-3'>
                        <Loader2 className='animate-spin h-5 w-5 text-primary' />
                        <button
                          className='underline'
                          type="button"
                          onClick={() => stop()}
                        >
                          abort
                        </button>
                      </div>
                    )}
                    {error && (
                      <div className='w-full mt-30 items-center flex justify-center gap-3'>
                        <div>An error occured.</div>
                        <button 
                        className='underline'
                        type="button"
                        onClick={() => 
                          reload()}
                        >
                          Retry
                        </button>

                      </div>
                    )}

                    <div ref={scrollRef}></div>


                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSubmit} 
                  className='flex w-full items-center space-x-2'
                  >
                    <Input value={input} onChange={handleInputChange} className='flex-1 size-10' placeholder='Type your message here...' />
                    <Button type="submit" className='size-10' disabled={isLoading} size="icon">
                      <Send className='size-4' />
                    </Button>
                    
                  </form>
                </CardFooter>
              </Card>

            </motion.div>

          )}
        </AnimatePresence> 
        


       </div>
    </div>
    
  )
}

export default HomePage
