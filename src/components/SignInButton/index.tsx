import { signIn, signOut, useSession } from 'next-auth/client';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'

export function SignInButton() {
    const [session] = useSession();

    return session ? (
        <button type="button" >
            <FaGithub color="#04d361" />
            {session.user.name}
            <FiX color="#737380" onClick={() => signOut()} />
        </button>
    ) : (
        <button type="button" onClick={() => signIn('github')}>
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    );
}