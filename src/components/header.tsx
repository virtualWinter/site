'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {Menu} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

export default function Header() {
    const [isAtTop, setIsAtTop] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setIsAtTop(scrollPosition === 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={cn(
            "sticky top-0 z-50 transition-all duration-200",
            isAtTop
                ? "bg-background/80 backdrop-blur-sm"
                : "bg-background border-b shadow-sm"
        )}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-lg font-semibold">
                        Acme Inc
                    </Link>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
                        <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
                        <Link href="/services"
                              className="text-sm text-muted-foreground hover:text-foreground">Services</Link>
                        <Link href="/contact"
                              className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
                    </nav>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Open menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}