import Link from 'next/link';
import React from 'react';
import { SignInButton } from '../SignInButton';

export function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href={'/'}>
                            <a >Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/marked-countries'}>
                            <a >Marked Countries</a>
                        </Link>
                    </li>
                    <li>
                        <SignInButton />
                    </li>
                </ul>
            </nav>
        </header>
    );
}