"use client"

import TerminalOverlay from '@/components/TerminalOverlay'
import { Button } from '@/components/ui/button'
import UserPrograms from '@/components/UserPrograms'
import { ArrowDownCircleIcon, ArrowRightIcon, Loader2, MessageCircle, Send, X, ZapIcon } from 'lucide-react'
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

const ChatPage = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(true);
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

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    
  };
  
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='flex items-center justify-center'>
        <AnimatePresence>
          {showChatIcon && !isChatOpen && (
            <motion.div
              className='z-50'
            >
              <Button ref={chatIconRef} onClick={toggleChat} size="icon" className='size-20 p-2 text-lg' >
                Start
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
            className='w-[95%] md:w-[75%] mt-10 mb-20'

            >
              <Card className='border-2'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
                  
                  <CardTitle className='flex items-center gap-2 text-xl font-bold'>
                    <ZapIcon className=" text-primary w-5" />
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
                {/* <hr className='-translate-y-5' /> */}
                <CardContent>
                  <ScrollArea className='h-[420px] pr-4'>
                  <div ref={chatAreaRef} className="overflow-y-auto flex flex-col h-[420px] w-full scrollbar-transparent">
                    {messages?.length === 0 &&  !error &&(
                      <div className='w-full mt-33 text-gray-300  items-center justify-center text-center flex-col gap-3 '>
                        <p className='text-xl font-bold'>👋 Welcome to FitAura AI</p> 
                        <br></br>
                        <p className='-mt-3 text-md'>I&#39;your assistant. Ask me anything about the platform, features, or how we help you build personalized fitness programs.</p>
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

                    
                  </div>
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
          
  )
}

export default ChatPage
