"use client"

import TerminalOverlay from '@/components/TerminalOverlay'
import { Button } from '@/components/ui/button'
import UserPrograms from '@/components/UserPrograms'
import { ArrowDownCircleIcon, ArrowRight, ArrowRightIcon, Loader2, MessageCircle, MoonStarIcon, Send, X, ZapIcon } from 'lucide-react'
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
    const handleScroll = () => {
      if(window.scrollY > 100){
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
        <section className="relative w-full px-6 py-24 overflow-hidden">
          {/* Subtle Background Effects */}
          
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8 z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 ">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">AI-Powered Sleep Optimisation</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 -mt-5">
                <h1 className="text-5xl lg:text-7xl font-bold">
                  <span className="block text-foreground">Resync Your</span>
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Sleep Routine
                  </span>
                  <span className="block text-foreground">With Smart</span>
                  <span className="block text-accent">AI Insights</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  We help students & professionals rebuild their sleep routines to maximize energy and focus.
                </p>
                {/* no tracking, just smart planning */}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Better Sleepers</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors">
                  <div className="text-2xl font-bold text-accent">7.5hrs</div>
                  <div className="text-sm text-muted-foreground">Avg Quality</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="default" size="lg" className="group bg-gradient-to-r from-primary to-accent ">
                  <Link href={"/generate-program"}>
                    Start Your Sleep Journey
                  </Link>
                  
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  <Link href={"/profile"}>
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-[0_0_40px_0_rgba(108,59,170,0.5)]">
                <img 
                  src="/heroai3.png" 
                  alt="SleepWise AI Assistant" 
                  className="w-full h-[600px] object-cover "
                />
                
                {/* Top Stats Card */}
                <div className="absolute top-6 right-6">
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl p-3 border border-primary/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-500">LIVE</span>
                    </div>
                    <div className="text-lg font-bold text-foreground">8h 15m</div>
                    <div className="text-xs text-muted-foreground">Tonight&apos;s Goal</div>
                  </div>
                </div>

                {/* Bottom Status Panel */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-yellow-400">Sleep Analysis</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <span>💤</span>
                        <span>Optimal bedtime: 10:30 PM</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <span>🎯</span>
                        <span>Sleep score: 92%</span>
                      </div>
                    </div>
                  </div>
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
            className='fixed bottom-20 right-4 z-50 w-[95%] md:w-[510px]'

            >
              <Card className='border-2'>
                <CardHeader className=' flex flex-row items-center justify-between space-y-0 pb-3'>
                  
                  <CardTitle className='flex items-center gap-2 text-xl font-bold'>
                    <MoonStarIcon className=" text-primary w-5" />
                    Chat with SleepWise Assistant
                    
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
                {/* <hr className='-translate-y-5' /> */}
                <CardContent>
                  <ScrollArea className='h-[380px] pr-4'>
                    {messages?.length === 0 &&  !error &&(
                      <div className='w-full mt-33 text-gray-400  items-center justify-center text-center flex-col gap-3 '>
                        <p className='text-xl font-bold'>💜 Welcome to SleepWise AI</p> 
                        <br></br>
                        <p className='-mt-3 text-md'>I&#39;m your assistant. Ask me anything about the platform, features, or how we help you build personalized routines.</p>
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
                          Cancel
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
