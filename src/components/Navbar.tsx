"use client"
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import {DumbbellIcon, HomeIcon, MoonIcon, MoonStarIcon, UserIcon, ZapIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
    const {isSignedIn} = useUser()
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3'>
        <div className='container mx-auto flex items-center justify-between '>
             <Link href="/" className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded md:ml-10 ml-2">
                    <MoonStarIcon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xl font-bold font-mono">
                    Sleep<span className="text-primary">Wise</span>.ai
                </span>
            </Link>

            <nav className='flex items-center gap-5 md:ml-0 ml-11 '>
                {isSignedIn ? (
                    <>
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                    >
                        <HomeIcon size={16} />
                        <span>Home</span>
                    </Link>

                    <Link
                        href="/generate-program"
                        className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                    >
                        <MoonIcon size={16} />
                        <span>Analyse</span>
                    </Link>

                     <Link
                        href="/profile"
                        className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                    >
                        <UserIcon size={16} />
                        <span>Dashboard</span>
                    </Link>
                    <Button
                        asChild
                        variant="outline"
                        className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                    >
                        <Link href="/generate-program">Begin Your Journey</Link>
                    </Button>
                    <div className='mr-10'>
                        <UserButton />
                    </div>
                    </>
                ) : (
                    <>
                    <SignInButton>
                        <Button variant={"outline"}
                            className=' -ml-6 border-primary/50 text-primary hover:text-white hover:bg-primary/10 '
                        >
                            Sign In
                        </Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button 
                        className=" md:mr-10 bg-primary text-primary-foreground hover:bg-primary/90">
                            Sign Up
                        </Button>
                    </SignUpButton>
                    </>
                )}
            </nav>
        </div>
    </header>
  )
}

export default Navbar
