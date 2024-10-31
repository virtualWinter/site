import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-background border-t py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
                        © 2024 vWinter. All rights reserved.
                    </p>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href="#"
                                      className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
                            <li><Link href="#"
                                      className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    )
}